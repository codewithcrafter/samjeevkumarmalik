const { spawn } = require('child_process');
const fs = require('fs');
const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9228',
  '--disable-gpu',
  '--no-sandbox'
]);

setTimeout(async () => {
  try {
    const listRes = await fetch('http://127.0.0.1:9228/json/list');
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

    // Inject comprehensive mobile blog CSS fix
    await send('Runtime.evaluate', {
      expression: `(() => {
        const s = document.createElement('style');
        s.textContent = \`
          @media (max-width: 992px) {
            .blog-article-layout {
              display: flex !important;
              flex-direction: column !important;
              width: 100% !important;
              max-width: 100% !important;
              box-sizing: border-box !important;
              gap: 2rem !important;
            }
            .blog-article-content {
              grid-column: auto !important;
              order: 1 !important;
              width: 100% !important;
              max-width: 100% !important;
              min-width: 0 !important;
              box-sizing: border-box !important;
              padding: 1.5rem 1rem !important;
              border-radius: 16px !important;
            }
            .blog-sidebar-sticky {
              grid-column: auto !important;
              order: 2 !important;
              width: 100% !important;
              max-width: 100% !important;
              position: static !important;
              box-sizing: border-box !important;
            }
            .founder-card-inner {
              flex-direction: column !important;
              align-items: center !important;
              text-align: center !important;
            }
            .founder-card-content {
              width: 100% !important;
            }
            .founder-tag-strip {
              justify-content: center !important;
            }
            .founder-card-actions {
              flex-direction: column !important;
              width: 100% !important;
            }
            .founder-card-actions .btn-primary,
            .founder-card-actions .btn-whatsapp-outline {
              width: 100% !important;
              justify-content: center !important;
              white-space: normal !important;
              text-align: center !important;
            }
            .article-prose,
            .article-prose-content {
              word-break: break-word !important;
              overflow-wrap: break-word !important;
            }
            .article-prose pre,
            .article-prose-content pre,
            .article-code-block {
              max-width: 100% !important;
              overflow-x: auto !important;
              box-sizing: border-box !important;
            }
            .article-tags-cloud,
            .tags-cloud {
              flex-wrap: wrap !important;
            }
          }
        \`;
        document.head.appendChild(s);
      })()`
    });

    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        const winWidth = window.innerWidth;
        const docScrollWidth = document.documentElement.scrollWidth;
        const bodyScrollWidth = document.body.scrollWidth;
        
        const overflowing = [];
        document.querySelectorAll('*').forEach(el => {
          // ignore fixed floating elements and background ambient orbs
          if (el.classList.contains('ambient-orb') || el.classList.contains('ambient-canvas-wrapper')) return;
          const rect = el.getBoundingClientRect();
          if (rect.right > winWidth + 1) {
            overflowing.push({
              tag: el.tagName,
              cls: el.className,
              id: el.id,
              right: Math.round(rect.right),
              w: Math.round(rect.width),
              text: (el.innerText || '').slice(0, 40).replace(/\\n/g, ' ')
            });
          }
        });

        const articleContent = document.querySelector('.blog-article-content');

        return {
          winWidth,
          docScrollWidth,
          bodyScrollWidth,
          overflowCount: overflowing.length,
          overflowing: overflowing.slice(0, 10),
          articleW: articleContent ? articleContent.offsetWidth : 0,
          articleScrollW: articleContent ? articleContent.scrollWidth : 0
        };
      })()`,
      returnByValue: true
    });

    console.log('Result after fixes:', JSON.stringify(res.result.result.value, null, 2));

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scripts/blog_fixed_shot.png', Buffer.from(shot.result.data, 'base64'));
    console.log('Saved screenshot to scripts/blog_fixed_shot.png');

    chrome.kill();
    process.exit(0);
  } catch (e) {
    console.error(e);
    chrome.kill();
    process.exit(1);
  }
}, 1500);
