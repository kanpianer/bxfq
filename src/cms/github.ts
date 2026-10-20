import { CONTENT_DEFAULTS } from '../content';
import type { SiteContent } from '../types';

export interface RepoSettings {
  owner: string;
  repo: string;
  branch: string;
  path: string;
}

export const DEFAULT_REPO: RepoSettings = { ...CONTENT_DEFAULTS };

export const STORAGE_KEYS = {
  token: 'bxfq.cms.token',
  repo: 'bxfq.cms.repo',
  draft: 'bxfq.cms.draft',
} as const;

export const loadToken = (): string => {
  try {
    return localStorage.getItem(STORAGE_KEYS.token) || '';
  } catch {
    return '';
  }
};

export const saveToken = (token: string): void => {
  try {
    if (token) localStorage.setItem(STORAGE_KEYS.token, token);
    else localStorage.removeItem(STORAGE_KEYS.token);
  } catch {
    /* localStorage unavailable */
  }
};

export const loadRepoSettings = (): RepoSettings => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.repo);
    if (!raw) return { ...DEFAULT_REPO };
    const parsed = JSON.parse(raw) as Partial<RepoSettings>;
    return {
      owner: parsed.owner?.trim() || DEFAULT_REPO.owner,
      repo: parsed.repo?.trim() || DEFAULT_REPO.repo,
      branch: parsed.branch?.trim() || DEFAULT_REPO.branch,
      path: parsed.path?.trim() || DEFAULT_REPO.path,
    };
  } catch {
    return { ...DEFAULT_REPO };
  }
};

export const saveRepoSettings = (repo: RepoSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.repo, JSON.stringify(repo));
  } catch {
    /* localStorage unavailable */
  }
};

const assertRepo = (repo: RepoSettings): void => {
  if (!repo.owner || !repo.repo || !repo.branch || !repo.path) {
    throw new Error('仓库设置不完整，请在「设置」中补全 owner / repo / branch / path。');
  }
};

const encodePath = (path: string): string =>
  path
    .split('/')
    .filter(Boolean)
    .map(encodeURIComponent)
    .join('/');

const authHeaders = (token: string): Record<string, string> => {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

const withTimeout = async (url: string, init: RequestInit, timeoutMs = 15000): Promise<Response> => {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    window.clearTimeout(timer);
  }
};

export const repoKeyOf = (repo: RepoSettings): string =>
  `${repo.owner}/${repo.repo}@${repo.branch}:${repo.path}`;

export const isSiteContent = (value: unknown): value is SiteContent => {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<SiteContent>;
  return Boolean(
    candidate.site &&
      candidate.footer &&
      candidate.guide &&
      Array.isArray(candidate.tools)
  );
};

const parseContent = (text: string): SiteContent => {
  const parsed: unknown = JSON.parse(text);
  if (!isSiteContent(parsed)) {
    throw new Error('内容 JSON 结构不完整（缺少 site / footer / guide / tools）');
  }
  return parsed;
};

/* ---------------------------------- base64 --------------------------------- */

/* ---------------------------------- draft ---------------------------------- */

export interface ContentDraft {
  content: SiteContent;
  savedAt: string;
  repoKey: string;
}

export const loadDraft = (): ContentDraft | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.draft);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ContentDraft>;
    if (!isSiteContent(parsed.content) || !parsed.savedAt) return null;
    return {
      content: parsed.content,
      savedAt: parsed.savedAt,
      repoKey:
        parsed.repoKey ||
        `${DEFAULT_REPO.owner}/${DEFAULT_REPO.repo}@${DEFAULT_REPO.branch}:${DEFAULT_REPO.path}`,
    };
  } catch {
    return null;
  }
};

export const saveDraft = (content: SiteContent, repoKey: string): void => {
  try {
    const draft: ContentDraft = {
      content,
      savedAt: new Date().toISOString(),
      repoKey,
    };
    localStorage.setItem(STORAGE_KEYS.draft, JSON.stringify(draft));
  } catch {
    /* localStorage unavailable */
  }
};

export const clearDraft = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.draft);
  } catch {
    /* localStorage unavailable */
  }
};

export const toBase64 = (text: string): string => {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
};

