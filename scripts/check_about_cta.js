const fs = require('fs');
const html = fs.readFileSync('about-sanjeev-kumar-malik.html', 'utf-8');
const ctaIndex = html.indexOf('Plan Your Architecture Directly With Sanjeev');
console.log(html.slice(ctaIndex - 100, ctaIndex + 400));

