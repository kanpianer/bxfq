import React from 'react';

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
          if (!isSafeHref(link[2])) {
            return <React.Fragment key={index}>{link[1]}</React.Fragment>;
          }
          return (
            <a
              key={index}
              href={link[2]}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
            >
              {link[1]}
            </a>
          );
        }

        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
};
