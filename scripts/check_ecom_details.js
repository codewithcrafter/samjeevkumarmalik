const fs = require('fs');

const html = fs.readFileSync('services/ecommerce-website-development.html', 'utf-8');

console.log('=== HERO ===');
const heroMatch = html.match(/<section class="section section-hero"[\s\S]*?<\/section>/i) ||
                  html.match(/<div class="hero-content"[\s\S]*?<\/div>\s*<\/div>/i);
console.log(heroMatch ? heroMatch[0].slice(0, 1200) : 'None');

console.log('\n=== SECTION 1: CART ABANDONMENT ===');
const s1Match = html.match(/Cart Abandonment Cliff[\s\S]*?<\/div>\s*<\/div>/i);
console.log(s1Match ? s1Match[0].slice(0, 1000) : 'None');

console.log('\n=== SECTION 2: PILLARS ===');
const s2Match = html.match(/Architected for Scalable Conversions[\s\S]*?<\/div>\s*<\/div>/i);
console.log(s2Match ? s2Match[0].slice(0, 1000) : 'None');

console.log('\n=== SECTION 3: MATRIX ===');
const s3Match = html.match(/Engineered to Turn Indian &amp; Global Browsers into Buyers[\s\S]*?<\/table>/i);
console.log(s3Match ? s3Match[0].slice(0, 800) : 'None');

console.log('\n=== SECTION 4: LIFECYCLE ===');
const s4Match = html.match(/The 4-Stage Commerce Deployment Lifecycle[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i);
console.log(s4Match ? s4Match[0].slice(0, 800) : 'None');

console.log('\n=== SECTION 5: CTA BOX ===');
const s5Match = html.match(/Ready to Build a High-Velocity E-commerce Store\?[\s\S]*?<\/div>\s*<\/div>/i);
console.log(s5Match ? s5Match[0].slice(0, 600) : 'None');

