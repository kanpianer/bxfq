import React from 'react';

interface FooterProps {
  onOpenGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGuide }) => {
  return (
    <footer className="border-t border-obsidian-850 bg-obsidian-950 py-10 text-xs font-mono text-obsidian-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-obsidian-400 max-w-xl font-sans text-xs leading-relaxed">
            所有收录工具均遵循透明原则，旨在为公众提供紧急网络备份通道。
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenGuide}
              className="text-obsidian-400 hover:text-white transition-colors"
            >
              小白避坑手册
            </button>
            <span className="text-obsidian-400 opacity-40">/</span>
            <a
              href="https://github.com/kanpianer/bxfq"
              target="_blank"
              rel="noopener noreferrer"
              className="text-obsidian-400 hover:text-white transition-colors"
            >
              开源代码
            </a>
            <span className="text-obsidian-400 opacity-40">/</span>
            <a
              href="https://bxkp.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-obsidian-400 hover:text-white transition-colors"
            >
              不想看片
            </a>
            <span className="text-obsidian-400 opacity-40">/</span>
            <span className="text-obsidian-400">
              备份网址:{' '}
              <a
                href="https://bxfq.sld.tw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-obsidian-400 hover:text-white transition-colors underline underline-offset-2"
              >
                bxfq.sld.tw
              </a>
              、
              <a
                href="https://bxfq404.pages.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-obsidian-400 hover:text-white transition-colors underline underline-offset-2"
              >
                bxfq404.pages.dev
              </a>
            </span>
          </div>
        </div>

        <div className="pt-6 border-t border-obsidian-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-obsidian-400">
          <div>
            免责声明：本站展示之工具信息均来自互联网公开资料，仅作计算机网络技术、密码学混淆及通信协议学术研究交流之用。
          </div>
          <div>
            <span>Designed for Open Access & Internet Freedom</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
