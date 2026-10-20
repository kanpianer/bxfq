import React from 'react';
import { SITE_CONTENT } from '../content';

interface FooterProps {
  onOpenGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGuide }) => {
  const { footer } = SITE_CONTENT;

  return (
    <footer className="border-t border-obsidian-850 bg-obsidian-950 py-10 text-xs font-mono text-obsidian-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-obsidian-400 max-w-xl font-sans text-xs leading-relaxed">
            {footer.intro}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {footer.links.map((link, index) => (
              <React.Fragment key={`${link.label}-${index}`}>
                {index > 0 && <span className="text-obsidian-400 opacity-40">/</span>}
                {link.kind === 'guide' ? (
                  <button
                    onClick={onOpenGuide}
                    className="text-obsidian-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                ) : (
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-obsidian-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                )}
              </React.Fragment>
            ))}

            {footer.backupLinks.length > 0 && (
              <>
                <span className="text-obsidian-400 opacity-40">/</span>
                <span className="text-obsidian-400">
                  {footer.backupLabel}{' '}
                  {footer.backupLinks.map((link, index) => (
                    <React.Fragment key={`${link.url}-${index}`}>
                      {index > 0 && '、'}
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-obsidian-400 hover:text-white transition-colors underline underline-offset-2"
                      >
                        {link.label}
                      </a>
                    </React.Fragment>
                  ))}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-obsidian-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-obsidian-400">
          <div>{footer.disclaimer}</div>
          <div>
            <span>{footer.slogan}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
