const fs = require('fs');

const oldHtml = fs.readFileSync('scripts/old_clean.html', 'utf-8');
const curHtml = fs.readFileSync('index.html', 'utf-8');

// Let's compare all text nodes or sections in detail.
// Let's write out old main and cur main to files so we can diff them cleanly.
const oldMainMatch = oldHtml.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
const curMainMatch = curHtml.match(/<main[^>]*>([\s\S]*?)<\/main>/i);

fs.writeFileSync('scripts/old_main.html', oldMainMatch ? oldMainMatch[1] : '');
fs.writeFileSync('scripts/cur_main.html', curMainMatch ? curMainMatch[1] : '');

console.log('Wrote old_main.html and cur_main.html');

