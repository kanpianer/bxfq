import React from 'react';
import { Platform } from '../types';
import { AndroidIcon, IosIcon, WindowsIcon, MacosIcon, LinuxIcon, BrowserIcon } from './PlatformIcons';

interface FilterBarProps {
  selectedPlatform: Platform | 'all';
  onSelectPlatform: (p: Platform | 'all') => void;
  totalFiltered?: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedPlatform,
  onSelectPlatform,
}) => {
  const platforms: { id: Platform | 'all'; label: string; icon?: React.ReactNode }[] = [
    { id: 'all', label: '全部平台' },
    { id: 'android', label: 'Android', icon: <AndroidIcon className="w-3.5 h-3.5" /> },
    { id: 'ios', label: 'iOS', icon: <IosIcon className="w-3.5 h-3.5" /> },
    { id: 'windows', label: 'Windows', icon: <WindowsIcon className="w-3.5 h-3.5" /> },
    { id: 'macos', label: 'macOS', icon: <MacosIcon className="w-3.5 h-3.5" /> },
    { id: 'linux', label: 'Linux', icon: <LinuxIcon className="w-3.5 h-3.5" /> },
    { id: 'browser', label: '浏览器扩展', icon: <BrowserIcon className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="py-3.5 sm:py-4 border-b border-obsidian-800/60 bg-obsidian-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Platforms Filter Line */}
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
      </div>
    </div>
  );
};
