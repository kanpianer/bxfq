import { VPNTool, Platform, isToolAvailable } from '../types';
import { ToolLogoMap } from '../assets/logos';
import { 
  ArrowRight, 
  AlertTriangle,
  Shield,
  Building2,
  HeartHandshake,
  Users
} from 'lucide-react';
import { PlatformIcon } from './PlatformIcons';

interface ToolCardProps {
  tool: VPNTool;
  onSelect: (id: string) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onSelect }) => {
  const LogoComponent = ToolLogoMap[tool.id] || Shield;
  const isUnavailable = !isToolAvailable(tool);

  const getPlatformIcon = (platform: Platform) => {
    return <PlatformIcon platform={platform} className="w-3.5 h-3.5" />;
  };

  const getPlatformLabel = (platform: Platform) => {
    switch (platform) {
      case 'android': return 'Android';
      case 'ios': return 'iOS (iPhone/iPad)';
      case 'windows': return 'Windows';
      case 'macos': return 'macOS';
      case 'linux': return 'Linux';
      case 'appletv': return 'Apple TV';
      case 'browser': return '浏览器扩展';
    }
  };

  const getEntityIcon = () => {
    const iconClass = `w-3.5 h-3.5 ${isUnavailable ? 'text-neutral-400' : 'text-white'}`;
    switch (tool.entityType) {
      case 'non-profit': return <HeartHandshake className={iconClass} />;
      case 'non-profit-supervised': return <Shield className={iconClass} />;
      case 'commercial': return <Building2 className={iconClass} />;
      case 'self-organized': return <Users className={iconClass} />;
    }
  };

  return (
    <div
      onClick={() => onSelect(tool.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(tool.id);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`查看 ${tool.name} 详细介绍与使用说明`}
      className={`group relative flex flex-col justify-between rounded-xl border p-5 sm:p-6 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/30 ${
        isUnavailable
          ? 'bg-neutral-950/60 border-neutral-800 grayscale opacity-65 hover:opacity-85 hover:border-neutral-700'
          : 'bg-obsidian-900/60 border-obsidian-800 hover:border-obsidian-600 hover:bg-obsidian-850/70 hover:shadow-glow-subtle'
      }`}
    >
      {/* Top Row: Logo, Title & Status Badge */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3.5">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-all ${
              isUnavailable 
                ? 'border-neutral-800 bg-neutral-900' 
                : 'border-obsidian-750 bg-obsidian-950 group-hover:scale-105 group-hover:border-white/30'
            }`}>
              <LogoComponent className="h-7 w-7" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className={`font-sans text-lg font-bold tracking-tight transition-colors ${
                  isUnavailable ? 'text-neutral-400' : 'text-white'
                }`}>
                  {tool.name}
                </h3>
              </div>
              <p className={`text-xs line-clamp-1 mt-0.5 font-sans ${
                isUnavailable ? 'text-neutral-500' : 'text-obsidian-400'
              }`}>
                {tool.tagline}
              </p>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="shrink-0">
            {isUnavailable ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-neutral-800/80 px-2.5 py-0.5 text-[11px] font-mono font-medium text-neutral-300 border border-neutral-700/60">
                <AlertTriangle className="w-3 h-3 text-neutral-400" />
                <span>暂不可用</span>
              </span>
            ) : tool.status === 'needs-bridge' ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] font-mono font-medium text-white border border-white/20">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
                <span>需加网桥</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] font-mono font-medium text-white border border-white/20">
                <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                <span>{tool.statusText}</span>
              </span>
            )}
          </div>
        </div>

        {/* Essential Section: 资助和开发主体 */}
        <div className="my-3 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-mono uppercase tracking-wider ${
              isUnavailable ? 'text-neutral-500' : 'text-obsidian-400'
            }`}>
              资助与开发主体:
            </span>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-medium ${
              isUnavailable ? 'bg-neutral-900 text-neutral-400' : 'bg-obsidian-850 text-obsidian-300'
            }`}>
              {getEntityIcon()}
              <span>{tool.entityLabel}</span>
            </span>
          </div>
          <p className={`text-xs leading-relaxed font-sans line-clamp-2 ${
            isUnavailable ? 'text-neutral-500' : 'text-obsidian-400'
          }`}>
            {tool.entityDescription}
          </p>
        </div>

        {/* Pricing / Quota Summary */}
        <div className={`text-[11px] font-mono flex items-center gap-2 mb-2 ${
          isUnavailable ? 'text-neutral-500' : 'text-obsidian-400'
        }`}>
          <span className={isUnavailable ? 'text-neutral-500' : 'text-obsidian-400'}>费用模式:</span>
          <span className={isUnavailable ? 'text-neutral-400' : 'text-white'}>{tool.pricingModel}</span>
        </div>
      </div>

      {/* Card Footer: Platforms & Action */}
      <div className="pt-3 flex items-center justify-between gap-3 mt-auto">
        {/* Platform Icons */}
        <div className={`flex items-center gap-1.5 ${
          isUnavailable ? 'text-neutral-500' : 'text-obsidian-400'
        }`}>
          <span className="text-[10px] font-mono uppercase mr-1">支持:</span>
          {tool.platforms.map((p) => (
            <span
              key={p}
              title={getPlatformLabel(p)}
              className={`flex items-center justify-center h-6 w-6 rounded ${
                isUnavailable ? 'bg-neutral-900/60 text-neutral-500' : 'bg-obsidian-900/80 text-obsidian-400'
              }`}
            >
              {getPlatformIcon(p)}
            </span>
          ))}
        </div>

        {/* View Details Link */}
        <div className={`flex items-center gap-1 text-xs font-medium transition-all ${
          isUnavailable ? 'text-neutral-500 group-hover:text-neutral-300' : 'text-obsidian-400 group-hover:text-white group-hover:translate-x-0.5'
        }`}>
          <span>{isUnavailable ? '查看原因' : '使用说明'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
