const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

async function verifyFaq() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-first-run',
    '--window-size=375,812'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  const tabs = await new Promise(res => {
    http.get('http://127.0.0.1:9222/json/list', r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => res(JSON.parse(d)));
    });
  });

  const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r));

  async function cdp(method, params = {}) {
    const id = Math.floor(Math.random() * 100000);
    return new Promise((resolve, reject) => {
      const handler = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.id === id) {
          ws.removeEventListener('message', handler);
          if (data.error) reject(data.error);
          else resolve(data.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await cdp('Emulation.setDeviceMetricsOverride', {
    width: 375,
    height: 812,
    deviceScaleFactor: 2,
    mobile: true
  });

  // Load fresh without cache
  await cdp('Network.enable');
  await cdp('Network.setCacheDisabled', { cacheDisabled: true });

  await cdp('Page.navigate', { url: 'http://localhost/sanjeevkumarmalik/index.html' });
  await new Promise(r => setTimeout(r, 2000));

  // 1. Check Initial State on Load
  const initial = await cdp('Runtime.evaluate', {
    expression: `(() => {
      const faqs = document.querySelectorAll('.faq-item');
      return Array.from(faqs).slice(0, 4).map((f, i) => {
        const btn = f.querySelector('.faq-question-btn');
        const ans = f.querySelector('.faq-answer');
        const fRect = f.getBoundingClientRect();
        const bRect = btn.getBoundingClientRect();
        const aRect = ans.getBoundingClientRect();
        const aStyle = window.getComputedStyle(ans);
        return {
          index: i + 1,
          active: f.classList.contains('active'),
          itemHeight: fRect.height,
          btnHeight: bRect.height,
          ansHeight: aRect.height,
          ansMaxHeight: aStyle.maxHeight,
          ansVisibility: aStyle.visibility,
          ansOpacity: aStyle.opacity,
          ansOverflow: aStyle.overflow
        };
      });
    })()`,
    returnByValue: true
  });

  console.log('--- Initial Load (all items closed) ---');
  console.log(JSON.stringify(initial.result.value, null, 2));

  // Scroll to #faqs
  await cdp('Runtime.evaluate', {
    expression: `document.getElementById('faqs').scrollIntoView();`
  });
  await new Promise(r => setTimeout(r, 500));

  // Capture screenshot of initial closed state
  let shot = await cdp('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('test_evidence/faq_closed_mobile.png', Buffer.from(shot.data, 'base64'));
  console.log('Saved test_evidence/faq_closed_mobile.png');

  // 2. Click FAQ 1 to open
  await cdp('Runtime.evaluate', {
    expression: `document.querySelectorAll('.faq-item')[0].querySelector('.faq-question-btn').click();`
  });
  await new Promise(r => setTimeout(r, 500));

  const afterClick1 = await cdp('Runtime.evaluate', {
    expression: `(() => {
      const faqs = document.querySelectorAll('.faq-item');
      return Array.from(faqs).slice(0, 3).map((f, i) => {
        const ans = f.querySelector('.faq-answer');
        const aStyle = window.getComputedStyle(ans);
        return {
          index: i + 1,
          active: f.classList.contains('active'),
          itemHeight: f.getBoundingClientRect().height,
          ansHeight: ans.getBoundingClientRect().height,
          ansMaxHeight: aStyle.maxHeight,
          ansVisibility: aStyle.visibility
        };
      });
    })()`,
    returnByValue: true
  });

  console.log('--- After Opening FAQ 1 ---');
  console.log(JSON.stringify(afterClick1.result.value, null, 2));

  shot = await cdp('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('test_evidence/faq_open_item1_mobile.png', Buffer.from(shot.data, 'base64'));
  console.log('Saved test_evidence/faq_open_item1_mobile.png');

  // 3. Click FAQ 2 to open (FAQ 1 should close)
  await cdp('Runtime.evaluate', {
    expression: `document.querySelectorAll('.faq-item')[1].querySelector('.faq-question-btn').click();`
  });
  await new Promise(r => setTimeout(r, 500));

  const afterClick2 = await cdp('Runtime.evaluate', {
    expression: `(() => {
      const faqs = document.querySelectorAll('.faq-item');
      return Array.from(faqs).slice(0, 3).map((f, i) => {
        const ans = f.querySelector('.faq-answer');
        const aStyle = window.getComputedStyle(ans);
        return {
          index: i + 1,
          active: f.classList.contains('active'),
          itemHeight: f.getBoundingClientRect().height,
          ansHeight: ans.getBoundingClientRect().height,
          ansMaxHeight: aStyle.maxHeight,
          ansVisibility: aStyle.visibility
        };
      });
    })()`,
    returnByValue: true
  });

  console.log('--- After Opening FAQ 2 (FAQ 1 closed) ---');
  console.log(JSON.stringify(afterClick2.result.value, null, 2));

  shot = await cdp('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('test_evidence/faq_open_item2_mobile.png', Buffer.from(shot.data, 'base64'));
  console.log('Saved test_evidence/faq_open_item2_mobile.png');

  ws.close();
  chrome.kill();
}

verifyFaq().catch(e => console.error(e));
