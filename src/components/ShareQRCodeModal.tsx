import React, { useState, useEffect } from 'react';
import { X, Copy, Check } from 'lucide-react';
import QRCode from 'qrcode';

interface ShareQRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolName: string;
  websiteUrl: string;
  LogoComponent: React.ComponentType<{ className?: string }>;
  onCopy?: () => void;
}

export const ShareQRCodeModal: React.FC<ShareQRCodeModalProps> = ({
  isOpen,
  onClose,
  toolName,
  websiteUrl,
  LogoComponent,
  onCopy,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-[310px] max-w-[92vw] aspect-square rounded-2xl border border-obsidian-750 bg-obsidian-900 p-5 shadow-2xl text-center flex flex-col justify-between items-center animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 rounded-lg p-1 text-obsidian-400 hover:text-white hover:bg-obsidian-800 transition-colors"
          title="关闭"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header: Tool/Website Logo placed directly in front of 分享 */}
        <div className="flex items-center justify-center gap-2 pt-0.5">
          <div className="flex h-5 w-5 items-center justify-center shrink-0">
            <LogoComponent className="h-5 w-5 object-contain" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-white font-sans tracking-tight">
            分享「{toolName}」
          </h3>
        </div>

        {/* QR Code and Copy Link Button container with exact matching width */}
        <div className="flex flex-col items-center justify-center w-full">
          <div className="w-[176px] flex flex-col items-center">
            {/* QR Code Graphic Box */}
            <div className="w-full bg-white p-2.5 rounded-xl shadow-md border border-neutral-200 aspect-square flex items-center justify-center">
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
              className={`mt-2.5 w-full flex items-center justify-center gap-1.5 rounded-lg py-2 px-3 text-xs font-mono font-medium transition-colors shadow-sm group ${
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
    </div>
  );
};
