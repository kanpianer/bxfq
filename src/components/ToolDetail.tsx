import React, { useState, useEffect } from 'react';
import { VPNTool } from '../types';
import { ToolLogoMap } from '../assets/logos';
import { LinkQRCodePopover } from './LinkQRCodePopover';
import { ShareQRCodeModal } from './ShareQRCodeModal';
import { 
  ArrowLeft, 
  ExternalLink, 
  Copy, 
  Check, 
  ShieldCheck, 
  AlertTriangle, 
  Download, 
  Layers, 
  MessageSquare, 
  Github, 
  Mail, 
  Globe, 
  Sparkles, 
  CheckCircle2, 
  Info, 
  Share2
} from 'lucide-react';
import { PlatformIcon } from './PlatformIcons';
import { TelegramIcon, XIcon, BlueskyIcon, YoutubeIcon } from './SocialIcons';

interface ToolDetailProps {
  tool: VPNTool;
  onBack: () => void;
}

export const ToolDetail: React.FC<ToolDetailProps> = ({ tool, onBack }) => {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isShareQRModalOpen, setIsShareQRModalOpen] = useState(() => {
    return typeof window !== 'undefined' && window.location.search.includes('test=share-modal');
  });

  const LogoComponent = ToolLogoMap[tool.id] || ShieldCheck;
  const isUnavailable = tool.status === 'unavailable';

  // ESC shortcut to go back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(text);
    showToast(`已复制 ${label} 到剪贴板`);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <div className="min-h-screen pb-20 page-transition-enter">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-obsidian-850 border border-white/20 px-4 py-3 text-xs font-mono text-white shadow-2xl animate-bounce">
          <CheckCircle2 className="h-4 w-4 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Floating Actions - Strictly within content area max-w-7xl */}
      <div className="fixed top-4 sm:top-5 left-0 right-[6px] z-40 pointer-events-none">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Back to Home Button - Aligned with left of content */}
          <button
            type="button"
            onClick={onBack}
            className="pointer-events-auto group flex items-center gap-1.5 rounded-xl border border-obsidian-750 bg-obsidian-900/90 hover:bg-obsidian-800 hover:border-obsidian-700 text-obsidian-300 hover:text-white px-3.5 py-2 text-xs font-mono font-medium backdrop-blur-md shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
            title="返回主页 (ESC)"
          >
            <ArrowLeft className="h-4 w-4 text-white transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span className="font-sans font-medium text-white">返回主页</span>
          </button>

          {/* Share Button - Aligned with right of content */}
          <button
            type="button"
            onClick={() => setIsShareQRModalOpen(true)}
            className="pointer-events-auto group flex items-center gap-1.5 rounded-xl border border-obsidian-750 bg-obsidian-900/90 hover:bg-obsidian-800 hover:border-obsidian-700 text-obsidian-300 hover:text-white px-3.5 py-2 text-xs font-mono font-medium backdrop-blur-md shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
            title="分享此工具"
          >
            <Share2 className="h-4 w-4 text-white transition-transform duration-200 group-hover:scale-110" />
            <span className="font-sans font-medium text-white">分享</span>
          </button>
        </div>
      </div>

      {/* Body Content - Exactly max-w-7xl aligned with generous breathing room below floating buttons */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 space-y-8">
        {/* Tool Header Card */}
        <div className="relative rounded-2xl border border-obsidian-800 bg-obsidian-900/60 p-6 sm:p-8 backdrop-blur-sm overflow-hidden">
          {/* Background subtle gradient */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl border border-obsidian-750 bg-obsidian-950 shadow-inner">
                <LogoComponent className="h-10 w-10 sm:h-12 sm:w-12" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
                    {tool.name}
                  </h1>

                  {/* Status Badge */}
                  {isUnavailable ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-neutral-800 px-3 py-1 text-xs font-mono font-medium text-obsidian-400 border border-neutral-700">
                      <AlertTriangle className="w-3.5 h-3.5 text-obsidian-400" />
                      <span>目前不可用</span>
                    </span>
                  ) : tool.status === 'needs-bridge' ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-mono font-medium text-white border border-white/25">
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping"></span>
                      <span>中国大陆需配网桥</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-mono font-medium text-white border border-white/25">
                      <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                      <span>{tool.statusText}</span>
                    </span>
                  )}

                  {/* Entity Tag */}
                  <span className="rounded-md border border-obsidian-750 bg-obsidian-850 px-2.5 py-0.5 text-xs font-mono text-white">
                    {tool.entityLabel}
                  </span>
                </div>

                <p className="mt-2 text-sm sm:text-base text-obsidian-400 font-sans leading-relaxed">
                  {tool.tagline}
                </p>

                {/* Sub details: pricing & platforms */}
                <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-obsidian-400">
                  <div>
                    <span className="text-obsidian-400">费用模式：</span>
                    <span className="text-white font-medium">{tool.pricingModel}</span>
                  </div>
                  <div>
                    <span className="text-obsidian-400">支持平台：</span>
                    <span className="text-white capitalize">
                      {tool.platforms.join(', ')}
                    </span>
                  </div>
                  {tool.securityRating && (
                    <div>
                      <span className="text-obsidian-400">安全级别：</span>
                      <span className="text-white">{tool.securityRating}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Official Website Button */}
            <div className="shrink-0 flex sm:flex-col items-center gap-2">
              <a
                href={tool.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-obsidian-800 hover:bg-obsidian-750 text-white border border-obsidian-700 px-4 py-2 text-xs font-semibold font-mono transition-colors shadow-sm"
              >
                <span>访问官网</span>
                <ExternalLink className="h-3.5 w-3.5 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Unavailable Alert Banner (Special for BeePass VPN) */}
        {isUnavailable && tool.statusNote && (
          <div className="rounded-xl border border-obsidian-750 bg-obsidian-900/90 p-5 backdrop-blur-md">
            <div className="flex items-start gap-3.5">
              <AlertTriangle className="h-5 w-5 text-white shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">
                  当前中国大陆地区不可用状态说明
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-obsidian-400 leading-relaxed">
                  {tool.statusNote}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={onBack}
                    className="inline-flex items-center gap-1 text-xs font-medium text-white hover:underline"
                  >
                    ← 点击返回主页选用其他已验证可用的免费梯子
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Funding & Development Entity Deep Dive (资助和开发主体剖析) */}
        <section className="rounded-xl border border-obsidian-800 bg-obsidian-900/50 p-6 space-y-3">
          <div className="flex items-center gap-2 text-sm font-mono font-semibold text-white">
            <ShieldCheck className="h-4 w-4 text-white" />
            <span>资助与开发主体深度背景</span>
          </div>
          <div className="rounded-lg bg-obsidian-950/80 border border-obsidian-850 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-obsidian-400">主体属性：</span>
              <span className="text-xs font-mono font-medium text-white">
                {tool.entityLabel}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-obsidian-400 leading-relaxed font-sans">
              {tool.entityDescription}
            </p>
            <div className="mt-3 pt-3 border-t border-obsidian-850 text-[11px] text-obsidian-400 leading-relaxed">
              💡 <strong>小白知识点：</strong> 很多国内冒充的免费翻墙软件会通过内置广告窃取通讯录、收集上网日志甚至钓鱼实名。优先选择由公开非盈利基金会监督、学术机构支持或国际上市公司托管的工具，能从底层避免数据被倒卖或监控。
            </div>
          </div>
        </section>

        {/* 3-Step Beginner Quick Start (小白上手三步走) */}
        <section className="rounded-xl border border-obsidian-800 bg-obsidian-900/50 p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-mono font-semibold text-white">
            <Sparkles className="h-4 w-4 text-white" />
            <span>小白上手使用指南（三步快速通关）</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tool.quickStartSteps.map((step) => (
              <div
                key={step.step}
                className="relative rounded-xl border border-obsidian-800 bg-obsidian-950/70 p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 border border-white/20 text-xs font-mono font-bold text-white">
                      0{step.step}
                    </span>
                    <span className="text-[10px] font-mono uppercase text-obsidian-400">
                      STEP {step.step}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1.5 font-sans">
                    {step.title}
                  </h4>
                  <p className="text-xs text-obsidian-400 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Download & Mirror Matrix (全平台下载与国内镜像矩阵) */}
        <section className="rounded-xl border border-obsidian-800 bg-obsidian-900/50 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-mono font-semibold text-white">
              <Download className="h-4 w-4 text-white" />
              <span>官方下载通道与备用镜像</span>
            </div>
            <span className="text-[11px] font-mono text-obsidian-400 hidden sm:inline">
              提供直链与一键复制
            </span>
          </div>

          <div className="space-y-3">
            {tool.downloadLinks.map((dl, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4 rounded-xl border border-obsidian-800 bg-obsidian-950/85 p-3.5 sm:p-4 hover:border-obsidian-700 transition-colors shadow-sm"
              >
                {/* Left: System icon and description */}
                <div className="flex items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-obsidian-900 border border-obsidian-750 text-white shadow-inner">
                    <PlatformIcon platform={dl.platform} className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm sm:text-base font-semibold text-white tracking-tight">
                        {dl.label.replace(/\s*[\(（][^\)）]*[\)）]/g, '').trim()}
                      </span>
                      {dl.isDirect && (
                        <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-mono text-white border border-white/20">
                          官方直链
                        </span>
                      )}
                      {dl.isMirror && (
                        <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-mono text-white border border-white/20">
                          免翻镜像
                        </span>
                      )}
                    </div>
                    {dl.note && (
                      <p className="text-xs text-obsidian-400 mt-1 leading-relaxed">
                        {dl.note}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 shrink-0 pt-2.5 sm:pt-0 border-t border-obsidian-900/80 sm:border-0 justify-end sm:justify-start w-full sm:w-auto">
                  {/* QR Code Popover Button */}
                  <LinkQRCodePopover
                    url={dl.url}
                    label={dl.label}
                    defaultOpen={idx === 0 && typeof window !== 'undefined' && window.location.search.includes('test=qr-popover')}
                  />

                  {/* Copy Link Button */}
                  <button
                    onClick={() => handleCopy(dl.url, dl.label)}
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-obsidian-800 hover:bg-obsidian-750 border border-obsidian-700 px-3 py-1.5 text-xs text-white transition-colors h-[32px]"
                    title="复制链接"
                  >
                    {copiedLink === dl.url ? (
                      <Check className="h-3.5 w-3.5 text-white" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-white" />
                    )}
                    <span className="text-[11px] font-mono font-medium">复制</span>
                  </button>

                  {/* Open Link Button */}
                  <a
                    href={dl.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-obsidian-800 hover:bg-obsidian-750 text-white border border-obsidian-700 px-3.5 py-1.5 text-xs font-mono font-semibold transition-colors shadow-sm h-[32px]"
                  >
                    <span>打开</span>
                    <ExternalLink className="h-3.5 w-3.5 text-white" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mirror Sources & Distributed Repositories Section */}
        {tool.mirrors && tool.mirrors.length > 0 && (
          <section className="rounded-xl border border-obsidian-800 bg-obsidian-900/50 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-mono font-semibold text-white">
                <Globe className="h-4 w-4 text-white" />
                <span>获取配置的镜像与分布式仓库</span>
              </div>
              <span className="text-[11px] font-mono text-obsidian-400 hidden sm:inline">
                共 {tool.mirrors.length} 个同步镜像源与加速代理
              </span>
            </div>

            <p className="text-xs sm:text-sm text-obsidian-400 leading-relaxed font-sans">
              由于主源或 GitHub 存在区域网络波动或阻断可能，推荐使用以下与主项目实时双向同步的分布式 FOSS / 商业托管镜像及 RAW 加速通道获取配置：
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {tool.mirrors.map((m, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-obsidian-800 bg-obsidian-950/85 p-4 flex flex-col justify-between hover:border-obsidian-700 transition-colors shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-sm font-semibold text-white font-mono">
                        {m.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white border border-white/20 shrink-0">
                        镜像/代理
                      </span>
                    </div>
                    <p className="text-xs text-obsidian-400 leading-relaxed mb-3">
                      {m.description}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-obsidian-850/80 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-obsidian-400 truncate max-w-[130px]" title={m.url}>
                      {m.url}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <LinkQRCodePopover url={m.url} label={m.name} />
                      <button
                        onClick={() => handleCopy(m.url, m.name)}
                        className="flex items-center gap-1 text-[11px] font-mono text-white hover:underline"
                        title="复制镜像地址"
                      >
                        <Copy className="h-3 w-3" />
                        <span>复制</span>
                      </button>
                      <a
                        href={m.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[11px] font-mono text-white hover:underline"
                        title="在新标签页中打开"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>打开</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bridges & Circumvention Section (For Tor / Special Tools) */}
        {tool.bridges && (
          <section className="rounded-xl border border-obsidian-750 bg-obsidian-900/50 p-6 space-y-4">
            <div className="flex items-center gap-2 text-sm font-mono font-semibold text-white">
              <Layers className="h-4 w-4 text-white" />
              <span>{tool.bridges.title}</span>
            </div>

            <p className="text-xs sm:text-sm text-obsidian-400 leading-relaxed font-sans">
              {tool.bridges.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {tool.bridges.methods.map((method, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-obsidian-800 bg-obsidian-950/90 p-3.5 flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded bg-obsidian-900 border border-obsidian-800 text-[10px] font-mono text-white mb-2">
                      {method.channel}
                    </span>
                    <p className="text-xs text-obsidian-400 leading-relaxed mb-3">
                      {method.instruction}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-obsidian-850 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-obsidian-400 truncate max-w-[110px]" title={method.target}>
                      {method.target}
                    </span>
                    <div className="shrink-0 flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(method.target, method.channel)}
                        className="flex items-center gap-1 text-[11px] font-mono text-white hover:underline"
                        title="复制"
                      >
                        <Copy className="h-3 w-3" />
                        <span>复制</span>
                      </button>
                      {(method.type === 'link' || method.target.startsWith('http')) && (
                        <a
                          href={method.target}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[11px] font-mono text-white hover:underline"
                          title="打开链接"
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span>打开</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {tool.bridges.tutorialUrl && (
              <div className="pt-2">
                <a
                  href={tool.bridges.tutorialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-white hover:underline"
                >
                  <span>阅读官方中国大陆网桥连接避坑教程</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
          </section>
        )}

        {/* Detailed Guide & Tips */}
        {tool.detailedGuide && tool.detailedGuide.length > 0 && (
          <section className="rounded-xl border border-obsidian-800 bg-obsidian-900/50 p-6 space-y-4">
            <div className="flex items-center gap-2 text-sm font-mono font-semibold text-white">
              <Info className="h-4 w-4 text-white" />
              <span>使用秘籍与小白防踩坑技巧</span>
            </div>

            <div className="space-y-4">
              {tool.detailedGuide.map((item, idx) => (
                <div key={idx} className="rounded-lg bg-obsidian-950/70 border border-obsidian-850 p-4">
                  <h4 className="text-sm font-semibold text-white mb-2 font-sans">
                    {item.title}
                  </h4>
                  <ul className="space-y-1.5 text-xs text-obsidian-400 leading-relaxed list-disc list-inside">
                    {item.content.map((point, pIdx) => (
                      <li key={pIdx}>{point}</li>
                    ))}
                  </ul>

                  {item.tips && item.tips.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-obsidian-850 space-y-1">
                      {item.tips.map((tip, tIdx) => (
                        <p key={tIdx} className="text-xs text-white font-mono">
                          👉 贴心提示：{tip}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contacts & Community Channels */}
        {tool.contacts && tool.contacts.length > 0 && (
          <section className="rounded-xl border border-obsidian-800 bg-obsidian-900/50 p-6 space-y-3">
            <div className="flex items-center gap-2 text-sm font-mono font-semibold text-white">
              <MessageSquare className="h-4 w-4 text-white" />
              <span>官方与社区联系渠道</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {tool.contacts.map((c, i) => (
                <a
                  key={i}
                  href={c.value.startsWith('http') ? c.value : `mailto:${c.value}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-obsidian-850 bg-obsidian-950 p-3 hover:border-obsidian-700 transition-colors group"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-obsidian-900 text-obsidian-400 group-hover:text-white">
                    {c.type === 'telegram' ? (
                      <TelegramIcon className="h-4 w-4" />
                    ) : c.type === 'twitter' ? (
                      <XIcon className="h-4 w-4" />
                    ) : c.type === 'bluesky' ? (
                      <BlueskyIcon className="h-4 w-4" />
                    ) : c.type === 'youtube' ? (
                      <YoutubeIcon className="h-4 w-4" />
                    ) : c.type === 'github' ? (
                      <Github className="h-4 w-4" />
                    ) : c.type === 'email' ? (
                      <Mail className="h-4 w-4" />
                    ) : (
                      <Globe className="h-4 w-4" />
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-medium text-white truncate">
                      {c.label}
                    </div>
                    <div className="text-[10px] font-mono text-obsidian-400 truncate">
                      {c.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Back Button */}
        <div className="pt-4 flex items-center justify-center">
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 border border-obsidian-750 px-6 py-3 text-xs font-mono font-medium text-white transition-colors shadow-md"
          >
            <ArrowLeft className="h-4 w-4 text-white" />
            <span>了解完毕，返回主页</span>
          </button>
        </div>
      </div>

      {/* Share Project Website QR Code Modal */}
      <ShareQRCodeModal
        isOpen={isShareQRModalOpen}
        onClose={() => setIsShareQRModalOpen(false)}
        toolName={tool.name}
        websiteUrl={tool.officialUrl}
      />
    </div>
  );
};
