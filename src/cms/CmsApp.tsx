import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  Check,
  Cloud,
  ExternalLink,
  FileText,
  LayoutGrid,
  Loader2,
  RefreshCw,
  Save,
  Settings,
  ShieldAlert,
  WifiOff,
  X,
} from 'lucide-react';
import { SITE_CONTENT } from '../content';
import type { SiteContent, VPNTool } from '../types';
import { getToolVisibility } from '../types';
import {
  clearDraft,
  commitContent,
  fetchRemoteContent,
  getFileSha,
  loadDraft,
  loadRepoSettings,
  loadToken,
  repoKeyOf,
  saveDraft,
  saveRepoSettings,
  saveToken,
  type RepoSettings,
} from './github';
import {
  Badge,
  Button,
  ConfirmModal,
  IconButton,
} from './CmsUI';
import { ToolsPanel } from './ToolsPanel';
import { ToolEditor } from './ToolEditor';
import { FooterPanel, GuidePanel, SitePanel } from './ContentPanels';
import { SettingsPanel } from './SettingsPanel';

type Tab = 'tools' | 'footer' | 'guide' | 'site' | 'settings';

interface ToastData {
  id: number;
  kind: 'success' | 'error' | 'info';
  message: string;
  url?: string;
}

const TABS: { id: Tab; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'tools', label: '项目管理', icon: LayoutGrid },
  { id: 'footer', label: '页脚与链接', icon: FileText },
  { id: 'guide', label: '小白避坑手册', icon: BookOpen },
  { id: 'site', label: '站点与家宽按钮', icon: Cloud },
  { id: 'settings', label: '设置', icon: Settings },
];

const emptyTool = (): VPNTool => ({
  id: `new-tool-${Date.now().toString(36)}`,
  name: '新项目',
  aliases: [],
  tagline: '',
  entityType: 'non-profit',
  entityLabel: '非盈利性机构',
  entityDescription: '',
  visibility: 'visible',
  status: 'available',
  statusText: '稳定可用',
  pricingModel: '100% 永久免费',
  platforms: ['android', 'ios', 'windows', 'macos'],
  officialUrl: '',
  downloadLinks: [],
  quickStartSteps: [],
  detailedGuide: [],
  contacts: [],
});

