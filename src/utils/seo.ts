import type { VPNTool } from '../types';

const DEFAULT_TITLE = '不想翻墙 — 备用梯子首选 | 免费科学上网与安全应急工具精选导航';
const DEFAULT_DESCRIPTION = '专为翻墙小白打造的免费备用梯子与科学上网工具精选导航。精选非盈利、开源、去中心化及独立审计的安全翻墙工具，防失联备用，杜绝流氓钓鱼与隐私泄漏。';
const BASE_CANONICAL_URL = 'https://bxfq.sld.tw/';

const getMetaElement = (selector: string, createIfMissing: boolean = true): HTMLMetaElement | null => {
  if (typeof document === 'undefined') return null;
  let element = document.querySelector<HTMLMetaElement>(selector);
  if (!element && createIfMissing) {
    element = document.createElement('meta');
    if (selector.startsWith('meta[name="')) {
      const name = selector.match(/meta\[name="([^"]+)"\]/)?.[1];
      if (name) element.setAttribute('name', name);
    } else if (selector.startsWith('meta[property="')) {
      const prop = selector.match(/meta\[property="([^"]+)"\]/)?.[1];
      if (prop) element.setAttribute('property', prop);
    }
    document.head.appendChild(element);
  }
  return element;
};

const getCanonicalElement = (): HTMLLinkElement | null => {
  if (typeof document === 'undefined') return null;
  let element = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  return element;
};

/**
 * Update meta description
 */
export const updateMetaDescription = (description: string) => {
  const meta = getMetaElement('meta[name="description"]');
  if (meta) meta.setAttribute('content', description);

  const ogDesc = getMetaElement('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);

  const twDesc = getMetaElement('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute('content', description);
};

/**
 * Update canonical link and social URLs
 */
export const updateCanonicalUrl = (url: string) => {
  const canonical = getCanonicalElement();
  if (canonical) canonical.setAttribute('href', url);

  const ogUrl = getMetaElement('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', url);

  const twUrl = getMetaElement('meta[name="twitter:url"]');
  if (twUrl) twUrl.setAttribute('content', url);
};

/**
 * Update titles across document, Open Graph and Twitter
 */
export const updatePageTitle = (title: string) => {
  if (typeof document !== 'undefined') {
    document.title = title;
  }
  const ogTitle = getMetaElement('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);

  const twTitle = getMetaElement('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute('content', title);
};

/**
 * Set robots meta tag for private/admin pages like /dtms
 */
export const setRobotsIndexable = (indexable: boolean) => {
  const robots = getMetaElement('meta[name="robots"]');
  if (robots) {
    robots.setAttribute(
      'content',
      indexable
        ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        : 'noindex, nofollow'
    );
  }
};

/**
 * Inject or remove dynamic SoftwareApplication Schema.org JSON-LD for a selected tool
 */
export const setToolStructuredData = (tool: VPNTool | null) => {
  if (typeof document === 'undefined') return;

  const SCRIPT_ID = 'tool-schema-jsonld';
  let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

  if (!tool) {
    if (script) script.remove();
    return;
  }

  const platformsLabel = tool.platforms.join(', ');
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: `${tool.tagline}。${tool.entityDescription}`,
    operatingSystem: platformsLabel,
    applicationCategory: 'SecurityApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    ...(tool.officialUrl ? { sameAs: tool.officialUrl } : {})
  };

  if (!script) {
    script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(schema, null, 2);
};

/**
 * Reset all SEO tags back to default homepage values
 */
export const resetHomeSeo = () => {
  updatePageTitle(DEFAULT_TITLE);
  updateMetaDescription(DEFAULT_DESCRIPTION);
  updateCanonicalUrl(BASE_CANONICAL_URL);
  setRobotsIndexable(true);
  setToolStructuredData(null);
};

/**
 * Apply tool-specific SEO tags when viewing a tool detail page
 */
export const applyToolSeo = (tool: VPNTool) => {
  const toolTitle = `${tool.name} — 不想翻墙 备用梯子使用指南`;
  const toolDescription = `${tool.name}：${tool.tagline}。资助与开发主体：${tool.entityLabel}。费用模式：${tool.pricingModel}。提供客户端下载链接、备用镜像与小白快速上手教程。`;
  const toolUrl = `${BASE_CANONICAL_URL}?tool=${encodeURIComponent(tool.id)}`;

  updatePageTitle(toolTitle);
  updateMetaDescription(toolDescription);
  updateCanonicalUrl(toolUrl);
  setRobotsIndexable(true);
  setToolStructuredData(tool);
};
