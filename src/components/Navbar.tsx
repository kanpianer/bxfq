import { BookOpen, ExternalLink } from 'lucide-react';

interface NavbarProps {
  onOpenGuide: () => void;
  onBackToHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenGuide,
  onBackToHome,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-obsidian-800/80 bg-obsidian-950/85 backdrop-blur-xl transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onBackToHome}
            className="group flex items-center gap-2.5 text-left focus:outline-none"
            title="返回首页"
          >
            <div className="flex items-center justify-center shrink-0">
              <img
                src="/logo.png"
                alt="不想翻墙 Logo"
                className="h-10 w-auto sm:h-11 object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold tracking-tight text-white transition-colors">
                  不想翻墙
                </span>
              </div>
              <p className="text-[11px] text-obsidian-400 hidden sm:block">
                备用梯子首选
              </p>
            </div>
          </button>
        </div>

        {/* Center: Notice with larger, bold, balanced typography */}
        <div className="hidden sm:flex flex-1 items-center justify-center px-2 sm:px-4">
          <span className="text-sm sm:text-base md:text-lg font-bold text-white tracking-wide whitespace-nowrap">
            本站所有梯子均可免费使用
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Beginner Safety Guide Modal Button */}
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 rounded-lg border border-obsidian-800 bg-obsidian-900/60 px-3 py-1.5 text-xs font-medium text-obsidian-400 hover:border-obsidian-700 hover:text-white transition-colors shadow-sm"
          >
            <BookOpen className="h-3.5 w-3.5 text-white" />
            <span>避坑</span>
          </button>

          {/* Jiakuan Link Button */}
          <a
            href="https://jiakuan.link"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 rounded-lg border border-obsidian-800 bg-obsidian-900/80 hover:bg-obsidian-850 hover:border-obsidian-700 px-2.5 py-1.5 text-xs font-medium text-white transition-colors shadow-sm"
            title="访问 家宽导航 (jiakuan.link)"
          >
            <img
              src="/images/jiakuan-logo.png"
              alt="家宽导航"
              className="h-4 w-4 rounded-sm object-contain shrink-0"
            />
            <span className="font-sans font-medium text-white">家宽导航</span>
            <ExternalLink className="h-3 w-3 text-obsidian-400 group-hover:text-white transition-colors" />
          </a>
        </div>
      </div>
    </header>
  );
};