const ToastCard: React.FC<{ toast: ToastData; onDismiss: () => void }> = ({
  toast,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = window.setTimeout(onDismiss, 7000);
    return () => window.clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const tone =
    toast.kind === 'success'
      ? 'border-emerald-900/70 bg-emerald-950/80 text-emerald-100'
      : toast.kind === 'error'
        ? 'border-red-900/70 bg-red-950/80 text-red-100'
        : 'border-obsidian-700 bg-obsidian-850/95 text-obsidian-100';

  return (
    <div
      className={`fixed bottom-4 right-4 z-[60] flex max-w-md items-start gap-3 rounded-xl border px-4 py-3 shadow-2xl backdrop-blur-md ${tone}`}
      role="status"
    >
      <div className="mt-0.5 shrink-0">
        {toast.kind === 'success' ? (
          <Check className="h-4 w-4" />
        ) : toast.kind === 'error' ? (
          <AlertTriangle className="h-4 w-4" />
        ) : (
          <ShieldAlert className="h-4 w-4" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-sans text-xs leading-relaxed">{toast.message}</p>
        {toast.url && (
          <a
            href={toast.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1 font-mono text-[10px] underline underline-offset-2 opacity-80 hover:opacity-100"
          >
            查看提交
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="shrink-0 rounded p-0.5 opacity-60 transition-opacity hover:opacity-100"
        aria-label="关闭提示"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

export const CmsApp: React.FC = () => {
  const [content, setContent] = useState<SiteContent>(SITE_CONTENT);
  const [source, setSource] = useState<'github' | 'local'>('local');
  const [sha, setSha] = useState<string | undefined>();
  const [dirty, setDirty] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState<Tab>('tools');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [token, setToken] = useState<string>(() => loadToken());
  const [repo, setRepo] = useState<RepoSettings>(() => loadRepoSettings());
  const [toast, setToast] = useState<ToastData | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<VPNTool | null>(null);
  const [draftSavedAt, setDraftSavedAt] = useState<string | null>(null);

  const repoKey = repoKeyOf(repo);

  const toastIdRef = useRef(0);
  const initRef = useRef(false);
  const editedRef = useRef(false);

  const showToast = useCallback(
    (kind: ToastData['kind'], message: string, url?: string) => {
      toastIdRef.current += 1;
      setToast({ id: toastIdRef.current, kind, message, url });
    },
    []
  );

  const dismissToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    document.title = '内容管理 · 不想翻墙';
  }, []);

  useEffect(() => {
    saveToken(token);
  }, [token]);

  useEffect(() => {
    saveRepoSettings(repo);
  }, [repo]);

  const loadLatest = useCallback(async () => {
    setLoading(true);
    setBusy(true);
    const editMark = editedRef.current;
    try {
      const remote = await fetchRemoteContent(repo, token);
      setSha(remote.sha);
      setSource('github');

      if (editedRef.current !== editMark) {
        showToast('info', '已读取云端内容，但检测到新的本地编辑，已保留当前编辑。');
        return;
      }

      const draft = loadDraft();
      if (draft && draft.repoKey === repoKey) {
        setContent(draft.content);
        setDirty(true);
        setDraftSavedAt(draft.savedAt);
        showToast(
          'info',
          `已恢复本地未提交草稿（保存于 ${new Date(draft.savedAt).toLocaleString('zh-CN', {
            hour12: false,
          })}）。提交前不会丢失。`
        );
      } else {
        setContent(remote.content);
        setDirty(false);
        setDraftSavedAt(null);
        if (remote.warning) {
          showToast('error', `${remote.warning}（已读取 ${remote.content.tools.length} 个项目）`);
        } else {
          showToast('success', `已从 GitHub 读取最新内容（${remote.content.tools.length} 个项目）`);
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : '未知错误';
      setSha(undefined);
      setSource('local');

      if (editedRef.current !== editMark) {
        showToast('error', `读取 GitHub 内容失败：${message}。已保留当前本地编辑。`);
        return;
      }

      const draft = loadDraft();
      if (draft && draft.repoKey === repoKey) {
        setContent(draft.content);
        setDirty(true);
        setDraftSavedAt(draft.savedAt);
        showToast('error', `读取 GitHub 内容失败：${message}。已恢复本地未提交草稿。`);
      } else {
        setContent(SITE_CONTENT);
        setDirty(false);
        setDraftSavedAt(null);
        showToast(
          'error',
          `读取 GitHub 内容失败：${message}。已载入本站内置内容，仍可编辑，但提交前请先配置 PAT 并重新载入。`
        );
      }
    } finally {
      setLoading(false);
      setBusy(false);
    }
  }, [repo, token, repoKey, showToast]);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    void loadLatest();
  }, [loadLatest]);

  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      if (!dirty) return;
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [dirty]);

  const mutate = useCallback((updater: (previous: SiteContent) => SiteContent) => {
    editedRef.current = true;
    setContent((previous) => updater(previous));
    setDirty(true);
  }, []);

  // 自动把未提交的修改保存为本地草稿，防止刷新或跳转页面导致内容丢失。
  useEffect(() => {
    if (!dirty) return;
    const timer = window.setTimeout(() => saveDraft(content, repoKey), 400);
    return () => window.clearTimeout(timer);
  }, [content, dirty, repoKey]);

  const selectedTool = useMemo(
    () => content.tools.find((tool) => tool.id === editingId) || null,
    [content.tools, editingId]
  );

  const counts = useMemo(() => {
    return content.tools.reduce(
      (acc, tool) => {
        acc[getToolVisibility(tool)] += 1;
        return acc;
      },
      { visible: 0, unavailable: 0, hidden: 0 }
    );
  }, [content.tools]);

  const handleAddTool = () => {
    const tool = emptyTool();
    mutate((previous) => ({ ...previous, tools: [tool, ...previous.tools] }));
    setTab('tools');
    setEditingId(tool.id);
    showToast('info', '已新增项目，编辑完成后记得点击右上角「提交更改」。');
  };

  const handleToolChange = (updated: VPNTool) => {
    if (!editingId) return;
    if (updated.id !== editingId && content.tools.some((tool) => tool.id === updated.id)) {
      showToast('error', '项目 ID 已存在，请换一个。');
      return;
    }
    mutate((previous) => ({
      ...previous,
      tools: previous.tools.map((tool) => (tool.id === editingId ? updated : tool)),
    }));
    setEditingId(updated.id);
  };

  const handleDeleteTool = () => {
    if (!deleteTarget) return;
    const targetId = deleteTarget.id;
    mutate((previous) => ({
      ...previous,
      tools: previous.tools.filter((tool) => tool.id !== targetId),
    }));
    if (editingId === targetId) setEditingId(null);
    setDeleteTarget(null);
    showToast('info', '项目已删除，提交后生效。');
  };

  const handleMoveTool = (id: string, direction: -1 | 1) => {
    mutate((previous) => {
      const index = previous.tools.findIndex((tool) => tool.id === id);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= previous.tools.length) return previous;
      const tools = [...previous.tools];
      [tools[index], tools[target]] = [tools[target], tools[index]];
      return { ...previous, tools };
    });
  };

  const handleSave = async () => {
    if (!token) {
      setTab('settings');
      showToast('error', '请先在「设置」中配置 GitHub Personal Access Token。');
      return;
    }
    if (source === 'local') {
      const confirmed = window.confirm(
        '当前内容来自本站内置版本，可能与 GitHub 上的最新内容不一致。\n\n继续提交会用当前内容覆盖远端文件，确定继续吗？'
      );
      if (!confirmed) return;
    }

    setBusy(true);
    try {
      const currentSha = sha || (await getFileSha(repo, token));
      const now = new Date();
      const stamp = now.toLocaleString('zh-CN', { hour12: false });
      const result = await commitContent(
        repo,
        token,
        content,
        currentSha,
        `chore(cms): update site content (${stamp})`
      );
      setSha(result.sha);
      setSource('github');
      setDirty(false);
      clearDraft();
      setDraftSavedAt(null);
      showToast('success', '内容已提交到 GitHub，托管平台构建完成后全站生效。', result.commitUrl);
    } catch (error) {
      const message = error instanceof Error ? error.message : '未知错误';
      showToast('error', `提交失败：${message}`);
    } finally {
      setBusy(false);
    }
  };

  const handleReload = () => {
    if (dirty && !window.confirm('当前有未提交的修改，重新载入会丢弃这些修改。确定继续吗？')) {
      return;
    }
    setDirty(false);
    editedRef.current = false;
    clearDraft();
    setDraftSavedAt(null);
    setEditingId(null);
    void loadLatest();
  };

  const handleDiscardDraft = () => {
    if (!window.confirm('确定放弃本地草稿，并从 GitHub 重新载入最新内容吗？')) return;
    setDirty(false);
    editedRef.current = false;
    clearDraft();
    setDraftSavedAt(null);
    setEditingId(null);
    void loadLatest();
  };

  const handleTabChange = (next: Tab) => {
    setTab(next);
  };

  return (
    <div className="min-h-screen bg-obsidian-950 font-sans text-obsidian-400 selection:bg-white/20 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-obsidian-800/80 bg-obsidian-950/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-3 px-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <img src="/logo.png" alt="不想翻墙" className="h-6 w-auto shrink-0 object-contain" />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="truncate font-sans text-sm font-bold text-white">内容管理台</span>
                <Badge className="hidden border-obsidian-700 bg-obsidian-850 text-obsidian-300 sm:inline-flex">
                  CMS
                </Badge>
              </div>
              <p className="hidden truncate font-mono text-[10px] text-obsidian-500 sm:block">
                /dtms · 任意域名可用
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1.5 md:flex">
              {loading ? (
                <Badge className="border-obsidian-700 bg-obsidian-850 text-obsidian-300">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  正在读取
                </Badge>
              ) : source === 'github' ? (
                <Badge className="border-emerald-900/60 bg-emerald-950/30 text-emerald-300">
                  <Cloud className="h-3 w-3" />
                  GitHub 最新
                  {sha && <span className="opacity-60">{sha.slice(0, 7)}</span>}
                </Badge>
              ) : (
                <Badge className="border-amber-900/60 bg-amber-950/30 text-amber-300">
                  <WifiOff className="h-3 w-3" />
                  本站内置内容
                </Badge>
              )}
              {dirty && (
                <Badge className="border-white/20 bg-white/5 text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  未提交
                </Badge>
              )}
            </div>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-lg border border-obsidian-750 bg-obsidian-900/60 px-2.5 py-1.5 text-[11px] font-medium text-obsidian-200 transition-colors hover:bg-obsidian-850 hover:text-white sm:inline-flex"
            >
              <ExternalLink className="h-3 w-3" />
              查看网站
            </a>
            <IconButton title="从 GitHub 重新载入" onClick={handleReload} disabled={busy}>
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            </IconButton>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              disabled={busy || !dirty}
              title={!dirty ? '没有待提交的修改' : '提交更改到 GitHub'}
            >
              {busy ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}
              提交更改
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-3 pb-16 sm:px-6">
        {/* Tabs */}
        <nav className="no-scrollbar -mx-3 flex items-center gap-1 overflow-x-auto border-b border-obsidian-850 px-3 sm:-mx-6 sm:px-6">
          {TABS.map((item) => {
            const Icon = item.icon;
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleTabChange(item.id)}
                className={`flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-3 text-[11px] font-sans font-medium transition-colors sm:text-xs ${
                  active
                    ? 'border-white text-white'
                    : 'border-transparent text-obsidian-400 hover:text-obsidian-200'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
                {item.id === 'tools' && (
                  <span className="rounded bg-obsidian-850 px-1.5 py-0.5 font-mono text-[10px] text-obsidian-400">
                    {content.tools.length}
                  </span>
                )}
              </button>
            );
          })}
          <div className="ml-auto hidden shrink-0 pl-3 text-right font-mono text-[10px] text-obsidian-500 lg:block">
            可见 {counts.visible} · 暂不可用 {counts.unavailable} · 隐藏 {counts.hidden}
          </div>
        </nav>

        {/* Restored local draft */}
        {draftSavedAt && (
          <div className="mt-4 flex flex-col gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-2">
              <FileText className="mt-0.5 h-4 w-4 shrink-0 text-white" />
              <p className="font-sans text-[11px] leading-relaxed text-obsidian-200">
                正在编辑本地草稿（保存于{' '}
                {new Date(draftSavedAt).toLocaleString('zh-CN', { hour12: false })}）。
                关闭页面不会丢失，提交后会覆盖远端内容。
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleDiscardDraft} className="shrink-0">
              放弃草稿
            </Button>
          </div>
        )}

        {/* No token warning */}
        {!token && (
          <div className="mt-4 flex flex-col gap-2 rounded-xl border border-amber-900/50 bg-amber-950/20 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <p className="font-sans text-[11px] leading-relaxed text-amber-200/90">
                尚未配置 Personal Access Token：可以浏览与编辑内容，但无法提交到 GitHub。
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setTab('settings')} className="shrink-0">
              前往设置
            </Button>
          </div>
        )}

        <main className="mt-4">
          {tab === 'tools' &&
            (selectedTool ? (
              <ToolEditor
                tool={selectedTool}
                allIds={content.tools.map((tool) => tool.id)}
                onChange={handleToolChange}
                onBack={() => setEditingId(null)}
                onDelete={() => setDeleteTarget(selectedTool)}
              />
            ) : (
              <ToolsPanel
                tools={content.tools}
                onAdd={handleAddTool}
                onEdit={setEditingId}
                onDelete={(id) => {
                  const tool = content.tools.find((item) => item.id === id);
                  if (tool) setDeleteTarget(tool);
                }}
                onMove={handleMoveTool}
              />
            ))}

          {tab === 'footer' && (
            <FooterPanel
              footer={content.footer}
              onChange={(footer) =>
                mutate((previous) => ({ ...previous, footer }))
              }
            />
          )}

          {tab === 'guide' && (
            <GuidePanel
              guide={content.guide}
              onChange={(guide) => mutate((previous) => ({ ...previous, guide }))}
            />
          )}

          {tab === 'site' && (
            <SitePanel
              site={content.site}
              onChange={(site) => mutate((previous) => ({ ...previous, site }))}
            />
          )}

          {tab === 'settings' && (
            <SettingsPanel
              token={token}
              onTokenChange={setToken}
              repo={repo}
              onRepoChange={setRepo}
              sha={sha}
              source={source}
              busy={busy}
              onReload={handleReload}
            />
          )}
        </main>

        <footer className="mt-12 border-t border-obsidian-850 pt-5 text-center font-mono text-[10px] text-obsidian-500">
          内容通过 GitHub Contents API 提交 · PAT 仅保存在本机浏览器 · 支持任意绑定域名访问 /dtms
        </footer>
      </div>

      {deleteTarget && (
        <ConfirmModal
          title={`删除项目「${deleteTarget.name}」？`}
          description="删除后需点击右上角「提交更改」才会写入 GitHub。此操作会将该工具从网站中移除。"
          confirmLabel="删除项目"
          danger
          onConfirm={handleDeleteTool}
          onClose={() => setDeleteTarget(null)}
        />
      )}

      {toast && <ToastCard toast={toast} onDismiss={dismissToast} />}
    </div>
  );
};
