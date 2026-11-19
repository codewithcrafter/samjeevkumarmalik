const fs = require('fs');
const html = fs.readFileSync('services/website-redesign-speed-optimization.html', 'utf-8');

console.log('--- HERO ---');
const h1Idx = html.indexOf('<h1');
console.log(html.slice(h1Idx - 200, h1Idx + 500));

console.log('\n--- BOX 1: TRAFFIC PRESERVATION ---');
const b1 = html.match(/Why Most Redesigns Lose 40%/i);
if (b1) console.log(html.slice(b1.index - 150, b1.index + 400));

console.log('\n--- SECTION 2: PILLARS ---');
const s2 = html.match(/Engineered for Search Engines/i);
if (s2) console.log(html.slice(s2.index - 150, s2.index + 400));

console.log('\n--- SECTION 3: MATRIX ---');
const s3 = html.match(/Architectural Audit Matrix/i) || html.match(/Traditional Agency Redesign vs/i);
if (s3) console.log(html.slice(s3.index - 150, s3.index + 500));

console.log('\n--- SECTION 4: PROTOCOL ---');
const s4 = html.match(/The 4-Step Site Modernization Protocol/i);
if (s4) console.log(html.slice(s4.index - 150, s4.index + 400));

