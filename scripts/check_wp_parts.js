const fs = require('fs');
const html = fs.readFileSync('services/wordpress-web-development.html', 'utf-8');

console.log('--- HERO ---');
const h1Idx = html.indexOf('<h1');
console.log(html.slice(h1Idx - 200, h1Idx + 500));

console.log('\n--- MAIN CARD ---');
const mc = html.match(/Stop Renting Bloated/i) || html.match(/Stop Patching Slow/i);
if (mc) console.log(html.slice(mc.index - 150, mc.index + 400));

console.log('\n--- PILLARS ---');
const pil = html.match(/Engineered for Velocity/i) || html.match(/ARCHITECTURAL PILLARS/i);
if (pil) console.log(html.slice(pil.index - 150, pil.index + 400));

console.log('\n--- MATRIX / COMPARISON ---');
const mat = html.match(/Traditional Agency WordPress vs/i) || html.match(/WordPress vs Custom Code/i);
if (mat) console.log(html.slice(mat.index - 150, mat.index + 500));

console.log('\n--- CTA ---');
const cta = html.match(/Get a Custom WordPress Architecture Quote/i) || html.match(/Get a Quote for WordPress/i);
if (cta) console.log(html.slice(cta.index - 150, cta.index + 400));

