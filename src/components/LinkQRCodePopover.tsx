import React, { useState, useEffect, useRef } from 'react';
import { QrCode } from 'lucide-react';
import QRCode from 'qrcode';

interface LinkQRCodePopoverProps {
  url: string;
  label: string;
  defaultOpen?: boolean;
}

export const LinkQRCodePopover: React.FC<LinkQRCodePopoverProps> = ({
  url,
  label,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate QR code data URL lazily
  const loadQRCode = async () => {
    if (qrDataUrl) return;
    try {
      const dataUrl = await QRCode.toDataURL(url, {
        width: 140,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
        errorCorrectionLevel: 'M',
      });
      setQrDataUrl(dataUrl);
    } catch (err) {
      console.error('Failed to generate QR code:', err);
    }
  };

  useEffect(() => {
    if (isOpen && !qrDataUrl) {
      loadQRCode();
    }
  }, [isOpen]);

  const handleMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    loadQRCode();
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 220);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOpen) {
      loadQRCode();
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, [isOpen]);

  return (
    <div
      ref={popoverRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={handleClick}
        className={`flex items-center justify-center h-[30px] w-[30px] rounded border transition-colors ${
          isOpen
            ? 'bg-neutral-200 border-neutral-300 text-black shadow-sm'
            : 'bg-obsidian-800 hover:bg-obsidian-750 border-obsidian-700 text-white'
        }`}
        title="扫码直达链接"
        aria-label={`查看 ${label} 二维码`}
      >
        <QrCode className="h-3.5 w-3.5" />
      </button>

      {isOpen && (
        <div
          className="absolute right-full top-1/2 -translate-y-1/2 mr-2.5 z-50 rounded-xl border border-obsidian-750 bg-obsidian-900/95 backdrop-blur-xl p-3 shadow-2xl flex flex-col items-center select-none animate-in fade-in zoom-in-95 duration-150"
          style={{ width: '160px' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white p-2 rounded-lg shadow-sm border border-neutral-200">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt={`${label} 二维码`}
                className="w-28 h-28 object-contain block"
              />
            ) : (
              <div className="w-28 h-28 flex items-center justify-center text-xs text-obsidian-400 font-mono">
                生成中...
              </div>
            )}
          </div>
          <div className="mt-2 text-center w-full px-1">
            <p className="text-[11px] font-mono text-white font-medium truncate">
              {label}
            </p>
            <p className="text-[10px] text-obsidian-400 mt-0.5 whitespace-nowrap">
              手机扫码直达链接
            </p>
          </div>

          {/* Right subtle pointer arrow pointing towards the button on the right */}
          <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border-t border-r border-obsidian-750 bg-obsidian-900" />
        </div>
      )}
    </div>
  );
};
