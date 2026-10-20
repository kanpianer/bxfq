import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  Code2,
  GripVertical,
  ImagePlus,
  Loader2,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import type {
  ContactInfo,
  DownloadLink,
  EntityType,
  Platform,
  QuickStartStep,
  ToolStatus,
  ToolVisibility,
  VPNTool,
} from '../types';
import { getToolVisibility } from '../types';
import { ToolLogo } from '../components/ToolLogo';
import {
  Badge,
  Button,
  Field,
  IconButton,
  SectionCard,
  VISIBILITY_META,
  inputClass,
  labelClass,
  selectClass,
  textareaClass,
} from './CmsUI';

interface ToolEditorProps {
  tool: VPNTool;
  allIds: string[];
  onChange: (tool: VPNTool) => void;
  onBack: () => void;
  onDelete: () => void;
}

const PLATFORM_OPTIONS: { value: Platform; label: string }[] = [
  { value: 'android', label: 'Android' },
  { value: 'ios', label: 'iOS' },
  { value: 'windows', label: 'Windows' },
  { value: 'macos', label: 'macOS' },
  { value: 'linux', label: 'Linux' },
  { value: 'appletv', label: 'Apple TV' },
  { value: 'browser', label: '浏览器扩展' },
];

const ENTITY_OPTIONS: { value: EntityType; label: string }[] = [
  { value: 'non-profit', label: '非盈利性机构 / 非营利机构发起' },
  { value: 'non-profit-supervised', label: '非盈利性机构监督' },
  { value: 'commercial', label: '商业机构 / 盈利性机构' },
  { value: 'self-organized', label: '自组织机构' },
];

const CONTACT_OPTIONS: ContactInfo['type'][] = [
  'telegram',
  'twitter',
  'bluesky',
  'youtube',
  'email',
  'github',
  'gitlab',
  'website',
];

const statusOptions: { value: ToolStatus; label: string }[] = [
  { value: 'available', label: '可用' },
  { value: 'needs-bridge', label: '需配置网桥' },
];

const move = <T,>(items: T[], index: number, direction: -1 | 1): T[] => {
  const target = index + direction;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
};

const splitLines = (value: string): string[] => value.split('\n');

/** 自定义 Logo 压缩后的最长边（像素），足以覆盖卡片与详情页 2x 显示 */
const MAX_LOGO_DIMENSION = 256;
/** SVG 通常很小，直接内联，不经过位图压缩 */
const MAX_INLINE_SVG_BYTES = 100 * 1024;

const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('读取图片文件失败'));
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(file);
  });

/**
 * 将上传的图片压缩为适合内嵌进 content.json 的 data URL：
 * 最长边缩放到 MAX_LOGO_DIMENSION，优先导出 WebP，不支持时回退 PNG。
 */
const compressImageFile = async (file: File): Promise<string> => {
  if (file.type === 'image/svg+xml') {
    if (file.size > MAX_INLINE_SVG_BYTES) {
      throw new Error('SVG 体积过大（超过 100KB），请压缩后再上传');
    }
    return readFileAsDataUrl(file);
  }

  const rawDataUrl = await readFileAsDataUrl(file);
  const img = new window.Image();
  img.decoding = 'sync';
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('图片解析失败，请更换图片文件'));
    img.src = rawDataUrl;
  });

  const scale = Math.min(1, MAX_LOGO_DIMENSION / Math.max(img.width || 1, img.height || 1));
  const width = Math.max(1, Math.round((img.width || 1) * scale));
  const height = Math.max(1, Math.round((img.height || 1) * scale));
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('当前浏览器不支持图片压缩');
  ctx.drawImage(img, 0, 0, width, height);

  const webpUrl = canvas.toDataURL('image/webp', 0.9);
  return webpUrl.startsWith('data:image/webp') ? webpUrl : canvas.toDataURL('image/png');
};

