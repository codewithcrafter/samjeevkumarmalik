const fs = require('fs');

const about = fs.readFileSync('about-sanjeev-kumar-malik.html', 'utf-8');

console.log('=== TIMELINE ===');
const timelineMatch = about.match(/<section[^>]*id=["']timeline["'][^>]*>([\s\S]*?)<\/section>/i);
console.log(timelineMatch ? timelineMatch[0].slice(0, 1500) : 'None');

console.log('\n=== DIFFERENCE ===');
const diffMatch = about.match(/<section[^>]*id=["']difference["'][^>]*>([\s\S]*?)<\/section>/i);
console.log(diffMatch ? diffMatch[0].slice(0, 1500) : 'None');

console.log('\n=== CTA BOX ===');
const ctaMatch = about.match(/Plan Your Architecture Directly With Sanjeev[\s\S]*?<\/section>/i);
console.log(ctaMatch ? ctaMatch[0].slice(0, 800) : 'None');

