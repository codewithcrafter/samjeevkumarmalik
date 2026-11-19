const fs = require('fs');

const current = fs.readFileSync('index.html', 'utf-8');
const oldRaw = fs.readFileSync('scripts/old_index_pasted.html', 'utf-8');
const oldHtmlMatch = oldRaw.match(/<USER_REQUEST>([\s\S]*?)<\/html>/i);
const oldHtml = oldHtmlMatch ? (oldHtmlMatch[1] + '</html>') : oldRaw;

console.log('Current index.html length:', current.length);
console.log('Old pasted html length:', oldHtml.length);

function getSections(html) {
  const matches = [...html.matchAll(/<section[^>]*id=["']([^"']+)["'][^>]*>/gi)];
  return matches.map(m => m[1]);
}

console.log('Current sections:', getSections(current));
console.log('Old sections:', getSections(oldHtml));

// Let's compare headings
function getHeadings(html) {
  const h1 = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const h2 = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  return { h1, h2 };
}

console.log('\nCurrent headings:');
console.log(JSON.stringify(getHeadings(current), null, 2));

console.log('\nOld headings:');
console.log(JSON.stringify(getHeadings(oldHtml), null, 2));

