const { spawn } = require('child_process');
const fs = require('fs');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9229',
  '--disable-gpu',
  '--no-sandbox'
]);

setTimeout(async () => {
  try {
    const listRes = await fetch('http://127.0.0.1:9229/json/list');
    const tabs = await listRes.json();
    const tab = tabs[0];
    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    let msgId = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        const handler = (event) => {
          const msg = JSON.parse(event.data);
          if (msg.id === id) {
            ws.removeEventListener('message', handler);
            resolve(msg);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await new Promise(r => ws.addEventListener('open', r));

    for (const width of [375, 768, 1200]) {
      await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 2, mobile: width < 1000 });
      await send('Page.navigate', { url: 'http://localhost/sanjeevkumarmalik/services.html' });
      await new Promise(r => setTimeout(r, 1500));

      const res = await send('Runtime.evaluate', {
        expression: `(() => {
          const winWidth = window.innerWidth;
          const bodyScrollW = document.body.scrollWidth;
          const docScrollW = document.documentElement.scrollWidth;
          const overflowing = [];
          document.querySelectorAll('*').forEach(el => {
            if (el.classList.contains('ambient-orb') || el.classList.contains('ambient-canvas-wrapper')) return;
            const r = el.getBoundingClientRect();
            if (r.right > winWidth + 1) {
              overflowing.push({
                tag: el.tagName,
                cls: el.className,
                right: Math.round(r.right),
                w: Math.round(r.width)
              });
            }
          });
          return {
            winWidth,
            bodyScrollW,
            docScrollW,
            overflowCount: overflowing.length,
            overflowing: overflowing.slice(0, 5)
          };
        })()`,
        returnByValue: true
      });

      console.log(`Viewport ${width}px:`, JSON.stringify(res.result.result.value, null, 2));

      if (width === 375) {
        const shot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync('scripts/services_mobile_shot.png', Buffer.from(shot.result.data, 'base64'));
      }
    }

    chrome.kill();
    process.exit(0);
  } catch (e) {
    console.error(e);
    chrome.kill();
    process.exit(1);
  }
}, 1500);

