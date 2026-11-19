const fs = require('fs');

const html = fs.readFileSync('scripts/new_index_candidate.html', 'utf-8');
const hrefs = [...html.matchAll(/href=["']([^"']+)["']/gi)].map(m => m[1]);

console.log('Unique hrefs in candidate:');
const uniqueHrefs = [...new Set(hrefs)];
uniqueHrefs.forEach(h => console.log(' - ' + h));

