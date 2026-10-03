import React from 'react';
import { Platform, EntityType } from '../types';
import { AndroidIcon, IosIcon, WindowsIcon, MacosIcon, LinuxIcon, AppleTvIcon } from './PlatformIcons';

interface FilterBarProps {
  selectedPlatform: Platform | 'all';
  onSelectPlatform: (p: Platform | 'all') => void;
  selectedEntity: EntityType | 'all';
  onSelectEntity: (e: EntityType | 'all') => void;
  totalFiltered?: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedPlatform,
  onSelectPlatform,
  selectedEntity,
  onSelectEntity,
}) => {
  const platforms: { id: Platform | 'all'; label: string; icon?: React.ReactNode }[] = [
    { id: 'all', label: '全部平台' },
    { id: 'android', label: 'Android', icon: <AndroidIcon className="w-3.5 h-3.5" /> },
    { id: 'ios', label: 'iOS', icon: <IosIcon className="w-3.5 h-3.5" /> },
    { id: 'windows', label: 'Windows', icon: <WindowsIcon className="w-3.5 h-3.5" /> },
    { id: 'macos', label: 'macOS', icon: <MacosIcon className="w-3.5 h-3.5" /> },
    { id: 'linux', label: 'Linux', icon: <LinuxIcon className="w-3.5 h-3.5" /> },
    { id: 'appletv', label: 'Apple TV', icon: <AppleTvIcon className="w-4 h-3.5" /> },
  ];

  const entities: { id: EntityType | 'all'; label: string }[] = [
    { id: 'all', label: '全部主体' },
    { id: 'non-profit', label: '非盈利性机构' },
    { id: 'commercial', label: '盈利/商业机构' },
    { id: 'self-organized', label: '自组织机构' },
  ];

  return (
    <div className="py-5 border-b border-obsidian-800/60 bg-obsidian-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-3.5">
        {/* Top line: Platforms + Only Available */}
        <div className="flex items-center justify-between gap-2.5 sm:gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar flex-1 min-w-0">
            <span className="text-xs font-mono text-obsidian-400 shrink-0 hidden sm:inline mr-1">
              平台筛选:
            </span>
            {platforms.map((p) => {
              const active = selectedPlatform === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectPlatform(p.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-colors border shrink-0 ${
                    active
                      ? 'bg-neutral-200 text-black border-neutral-300 shadow-sm'
                      : 'bg-obsidian-900/80 text-obsidian-400 hover:text-white hover:bg-obsidian-850 border-obsidian-800'
                  }`}
                >
                  {p.icon}
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary: Entity Category Filter */}
        <div className="flex items-center justify-between gap-2 text-xs font-mono text-obsidian-400">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar flex-1 min-w-0">
            <span className="text-xs font-mono text-obsidian-400 shrink-0 hidden sm:inline mr-1">
              主体分类:
            </span>
            <div className="flex items-center gap-1.5">
            {entities.map((e) => {
              const active = selectedEntity === e.id;
              return (
                <button
                  key={e.id}
                  onClick={() => onSelectEntity(e.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-neutral-200 text-black border-neutral-300'
                      : 'border-transparent text-obsidian-400 hover:text-white hover:bg-obsidian-900'
                  }`}
                >
                  {e.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
