import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ShieldAlert, Lock, HelpCircle } from 'lucide-react';

interface BeginnerGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BeginnerGuideModal: React.FC<BeginnerGuideModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-obsidian-750 bg-obsidian-900 p-6 sm:p-7 shadow-2xl text-obsidian-400"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-obsidian-800 pb-4 mb-5">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white font-sans">
              翻墙小白避坑必修课
            </h3>
            <p className="text-xs text-obsidian-400 mt-0.5">
              辨别真实隐私工具，远离钓鱼与隐私陷阱
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-obsidian-400 hover:bg-obsidian-800 hover:text-white transition-all"
            aria-label="关闭"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Streamlined Content: 3 crisp, essential rules */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
          {/* Rule 1 */}
          <div className="rounded-xl border border-obsidian-800 bg-obsidian-950 p-4 space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-white font-sans">
              <ShieldAlert className="h-4 w-4 text-white shrink-0" />
              <span>1. 拒绝国内搜索“免费加速器”</span>
            </div>
            <p className="text-obsidian-400">
              国内搜索引流的免费翻墙软件多为<strong>蜜罐钓鱼或流氓黑产</strong>，强制绑定实名手机号并索取通讯录和相册权限，流量在明文监管下传输，存在严重安全风险。
            </p>
          </div>

          {/* Rule 2 */}
          <div className="rounded-xl border border-obsidian-800 bg-obsidian-950 p-4 space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-white font-sans">
              <Lock className="h-4 w-4 text-white shrink-0" />
              <span>2. 认准资助与开发主体</span>
            </div>
            <p className="text-obsidian-400">
              VPN 会转发你的全部网络请求。优先选用由<strong>公开非盈利基金会</strong>（如 Tor、OpenRung）、学术科研机构或欧美独立审计大厂（如 Proton、Cloudflare）运营的工具，才能真正保障零日志与不被转卖数据。
            </p>
          </div>

          {/* Rule 3 */}
          <div className="rounded-xl border border-obsidian-800 bg-obsidian-950 p-4 space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-white font-sans">
              <HelpCircle className="h-4 w-4 text-white shrink-0" />
              <span>3. 免费梯子的合理定位</span>
            </div>
            <p className="text-obsidian-400">
              本站收录的免费工具旨在保障<strong>基础知情权与日常查阅、应急通讯</strong>。如果需要长期流媒体追剧可到<a href="https://jiakuan.link" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-semibold mx-1">家宽导航</a>获取专业机场或VPS，请理解公共带宽有限。
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-obsidian-800 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-white hover:bg-neutral-200 px-4 py-2 text-xs font-semibold text-black transition-colors"
          >
            我已知晓
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
