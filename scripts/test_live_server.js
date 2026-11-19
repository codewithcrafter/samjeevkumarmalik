const http = require('http');

http.get('http://127.0.0.1:5500/', (res) => {
  console.log('Status Code:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Body length:', data.length);
    console.log('Contains authentic hero headline:', data.includes('Web Development Company in Delhi | Custom Website Design &amp; Development – <span class="gradient-text">Sanjeev Kumar Malik</span>'));
    console.log('Contains authentic bio:', data.includes('Are you looking for a web development company in Delhi that will understand your business objectives'));
    console.log('Contains authentic services h2:', data.includes('Complete Web Development Service'));
    console.log('Contains authentic FAQ 1:', data.includes('How much does a custom website or web application cost in Delhi?'));
    console.log('Contains authentic banner:', data.includes('Ready To Create Your High Converting Digital Presence?'));
  });
}).on('error', (err) => {
  console.log('Live server check error (may not be running or different port):', err.message);
});

