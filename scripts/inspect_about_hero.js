const fs = require('fs');

const about = fs.readFileSync('about-sanjeev-kumar-malik.html', 'utf-8');

console.log('=== HERO & PROFILE CARD IN ABOUT ===');
const heroMatch = about.match(/<section[^>]*id=["']aboutHero["'][^>]*>[\s\S]*?<\/section>/i) ||
                  about.match(/<section[^>]*class=["'][^"']*about-hero[^"']*["'][^>]*>[\s\S]*?<\/section>/i) ||
                  about.match(/<section[\s\S]*?<\/section>/i);
console.log(heroMatch ? heroMatch[0].slice(0, 1500) : 'None');

