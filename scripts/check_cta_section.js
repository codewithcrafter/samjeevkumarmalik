const fs = require('fs');
const html = fs.readFileSync('about-sanjeev-kumar-malik.html', 'utf-8');
const ctaIndex = html.indexOf('Plan Your Architecture Directly With Sanjeev');
const secStart = html.lastIndexOf('<section', ctaIndex);
const secEnd = html.indexOf('</section>', ctaIndex) + 10;
console.log(html.slice(secStart, secEnd));

