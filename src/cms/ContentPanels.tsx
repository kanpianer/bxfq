import React from 'react';
import {
  ArrowDown,
  ArrowUp,
  ExternalLink,
  Plus,
  Trash2,
} from 'lucide-react';
import type { FooterContent, GuideContent, GuideRule, SiteMeta } from '../types';
import { RichText } from '../components/RichText';
import {
  Button,
  Field,
  IconButton,
  SectionCard,
  inputClass,
  selectClass,
  textareaClass,
} from './CmsUI';

const move = <T,>(items: T[], index: number, direction: -1 | 1): T[] => {
  const target = index + direction;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
};

const RowActions: React.FC<{
  index: number;
  total: number;
  onMove: (direction: -1 | 1) => void;
  onRemove: () => void;
  label: string;
}> = ({ index, total, onMove, onRemove, label }) => (
  <div className="flex items-center gap-1">
    <IconButton title="上移" disabled={index === 0} onClick={() => onMove(-1)}>
      <ArrowUp className="h-3.5 w-3.5" />
    </IconButton>
    <IconButton title="下移" disabled={index === total - 1} onClick={() => onMove(1)}>
      <ArrowDown className="h-3.5 w-3.5" />
    </IconButton>
    <IconButton title={`删除${label}`} danger onClick={onRemove}>
      <Trash2 className="h-3.5 w-3.5" />
    </IconButton>
  </div>
);

/* ---------------------------------- footer --------------------------------- */

interface FooterPanelProps {
  footer: FooterContent;
  onChange: (footer: FooterContent) => void;
}

export const FooterPanel: React.FC<FooterPanelProps> = ({ footer, onChange }) => {
  const patch = (partial: Partial<FooterContent>) => onChange({ ...footer, ...partial });

  return (
    <div className="space-y-4">
      <SectionCard title="页脚简介" description="显示在页脚左侧的一段说明文字。">
        <Field label="简介文字">
          <textarea
            value={footer.intro}
            onChange={(event) => patch({ intro: event.target.value })}
            className={textareaClass}
          />
        </Field>
      </SectionCard>

      <SectionCard
        title="页脚链接"
        description="按顺序展示的链接，可指向「小白避坑手册」或任意外部网址。"
        actions={
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              patch({ links: [...footer.links, { label: '新链接', kind: 'link', url: '' }] })
            }
          >
            <Plus className="h-3 w-3" />
            添加链接
          </Button>
        }
      >
        {footer.links.length === 0 ? (
          <p className="text-[11px] font-sans text-obsidian-500">暂无页脚链接。</p>
        ) : (
          <div className="space-y-2">
            {footer.links.map((link, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-2 rounded-lg border border-obsidian-850 bg-obsidian-950/50 p-3 sm:grid-cols-[1fr_150px_1fr_auto] sm:items-end"
              >
                <Field label="显示文字">
                  <input
                    value={link.label}
                    onChange={(event) =>
                      patch({
                        links: footer.links.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, label: event.target.value } : item
                        ),
                      })
                    }
                    className={inputClass}
                  />
                </Field>
                <Field label="行为">
                  <select
                    value={link.kind}
                    onChange={(event) =>
                      patch({
                        links: footer.links.map((item, itemIndex) =>
                          itemIndex === index
                            ? { ...item, kind: event.target.value as 'link' | 'guide' }
                            : item
                        ),
                      })
                    }
                    className={selectClass}
                  >
                    <option value="link">外部链接</option>
                    <option value="guide">小白避坑手册</option>
                  </select>
                </Field>
                <Field label="链接地址">
                  <input
                    value={link.url}
                    onChange={(event) =>
                      patch({
                        links: footer.links.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, url: event.target.value } : item
                        ),
                      })
                    }
                    className={inputClass}
                    disabled={link.kind === 'guide'}
                    placeholder={link.kind === 'guide' ? '点击后打开手册弹窗' : 'https://…'}
                  />
                </Field>
                <RowActions
                  index={index}
                  total={footer.links.length}
                  onMove={(direction) => patch({ links: move(footer.links, index, direction) })}
                  onRemove={() =>
                    patch({ links: footer.links.filter((_, itemIndex) => itemIndex !== index) })
                  }
                  label="链接"
                />
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard
        title="备份网址"
        description="页脚中的备用域名列表，方便用户在主域名失效时访问。"
        actions={
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              patch({
                backupLinks: [...footer.backupLinks, { label: 'new.example.com', url: '' }],
              })
            }
          >
            <Plus className="h-3 w-3" />
            添加备份网址
          </Button>
        }
      >
        <Field label="前缀文字" className="mb-3 max-w-xs">
          <input
            value={footer.backupLabel}
            onChange={(event) => patch({ backupLabel: event.target.value })}
            className={inputClass}
            placeholder="备份网址:"
          />
        </Field>

        {footer.backupLinks.length === 0 ? (
          <p className="text-[11px] font-sans text-obsidian-500">暂无备份网址。</p>
        ) : (
          <div className="space-y-2">
            {footer.backupLinks.map((link, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-2 rounded-lg border border-obsidian-850 bg-obsidian-950/50 p-3 sm:grid-cols-[1fr_1.4fr_auto] sm:items-end"
              >
                <Field label="显示文字">
                  <input
                    value={link.label}
                    onChange={(event) =>
                      patch({
                        backupLinks: footer.backupLinks.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, label: event.target.value } : item
                        ),
                      })
                    }
                    className={inputClass}
                  />
                </Field>
                <Field label="链接地址">
                  <input
                    value={link.url}
                    onChange={(event) =>
                      patch({
                        backupLinks: footer.backupLinks.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, url: event.target.value } : item
                        ),
                      })
                    }
                    className={inputClass}
                    placeholder="https://…"
                  />
                </Field>
                <RowActions
                  index={index}
                  total={footer.backupLinks.length}
                  onMove={(direction) =>
                    patch({ backupLinks: move(footer.backupLinks, index, direction) })
                  }
                  onRemove={() =>
                    patch({
                      backupLinks: footer.backupLinks.filter(
                        (_, itemIndex) => itemIndex !== index
                      ),
                    })
                  }
                  label="备份网址"
                />
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard title="免责声明与标语">
        <div className="grid grid-cols-1 gap-4">
          <Field label="免责声明">
            <textarea
              value={footer.disclaimer}
              onChange={(event) => patch({ disclaimer: event.target.value })}
              className={textareaClass}
            />
          </Field>
          <Field label="右侧标语">
            <input
              value={footer.slogan}
              onChange={(event) => patch({ slogan: event.target.value })}
              className={inputClass}
            />
          </Field>
        </div>
      </SectionCard>
    </div>
  );
};

