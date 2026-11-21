const { spawn } = require('child_process');
const fs = require('fs');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9230',
  '--disable-gpu',
  '--no-sandbox'
]);

setTimeout(async () => {
  try {
    const listRes = await fetch('http://127.0.0.1:9230/json/list');
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
    await send('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 2, mobile: true });
    await send('Page.navigate', { url: 'http://localhost/sanjeevkumarmalik/blogs/custom-wordpress-plugin-vs-off-the-shelf' });
    await new Promise(r => setTimeout(r, 2000));

    // Test with sidebar order: 1 and content order: 2
    await send('Runtime.evaluate', {
      expression: `(() => {
        const s = document.createElement('style');
        s.textContent = \`
          @media (max-width: 992px) {
            .blog-sidebar-sticky {
              order: 1 !important;
              margin-bottom: 2rem !important;
            }
            .blog-article-content {
              order: 2 !important;
            }
          }
        \`;
        document.head.appendChild(s);
      })()`
    });

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scripts/test_sidebar_top_shot.png', Buffer.from(shot.result.data, 'base64'));
    console.log('Saved screenshot to scripts/test_sidebar_top_shot.png');

    chrome.kill();
    process.exit(0);
  } catch (e) {
    console.error(e);
    chrome.kill();
    process.exit(1);
  }
}, 1500);
