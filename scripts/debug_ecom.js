const fs = require('fs');
const html = fs.readFileSync('services/ecommerce-website-development.html', 'utf-8');

console.log('--- S1 search ---');
const s1 = html.match(/Eliminating the 70% Cart Abandonment Cliff/i);
console.log('S1 match exists:', !!s1);
if (s1) {
  const idx = s1.index;
  console.log(html.slice(idx - 150, idx + 350));
}

console.log('--- S2 search ---');
const s2 = html.match(/Architected for Scalable Conversions/i);
console.log('S2 match exists:', !!s2);
if (s2) {
  const idx = s2.index;
  console.log(html.slice(idx - 150, idx + 350));
}

console.log('--- S4 search ---');
const s4 = html.match(/The 4-Stage Commerce Deployment Lifecycle/i);
console.log('S4 match exists:', !!s4);
if (s4) {
  const idx = s4.index;
  console.log(html.slice(idx - 150, idx + 350));
}

