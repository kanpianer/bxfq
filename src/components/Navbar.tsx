import { ExternalLink } from 'lucide-react';

interface NavbarProps {
  onBackToHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onBackToHome,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-obsidian-800/80 bg-obsidian-950/85 backdrop-blur-xl transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onBackToHome}
            className="group flex items-center gap-2 sm:gap-2.5 text-left focus:outline-none"
            title="返回首页"
          >
            <div className="flex items-center justify-center shrink-0">
              <img
                src="/logo.png"
                alt="不想翻墙 Logo"
                className="h-6 sm:h-[30px] w-auto object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-xl font-bold tracking-tight text-white transition-colors">
                不想翻墙
              </span>
            </div>
          </button>
        </div>

        {/* Center: Notice with bold typography, always visible on mobile & desktop */}
        <div className="flex flex-1 items-center justify-center px-1 sm:px-4 min-w-0 text-center">
          <span className="text-xs sm:text-base md:text-lg font-bold text-white tracking-tight sm:tracking-wide whitespace-nowrap truncate">
            免费备用梯子首选
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Jiakuan Link Button */}
          <a
            href="https://jiakuan.link"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 rounded-lg border border-obsidian-800 bg-obsidian-900/80 hover:bg-obsidian-850 hover:border-obsidian-700 px-2 sm:px-2.5 py-1.5 text-xs font-medium text-white transition-colors shadow-sm"
            title="访问 家宽导航 (jiakuan.link)"
          >
            <img
              src="/images/jiakuan-logo.png"
              alt="家宽导航"
              className="h-[11px] w-[11px] rounded-[2px] object-contain shrink-0"
            />
            <span className="font-sans font-medium text-white">家宽导航</span>
            <ExternalLink className="h-3 w-3 text-obsidian-400 group-hover:text-white transition-colors" />
          </a>
        </div>
      </div>
    </header>
  );
};
