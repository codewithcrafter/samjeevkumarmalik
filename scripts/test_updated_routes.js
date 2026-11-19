const http = require('http');

const urls = [
  '/',
  '/about-sanjeev-kumar-malik',
  '/services/wordpress-web-development',
  '/services/ecommerce-website-development',
  '/services/custom-web-application-development',
  '/services/website-redesign-speed-optimization',
  '/services/landing-page-design-development',
  '/services/ui-ux-design-services',
  '/services/web-development-for-startups-smes'
];

async function checkUrl(urlPath) {
  return new Promise((resolve) => {
    http.get(`http://127.0.0.1:5500${urlPath}`, (res) => {
      resolve({ path: urlPath, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ path: urlPath, status: 'ERR: ' + err.message });
    });
  });
}

async function run() {
  console.log('Testing Live Server endpoints...');
  for (const u of urls) {
    const res = await checkUrl(u);
    console.log(`URL: ${res.path.padEnd(50)} -> Status: ${res.status}`);
  }
}

run();

