const { spawn } = require('child_process');
const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9232',
  '--disable-gpu',
  '--no-sandbox'
]);

setTimeout(async () => {
  try {
    const listRes = await fetch('http://127.0.0.1:9232/json/list');
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
        const sidebar = document.querySelector('.blog-sidebar-sticky');
        const content = document.querySelector('.blog-article-content');
        const toc = document.querySelector('.toc-card');
        const form = document.querySelector('.blog-form-card');
        const rectSidebar = sidebar.getBoundingClientRect();
        const rectContent = content.getBoundingClientRect();
        return {
          sidebarTop: Math.round(rectSidebar.top),
          contentTop: Math.round(rectContent.top),
          isSidebarBeforeContent: rectSidebar.top < rectContent.top,
          tocExists: !!toc,
          formExists: !!form,
          docScrollW: document.documentElement.scrollWidth,
          bodyScrollW: document.body.scrollWidth
        };
      })()`,
      returnByValue: true
    });

    console.log('Mobile Layout Check:', JSON.stringify(res.result.result.value, null, 2));

    chrome.kill();
    process.exit(0);
  } catch (e) {
    console.error(e);
    chrome.kill();
    process.exit(1);
  }
}, 1500);

