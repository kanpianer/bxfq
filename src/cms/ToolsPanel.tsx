import React, { useMemo, useState } from 'react';
import {
  GripVertical,
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
  onReorder: (sourceIndex: number, destinationIndex: number) => void;
  onMove?: (id: string, direction: -1 | 1) => void;
}

type VisibilityFilter = 'all' | ToolVisibility;

export const ToolsPanel: React.FC<ToolsPanelProps> = ({
  tools,
  onAdd,
  onEdit,
  onDelete,
  onReorder,
}) => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<VisibilityFilter>('all');
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [dropPosition, setDropPosition] = useState<'above' | 'below' | null>(null);

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

  const handleDragStart = (e: React.DragEvent, id: string) => {
    const target = e.target as HTMLElement;
    if (target.closest('button, a, input, select')) {
      e.preventDefault();
      return;
    }
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!draggedId || draggedId === id) {
      setDragOverId(null);
      setDropPosition(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const isAbove = offsetY < rect.height / 2;
    setDragOverId(id);
    setDropPosition(isAbove ? 'above' : 'below');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverId(null);
      setDropPosition(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) {
      setDraggedId(null);
      setDragOverId(null);
      setDropPosition(null);
      return;
    }

    const sourceIndex = tools.findIndex((t) => t.id === draggedId);
    const targetIndex = tools.findIndex((t) => t.id === targetId);

    if (sourceIndex >= 0 && targetIndex >= 0) {
      const isAbove = dropPosition === 'above';
      let destIndex = targetIndex;
      if (isAbove) {
        destIndex = sourceIndex < targetIndex ? targetIndex - 1 : targetIndex;
      } else {
        destIndex = sourceIndex < targetIndex ? targetIndex : targetIndex + 1;
      }
      onReorder(sourceIndex, destIndex);
    }

    setDraggedId(null);
    setDragOverId(null);
    setDropPosition(null);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverId(null);
    setDropPosition(null);
  };

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

      <div className="flex items-center justify-between px-1 text-[11px] font-sans text-obsidian-500">
        <span className="flex items-center gap-1.5">
          <GripVertical className="h-3.5 w-3.5 opacity-60" />
          按住卡片左侧图标可直接上下拖拽调整项目排序
        </span>
        <span>共 {filtered.length} 个项目</span>
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
            const isDragging = draggedId === tool.id;
            const isOver = dragOverId === tool.id;

            return (
              <article
                key={tool.id}
                draggable={true}
                onDragStart={(e) => handleDragStart(e, tool.id)}
                onDragOver={(e) => handleDragOver(e, tool.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, tool.id)}
                onDragEnd={handleDragEnd}
                className={`group relative flex flex-col gap-3 rounded-xl border p-4 transition-all duration-150 sm:flex-row sm:items-center ${
                  isDragging
                    ? 'border-dashed border-white/40 bg-obsidian-950/40 opacity-40 scale-[0.99]'
                    : isOver
                      ? dropPosition === 'above'
                        ? 'border-obsidian-700 bg-obsidian-900/80 border-t-2 border-t-emerald-400 shadow-[0_-4px_12px_rgba(52,211,153,0.15)]'
                        : 'border-obsidian-700 bg-obsidian-900/80 border-b-2 border-b-emerald-400 shadow-[0_4px_12px_rgba(52,211,153,0.15)]'
                      : 'border-obsidian-800 bg-obsidian-900/50 hover:border-obsidian-700'
                }`}
              >
                <div className="flex min-w-0 flex-1 items-start gap-2.5 sm:items-center">
                  {/* 拖拽指示手柄 */}
                  <div
                    className="flex shrink-0 items-center justify-center -ml-1 p-1 text-obsidian-600 transition-colors group-hover:text-obsidian-300 cursor-grab active:cursor-grabbing rounded hover:bg-obsidian-800/60"
                    title="按住拖拽上下调整排序"
                    aria-label="按住拖拽上下调整排序"
                  >
                    <GripVertical className="h-5 w-5" />
                  </div>

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
