const fs = require('fs');
const html = fs.readFileSync('services/landing-page-design-development.html', 'utf-8');

console.log('--- HERO SEARCH ---');
const h1Idx = html.indexOf('<h1');
console.log(html.slice(h1Idx - 200, h1Idx + 500));

console.log('\n--- HERO BOX LEFT SEARCH ---');
const hb = html.match(/One Target Persona/i);
if (hb) console.log(html.slice(hb.index - 100, hb.index + 400));

console.log('\n--- MOCKUP CARD RIGHT SEARCH ---');
const mc = html.match(/id="funnelMockupCard"/i);
if (mc) console.log(html.slice(mc.index, mc.index + 800));

console.log('\n--- PILLARS SEARCH ---');
const pil = html.match(/Crafted for Conversion Velocity/i);
if (pil) console.log(html.slice(pil.index - 150, pil.index + 400));

console.log('\n--- MATRIX SEARCH ---');
const mat = html.match(/Generic Page Builders vs/i);
if (mat) console.log(html.slice(mat.index - 150, mat.index + 400));

console.log('\n--- SPRINT SEARCH ---');
const sp = html.match(/The 4-Stage Funnel Engineering Sprint/i);
if (sp) console.log(html.slice(sp.index - 150, sp.index + 400));

console.log('\n--- CTA BOX SEARCH ---');
const cta = html.match(/Planning a Paid Google or Meta Ad Campaign\?/i);
if (cta) console.log(html.slice(cta.index - 150, cta.index + 400));

