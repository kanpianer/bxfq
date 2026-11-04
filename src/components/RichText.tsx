import React from 'react';
import { ExternalLink } from 'lucide-react';
import { SITE_CONTENT } from '../content';

/**
 * 极简富文本渲染器，支持 CMS 内容中的：
 * - **加粗**
 * - [链接文字](https://example.com)
 */
const TOKEN_RE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

const isSafeHref = (url: string): boolean => /^(https?:\/\/|mailto:|tel:|\/)/i.test(url.trim());

interface RichTextProps {
  text: string;
  linkClassName?: string;
  strongClassName?: string;
}

export const RichText: React.FC<RichTextProps> = ({
  text,
  linkClassName = 'text-white hover:underline font-semibold mx-1',
  strongClassName = 'text-white font-semibold',
}) => {
  const parts = text.split(TOKEN_RE);
  const jiakuan = SITE_CONTENT?.site?.jiakuan;

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
          return (
            <strong key={index} className={strongClassName}>
              {part.slice(2, -2)}
            </strong>
          );
        }

        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const [, linkText, linkUrl] = link;
          if (!isSafeHref(linkUrl)) {
            return <React.Fragment key={index}>{linkText}</React.Fragment>;
          }

          const isJiakuan =
            linkText === '家宽导航' ||
            linkUrl.includes('jiakuan.link') ||
            Boolean(jiakuan && (linkUrl.startsWith(jiakuan.url) || linkText === jiakuan.label));

          if (isJiakuan) {
            return (
              <a
                key={index}
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={jiakuan?.title || `${linkText} (${linkUrl})`}
                className="group inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-obsidian-800 bg-obsidian-900/80 hover:bg-obsidian-850 hover:border-obsidian-700 px-2 sm:px-2.5 py-1 text-xs font-medium text-white transition-colors shadow-sm align-middle mx-1"
              >
                {(jiakuan?.logo || '/images/jiakuan-logo.png') && (
                  <img
                    src={jiakuan?.logo || '/images/jiakuan-logo.png'}
                    alt={linkText}
                    className="h-[11px] w-[11px] rounded-[2px] object-contain shrink-0"
                  />
                )}
                <span className="font-sans font-medium text-white">{linkText}</span>
                <ExternalLink className="h-3 w-3 text-obsidian-400 group-hover:text-white transition-colors shrink-0" />
              </a>
            );
          }

          return (
            <a
              key={index}
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
            >
              {linkText}
            </a>
          );
        }

        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
};
