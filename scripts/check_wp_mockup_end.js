const fs = require('fs');
const html = fs.readFileSync('services/wordpress-web-development.html', 'utf-8');
const mb = html.indexOf('DOM Nodes:');
console.log(html.slice(mb, mb + 600));

