import rawContent from './data/content.json';
import type { SiteContent } from './types';

/**
 * 网站的全部可编辑内容都集中在这里。
 * CMS (/dtms) 读取并修改同一个 JSON 文件，通过 GitHub PAT 提交。
 */
export const SITE_CONTENT = rawContent as unknown as SiteContent;

export const CONTENT_REPO_PATH = 'src/data/content.json';

export const CONTENT_DEFAULTS = {
  owner: 'kanpianer',
  repo: 'bxfq',
  branch: 'main',
  path: CONTENT_REPO_PATH,
} as const;
