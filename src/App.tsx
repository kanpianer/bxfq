import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { SITE_CONTENT } from './content';
import { Platform, isToolVisible } from './types';
import { Navbar } from './components/Navbar';
import { FilterBar } from './components/FilterBar';
import { ToolCard } from './components/ToolCard';
import { ToolDetail } from './components/ToolDetail';
import { BeginnerGuideModal } from './components/BeginnerGuideModal';
import { BackToTop } from './components/BackToTop';
import { Footer } from './components/Footer';
import { SearchX } from 'lucide-react';

interface AppProps {
  onOpenCms?: () => void;
}

export const App: React.FC<AppProps> = ({ onOpenCms }) => {
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all');
  const [isGuideOpen, setIsGuideOpen] = useState(() => {
    return typeof window !== 'undefined' && window.location.search.includes('test=guide');
  });

  const scrollPosRef = useRef(0);
  const clickTimestampsRef = useRef<number[]>([]);

  const scrollToPos = (y: number) => {
    window.scrollTo(0, y);
    if (document.documentElement) document.documentElement.scrollTop = y;
    if (document.body) document.body.scrollTop = y;
  };

  const handleOpenCms = useCallback(() => {
    if (onOpenCms) {
      onOpenCms();
      return;
    }
    try {
      if (window.location.pathname !== '/dtms') {
        history.pushState(null, '', '/dtms');
      }
    } catch {
      // Fallback
    }
    window.dispatchEvent(new Event('bxfq-navigate'));
  }, [onOpenCms]);

  // 连续在 1.5 秒内点击主页空白区域 5 次打开 CMS 管理界面
  useEffect(() => {
    // 仅在主页（未查看特定工具详情且未打开指南弹窗）时生效
    if (selectedToolId !== null || isGuideOpen) {
      clickTimestampsRef.current = [];
      return;
    }

    const handleClick = (e: MouseEvent) => {
      if (e.button !== 0) return;

      const target = e.target as HTMLElement | null;
      const el = target instanceof Element ? target : (target as Node | null)?.parentElement;
      if (!el) return;

      // 如果点击的是交互元素（按钮、链接、工具卡片、输入框、弹窗等），不算作空白区域，并重置计数
      const interactive = el.closest(
        'button, a, input, textarea, select, [role="button"], [role="dialog"], [role="menuitem"], [role="tab"], label'
      );
      if (interactive) {
        clickTimestampsRef.current = [];
        return;
      }

      const now = Date.now();
      // 保留 1.5 秒（1500 毫秒）内的点击记录
      const recent = clickTimestampsRef.current.filter((t) => now - t <= 1500);
      recent.push(now);
      clickTimestampsRef.current = recent;

      // 达成 1.5 秒内点击 5 次
      if (recent.length >= 5) {
        clickTimestampsRef.current = [];
        window.getSelection()?.removeAllRanges();
        handleOpenCms();
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      const target = e.target as HTMLElement | null;
      const el = target instanceof Element ? target : (target as Node | null)?.parentElement;
      if (!el) return;
      const interactive = el.closest(
        'button, a, input, textarea, select, [role="button"], [role="dialog"], [role="menuitem"], [role="tab"], label'
      );
      // 连续多次点击空白区域时，避免浏览器默认触发文字高亮选中
      if (!interactive && e.detail > 1) {
        e.preventDefault();
      }
    };

    const handleBlur = () => {
      clickTimestampsRef.current = [];
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('blur', handleBlur);
    };
  }, [selectedToolId, isGuideOpen, handleOpenCms]);

  // Sync with URL Hash for deep linking (#tool-tor, etc.) and browser history
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('tool-')) {
        const toolId = hash.replace('tool-', '');
        const exists = SITE_CONTENT.tools.some(t => t.id === toolId && isToolVisible(t));
        if (exists) {
          setSelectedToolId(toolId);
          scrollToPos(0);
          return;
        }
      }
      setSelectedToolId(null);
      requestAnimationFrame(() => {
        scrollToPos(scrollPosRef.current);
      });
    };

    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const navigateToTool = (toolId: string) => {
    scrollPosRef.current = window.scrollY || document.documentElement?.scrollTop || document.body?.scrollTop || 0;
    setSelectedToolId(toolId);
    scrollToPos(0);
    if (window.location.hash !== `#tool-${toolId}`) {
      window.location.hash = `tool-${toolId}`;
    }
  };

  const navigateBackToHome = () => {
    setSelectedToolId(null);
    if (window.location.hash) {
      history.pushState(null, '', window.location.pathname + window.location.search);
    }
    requestAnimationFrame(() => {
      scrollToPos(scrollPosRef.current);
    });
  };

  // Selected tool object
  const activeTool = useMemo(() => {
    if (!selectedToolId) return null;
    return SITE_CONTENT.tools.find(t => t.id === selectedToolId && isToolVisible(t)) || null;
  }, [selectedToolId]);

  // Filtering tools
  const filteredTools = useMemo(() => {
    return SITE_CONTENT.tools.filter((tool) => {
      if (!isToolVisible(tool)) return false;
      // Platform filter
      if (selectedPlatform !== 'all' && !tool.platforms.includes(selectedPlatform)) {
        return false;
      }
      return true;
    });
  }, [selectedPlatform]);

  return (
    <div className="min-h-screen bg-obsidian-950 text-obsidian-400 font-sans selection:bg-white/20 selection:text-white bg-grid-pattern transition-colors">
      {/* Top Floating Header: Navbar + Platform FilterBar both sticky on home page */}
      {!activeTool && (
        <div className="sticky top-0 z-40 w-full">
          <Navbar
            onBackToHome={() => scrollToPos(0)}
          />
          <FilterBar
            selectedPlatform={selectedPlatform}
            onSelectPlatform={setSelectedPlatform}
            totalFiltered={filteredTools.length}
          />
        </div>
      )}

      {/* Main Content Area */}
      <main>
        {activeTool ? (
          /* Detail View */
          <ToolDetail
            tool={activeTool}
            onBack={navigateBackToHome}
          />
        ) : (
          /* Directory List View */
          <div className="pb-24 page-transition-enter">
            {/* Grid of Tool Cards */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 min-h-[580px]">
              {filteredTools.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredTools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      onSelect={navigateToTool}
                    />
                  ))}
                </div>
              ) : (
                /* Empty state when filters return 0 results */
                <div className="rounded-2xl border border-obsidian-800 bg-obsidian-900/40 p-12 text-center max-w-md mx-auto my-12">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-obsidian-850 border border-obsidian-750 text-obsidian-400 mx-auto mb-4">
                    <SearchX className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-semibold text-white">没有找到匹配的工具</h3>
                  <p className="mt-2 text-xs text-obsidian-400">
                    当前筛选条件下暂无收录工具，可尝试重置筛选条件。
                  </p>
                  <button
                    onClick={() => {
                      setSelectedPlatform('all');
                    }}
                    className="mt-5 rounded-lg bg-white hover:bg-neutral-200 px-4 py-2 text-xs font-mono font-medium text-black transition-colors"
                  >
                    重置所有筛选条件
                  </button>
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      {/* Beginner Safety Guide Modal */}
      <BeginnerGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Minimalist Footer */}
      <Footer onOpenGuide={() => setIsGuideOpen(true)} />

      {/* Floating Back To Top Button */}
      <BackToTop />
    </div>
  );
};
