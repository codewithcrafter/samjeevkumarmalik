const { spawn } = require('child_process');
const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9234',
  '--disable-gpu',
  '--no-sandbox'
]);

setTimeout(async () => {
  try {
    const listRes = await fetch('http://127.0.0.1:9234/json/list');
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
        if (sidebar) sidebar.style.display = 'none';
      })()`
    });

    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        const title = document.querySelector('.article-main-title');
        const img = document.querySelector('.article-featured-image-box');
        const toc = document.querySelector('.toc-card');
        const form = document.querySelector('.blog-form-card');
        const prose = document.querySelector('.article-prose');

        return {
          titleTop: Math.round(title.getBoundingClientRect().top),
          imgTop: Math.round(img.getBoundingClientRect().top),
          tocTop: Math.round(toc.getBoundingClientRect().top),
          formTop: Math.round(form.getBoundingClientRect().top),
          proseTop: Math.round(prose.getBoundingClientRect().top),
          isTocAfterImg: toc.getBoundingClientRect().top > img.getBoundingClientRect().top,
          isProseAfterForm: prose.getBoundingClientRect().top > form.getBoundingClientRect().top
        };
      })()`,
      returnByValue: true
    });

    console.log('DOM positions:', JSON.stringify(res.result.result.value, null, 2));

    chrome.kill();
    process.exit(0);
  } catch (e) {
    console.error(e);
    chrome.kill();
    process.exit(1);
  }
}, 1500);

