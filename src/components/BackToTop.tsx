import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement?.scrollTop || document.body?.scrollTop || 0;

      // 距离顶部较近时始终不显示
      if (scrollY <= 200) {
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
          hideTimeoutRef.current = null;
        }
        setIsVisible(false);
        return;
      }

      // 正在滑动且超过阈值时显示
      setIsVisible(true);

      // 清除之前的隐藏定时器
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }

      // 若鼠标未悬停在按钮上，滑动停止 2 秒后自动隐藏
      if (!isHoveredRef.current) {
        hideTimeoutRef.current = setTimeout(() => {
          setIsVisible(false);
          hideTimeoutRef.current = null;
        }, 2000);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    const scrollY = window.scrollY || document.documentElement?.scrollTop || document.body?.scrollTop || 0;
    if (scrollY > 200) {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        hideTimeoutRef.current = null;
      }, 1500);
    }
  };

  const scrollToTop = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setIsVisible(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-5 sm:bottom-6 left-0 right-0 z-40 pointer-events-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-end">
        <button
          type="button"
          onClick={scrollToTop}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleMouseEnter}
          aria-label="返回顶部"
          title="返回顶部"
          className={`pointer-events-auto group flex h-10 w-10 items-center justify-center rounded-xl border border-obsidian-800 bg-obsidian-900/85 text-obsidian-400 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-obsidian-700 hover:bg-obsidian-850 hover:text-white hover:scale-105 active:scale-95 focus:outline-none focus:ring-1 focus:ring-obsidian-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
        >
          <ArrowUp className="h-4 w-4 text-obsidian-400 group-hover:text-white transition-all duration-200 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
};
