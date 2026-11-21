const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chrome = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9223',
  '--disable-gpu',
  '--no-sandbox',
  '--window-size=375,812'
]);

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

(async () => {
  await sleep(1500);
  try {
    const listRes = await fetch('http://127.0.0.1:9223/json/list');
    const tabs = await listRes.json();
    const tab = tabs.find(t => t.type === 'page') || tabs[0];
    
    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    let msgId = 1;
    const callbacks = new Map();

    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && callbacks.has(msg.id)) {
        callbacks.get(msg.id)(msg);
        callbacks.delete(msg.id);
      }
    });

    function send(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        callbacks.set(id, resolve);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await new Promise((resolve) => ws.addEventListener('open', resolve));

    await send('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true
    });

    await send('Page.navigate', {
      url: 'http://localhost/sanjeevkumarmalik/blogs/custom-wordpress-plugin-vs-off-the-shelf'
    });

    await sleep(2000);

    // Evaluate overflow elements
    const evalResult = await send('Runtime.evaluate', {
      expression: `(() => {
        const winWidth = window.innerWidth;
        const docScrollWidth = document.documentElement.scrollWidth;
        const bodyScrollWidth = document.body.scrollWidth;
        
        const overflowing = [];
        const all = document.querySelectorAll('*');
        all.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.right > winWidth + 1 || rect.left < -1) {
            overflowing.push({
              tag: el.tagName,
              className: el.className,
              id: el.id,
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              width: Math.round(rect.width),
              text: (el.innerText || '').slice(0, 40).replace(/\\n/g, ' ')
            });
          }
        });

        // Also check header top bar and blog-article-layout
        const articleLayout = document.querySelector('.blog-article-layout');
        const articleContent = document.querySelector('.blog-article-content');
        const sidebar = document.querySelector('.blog-sidebar-sticky');

        return {
          winWidth,
          docScrollWidth,
          bodyScrollWidth,
          overflowCount: overflowing.length,
          sampleOverflowing: overflowing.slice(0, 15),
          layout: articleLayout ? {
            width: articleLayout.offsetWidth,
            clientW: articleLayout.clientWidth
          } : null,
          content: articleContent ? {
            width: articleContent.offsetWidth,
            padding: window.getComputedStyle(articleContent).padding
          } : null
        };
      })()`,
      returnByValue: true
    });

    console.log('Eval raw:', JSON.stringify(evalResult, null, 2));
    if (evalResult && evalResult.result && evalResult.result.result) {
      console.log('Value:', JSON.stringify(evalResult.result.result.value, null, 2));
    }

    // Capture screenshot
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(shot.result.data, 'base64');
    fs.writeFileSync('scripts/blog_mobile_shot.png', buffer);
    console.log('Screenshot saved to scripts/blog_mobile_shot.png');

    chrome.kill();
    process.exit(0);
  } catch (err) {
    console.error(err);
    chrome.kill();
    process.exit(1);
  }
})();
