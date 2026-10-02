import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

async function main() {
  const chrome = spawn('chromium', [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    '--window-size=1280,1000'
  ]);

  // Wait 1.5s for chromium to start
  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9222/json');
    const tabs = await listRes.json();
    const wsUrl = tabs[0].webSocketDebuggerUrl;
    console.log('Connected to CDP:', wsUrl);

    const ws = new WebSocket(wsUrl);
    await new Promise((res, rej) => {
      ws.onopen = res;
      ws.onerror = rej;
    });

    let id = 1;
    const send = (method, params = {}) => new Promise((resolve) => {
      const curId = id++;
      const handler = (evt) => {
        const msg = JSON.parse(evt.data);
        if (msg.id === curId) {
          ws.removeEventListener('message', handler);
          resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: curId, method, params }));
    });

    await send('Page.enable');
    await send('DOM.enable');
    await send('Runtime.enable');

    console.log('Navigating to detail page...');
    await send('Page.navigate', { url: 'http://localhost:5173/#tool-openrung' });
    await new Promise(r => setTimeout(r, 1200));

    // Capture screenshot 1: detail-page.png
    console.log('Taking detail-page screenshot...');
    const shot1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/home/gao/.gemini/antigravity/brain/2e6aa13d-7148-49ba-b31a-b80e0105a181/1-detail-page.png', Buffer.from(shot1.data, 'base64'));

    // Hover / Click on the first link QR code button
    console.log('Opening Link QR Code popover...');
    await send('Runtime.evaluate', {
      expression: `
        const btn = document.querySelector('button[title="扫码直达链接"]');
        if (btn) btn.click();
      `
    });
    await new Promise(r => setTimeout(r, 600));

    // Capture screenshot 2: link-qr-popover.png
    console.log('Taking link-qr-popover screenshot...');
    const shot2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/home/gao/.gemini/antigravity/brain/2e6aa13d-7148-49ba-b31a-b80e0105a181/2-link-qr-popover.png', Buffer.from(shot2.data, 'base64'));

    // Click outside to close link popover
    await send('Runtime.evaluate', { expression: `document.body.click();` });
    await new Promise(r => setTimeout(r, 200));

    // Click Share button in top bar
    console.log('Clicking Share button to open dropdown...');
    await send('Runtime.evaluate', {
      expression: `
        const shareBtn = document.querySelector('button[title="分享此工具"]');
        if (shareBtn) shareBtn.click();
      `
    });
    await new Promise(r => setTimeout(r, 400));

    // Capture screenshot 3: share-dropdown.png
    console.log('Taking share-dropdown screenshot...');
    const shot3 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/home/gao/.gemini/antigravity/brain/2e6aa13d-7148-49ba-b31a-b80e0105a181/3-share-dropdown.png', Buffer.from(shot3.data, 'base64'));

    // Click 二维码 in the dropdown menu
    console.log('Clicking QR code option in dropdown...');
    await send('Runtime.evaluate', {
      expression: `
        const items = Array.from(document.querySelectorAll('button'));
        const qrItem = items.find(b => b.textContent.includes('二维码'));
        if (qrItem) qrItem.click();
      `
    });
    await new Promise(r => setTimeout(r, 600));

    // Capture screenshot 4: share-qr-modal.png
    console.log('Taking share-qr-modal screenshot...');
    const shot4 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/home/gao/.gemini/antigravity/brain/2e6aa13d-7148-49ba-b31a-b80e0105a181/4-share-qr-modal.png', Buffer.from(shot4.data, 'base64'));

    console.log('All screenshots captured successfully!');
    ws.close();
  } finally {
    chrome.kill();
  }
}

main().catch(err => {
  console.error('Error running test:', err);
  process.exit(1);
});
