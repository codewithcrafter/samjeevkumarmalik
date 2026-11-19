const fs = require('fs');
const html = fs.readFileSync('services/ui-ux-design-services.html', 'utf-8');

console.log('--- HERO ---');
const h1Idx = html.indexOf('<h1');
console.log(html.slice(h1Idx - 200, h1Idx + 500));

console.log('\n--- FEATURE BOX ---');
const fb = html.match(/Closing the Chasm/i);
if (fb) console.log(html.slice(fb.index - 150, fb.index + 400));

console.log('\n--- DESIGN SERVICES (PILLARS) ---');
const ds = html.match(/Engineered for Usability/i);
if (ds) console.log(html.slice(ds.index - 150, ds.index + 400));

console.log('\n--- DESIGN MATRIX ---');
const dm = html.match(/Surface-Level UI Studios vs/i);
if (dm) console.log(html.slice(dm.index - 150, dm.index + 400));

console.log('\n--- DESIGN PROCESS ---');
const dp = html.match(/The 4-Stage UX Engineering Lifecycle/i);
if (dp) console.log(html.slice(dp.index - 150, dp.index + 400));

console.log('\n--- CTA BOX ---');
const cta = html.match(/Ready for an Awwwards-Tier/i);
if (cta) console.log(html.slice(cta.index - 150, cta.index + 400));

