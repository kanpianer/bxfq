import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when page is scrolled down more than 200px
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="返回顶部"
      title="返回顶部"
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 group flex h-10 w-10 items-center justify-center rounded-xl border border-obsidian-800 bg-obsidian-900/85 text-obsidian-400 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-obsidian-700 hover:bg-obsidian-850 hover:text-white hover:scale-105 active:scale-95 focus:outline-none focus:ring-1 focus:ring-obsidian-700 ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <ArrowUp className="h-4 w-4 text-obsidian-400 group-hover:text-white transition-all duration-200 group-hover:-translate-y-0.5" />
    </button>
  );
};
