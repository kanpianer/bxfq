import React, { Suspense, lazy, useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import { Loader2 } from 'lucide-react';
import { App } from './App';
import './styles/index.css';

const CmsApp = lazy(async () => {
  const module = await import('./cms/CmsApp');
  return { default: module.CmsApp };
});

const checkIsCms = () => {
  const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/';
  return normalizedPath === '/dtms' || normalizedPath.startsWith('/dtms/');
};

const CmsFallback: React.FC = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-obsidian-950 font-sans text-obsidian-400">
    <Loader2 className="h-6 w-6 animate-spin text-white" />
    <p className="text-xs font-mono">正在加载内容管理台…</p>
  </div>
);

export const Root: React.FC = () => {
  const [isCms, setIsCms] = useState(checkIsCms);

  useEffect(() => {
    const handleRouteChange = () => {
      const cms = checkIsCms();
      setIsCms(cms);
      if (cms) {
        document.title = '内容管理 · 不想翻墙';
      } else {
        document.title = '不想翻墙 — 备用梯子首选';
      }
    };

    if (isCms) {
      document.title = '内容管理 · 不想翻墙';
    }

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('bxfq-navigate', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('bxfq-navigate', handleRouteChange);
    };
  }, [isCms]);

  const handleOpenCms = useCallback(() => {
    try {
      if (window.location.pathname !== '/dtms') {
        window.history.pushState(null, '', '/dtms');
      }
    } catch {
      // Ignore pushState errors in sandboxed environments
    }
    document.title = '内容管理 · 不想翻墙';
    setIsCms(true);
  }, []);

  return isCms ? (
    <Suspense fallback={<CmsFallback />}>
      <CmsApp />
    </Suspense>
  ) : (
    <App onOpenCms={handleOpenCms} />
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
