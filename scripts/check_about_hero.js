const fs = require('fs');
const html = fs.readFileSync('about-sanjeev-kumar-malik.html', 'utf8');

const sIdx = html.indexOf('about-hero-grid');
const eIdx = html.indexOf('</section>', sIdx);
console.log(html.substring(sIdx, eIdx));
