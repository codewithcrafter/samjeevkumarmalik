const fs = require('fs');

const html = fs.readFileSync('scripts/new_index_candidate.html', 'utf-8');
const servicesSec = html.match(/<section[^>]*id=["']servicesOverview["'][^>]*>([\s\S]*?)<\/section>/i)[1];

const matches = [...servicesSec.matchAll(/class=["']([^"']*service-card[^"']*)["']/gi)];
console.log('Matches length:', matches.length);
matches.forEach((m, i) => console.log(i + ': ' + m[1]));

