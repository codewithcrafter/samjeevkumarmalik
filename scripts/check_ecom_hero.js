const fs = require('fs');
const html = fs.readFileSync('services/ecommerce-website-development.html', 'utf-8');
const h1Index = html.indexOf('<h1');
console.log(html.slice(h1Index - 300, h1Index + 700));

