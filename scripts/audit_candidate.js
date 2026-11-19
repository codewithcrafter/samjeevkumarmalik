const fs = require('fs');

const html = fs.readFileSync('scripts/new_index_candidate.html', 'utf-8');

console.log('--- LINK AUDIT ---');
const hrefs = [...html.matchAll(/href=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('Total hrefs:', hrefs.length);

const htmlLinks = hrefs.filter(h => h.includes('.html'));
console.log('Links with .html (should be 0):', htmlLinks);

const trailingSlashLinks = hrefs.filter(h => h !== '/' && h.startsWith('/') && h.endsWith('/'));
console.log('Links with trailing slash (should be 0):', trailingSlashLinks);

console.log('\n--- SECTION AUDIT ---');
const sections = [...html.matchAll(/<section[^>]*id=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
console.log('Sections found:', sections);

console.log('\n--- HEADINGS AUDIT ---');
const h1 = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
const h2 = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('H1:', h1);
console.log('H2s:', h2);

console.log('\n--- FAQS COUNT ---');
const faqs = [...html.matchAll(/<div class="faq-item/gi)];
console.log('FAQ items count (should be 10):', faqs.length);

console.log('\n--- SERVICE CARDS COUNT ---');
const servicesSec = html.match(/<section[^>]*id=["']servicesOverview["'][^>]*>([\s\S]*?)<\/section>/i)[1];
const cards = [...servicesSec.matchAll(/class=["']service-card/gi)];
console.log('Service cards count in #servicesOverview (should be 7):', cards.length);

console.log('\n--- STATS STRIP ---');
const stats = [...html.matchAll(/class="stat-item/gi)];
console.log('Stat items count (should be 4):', stats.length);
