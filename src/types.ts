export type Platform = 'android' | 'ios' | 'windows' | 'macos' | 'linux' | 'appletv' | 'browser';

export type EntityType = 
  | 'non-profit'             // 非盈利性机构 / 非营利机构发起
  | 'non-profit-supervised'  // 非盈利性机构监督
  | 'commercial'            // 商业机构 / 盈利性机构
  | 'self-organized';       // 自组织机构

export type ToolStatus = 'available' | 'needs-bridge' | 'unavailable';

/**
 * 项目在网站上的展示状态：
 * - visible:     正常展示
 * - unavailable: 灰色显示（暂不可用）
 * - hidden:      完全不展示
 */
export type ToolVisibility = 'visible' | 'unavailable' | 'hidden';

export interface DownloadLink {
  label: string;
  url: string;
  platform: Platform;
  isDirect?: boolean;
  isMirror?: boolean;
  note?: string;
}

export interface MirrorSource {
  name: string;
  url: string;
  description: string;
}

export interface BridgeMethod {
  channel: string;
  instruction: string;
  target: string;
  type: 'link' | 'email' | 'telegram' | 'text';
}

export interface QuickStartStep {
  step: number;
  title: string;
  desc: string;
}

export interface ContactInfo {
  type: 'telegram' | 'twitter' | 'bluesky' | 'youtube' | 'email' | 'github' | 'gitlab' | 'website';
  label: string;
  value: string;
}

export interface VPNTool {
  id: string;
  name: string;
  aliases?: string[];
  tagline: string;
  /**
   * 自定义项目 Logo（可选）：
   * 支持图片 URL 或 data URL（CMS 内上传的图片会被压缩为 data URL 存储）。
   * 未设置时回退到代码内置的 ToolLogoMap，再回退到通用盾牌图标。
   */
  logo?: string;
  entityType: EntityType;
  entityLabel: string;
  entityDescription: string;
  /** 展示状态，缺省时兼容旧的 available 字段 */
  visibility?: ToolVisibility;
  /** @deprecated 旧字段，仅用于兼容历史数据 */
  available?: boolean;
  /** @deprecated 旧字段，仅用于兼容历史数据 */
  isAvailable?: boolean;
  status: ToolStatus;
  statusText: string;
  statusNote?: string;
  pricingModel: string;
  platforms: Platform[];
  officialUrl: string;
  downloadLinks: DownloadLink[];
  mirrors?: MirrorSource[];
  bridges?: {
    title: string;
    description: string;
    methods: BridgeMethod[];
    tutorialUrl?: string;
  };
  quickStartSteps: QuickStartStep[];
  detailedGuide: {
    title: string;
    content: string[];
    tips?: string[];
  }[];
  contacts?: ContactInfo[];
  badgeNote?: string;
  speedRating?: 'high' | 'medium' | 'moderate' | 'slow';
  securityRating?: string;
}

export const getToolVisibility = (tool: VPNTool): ToolVisibility => {
  if (tool.visibility) return tool.visibility;
  if (tool.available === false || tool.isAvailable === false || tool.status === 'unavailable') {
    return 'unavailable';
  }
  return 'visible';
};

export const isToolVisible = (tool: VPNTool): boolean => getToolVisibility(tool) !== 'hidden';

export const isToolAvailable = (tool: VPNTool): boolean => getToolVisibility(tool) === 'visible';

export type GuideRuleIcon = 'shield-alert' | 'lock' | 'help';

export interface GuideRule {
  icon: GuideRuleIcon;
  title: string;
  body: string;
}

export interface GuideContent {
  title: string;
  subtitle: string;
  closeLabel: string;
  rules: GuideRule[];
}

export interface JiakuanConfig {
  enabled: boolean;
  label: string;
  url: string;
  logo: string;
  title: string;
}

export interface SiteMeta {
  brand: string;
  notice: string;
  jiakuan: JiakuanConfig;
}

export interface FooterLink {
  label: string;
  kind: 'link' | 'guide';
  url: string;
}

export interface BackupLink {
  label: string;
  url: string;
}

export interface FooterContent {
  intro: string;
  links: FooterLink[];
  backupLabel: string;
  backupLinks: BackupLink[];
  disclaimer: string;
  slogan: string;
}

export interface SiteContent {
  version: number;
  site: SiteMeta;
  footer: FooterContent;
  guide: GuideContent;
  tools: VPNTool[];
}
