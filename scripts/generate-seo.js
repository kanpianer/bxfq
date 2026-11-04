import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const contentPath = path.join(rootDir, 'src', 'data', 'content.json');
const publicDir = path.join(rootDir, 'public');

const rawData = fs.readFileSync(contentPath, 'utf8');
const content = JSON.parse(rawData);

const BASE_URL = 'https://bxfq.sld.tw';
const today = new Date().toISOString().split('T')[0];

// 1. Generate robots.txt
const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
# Robots exclusion rules for 不想翻墙 (${BASE_URL})

User-agent: *
Allow: /

# Disallow Content Management System admin panel to protect privacy and save crawl budget
Disallow: /dtms
Disallow: /dtms/

# Sitemap location
Sitemap: ${BASE_URL}/sitemap.xml
`;

fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8');
console.log('✓ Generated public/robots.txt');

// 2. Generate sitemap.xml
// Filter visible tools
const visibleTools = (content.tools || []).filter(
  (t) => t.visibility !== 'hidden'
);

let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <!-- Homepage -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

for (const tool of visibleTools) {
  sitemapXml += `  <!-- Tool: ${tool.name} -->
  <url>
    <loc>${BASE_URL}/?tool=${encodeURIComponent(tool.id)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
}

sitemapXml += `</urlset>
`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
console.log(`✓ Generated public/sitemap.xml with ${visibleTools.length + 1} URLs`);
