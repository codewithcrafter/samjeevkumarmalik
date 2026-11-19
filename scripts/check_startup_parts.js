const fs = require('fs');
const html = fs.readFileSync('services/web-development-for-startups-smes.html', 'utf-8');

console.log('--- HERO ---');
const h1Idx = html.indexOf('<h1');
console.log(html.slice(h1Idx - 200, h1Idx + 500));

console.log('\n--- HERO CARD LEFT ---');
const hc = html.match(/Fractional Technical Co-Founder/i);
if (hc) console.log(html.slice(hc.index - 150, hc.index + 400));

console.log('\n--- PILLARS ---');
const pil = html.match(/Tailored for Founder Velocity/i);
if (pil) console.log(html.slice(pil.index - 150, pil.index + 400));

console.log('\n--- GROWTH MATRIX ---');
const gm = html.match(/Freelancer Marketplaces/i) || html.match(/matrix-table/i);
if (gm) console.log(html.slice(gm.index - 150, gm.index + 500));

console.log('\n--- SPRINT ---');
const sp = html.match(/The 4-Stage MVP Sprint Protocol/i);
if (sp) console.log(html.slice(sp.index - 150, sp.index + 400));

console.log('\n--- CTA ---');
const cta = html.match(/Have a Startup Concept Ready to Build\?/i);
if (cta) console.log(html.slice(cta.index - 150, cta.index + 400));

