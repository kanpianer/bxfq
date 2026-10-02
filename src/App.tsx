import React, { useState, useEffect, useMemo } from 'react';
import { TOOLS_DATA } from './data/tools';
import { Platform, EntityType } from './types';
import { Navbar } from './components/Navbar';
import { FilterBar } from './components/FilterBar';
import { ToolCard } from './components/ToolCard';
import { ToolDetail } from './components/ToolDetail';
import { BeginnerGuideModal } from './components/BeginnerGuideModal';
import { Footer } from './components/Footer';
import { SearchX } from 'lucide-react';

export const App: React.FC = () => {
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all');
  const [selectedEntity, setSelectedEntity] = useState<EntityType | 'all'>('all');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(() => {
    return typeof window !== 'undefined' && window.location.search.includes('test=guide');
  });

  // Sync with URL Hash for deep linking (#tool-tor, etc.) and browser history
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('tool-')) {
        const toolId = hash.replace('tool-', '');
        const exists = TOOLS_DATA.some(t => t.id === toolId);
        if (exists) {
          setSelectedToolId(toolId);
          return;
        }
      }
      setSelectedToolId(null);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  const navigateToTool = (toolId: string) => {
    const updateDOM = () => {
      setSelectedToolId(toolId);
      window.location.hash = `tool-${toolId}`;
    };

    if ('startViewTransition' in document) {
      (document as any).startViewTransition(updateDOM);
    } else {
      updateDOM();
    }
  };

  const navigateBackToHome = () => {
    const updateDOM = () => {
      setSelectedToolId(null);
      if (window.location.hash) {
        history.pushState(null, '', window.location.pathname + window.location.search);
      }
    };

    if ('startViewTransition' in document) {
      (document as any).startViewTransition(updateDOM);
    } else {
      updateDOM();
    }
  };

  // Selected tool object
  const activeTool = useMemo(() => {
    if (!selectedToolId) return null;
    return TOOLS_DATA.find(t => t.id === selectedToolId) || null;
  }, [selectedToolId]);

  // Filtering tools
  const filteredTools = useMemo(() => {
    return TOOLS_DATA.filter((tool) => {
      // Platform filter
      if (selectedPlatform !== 'all' && !tool.platforms.includes(selectedPlatform)) {
        return false;
      }

      // Entity filter
      if (selectedEntity !== 'all') {
        if (selectedEntity === 'non-profit') {
          if (tool.entityType !== 'non-profit' && tool.entityType !== 'non-profit-supervised') {
            return false;
          }
        } else if (tool.entityType !== selectedEntity) {
          return false;
        }
      }

      // Only available filter
      if (onlyAvailable && tool.status === 'unavailable') {
        return false;
      }

      return true;
    });
  }, [selectedPlatform, selectedEntity, onlyAvailable]);

  return (
    <div className="min-h-screen bg-obsidian-950 text-obsidian-400 font-sans selection:bg-white/20 selection:text-white bg-grid-pattern transition-colors">
      {/* Top Navbar */}
      <Navbar
        onOpenGuide={() => setIsGuideOpen(true)}
        onBackToHome={navigateBackToHome}
      />

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
          <div className="pb-24">
            {/* Platform & Entity Filter Bar */}
            <FilterBar
              selectedPlatform={selectedPlatform}
              onSelectPlatform={setSelectedPlatform}
              selectedEntity={selectedEntity}
              onSelectEntity={setSelectedEntity}
              onlyAvailable={onlyAvailable}
              onToggleOnlyAvailable={() => setOnlyAvailable(!onlyAvailable)}
              totalFiltered={filteredTools.length}
            />

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
                      setSelectedEntity('all');
                      setOnlyAvailable(false);
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
    </div>
  );
};
