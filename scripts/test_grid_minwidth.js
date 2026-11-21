const { spawn } = require('child_process');
const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9225',
  '--disable-gpu',
  '--no-sandbox'
]);

setTimeout(async () => {
  try {
    const listRes = await fetch('http://127.0.0.1:9225/json/list');
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

    // Check WITHOUT any injected styles first: what are the computed properties of .blog-article-layout and .blog-article-content?
    const checkBefore = await send('Runtime.evaluate', {
      expression: `(() => {
        const layout = document.querySelector('.blog-article-layout');
        const content = document.querySelector('.blog-article-content');
        const compLayout = window.getComputedStyle(layout);
        const compContent = window.getComputedStyle(content);
        return {
          layout: {
            display: compLayout.display,
            gridTemplateColumns: compLayout.gridTemplateColumns,
            width: compLayout.width,
            offsetWidth: layout.offsetWidth
          },
          content: {
            display: compContent.display,
            gridColumn: compContent.gridColumn,
            width: compContent.width,
            offsetWidth: content.offsetWidth,
            minWidth: compContent.minWidth,
            boxSizing: compContent.boxSizing
          }
        };
      })()`,
      returnByValue: true
    });
    console.log('Before injection:', JSON.stringify(checkBefore.result.result.value, null, 2));

    // Now inject CSS rules
    await send('Runtime.evaluate', {
      expression: `(() => {
        const s = document.createElement('style');
        s.textContent = '.blog-article-layout { grid-template-columns: minmax(0, 1fr) !important; width: 100% !important; max-width: 100% !important; box-sizing: border-box !important; } .blog-article-content { min-width: 0 !important; width: 100% !important; max-width: 100% !important; box-sizing: border-box !important; }';
        document.head.appendChild(s);
      })()`
    });

    const checkAfter = await send('Runtime.evaluate', {
      expression: `(() => {
        const layout = document.querySelector('.blog-article-layout');
        const content = document.querySelector('.blog-article-content');
        const wide = [];
        content.querySelectorAll('*').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.right > window.innerWidth || r.left < 0) {
            wide.push({
              tag: el.tagName,
              cls: el.className,
              rectRight: Math.round(r.right),
              rectLeft: Math.round(r.left),
              rectW: Math.round(r.width),
              text: (el.innerText || '').slice(0, 40).replace(/\\n/g, ' ')
            });
          }
        });
        return {
          offsetWidth: content.offsetWidth,
          scrollWidth: content.scrollWidth,
          bodyScrollW: document.body.scrollWidth,
          overflowCount: wide.length,
          wide: wide.slice(0, 10)
        };
      })()`,
      returnByValue: true
    });
    console.log('After injection:', JSON.stringify(checkAfter.result.result.value, null, 2));

    chrome.kill();
    process.exit(0);
  } catch (e) {
    console.error(e);
    chrome.kill();
    process.exit(1);
  }
}, 1500);
