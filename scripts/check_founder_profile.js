const fs = require('fs');

const about = fs.readFileSync('about-sanjeev-kumar-malik.html', 'utf-8');
const fpIndex = about.indexOf('id="founderProfile"');
console.log(about.slice(fpIndex, fpIndex + 2500));

