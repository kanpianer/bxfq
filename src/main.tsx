import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { Loader2 } from 'lucide-react';
import { App } from './App';
import './styles/index.css';

const CmsApp = lazy(async () => {
  const module = await import('./cms/CmsApp');
  return { default: module.CmsApp };
});

const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/';
const isCms = normalizedPath === '/dtms' || normalizedPath.startsWith('/dtms/');

if (isCms) {
  document.title = '内容管理 · 不想翻墙';
}

const CmsFallback: React.FC = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-obsidian-950 font-sans text-obsidian-400">
    <Loader2 className="h-6 w-6 animate-spin text-white" />
    <p className="text-xs font-mono">正在加载内容管理台…</p>
  </div>
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {isCms ? (
      <Suspense fallback={<CmsFallback />}>
        <CmsApp />
      </Suspense>
    ) : (
      <App />
    )}
  </React.StrictMode>
);
