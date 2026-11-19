const fs = require('fs');

const about = fs.readFileSync('about-sanjeev-kumar-malik.html', 'utf-8');
const hero = about.match(/<section[^>]*id=["']hero["'][^>]*>[\s\S]*?<\/section>/i);
console.log(hero[0]);

