const { spawn } = require('child_process');
const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9224',
  '--disable-gpu',
  '--no-sandbox'
]);

setTimeout(async () => {
  try {
    const listRes = await fetch('http://127.0.0.1:9224/json/list');
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

    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        const content = document.querySelector('.blog-article-content');
        const wide = [];
        content.querySelectorAll('*').forEach(el => {
          if (el.scrollWidth > 350 || el.offsetWidth > 350) {
            wide.push({
              tag: el.tagName,
              cls: el.className,
              scrollW: el.scrollWidth,
              offsetW: el.offsetWidth,
              computedW: window.getComputedStyle(el).width,
              computedMinW: window.getComputedStyle(el).minWidth,
              computedMaxW: window.getComputedStyle(el).maxWidth,
              computedDisplay: window.getComputedStyle(el).display,
              computedWhiteSp: window.getComputedStyle(el).whiteSpace,
              textSnippet: (el.innerText || '').slice(0, 50).replace(/\\n/g, ' ')
            });
          }
        });
        return wide;
      })()`,
      returnByValue: true
    });

    console.log('Wide items count:', res.result.result.value.length);
    console.log('Wide items:', JSON.stringify(res.result.result.value, null, 2));

    chrome.kill();
    process.exit(0);
  } catch (e) {
    console.error(e);
    chrome.kill();
    process.exit(1);
  }
}, 1500);