export const fromBase64 = (base64: string): string => {
  const binary = atob(base64.replace(/\s/g, ''));
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};

export const serializeContent = (content: SiteContent): string =>
  `${JSON.stringify(content, null, 2)}\n`;

/* ---------------------------------- read ----------------------------------- */

export interface RemoteContent {
  content: SiteContent;
  sha?: string;
  via: 'api' | 'raw';
  warning?: string;
}

export const fetchRemoteContent = async (
  repo: RepoSettings,
  token: string
): Promise<RemoteContent> => {
  assertRepo(repo);
  const apiUrl = `https://api.github.com/repos/${repo.owner}/${repo.repo}/contents/${encodePath(
    repo.path
  )}?ref=${encodeURIComponent(repo.branch)}`;

  let warning: string | undefined;

  if (token) {
    try {
      const res = await withTimeout(apiUrl, { headers: authHeaders(token), cache: 'no-store' });
      if (res.ok) {
        const data = (await res.json()) as { content?: string; sha?: string };
        if (data.content) {
          return {
            content: parseContent(fromBase64(data.content)),
            sha: data.sha,
            via: 'api',
          };
        }
      } else if (res.status === 401) {
        warning = 'PAT 无效或已过期，已改为读取公开文件，请在「设置」中更新令牌。';
      }
    } catch {
      // 网络 / 限流问题时回退到 raw
    }
  }

  const rawUrl = `https://raw.githubusercontent.com/${repo.owner}/${repo.repo}/${
    repo.branch
  }/${encodePath(repo.path)}?t=${Date.now()}`;

  const res = await withTimeout(rawUrl, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(warning || `读取 GitHub 内容失败（HTTP ${res.status}）`);
  }
  return { content: parseContent(await res.text()), via: 'raw', warning };
};

/* ---------------------------------- write ---------------------------------- */

const contentsUrl = (repo: RepoSettings): string =>
  `https://api.github.com/repos/${repo.owner}/${repo.repo}/contents/${encodePath(repo.path)}`;

export const getFileSha = async (
  repo: RepoSettings,
  token: string
): Promise<string | undefined> => {
  assertRepo(repo);
  const res = await withTimeout(
    `${contentsUrl(repo)}?ref=${encodeURIComponent(repo.branch)}`,
    { headers: authHeaders(token), cache: 'no-store' }
  );

  if (res.status === 404) return undefined;
  if (res.status === 401) throw new Error('PAT 无效或已过期，请在「设置」中更新令牌。');
  if (!res.ok) throw new Error(`读取文件信息失败（HTTP ${res.status}）`);

  const data = (await res.json()) as { sha?: string };
  return data.sha;
};

export interface CommitResult {
  sha?: string;
  commitUrl?: string;
}

export const commitContent = async (
  repo: RepoSettings,
  token: string,
  content: SiteContent,
  sha: string | undefined,
  message: string
): Promise<CommitResult> => {
  assertRepo(repo);
  if (!token) throw new Error('尚未配置 Personal Access Token，无法提交。');

  const body: Record<string, unknown> = {
    message,
    content: toBase64(serializeContent(content)),
    branch: repo.branch,
  };
  if (sha) body.sha = sha;

  const res = await withTimeout(contentsUrl(repo), {
    method: 'PUT',
    headers: {
      ...authHeaders(token),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = (await res.json().catch(() => ({}))) as {
    message?: string;
    content?: { sha?: string };
    commit?: { html_url?: string };
  };

  if (!res.ok) {
    if (res.status === 409) {
      throw new Error('远端内容已更新，请先点击「重新载入」获取最新内容后再提交。');
    }
    if (res.status === 401) throw new Error('PAT 无效或已过期，请在「设置」中更新令牌。');
    if (res.status === 403) throw new Error('PAT 权限不足：需要该仓库的 Contents 读写权限。');
    if (res.status === 404) {
      throw new Error('仓库或内容文件不存在，或 PAT 无权访问该仓库。');
    }
    throw new Error(data.message || `提交失败（HTTP ${res.status}）`);
  }

  return { sha: data.content?.sha, commitUrl: data.commit?.html_url };
};
