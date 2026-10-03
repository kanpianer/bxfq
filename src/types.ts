export type Platform = 'android' | 'ios' | 'windows' | 'macos' | 'linux' | 'appletv' | 'browser';

export type EntityType = 
  | 'non-profit'             // 非盈利性机构 / 非营利机构发起
  | 'non-profit-supervised'  // 非盈利性机构监督
  | 'commercial'            // 商业机构 / 盈利性机构
  | 'self-organized';       // 自组织机构

export type ToolStatus = 'available' | 'needs-bridge' | 'unavailable';

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
  type: 'telegram' | 'twitter' | 'bluesky' | 'youtube' | 'email' | 'github' | 'website';
  label: string;
  value: string;
}

export interface VPNTool {
  id: string;
  name: string;
  aliases?: string[];
  tagline: string;
  entityType: EntityType;
  entityLabel: string;
  entityDescription: string;
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
  speedRating?: 'high' | 'medium' | 'moderate';
  securityRating?: string;
}
