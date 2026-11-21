const { spawn } = require('child_process');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9235',
  '--disable-gpu',
  '--no-sandbox'
]);

setTimeout(async () => {
  try {
    const listRes = await fetch('http://127.0.0.1:9235/json/list');
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

    // Test 1: Mobile (375x812)
    await send('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 2, mobile: true });
    await send('Page.navigate', { url: 'http://localhost/sanjeevkumarmalik/blogs/custom-wordpress-plugin-vs-off-the-shelf' });
    await new Promise(r => setTimeout(r, 2000));

    const mobileCheck = await send('Runtime.evaluate', {
      expression: `(() => {
        const title = document.querySelector('.article-main-title');
        const img = document.querySelector('.article-featured-image-box');
        const toc = document.querySelector('.toc-card');
        const form = document.querySelector('.blog-form-card');
        const prose = document.querySelector('.article-prose');

        return {
          titleTop: Math.round(title.getBoundingClientRect().top + window.scrollY),
          imgTop: Math.round(img.getBoundingClientRect().top + window.scrollY),
          tocTop: Math.round(toc.getBoundingClientRect().top + window.scrollY),
          formTop: Math.round(form.getBoundingClientRect().top + window.scrollY),
          proseTop: Math.round(prose.getBoundingClientRect().top + window.scrollY),
          docScrollW: document.documentElement.scrollWidth,
          bodyScrollW: document.body.scrollWidth,
          windowW: window.innerWidth,
          hasOverflow: document.documentElement.scrollWidth > window.innerWidth
        };
      })()`,
      returnByValue: true
    });

    console.log('Mobile Check (375px):', mobileCheck.result.result.value);

    // Test 2: Desktop (1440x900)
    await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await new Promise(r => setTimeout(r, 1000));

    const desktopCheck = await send('Runtime.evaluate', {
      expression: `(() => {
        const img = document.querySelector('.article-featured-image-box');
        const toc = document.querySelector('.toc-card');
        const form = document.querySelector('.blog-form-card');
        const prose = document.querySelector('.article-prose');
        const container = document.querySelector('.article-toc-form-container');

        const tocRect = toc.getBoundingClientRect();
        const formRect = form.getBoundingClientRect();

        return {
          imgBottom: Math.round(img.getBoundingClientRect().bottom + window.scrollY),
          containerTop: Math.round(container.getBoundingClientRect().top + window.scrollY),
          tocTop: Math.round(tocRect.top + window.scrollY),
          formTop: Math.round(formRect.top + window.scrollY),
          tocLeft: Math.round(tocRect.left),
          formLeft: Math.round(formRect.left),
          isSideBySide: Math.abs(tocRect.top - formRect.top) < 10 && formRect.left > tocRect.left,
          proseTop: Math.round(prose.getBoundingClientRect().top + window.scrollY)
        };
      })()`,
      returnByValue: true
    });

    console.log('Desktop Check (1440px):', desktopCheck.result.result.value);

    chrome.kill();
    process.exit(0);
  } catch (e) {
    console.error(e);
    chrome.kill();
    process.exit(1);
  }
}, 1500);
