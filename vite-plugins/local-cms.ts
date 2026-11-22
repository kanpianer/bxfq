/**
 * Vite 插件：本地开发 CMS API
 *
 * 在 dev / preview 服务器上挂载 /api/cms/content 端点，
 * 供 CMS 界面 (/dtms) 直接读写本地代码库中的 src/data/content.json。
 * 生产构建不受影响。
 */
import type { Plugin } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import { exec } from 'node:child_process';

export function localCmsPlugin(rootDir: string): Plugin {
  const contentPath = path.resolve(rootDir, 'src/data/content.json');
  const seoScriptPath = path.resolve(rootDir, 'scripts/generate-seo.js');

  const handleCmsApi = (req: any, res: any, next: any) => {
    const rawUrl = req.url || '';
    if (rawUrl !== '/api/cms/content' && !rawUrl.startsWith('/api/cms/content?')) {
      return next();
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.end();
      return;
    }

    if (req.method === 'GET') {
      try {
        const raw = fs.readFileSync(contentPath, 'utf8');
        const content = JSON.parse(raw);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ success: true, isLocal: true, content }));
      } catch (err: any) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ success: false, error: err?.message || '读取本地 content.json 失败' }));
      }
      return;
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', (chunk: Buffer) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (!parsed || !parsed.content || !Array.isArray(parsed.content.tools)) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify({ success: false, error: '无效的内容数据格式' }));
            return;
          }

          const formattedJson = JSON.stringify(parsed.content, null, 2) + '\n';
          fs.writeFileSync(contentPath, formattedJson, 'utf8');

          // 触发自动重新生成 robots.txt 与 sitemap.xml
          if (fs.existsSync(seoScriptPath)) {
            exec(`node "${seoScriptPath}"`, (err) => {
              if (err) {
                console.warn('[CMS 本地保存] 生成 SEO 文件失败:', err);
              } else {
                console.log('[CMS 本地保存] 已同步更新 SEO 文件');
              }
            });
          }

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.end(
            JSON.stringify({
              success: true,
              isLocal: true,
              message: '已成功保存至本地代码库 (src/data/content.json)',
            })
          );
        } catch (err: any) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.end(JSON.stringify({ success: false, error: err?.message || '解析请求体失败' }));
        }
      });
      return;
    }

    next();
  };

  return {
    name: 'local-cms-plugin',
    configureServer(server) {
      server.middlewares.use(handleCmsApi);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handleCmsApi);
    },
  };
}