/* ---------------------------------- guide ---------------------------------- */

interface GuidePanelProps {
  guide: GuideContent;
  onChange: (guide: GuideContent) => void;
}

export const GuidePanel: React.FC<GuidePanelProps> = ({ guide, onChange }) => {
  const patch = (partial: Partial<GuideContent>) => onChange({ ...guide, ...partial });

  const updateRule = (index: number, partial: Partial<GuideRule>) => {
    patch({
      rules: guide.rules.map((rule, ruleIndex) =>
        ruleIndex === index ? { ...rule, ...partial } : rule
      ),
    });
  };

  return (
    <div className="space-y-4">
      <SectionCard title="手册标题" description="页脚「小白避坑手册」弹窗的标题与副标题。">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="标题">
            <input
              value={guide.title}
              onChange={(event) => patch({ title: event.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="副标题">
            <input
              value={guide.subtitle}
              onChange={(event) => patch({ subtitle: event.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="底部按钮文字">
            <input
              value={guide.closeLabel}
              onChange={(event) => patch({ closeLabel: event.target.value })}
              className={inputClass}
            />
          </Field>
        </div>
      </SectionCard>

      <SectionCard
        title="避坑条目"
        description="正文支持 **加粗** 与 [链接文字](https://example.com) 语法。"
        actions={
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              patch({
                rules: [
                  ...guide.rules,
                  { icon: 'shield-alert', title: '新条目', body: '' },
                ],
              })
            }
          >
            <Plus className="h-3 w-3" />
            添加条目
          </Button>
        }
      >
        {guide.rules.length === 0 ? (
          <p className="text-[11px] font-sans text-obsidian-500">暂无条目。</p>
        ) : (
          <div className="space-y-3">
            {guide.rules.map((rule, index) => (
              <div
                key={index}
                className="rounded-lg border border-obsidian-850 bg-obsidian-950/50 p-3"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-obsidian-500">条目 {index + 1}</span>
                  <RowActions
                    index={index}
                    total={guide.rules.length}
                    onMove={(direction) => patch({ rules: move(guide.rules, index, direction) })}
                    onRemove={() =>
                      patch({
                        rules: guide.rules.filter((_, ruleIndex) => ruleIndex !== index),
                      })
                    }
                    label="条目"
                  />
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-[160px_1fr]">
                  <Field label="图标">
                    <select
                      value={rule.icon}
                      onChange={(event) =>
                        updateRule(index, { icon: event.target.value as GuideRule['icon'] })
                      }
                      className={selectClass}
                    >
                      <option value="shield-alert">盾牌警告</option>
                      <option value="lock">锁</option>
                      <option value="help">问号</option>
                    </select>
                  </Field>
                  <Field label="标题">
                    <input
                      value={rule.title}
                      onChange={(event) => updateRule(index, { title: event.target.value })}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="正文" className="md:col-span-2">
                    <textarea
                      value={rule.body}
                      onChange={(event) => updateRule(index, { body: event.target.value })}
                      className={textareaClass}
                    />
                  </Field>
                </div>
                {rule.body.trim() && (
                  <div className="mt-2 rounded-lg border border-obsidian-800 bg-obsidian-900/60 px-3 py-2">
                    <span className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-obsidian-500">
                      预览
                    </span>
                    <p className="font-sans text-[11px] leading-relaxed text-obsidian-300">
                      <RichText text={rule.body} />
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
};

/* ---------------------------------- site ----------------------------------- */

interface SitePanelProps {
  site: SiteMeta;
  onChange: (site: SiteMeta) => void;
}

export const SitePanel: React.FC<SitePanelProps> = ({ site, onChange }) => {
  const { jiakuan } = site;

  const patch = (partial: Partial<SiteMeta>) => onChange({ ...site, ...partial });
  const patchJiakuan = (partial: Partial<SiteMeta['jiakuan']>) =>
    patch({ jiakuan: { ...jiakuan, ...partial } });

  return (
    <div className="space-y-4">
      <SectionCard title="站点信息" description="导航栏品牌名称与居中的宣传语。">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="品牌名称">
            <input
              value={site.brand}
              onChange={(event) => patch({ brand: event.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="导航栏宣传语">
            <input
              value={site.notice}
              onChange={(event) => patch({ notice: event.target.value })}
              className={inputClass}
            />
          </Field>
        </div>
      </SectionCard>

      <SectionCard
        title="家宽导航按钮"
        description="导航栏右侧的入口按钮，可随时隐藏或调整文案与链接。"
        actions={
          <label className="flex items-center gap-2 text-[11px] font-sans text-obsidian-300">
            <input
              type="checkbox"
              checked={jiakuan.enabled}
              onChange={(event) => patchJiakuan({ enabled: event.target.checked })}
              className="h-3.5 w-3.5 accent-white"
            />
            显示按钮
          </label>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="按钮文字">
            <input
              value={jiakuan.label}
              onChange={(event) => patchJiakuan({ label: event.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="跳转地址">
            <input
              value={jiakuan.url}
              onChange={(event) => patchJiakuan({ url: event.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="Logo 图片路径">
            <input
              value={jiakuan.logo}
              onChange={(event) => patchJiakuan({ logo: event.target.value })}
              className={inputClass}
              placeholder="/images/jiakuan-logo.png"
            />
          </Field>
          <Field label="鼠标悬停提示">
            <input
              value={jiakuan.title}
              onChange={(event) => patchJiakuan({ title: event.target.value })}
              className={inputClass}
            />
          </Field>
        </div>

        <div className="mt-4 rounded-lg border border-obsidian-800 bg-obsidian-950/70 p-4">
          <span className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-obsidian-500">
            按钮预览
          </span>
          {jiakuan.enabled ? (
            <a
              href={jiakuan.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-obsidian-800 bg-obsidian-900/80 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:border-obsidian-700 hover:bg-obsidian-850"
              title={jiakuan.title}
            >
              {jiakuan.logo && (
                <img
                  src={jiakuan.logo}
                  alt={jiakuan.label}
                  className="h-[11px] w-[11px] rounded-[2px] object-contain"
                />
              )}
              <span className="font-sans font-medium">{jiakuan.label}</span>
              <ExternalLink className="h-3 w-3 text-obsidian-400" />
            </a>
          ) : (
            <span className="text-[11px] font-sans text-obsidian-500">按钮已隐藏</span>
          )}
        </div>
      </SectionCard>

      <SectionCard title="CMS 访问方式" description="无需绑定固定域名，任意指向本站的域名均可访问。">
        <div className="space-y-2 text-[11px] font-sans leading-relaxed text-obsidian-400">
          <p>
            在任意已部署域名的末尾加上{' '}
            <code className="rounded bg-obsidian-950 px-1.5 py-0.5 font-mono text-obsidian-200">
              /dtms
            </code>{' '}
            即可打开此内容管理台，例如：
          </p>
          <p className="font-mono text-obsidian-300">
            {typeof window !== 'undefined' ? window.location.origin : ''}/dtms
          </p>
          <p className="text-obsidian-500">
            内容修改后会通过 GitHub Personal Access Token 提交到仓库，部署完成后全站生效。
          </p>
        </div>
      </SectionCard>
    </div>
  );
};
