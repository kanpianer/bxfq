import React, { useState } from 'react';
import {
  CheckCircle2,
  Eye,
  EyeOff,
  Github,
  KeyRound,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import {
  DEFAULT_REPO,
  type RepoSettings,
} from './github';
import {
  Badge,
  Button,
  Field,
  SectionCard,
  inputClass,
} from './CmsUI';

interface SettingsPanelProps {
  token: string;
  onTokenChange: (token: string) => void;
  repo: RepoSettings;
  onRepoChange: (repo: RepoSettings) => void;
  sha?: string;
  source: 'github' | 'local';
  busy: boolean;
  onReload: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  token,
  onTokenChange,
  repo,
  onRepoChange,
  sha,
  source,
  busy,
  onReload,
}) => {
  const [showToken, setShowToken] = useState(false);
  const [tokenDraft, setTokenDraft] = useState(token);

  React.useEffect(() => {
    setTokenDraft(token);
  }, [token]);

  const commitToken = () => {
    onTokenChange(tokenDraft.trim());
  };

  const patchRepo = (partial: Partial<RepoSettings>) => onRepoChange({ ...repo, ...partial });

  return (
    <div className="space-y-4">
      <SectionCard
        title="GitHub Personal Access Token"
        description="用于读取最新内容并提交更改。令牌仅保存在当前浏览器的 localStorage，不会写入仓库或发送到 GitHub 以外的服务器。"
      >
        <div className="space-y-3">
          <Field
            label="PAT"
            hint="建议使用 Fine-grained token，仅授权本仓库的 Contents: Read and write 权限。"
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-obsidian-500" />
                <input
                  type={showToken ? 'text' : 'password'}
                  value={tokenDraft}
                  onChange={(event) => setTokenDraft(event.target.value)}
                  onBlur={commitToken}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      commitToken();
                    }
                  }}
                  className={`${inputClass} pl-9 pr-10 font-mono`}
                  placeholder="github_pat_… 或 ghp_…"
                  autoComplete="off"
                  spellCheck={false}
                />
                <button
                  type="button"
                  onClick={() => setShowToken((value) => !value)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-obsidian-500 hover:text-white"
                  title={showToken ? '隐藏令牌' : '显示令牌'}
                >
                  {showToken ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
              <div className="flex gap-2">
                <Button variant="primary" onClick={commitToken}>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  保存令牌
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setTokenDraft('');
                    onTokenChange('');
                  }}
                  disabled={!tokenDraft && !token}
                >
                  清除
                </Button>
              </div>
            </div>
          </Field>

          <div className="flex flex-wrap items-center gap-3 text-[11px] font-sans">
            <a
              href="https://github.com/settings/personal-access-tokens/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-obsidian-400 hover:text-white"
            >
              <Github className="h-3.5 w-3.5" />
              创建 Fine-grained Token
            </a>
            <span className="text-obsidian-700">/</span>
            <a
              href="https://github.com/settings/tokens/new?scopes=repo&description=bxfq-cms"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-obsidian-400 hover:text-white"
            >
              创建经典 Token（repo）
            </a>
            <Badge
              className={
                token
                  ? 'border-emerald-900/60 bg-emerald-950/30 text-emerald-300'
                  : 'border-amber-900/60 bg-amber-950/30 text-amber-300'
              }
            >
              {token ? '已配置' : '未配置'}
            </Badge>
          </div>

          <p className="rounded-lg border border-obsidian-800 bg-obsidian-950/60 px-3 py-2 text-[11px] font-sans leading-relaxed text-obsidian-500">
            安全提示：切勿在公共电脑上保存令牌。PAT 等同仓库写入权限，泄露后请立即在 GitHub 设置中吊销。
          </p>
        </div>
      </SectionCard>

      <SectionCard
        title="仓库与分支"
        description="默认指向本站源码仓库。Fork 部署时可改为你自己的仓库。"
        actions={
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onRepoChange({ ...DEFAULT_REPO })}
            disabled={
              repo.owner === DEFAULT_REPO.owner &&
              repo.repo === DEFAULT_REPO.repo &&
              repo.branch === DEFAULT_REPO.branch &&
              repo.path === DEFAULT_REPO.path
            }
          >
            <RotateCcw className="h-3 w-3" />
            恢复默认
          </Button>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="仓库所有者">
            <input
              value={repo.owner}
              onChange={(event) => patchRepo({ owner: event.target.value.trim() })}
              className={`${inputClass} font-mono`}
            />
          </Field>
          <Field label="仓库名称">
            <input
              value={repo.repo}
              onChange={(event) => patchRepo({ repo: event.target.value.trim() })}
              className={`${inputClass} font-mono`}
            />
          </Field>
          <Field label="分支">
            <input
              value={repo.branch}
              onChange={(event) => patchRepo({ branch: event.target.value.trim() })}
              className={`${inputClass} font-mono`}
            />
          </Field>
          <Field label="内容文件路径">
            <input
              value={repo.path}
              onChange={(event) => patchRepo({ path: event.target.value.trim() })}
              className={`${inputClass} font-mono`}
            />
          </Field>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-obsidian-800 bg-obsidian-950/60 px-3 py-2.5">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-sans text-obsidian-400">
            <ShieldCheck className="h-3.5 w-3.5 text-obsidian-500" />
            <span>
              当前内容来源：
              <span className="text-obsidian-200">
                {source === 'github' ? 'GitHub 最新提交' : '本站内置内容'}
              </span>
            </span>
            {sha && (
              <span className="font-mono text-[10px] text-obsidian-500">
                版本 {sha.slice(0, 7)}
              </span>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onReload} disabled={busy}>
            <RefreshCw className={`h-3 w-3 ${busy ? 'animate-spin' : ''}`} />
            应用并重新载入
          </Button>
        </div>
        <p className="mt-2 text-[11px] font-sans text-obsidian-500">
          修改仓库设置后，请点击「应用并重新载入」从新仓库读取内容。当前页面上的未提交修改会被覆盖。
        </p>
      </SectionCard>

      <SectionCard title="工作方式" description="了解 CMS 如何保存内容。">
        <ol className="list-decimal space-y-2 pl-5 text-[11px] font-sans leading-relaxed text-obsidian-400">
          <li>打开 CMS 时自动从 GitHub 读取最新的内容 JSON；读取失败时回退到本站构建时内置的内容。</li>
          <li>所有编辑仅暂存在浏览器内存中，可随时点击顶部「提交更改」通过 PAT 直接提交到仓库。</li>
          <li>提交后由托管平台自动重新构建部署，全站（包括所有备用域名）同步生效。</li>
          <li>项目状态支持「可见 / 暂不可用 / 隐藏」，分别对应正常展示、灰色置灰与完全隐藏。</li>
        </ol>
      </SectionCard>
    </div>
  );
};
