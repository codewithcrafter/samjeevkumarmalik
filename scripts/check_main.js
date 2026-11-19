const fs = require('fs');

const oldHtml = fs.readFileSync('scripts/old_clean.html', 'utf-8');
const curHtml = fs.readFileSync('index.html', 'utf-8');

const oldMainMatch = oldHtml.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
const curMainMatch = curHtml.match(/<main[^>]*>([\s\S]*?)<\/main>/i);

console.log('Old main exists:', !!oldMainMatch, 'length:', oldMainMatch ? oldMainMatch[1].length : 0);
console.log('Cur main exists:', !!curMainMatch, 'length:', curMainMatch ? curMainMatch[1].length : 0);

