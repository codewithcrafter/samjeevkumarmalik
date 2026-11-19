const fs = require('fs');
const html = fs.readFileSync('services/custom-web-application-development.html', 'utf-8');

console.log('--- HERO ---');
const h1Idx = html.indexOf('<h1');
console.log(html.slice(h1Idx - 200, h1Idx + 500));

console.log('\n--- SECTION 1: BESPOKE LOGIC BOX ---');
const s1 = html.match(/Replace Clunky Spreadsheets/i);
if (s1) console.log(html.slice(s1.index - 150, s1.index + 400));

console.log('\n--- SECTION 2: CAPABILITIES ---');
const s2 = html.match(/Built for Enterprise Concurrency/i);
if (s2) console.log(html.slice(s2.index - 150, s2.index + 400));

console.log('\n--- SECTION 3: STACK COMPARISON ---');
const s3 = html.match(/Choosing the Right Foundation/i) || html.match(/Stack Architecture Comparison/i);
if (s3) console.log(html.slice(s3.index - 150, s3.index + 500));

console.log('\n--- SECTION 4: LIFECYCLE ---');
const s4 = html.match(/The 4-Stage Software Engineering Protocol/i);
if (s4) console.log(html.slice(s4.index - 150, s4.index + 400));

console.log('\n--- CTA BOX ---');
const cta = html.match(/Have a Complex Web App or Portal in Mind\?/i);
if (cta) console.log(html.slice(cta.index - 150, cta.index + 400));

