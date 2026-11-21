const { spawn } = require('child_process');
const fs = require('fs');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9233',
  '--disable-gpu',
  '--no-sandbox'
]);

setTimeout(async () => {
  try {
    const listRes = await fetch('http://127.0.0.1:9233/json/list');
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

    // Test on Mobile (375px)
    await send('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 2, mobile: true });
    await send('Page.navigate', { url: 'http://localhost/sanjeevkumarmalik/blogs/custom-wordpress-plugin-vs-off-the-shelf' });
    await new Promise(r => setTimeout(r, 2000));

    // Inject DOM rearrangement: move toc-card and blog-form-card from sidebar to below featured image
    await send('Runtime.evaluate', {
      expression: `(() => {
        const imgBox = document.querySelector('.article-featured-image-box');
        const toc = document.querySelector('.toc-card');
        const form = document.querySelector('.blog-form-card');
        const sidebar = document.querySelector('.blog-sidebar-sticky');

        if (imgBox && toc && form) {
          const container = document.createElement('div');
          container.className = 'article-toc-form-container';
          container.appendChild(toc);
          container.appendChild(form);
          imgBox.parentNode.insertBefore(container, imgBox.nextSibling);
        }
        if (sidebar) {
          sidebar.style.display = 'none';
        }

        const s = document.createElement('style');
        s.textContent = \`
          .blog-article-layout {
            display: block !important;
            max-width: 980px !important;
            margin: 2rem auto 0 !important;
            width: 100% !important;
          }
          .blog-article-content {
            width: 100% !important;
            max-width: 100% !important;
          }
          .article-toc-form-container {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.5rem !important;
            margin: 2.25rem 0 2.5rem 0 !important;
          }
          @media (max-width: 768px) {
            .article-toc-form-container {
              grid-template-columns: 1fr !important;
              gap: 1.25rem !important;
              margin: 1.75rem 0 2rem 0 !important;
            }
          }
        \`;
        document.head.appendChild(s);
      })()`
    });

    const shotMobile = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scripts/test_toc_under_image_mobile.png', Buffer.from(shotMobile.result.data, 'base64'));
    console.log('Saved mobile screenshot to scripts/test_toc_under_image_mobile.png');

    // Test on Desktop (1200px)
    await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 900, deviceScaleFactor: 2, mobile: false });
    await new Promise(r => setTimeout(r, 1000));
    const shotDesktop = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scripts/test_toc_under_image_desktop.png', Buffer.from(shotDesktop.result.data, 'base64'));
    console.log('Saved desktop screenshot to scripts/test_toc_under_image_desktop.png');

    chrome.kill();
    process.exit(0);
  } catch (e) {
    console.error(e);
    chrome.kill();
    process.exit(1);
  }
}, 1500);
