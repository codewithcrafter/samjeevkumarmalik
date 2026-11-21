const { spawn } = require('child_process');
const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9226',
  '--disable-gpu',
  '--no-sandbox'
]);

setTimeout(async () => {
  try {
    const listRes = await fetch('http://127.0.0.1:9226/json/list');
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
        const el = document.querySelector('.blog-article-layout');
        const rules = [];
        for (const sheet of Array.from(document.styleSheets)) {
          try {
            for (const rule of Array.from(sheet.cssRules || [])) {
              if (rule.selectorText && rule.selectorText.includes('blog-article-layout')) {
                rules.push({
                  media: rule.parentRule && rule.parentRule.media ? rule.parentRule.media.mediaText : 'all',
                  cssText: rule.cssText
                });
              } else if (rule.cssRules) {
                for (const subRule of Array.from(rule.cssRules)) {
                  if (subRule.selectorText && subRule.selectorText.includes('blog-article-layout')) {
                    rules.push({
                      media: rule.media ? rule.media.mediaText : 'nested',
                      cssText: subRule.cssText
                    });
                  }
                }
              }
            }
          } catch (e) {}
        }
        return rules;
      })()`,
      returnByValue: true
    });

    console.log('Rules for blog-article-layout:', JSON.stringify(res.result.result.value, null, 2));

    chrome.kill();
    process.exit(0);
  } catch (e) {
    console.error(e);
    chrome.kill();
    process.exit(1);
  }
}, 1500);

