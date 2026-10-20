import React, { useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  Pencil,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';
import { ToolLogo } from '../components/ToolLogo';
import { getToolVisibility } from '../types';
import type { ToolVisibility, VPNTool } from '../types';
import {
  Badge,
  Button,
  EmptyState,
  IconButton,
  VisibilityBadge,
  inputClass,
  selectClass,
} from './CmsUI';

interface ToolsPanelProps {
  tools: VPNTool[];
  onAdd: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, direction: -1 | 1) => void;
}

type VisibilityFilter = 'all' | ToolVisibility;

export const ToolsPanel: React.FC<ToolsPanelProps> = ({
  tools,
  onAdd,
  onEdit,
  onDelete,
  onMove,
}) => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<VisibilityFilter>('all');

  const counts = useMemo(() => {
    return tools.reduce(
      (acc, tool) => {
        acc[getToolVisibility(tool)] += 1;
        return acc;
      },
      { visible: 0, unavailable: 0, hidden: 0 } as Record<ToolVisibility, number>
    );
  }, [tools]);

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return tools.filter((tool) => {
      if (filter !== 'all' && getToolVisibility(tool) !== filter) return false;
      if (!keyword) return true;
      return (
        tool.name.toLowerCase().includes(keyword) ||
        tool.id.toLowerCase().includes(keyword) ||
        tool.tagline.toLowerCase().includes(keyword) ||
        (tool.aliases || []).some((alias) => alias.toLowerCase().includes(keyword))
      );
    });
  }, [tools, query, filter]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-xl border border-obsidian-800 bg-obsidian-900/50 p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-obsidian-500" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索项目名称、ID 或别名…"
              className={`${inputClass} pl-9`}
            />
          </div>
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value as VisibilityFilter)}
            className={`${selectClass} sm:w-40`}
          >
            <option value="all">全部状态（{tools.length}）</option>
            <option value="visible">可见（{counts.visible}）</option>
            <option value="unavailable">暂不可用（{counts.unavailable}）</option>
            <option value="hidden">隐藏（{counts.hidden}）</option>
          </select>
        </div>
        <Button variant="primary" onClick={onAdd} className="shrink-0">
          <Plus className="h-3.5 w-3.5" />
          新增项目
        </Button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="没有匹配的项目"
          description={tools.length === 0 ? '点击右上角「新增项目」开始添加第一个工具。' : '试试更换搜索词或状态筛选。'}
        />
      ) : (
        <div className="space-y-2">
          {filtered.map((tool) => {
            const visibility = getToolVisibility(tool);
            const index = tools.findIndex((item) => item.id === tool.id);

            return (
              <article
                key={tool.id}
                className="group flex flex-col gap-3 rounded-xl border border-obsidian-800 bg-obsidian-900/50 p-4 transition-colors hover:border-obsidian-700 sm:flex-row sm:items-center"
              >
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-obsidian-750 bg-obsidian-950">
                    <ToolLogo tool={tool} className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate font-sans text-sm font-bold text-white">
                        {tool.name || '未命名项目'}
                      </h3>
                      <VisibilityBadge visibility={visibility} />
                      <Badge className="border-obsidian-700 bg-obsidian-850 text-obsidian-300">
                        {tool.status === 'needs-bridge' ? '需加网桥' : tool.statusText || '未设置状态'}
                      </Badge>
                      {tool.badgeNote && (
                        <Badge className="border-obsidian-800 bg-obsidian-900 text-obsidian-400">
                          {tool.badgeNote}
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 truncate font-sans text-xs text-obsidian-400">
                      {tool.tagline || '暂无简介'}
                    </p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-mono text-obsidian-500">
                      <span>#{tool.id}</span>
                      <span>{tool.platforms.join(' · ') || '未选择平台'}</span>
                      <span>{tool.downloadLinks.length} 个下载链接</span>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1.5 self-end sm:self-center">
                  <IconButton
                    title="上移"
                    disabled={index <= 0}
                    onClick={() => onMove(tool.id, -1)}
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </IconButton>
                  <IconButton
                    title="下移"
                    disabled={index < 0 || index >= tools.length - 1}
                    onClick={() => onMove(tool.id, 1)}
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </IconButton>
                  <Button variant="ghost" size="sm" onClick={() => onEdit(tool.id)}>
                    <Pencil className="h-3 w-3" />
                    编辑
                  </Button>
                  <IconButton title="删除项目" danger onClick={() => onDelete(tool.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </IconButton>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
