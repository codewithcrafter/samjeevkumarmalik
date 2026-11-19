const fs = require('fs');
const html = fs.readFileSync('services/wordpress-web-development.html', 'utf-8');
const mb = html.indexOf('id="wpMockupCard"');
console.log(html.slice(mb + 1000, mb + 2500));

