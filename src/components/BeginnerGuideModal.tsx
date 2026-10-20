import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ShieldAlert, Lock, HelpCircle } from 'lucide-react';
import { SITE_CONTENT } from '../content';
import type { GuideRuleIcon } from '../types';
import { RichText } from './RichText';

interface BeginnerGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GUIDE_ICONS: Record<GuideRuleIcon, React.FC<{ className?: string }>> = {
  'shield-alert': ShieldAlert,
  lock: Lock,
  help: HelpCircle,
};

export const BeginnerGuideModal: React.FC<BeginnerGuideModalProps> = ({ isOpen, onClose }) => {
  const { guide } = SITE_CONTENT;

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
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
              {guide.title}
            </h3>
            <p className="text-xs text-obsidian-400 mt-0.5">
              {guide.subtitle}
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

        {/* Streamlined Content: crisp, essential rules */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
          {guide.rules.map((rule, index) => {
            const Icon = GUIDE_ICONS[rule.icon] || HelpCircle;
            return (
              <div
                key={`${rule.title}-${index}`}
                className="rounded-xl border border-obsidian-800 bg-obsidian-950 p-4 space-y-1.5"
              >
                <div className="flex items-center gap-2 font-semibold text-white font-sans">
                  <Icon className="h-4 w-4 text-white shrink-0" />
                  <span>{rule.title}</span>
                </div>
                <p className="text-obsidian-400">
                  <RichText text={rule.body} />
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-obsidian-800 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-white hover:bg-neutral-200 px-4 py-2 text-xs font-semibold text-black transition-colors"
          >
            {guide.closeLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
