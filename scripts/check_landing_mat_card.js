const fs = require('fs');
const html = fs.readFileSync('services/landing-page-design-development.html', 'utf-8');
const cardIdx = html.indexOf('class="decision-matrix-card"');
const cardEnd = html.indexOf('</div>', html.indexOf('</table>', cardIdx)) + 6;
console.log(html.slice(cardIdx, cardEnd));

