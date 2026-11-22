import type { SiteContent } from '../types';

/**
 * 判断当前是否处于本地开发或局域网访问环境：
 * - localhost / 127.0.0.1 / [::1]
 * - *.local / *.localhost
 * - 常见私有局域网 IP 段 (192.168.x.x, 10.x.x.x, 172.16-31.x.x)
 */
export const isLocalNetwork = (): boolean => {
  if (typeof window === 'undefined') return false;
  const host = window.location.hostname;
  return (
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host === '[::1]' ||
    host.endsWith('.local') ||
    host.endsWith('.localhost') ||
    /^192\.168\./.test(host) ||
    /^10\./.test(host) ||
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(host) ||
    /^127\./.test(host)
  );
};

export interface LocalCmsResponse {
  success: boolean;
  isLocal?: boolean;
  content?: SiteContent;
  message?: string;
  error?: string;
}

/**
 * 从本地 Vite 开发服务读取最新的本地代码库内容 (src/data/content.json)
 */
export const fetchLocalContent = async (): Promise<SiteContent> => {
  const response = await fetch('/api/cms/content', {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(`本地服务响应异常 (HTTP ${response.status})`);
  }
  const data = (await response.json()) as LocalCmsResponse;
  if (!data.success || !data.content) {
    throw new Error(data.error || '获取本地代码库内容失败');
  }
  return data.content;
};

/**
 * 将修改后的内容直接保存回本地代码库 (src/data/content.json)
 */
export const saveLocalContent = async (content: SiteContent): Promise<string> => {
  const response = await fetch('/api/cms/content', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ content }),
  });
  if (!response.ok) {
    throw new Error(`保存请求失败 (HTTP ${response.status})`);
  }
  const data = (await response.json()) as LocalCmsResponse;
  if (!data.success) {
    throw new Error(data.error || '保存到本地代码库失败');
  }
  return data.message || '已成功保存至本地代码库 (src/data/content.json)';
};
