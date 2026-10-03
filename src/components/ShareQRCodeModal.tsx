import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Copy, Check } from 'lucide-react';
import QRCode from 'qrcode';

interface ShareQRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolName: string;
  websiteUrl: string;
  onCopy?: () => void;
}

export const ShareQRCodeModal: React.FC<ShareQRCodeModalProps> = ({
  isOpen,
  onClose,
  toolName,
  websiteUrl,
  onCopy,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setIsCopied(false);
      return;
    }
    let isMounted = true;
    QRCode.toDataURL(websiteUrl, {
      width: 220,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => {
        if (isMounted) setQrDataUrl(url);
      })
      .catch((err) => {
        console.error('Failed to generate share QR code:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, websiteUrl]);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(websiteUrl);
    setIsCopied(true);
    if (onCopy) onCopy();
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-[320px] sm:w-[340px] max-w-[92vw] rounded-2xl border border-obsidian-750 bg-obsidian-900 p-6 pt-7 pb-6 shadow-2xl text-center flex flex-col justify-center items-center animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - positioned in top right corner with generous space from QR image */}
        <button
          onClick={onClose}
          className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-obsidian-800/80 hover:bg-obsidian-750 text-obsidian-400 hover:text-white border border-obsidian-700/60 transition-all shadow-sm"
          title="关闭"
          aria-label="关闭"
        >
          <X className="h-4 w-4" />
        </button>

        {/* QR Code and Copy Link Button container */}
        <div className="flex flex-col items-center justify-center w-full">
          <div className="w-[205px] sm:w-[215px] flex flex-col items-center">
            {/* QR Code Graphic Box */}
            <div className="w-[205px] h-[205px] sm:w-[215px] sm:h-[215px] bg-white p-3 rounded-xl shadow-md border border-neutral-200 flex items-center justify-center shrink-0">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt={`${toolName} 网站二维码`}
                  className="w-full h-full object-contain block"
                />
              ) : (
                <div className="text-xs text-black font-mono">
                  二维码生成中...
                </div>
              )}
            </div>

            {/* Click to Copy Link Button matching width of above QR code */}
            <button
              type="button"
              onClick={handleCopyLink}
              className={`mt-3 w-full flex items-center justify-center gap-1.5 rounded-lg py-2 px-3 text-xs font-mono font-medium transition-colors shadow-sm group ${
                isCopied
                  ? 'bg-obsidian-750 text-white border border-obsidian-600'
                  : 'bg-obsidian-800 hover:bg-obsidian-750 text-white border border-obsidian-700'
              }`}
            >
              {isCopied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-white" />
                  <span>已复制链接</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-white" />
                  <span>点击复制链接</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
