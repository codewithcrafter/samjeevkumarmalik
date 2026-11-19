const fs = require('fs');
const html = fs.readFileSync('services/ecommerce-website-development.html', 'utf-8');
const cardIndex = html.indexOf('id="ecomMockupCard"');
console.log(html.slice(cardIndex, cardIndex + 2500));