const ListHeader: React.FC<{ title: string; onAdd: () => void; addLabel: string }> = ({
  title,
  onAdd,
  addLabel,
}) => (
  <div className="mb-3 flex items-center justify-between gap-2">
    <span className="text-[11px] font-mono uppercase tracking-wider text-obsidian-400">
      {title}
    </span>
    <Button size="sm" variant="ghost" onClick={onAdd}>
      <Plus className="h-3 w-3" />
      {addLabel}
    </Button>
  </div>
);

export const ToolEditor: React.FC<ToolEditorProps> = ({
  tool,
  allIds,
  onChange,
  onBack,
  onDelete,
}) => {
  const [aliasText, setAliasText] = useState((tool.aliases || []).join(', '));
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [jsonText, setJsonText] = useState('');
  const [jsonError, setJsonError] = useState('');
  const [idError, setIdError] = useState('');
  const [logoUploading, setLogoUploading] = useState(false);
  const [logoError, setLogoError] = useState('');
  const logoFileRef = useRef<HTMLInputElement>(null);

  const visibility = getToolVisibility(tool);

  useEffect(() => {
    setAliasText((tool.aliases || []).join(', '));
  }, [tool.id]);

  const patch = (partial: Partial<VPNTool>) => {
    onChange({ ...tool, ...partial });
  };

  const handleLogoFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // 允许重复选择同一张图片
    event.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setLogoError('请选择图片文件（支持 PNG / JPG / WebP / SVG）');
      return;
    }
    setLogoUploading(true);
    setLogoError('');
    try {
      const dataUrl = await compressImageFile(file);
      patch({ logo: dataUrl });
    } catch (error) {
      setLogoError(error instanceof Error ? error.message : '图片处理失败，请重试');
    } finally {
      setLogoUploading(false);
    }
  };

  const updateId = (value: string) => {
    const nextId = value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    if (nextId && allIds.some((id) => id === nextId && id !== tool.id)) {
      setIdError('该 ID 已被其他项目使用');
      return;
    }
    setIdError('');
    patch({ id: nextId });
  };

  const togglePlatform = (platform: Platform) => {
    const platforms = tool.platforms.includes(platform)
      ? tool.platforms.filter((item) => item !== platform)
      : [...tool.platforms, platform];
    patch({ platforms });
  };

  const updateLink = (index: number, partial: Partial<DownloadLink>) => {
    patch({
      downloadLinks: tool.downloadLinks.map((link, linkIndex) =>
        linkIndex === index ? { ...link, ...partial } : link
      ),
    });
  };

  const addLink = () => {
    patch({
      downloadLinks: [
        ...tool.downloadLinks,
        { label: '新下载链接', url: '', platform: 'android', note: '' },
      ],
    });
  };

  const updateStep = (index: number, partial: Partial<QuickStartStep>) => {
    patch({
      quickStartSteps: tool.quickStartSteps.map((step, stepIndex) =>
        stepIndex === index ? { ...step, ...partial } : step
      ),
    });
  };

  const addStep = () => {
    patch({
      quickStartSteps: [
        ...tool.quickStartSteps,
        { step: tool.quickStartSteps.length + 1, title: '新步骤', desc: '' },
      ],
    });
  };

  const updateGuide = (
    index: number,
    partial: Partial<VPNTool['detailedGuide'][number]>
  ) => {
    patch({
      detailedGuide: tool.detailedGuide.map((group, groupIndex) =>
        groupIndex === index ? { ...group, ...partial } : group
      ),
    });
  };

  const addGuide = () => {
    patch({
      detailedGuide: [...tool.detailedGuide, { title: '新分组', content: [], tips: [] }],
    });
  };

  const updateContact = (index: number, partial: Partial<ContactInfo>) => {
    patch({
      contacts: (tool.contacts || []).map((contact, contactIndex) =>
        contactIndex === index ? { ...contact, ...partial } : contact
      ),
    });
  };

  const addContact = () => {
    patch({
      contacts: [...(tool.contacts || []), { type: 'website', label: '官方网址', value: '' }],
    });
  };

  const updateMirror = (index: number, partial: Partial<NonNullable<VPNTool['mirrors']>[number]>) => {
    patch({
      mirrors: (tool.mirrors || []).map((mirror, mirrorIndex) =>
        mirrorIndex === index ? { ...mirror, ...partial } : mirror
      ),
    });
  };

  const openAdvanced = () => {
    setJsonText(JSON.stringify(tool, null, 2));
    setJsonError('');
    setAdvancedOpen(true);
  };

  const applyAdvanced = () => {
    try {
      const parsed = JSON.parse(jsonText) as VPNTool;
      if (!parsed || typeof parsed !== 'object' || !parsed.id || !parsed.name) {
        throw new Error('JSON 必须包含 id 与 name 字段');
      }
      if (!Array.isArray(parsed.platforms) || !Array.isArray(parsed.downloadLinks)) {
        throw new Error('platforms 与 downloadLinks 必须是数组');
      }
      onChange(parsed);
      setAdvancedOpen(false);
      setJsonError('');
    } catch (error) {
      setJsonError(error instanceof Error ? error.message : 'JSON 解析失败');
    }
  };

  const bridges = tool.bridges;
  const enabled = useMemo(() => Boolean(bridges), [bridges]);

  return (
    <div className="space-y-4">
      {/* Editor header */}
      <div className="sticky top-14 z-30 -mx-3 flex flex-wrap items-center justify-between gap-3 border-b border-obsidian-800 bg-obsidian-950/95 px-3 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-3.5 w-3.5" />
            返回列表
          </Button>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="truncate font-sans text-sm font-bold text-white">
                {tool.name || '未命名项目'}
              </h2>
              <Badge className={VISIBILITY_META[visibility].badgeClass}>
                {VISIBILITY_META[visibility].label}
              </Badge>
            </div>
            <p className="truncate font-mono text-[10px] text-obsidian-500">#{tool.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={openAdvanced}>
            <Code2 className="h-3.5 w-3.5" />
            高级 JSON
          </Button>
          <Button variant="danger" size="sm" onClick={onDelete}>
            <Trash2 className="h-3.5 w-3.5" />
            删除
          </Button>
          <Button variant="primary" size="sm" onClick={onBack}>
            <Check className="h-3.5 w-3.5" />
            完成编辑
          </Button>
        </div>
      </div>

      {advancedOpen && (
        <SectionCard
          title="高级 JSON"
          description="直接编辑该项目的完整 JSON。适合批量修改嵌套结构，应用后仍会标记为待提交。"
          actions={
            <IconButton title="关闭" onClick={() => setAdvancedOpen(false)}>
              <X className="h-3.5 w-3.5" />
            </IconButton>
          }
        >
          <textarea
            value={jsonText}
            onChange={(event) => setJsonText(event.target.value)}
            className={`${textareaClass} min-h-[360px] font-mono text-[11px]`}
            spellCheck={false}
          />
          {jsonError && (
            <p className="mt-2 rounded-lg border border-red-900/60 bg-red-950/30 px-3 py-2 text-[11px] text-red-300">
              {jsonError}
            </p>
          )}
          <div className="mt-3 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setAdvancedOpen(false)}>
              取消
            </Button>
            <Button variant="primary" onClick={applyAdvanced}>
              应用 JSON
            </Button>
          </div>
        </SectionCard>
      )}

      {/* Basic info */}
      <SectionCard title="基础信息" description="项目名称、定位与开发主体。">
        {/* Custom logo */}
        <div className="mb-4 flex flex-col gap-3 rounded-lg border border-obsidian-850 bg-obsidian-950/50 p-3 sm:flex-row sm:items-start">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-obsidian-750 bg-obsidian-950">
            {logoUploading ? (
              <Loader2 className="h-6 w-6 animate-spin text-obsidian-400" />
            ) : (
              <ToolLogo tool={tool} className="h-8 w-8" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <span className={labelClass}>项目 Logo（可选）</span>
              {tool.logo && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setLogoError('');
                    patch({ logo: undefined });
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                  清除
                </Button>
              )}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                value={tool.logo || ''}
                onChange={(event) => {
                  setLogoError('');
                  patch({ logo: event.target.value.trim() || undefined });
                }}
                className={inputClass}
                placeholder="粘贴图片地址 https://…/logo.png，或点击右侧上传"
              />
              <Button
                size="sm"
                variant="ghost"
                className="shrink-0"
                disabled={logoUploading}
                onClick={() => logoFileRef.current?.click()}
              >
                <ImagePlus className="h-3 w-3" />
                上传图片
              </Button>
              <input
                ref={logoFileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoFile}
              />
            </div>
            <p className="mt-1 text-[11px] font-sans text-obsidian-500">
              {logoError
                ? <span className="text-red-300">{logoError}</span>
                : '展示在卡片与详情页。上传的图片会自动压缩到 256px 并存入内容文件；未设置时使用内置 Logo。'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="项目名称">
            <input
              value={tool.name}
              onChange={(event) => patch({ name: event.target.value })}
              className={inputClass}
              placeholder="例如：OpenRung"
            />
          </Field>
          <Field
            label="项目 ID"
            hint={idError || '用于链接锚点与 Logo 匹配，建议使用小写英文与短横线。'}
          >
            <input
              value={tool.id}
              onChange={(event) => updateId(event.target.value)}
              className={`${inputClass} ${idError ? 'border-red-800' : ''}`}
              placeholder="openrung"
            />
          </Field>
          <Field label="一句话标语" className="md:col-span-2">
            <input
              value={tool.tagline}
              onChange={(event) => patch({ tagline: event.target.value })}
              className={inputClass}
              placeholder="纯开源社区驱动的抗封锁自由网络阶梯…"
            />
          </Field>
          <Field label="别名 / 搜索关键词" hint="使用英文逗号分隔，例如：Lantern, 蓝灯, 灯笼">
            <input
              value={aliasText}
              onChange={(event) => {
                const value = event.target.value;
                setAliasText(value);
                patch({
                  aliases: value
                    .split(/[,，]/)
                    .map((alias) => alias.trim())
                    .filter(Boolean),
                });
              }}
              className={inputClass}
            />
          </Field>
          <Field label="卡片角标（可选）" hint="显示在项目名称旁的简短标签，如「老牌抗封锁」。">
            <input
              value={tool.badgeNote || ''}
              onChange={(event) => patch({ badgeNote: event.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="资助与开发主体类型">
            <select
              value={tool.entityType}
              onChange={(event) =>
                patch({
                  entityType: event.target.value as EntityType,
                  entityLabel:
                    ENTITY_OPTIONS.find((option) => option.value === event.target.value)?.label ||
                    tool.entityLabel,
                })
              }
              className={selectClass}
            >
              {ENTITY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="主体标签" hint="卡片上展示的短语，如「非盈利性机构」。">
            <input
              value={tool.entityLabel}
              onChange={(event) => patch({ entityLabel: event.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="主体描述" className="md:col-span-2">
            <textarea
              value={tool.entityDescription}
              onChange={(event) => patch({ entityDescription: event.target.value })}
              className={textareaClass}
            />
          </Field>
          <Field label="速度评级">
            <select
              value={tool.speedRating || ''}
              onChange={(event) =>
                patch({ speedRating: (event.target.value || undefined) as VPNTool['speedRating'] })
              }
              className={selectClass}
            >
              <option value="">未标注</option>
              <option value="high">高速</option>
              <option value="medium">中等</option>
              <option value="moderate">一般 / 较慢</option>
              <option value="slow">慢</option>
            </select>
          </Field>
          <Field label="安全评级说明">
            <input
              value={tool.securityRating || ''}
              onChange={(event) => patch({ securityRating: event.target.value })}
              className={inputClass}
            />
          </Field>
        </div>
      </SectionCard>

      {/* Visibility & status */}
      <SectionCard
        title="展示状态"
        description="控制项目在网站上的呈现方式，以及卡片状态徽标。"
      >
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {(Object.keys(VISIBILITY_META) as ToolVisibility[]).map((value) => {
            const meta = VISIBILITY_META[value];
            const active = visibility === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => patch({ visibility: value })}
                className={`rounded-lg border p-3 text-left transition-colors ${
                  active
                    ? 'border-white/30 bg-white/5'
                    : 'border-obsidian-800 bg-obsidian-950/50 hover:border-obsidian-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${meta.dotClass}`} />
                  <span className="font-sans text-xs font-semibold text-white">{meta.label}</span>
                  {active && <Check className="ml-auto h-3.5 w-3.5 text-white" />}
                </div>
                <p className="mt-1.5 text-[11px] font-sans leading-relaxed text-obsidian-500">
                  {meta.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="连接状态">
            <select
              value={tool.status}
              onChange={(event) => patch({ status: event.target.value as ToolStatus })}
              className={selectClass}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="状态徽标文字" hint="显示在卡片右上角，例如「稳定可用」。">
            <input
              value={tool.statusText}
              onChange={(event) => patch({ statusText: event.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="状态补充说明" className="md:col-span-2" hint="当项目暂不可用时，在详情页展示的原因说明。">
            <textarea
              value={tool.statusNote || ''}
              onChange={(event) => patch({ statusNote: event.target.value })}
              className={textareaClass}
              placeholder="该项目当前在中国大陆网络环境下暂不可用…"
            />
          </Field>
          <Field label="费用模式">
            <input
              value={tool.pricingModel}
              onChange={(event) => patch({ pricingModel: event.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="官方网站">
            <input
              value={tool.officialUrl}
              onChange={(event) => patch({ officialUrl: event.target.value })}
              className={inputClass}
              placeholder="https://example.com"
            />
          </Field>
          <Field label="支持平台" className="md:col-span-2">
            <div className="flex flex-wrap gap-2">
              {PLATFORM_OPTIONS.map((platform) => {
                const checked = tool.platforms.includes(platform.value);
                return (
                  <button
                    key={platform.value}
                    type="button"
                    onClick={() => togglePlatform(platform.value)}
                    className={`rounded-full border px-3 py-1.5 text-[11px] font-mono transition-colors ${
                      checked
                        ? 'border-white/30 bg-white/10 text-white'
                        : 'border-obsidian-800 bg-obsidian-950/50 text-obsidian-400 hover:border-obsidian-700'
                    }`}
                  >
                    {platform.label}
                  </button>
                );
              })}
            </div>
          </Field>
        </div>
      </SectionCard>

      {/* Download links */}
      <SectionCard
        title="下载链接"
        description="官网、商店与镜像下载入口，支持标记直链 / 镜像。"
        actions={
          <Button size="sm" variant="ghost" onClick={addLink}>
            <Plus className="h-3 w-3" />
            添加链接
          </Button>
        }
      >
        {tool.downloadLinks.length === 0 ? (
          <p className="text-[11px] font-sans text-obsidian-500">暂无下载链接，点击右上角添加。</p>
        ) : (
          <div className="space-y-3">
            {tool.downloadLinks.map((link, index) => (
              <div
                key={index}
                className="rounded-lg border border-obsidian-850 bg-obsidian-950/50 p-3"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-obsidian-500">链接 {index + 1}</span>
                  <IconButton
                    title="删除链接"
                    danger
                    onClick={() =>
                      patch({
                        downloadLinks: tool.downloadLinks.filter(
                          (_, linkIndex) => linkIndex !== index
                        ),
                      })
                    }
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </IconButton>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Field label="按钮文字">
                    <input
                      value={link.label}
                      onChange={(event) => updateLink(index, { label: event.target.value })}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="链接地址">
                    <input
                      value={link.url}
                      onChange={(event) => updateLink(index, { url: event.target.value })}
                      className={inputClass}
                      placeholder="https://…"
                    />
                  </Field>
                  <Field label="平台">
                    <select
                      value={link.platform}
                      onChange={(event) =>
                        updateLink(index, { platform: event.target.value as Platform })
                      }
                      className={selectClass}
                    >
                      {PLATFORM_OPTIONS.map((platform) => (
                        <option key={platform.value} value={platform.value}>
                          {platform.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="备注">
                    <input
                      value={link.note || ''}
                      onChange={(event) => updateLink(index, { note: event.target.value })}
                      className={inputClass}
                    />
                  </Field>
                  <div className="flex items-center gap-5 md:col-span-2">
                    <label className="flex items-center gap-2 text-[11px] font-sans text-obsidian-300">
                      <input
                        type="checkbox"
                        checked={Boolean(link.isDirect)}
                        onChange={(event) => updateLink(index, { isDirect: event.target.checked })}
                        className="h-3.5 w-3.5 accent-white"
                      />
                      官方直链
                    </label>
                    <label className="flex items-center gap-2 text-[11px] font-sans text-obsidian-300">
                      <input
                        type="checkbox"
                        checked={Boolean(link.isMirror)}
                        onChange={(event) => updateLink(index, { isMirror: event.target.checked })}
                        className="h-3.5 w-3.5 accent-white"
                      />
                      镜像 / 备用
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Mirrors */}
      <SectionCard
        title="镜像站点（可选）"
        description="免翻墙备用镜像，展示在详情页。"
        actions={
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              patch({
                mirrors: [
                  ...(tool.mirrors || []),
                  { name: '新镜像站', url: '', description: '' },
                ],
              })
            }
          >
            <Plus className="h-3 w-3" />
            添加镜像
          </Button>
        }
      >
        {(tool.mirrors || []).length === 0 ? (
          <p className="text-[11px] font-sans text-obsidian-500">暂无镜像站点。</p>
        ) : (
          <div className="space-y-3">
            {(tool.mirrors || []).map((mirror, index) => (
              <div key={index} className="rounded-lg border border-obsidian-850 bg-obsidian-950/50 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-obsidian-500">镜像 {index + 1}</span>
                  <IconButton
                    title="删除镜像"
                    danger
                    onClick={() =>
                      patch({
                        mirrors: (tool.mirrors || []).filter(
                          (_, mirrorIndex) => mirrorIndex !== index
                        ),
                      })
                    }
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </IconButton>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Field label="名称">
                    <input
                      value={mirror.name}
                      onChange={(event) => updateMirror(index, { name: event.target.value })}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="地址">
                    <input
                      value={mirror.url}
                      onChange={(event) => updateMirror(index, { url: event.target.value })}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="说明" className="md:col-span-2">
                    <textarea
                      value={mirror.description}
                      onChange={(event) => updateMirror(index, { description: event.target.value })}
                      className={textareaClass}
                    />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Bridges */}
      <SectionCard
        title="网桥配置（可选）"
        description="仅需配置网桥的项目（如 Tor）使用。"
        actions={
          <label className="flex items-center gap-2 text-[11px] font-sans text-obsidian-300">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(event) =>
                patch({
                  bridges: event.target.checked
                    ? {
                        title: '国内突破网络封锁必须：添加 Bridges（网桥）',
                        description: '',
                        methods: [],
                      }
                    : undefined,
                })
              }
              className="h-3.5 w-3.5 accent-white"
            />
            启用网桥说明
          </label>
        }
      >
        {!bridges ? (
          <p className="text-[11px] font-sans text-obsidian-500">未启用网桥配置。</p>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Field label="标题" className="md:col-span-2">
                <input
                  value={bridges.title}
                  onChange={(event) =>
                    patch({ bridges: { ...bridges, title: event.target.value } })
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="说明" className="md:col-span-2">
                <textarea
                  value={bridges.description}
                  onChange={(event) =>
                    patch({ bridges: { ...bridges, description: event.target.value } })
                  }
                  className={textareaClass}
                />
              </Field>
              <Field label="教程链接（可选）" className="md:col-span-2">
                <input
                  value={bridges.tutorialUrl || ''}
                  onChange={(event) =>
                    patch({ bridges: { ...bridges, tutorialUrl: event.target.value } })
                  }
                  className={inputClass}
                />
              </Field>
            </div>

            <ListHeader
              title="获取方式"
              addLabel="添加方式"
              onAdd={() =>
                patch({
                  bridges: {
                    ...bridges,
                    methods: [
                      ...bridges.methods,
                      { channel: '新方式', instruction: '', target: '', type: 'link' },
                    ],
                  },
                })
              }
            />
            <div className="space-y-3">
              {bridges.methods.map((method, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-obsidian-850 bg-obsidian-950/50 p-3"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-obsidian-500">
                      方式 {index + 1}
                    </span>
                    <IconButton
                      title="删除方式"
                      danger
                      onClick={() =>
                        patch({
                          bridges: {
                            ...bridges,
                            methods: bridges.methods.filter(
                              (_, methodIndex) => methodIndex !== index
                            ),
                          },
                        })
                      }
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </IconButton>
                  </div>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <Field label="渠道名称">
                      <input
                        value={method.channel}
                        onChange={(event) =>
                          patch({
                            bridges: {
                              ...bridges,
                              methods: bridges.methods.map((item, methodIndex) =>
                                methodIndex === index
                                  ? { ...item, channel: event.target.value }
                                  : item
                              ),
                            },
                          })
                        }
                        className={inputClass}
                      />
                    </Field>
                    <Field label="类型">
                      <select
                        value={method.type}
                        onChange={(event) =>
                          patch({
                            bridges: {
                              ...bridges,
                              methods: bridges.methods.map((item, methodIndex) =>
                                methodIndex === index
                                  ? {
                                      ...item,
                                      type: event.target.value as typeof method.type,
                                    }
                                  : item
                              ),
                            },
                          })
                        }
                        className={selectClass}
                      >
                        <option value="link">链接</option>
                        <option value="email">邮箱</option>
                        <option value="telegram">Telegram</option>
                        <option value="text">纯文本</option>
                      </select>
                    </Field>
                    <Field label="目标 / 地址" className="md:col-span-2">
                      <input
                        value={method.target}
                        onChange={(event) =>
                          patch({
                            bridges: {
                              ...bridges,
                              methods: bridges.methods.map((item, methodIndex) =>
                                methodIndex === index
                                  ? { ...item, target: event.target.value }
                                  : item
                              ),
                            },
                          })
                        }
                        className={inputClass}
                      />
                    </Field>
                    <Field label="操作说明" className="md:col-span-2">
                      <textarea
                        value={method.instruction}
                        onChange={(event) =>
                          patch({
                            bridges: {
                              ...bridges,
                              methods: bridges.methods.map((item, methodIndex) =>
                                methodIndex === index
                                  ? { ...item, instruction: event.target.value }
                                  : item
                              ),
                            },
                          })
                        }
                        className={textareaClass}
                      />
                    </Field>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </SectionCard>

      {/* Quick start */}
      <SectionCard
        title="快速上手步骤"
        description="详情页的三步上手引导，序号按顺序自动生成。"
        actions={
          <Button size="sm" variant="ghost" onClick={addStep}>
            <Plus className="h-3 w-3" />
            添加步骤
          </Button>
        }
      >
        {tool.quickStartSteps.length === 0 ? (
          <p className="text-[11px] font-sans text-obsidian-500">暂无步骤。</p>
        ) : (
          <div className="space-y-3">
            {tool.quickStartSteps.map((step, index) => (
              <div key={index} className="rounded-lg border border-obsidian-850 bg-obsidian-950/50 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-mono text-[10px] text-obsidian-500">
                    <GripVertical className="h-3 w-3" />步骤 {index + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    <IconButton
                      title="上移"
                      disabled={index === 0}
                      onClick={() => patch({ quickStartSteps: move(tool.quickStartSteps, index, -1) })}
                    >
                      <ChevronUp className="h-3.5 w-3.5" />
                    </IconButton>
                    <IconButton
                      title="下移"
                      disabled={index === tool.quickStartSteps.length - 1}
                      onClick={() => patch({ quickStartSteps: move(tool.quickStartSteps, index, 1) })}
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </IconButton>
                    <IconButton
                      title="删除步骤"
                      danger
                      onClick={() =>
                        patch({
                          quickStartSteps: tool.quickStartSteps.filter(
                            (_, stepIndex) => stepIndex !== index
                          ),
                        })
                      }
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </IconButton>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <Field label="标题">
                    <input
                      value={step.title}
                      onChange={(event) =>
                        updateStep(index, { title: event.target.value, step: index + 1 })
                      }
                      className={inputClass}
                    />
                  </Field>
                  <Field label="说明">
                    <textarea
                      value={step.desc}
                      onChange={(event) => updateStep(index, { desc: event.target.value })}
                      className={textareaClass}
                    />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Detailed guide */}
      <SectionCard
        title="详细指南"
        description="详情页的深入说明，每组包含正文段落与提示。"
        actions={
          <Button size="sm" variant="ghost" onClick={addGuide}>
            <Plus className="h-3 w-3" />
            添加分组
          </Button>
        }
      >
        {tool.detailedGuide.length === 0 ? (
          <p className="text-[11px] font-sans text-obsidian-500">暂无详细指南。</p>
        ) : (
          <div className="space-y-3">
            {tool.detailedGuide.map((group, index) => (
              <div key={index} className="rounded-lg border border-obsidian-850 bg-obsidian-950/50 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-obsidian-500">分组 {index + 1}</span>
                  <IconButton
                    title="删除分组"
                    danger
                    onClick={() =>
                      patch({
                        detailedGuide: tool.detailedGuide.filter(
                          (_, groupIndex) => groupIndex !== index
                        ),
                      })
                    }
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </IconButton>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <Field label="分组标题">
                    <input
                      value={group.title}
                      onChange={(event) => updateGuide(index, { title: event.target.value })}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="正文段落" hint="每行一段。">
                    <textarea
                      value={group.content.join('\n')}
                      onChange={(event) =>
                        updateGuide(index, { content: splitLines(event.target.value) })
                      }
                      className={textareaClass}
                    />
                  </Field>
                  <Field label="提示（可选）" hint="每行一条。">
                    <textarea
                      value={(group.tips || []).join('\n')}
                      onChange={(event) =>
                        updateGuide(index, { tips: splitLines(event.target.value) })
                      }
                      className={textareaClass}
                    />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Contacts */}
      <SectionCard
        title="联系方式"
        description="官网、Telegram、GitHub 等联系方式。"
        actions={
          <Button size="sm" variant="ghost" onClick={addContact}>
            <Plus className="h-3 w-3" />
            添加联系方式
          </Button>
        }
      >
        {(tool.contacts || []).length === 0 ? (
          <p className="text-[11px] font-sans text-obsidian-500">暂无联系方式。</p>
        ) : (
          <div className="space-y-2">
            {(tool.contacts || []).map((contact, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-2 rounded-lg border border-obsidian-850 bg-obsidian-950/50 p-3 sm:grid-cols-[130px_1fr_1fr_auto] sm:items-end"
              >
                <Field label="类型">
                  <select
                    value={contact.type}
                    onChange={(event) =>
                      updateContact(index, { type: event.target.value as ContactInfo['type'] })
                    }
                    className={selectClass}
                  >
                    {CONTACT_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="标签">
                  <input
                    value={contact.label}
                    onChange={(event) => updateContact(index, { label: event.target.value })}
                    className={inputClass}
                  />
                </Field>
                <Field label="地址 / 值">
                  <input
                    value={contact.value}
                    onChange={(event) => updateContact(index, { value: event.target.value })}
                    className={inputClass}
                  />
                </Field>
                <IconButton
                  title="删除联系方式"
                  danger
                  className="mb-1"
                  onClick={() =>
                    patch({
                      contacts: (tool.contacts || []).filter(
                        (_, contactIndex) => contactIndex !== index
                      ),
                    })
                  }
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </IconButton>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <div className="flex items-center justify-between border-t border-obsidian-850 pt-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-3.5 w-3.5" />
          返回项目列表
        </Button>
        <Button variant="primary" onClick={onBack}>
          <Check className="h-3.5 w-3.5" />
          完成编辑
        </Button>
      </div>
    </div>
  );
};
