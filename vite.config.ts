import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { exec } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function localCmsPlugin(): Plugin {
  const contentPath = path.resolve(__dirname, 'src/data/content.json');
  const seoScriptPath = path.resolve(__dirname, 'scripts/generate-seo.js');

  const handleCmsApi = (req: any, res: any, next: any) => {
    const rawUrl = req.url || '';
    if (rawUrl === '/api/cms/content' || rawUrl.startsWith('/api/cms/content?')) {
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
            try {
              if (fs.existsSync(seoScriptPath)) {
                exec(`node "${seoScriptPath}"`, (err) => {
                  if (err) {
                    console.warn('[CMS 本地保存] 生成 SEO 文件失败:', err);
                  } else {
                    console.log('[CMS 本地保存] 已同步更新 SEO 文件');
                  }
                });
              }
            } catch (seoErr) {
              console.warn('[CMS 本地保存] 触发 SEO 脚本异常:', seoErr);
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

export default defineConfig({
  plugins: [react(), localCmsPlugin()],
  server: {
    port: 5173,
    host: true,
  },
  preview: {
    port: 5173,
    host: true,
  },
});
