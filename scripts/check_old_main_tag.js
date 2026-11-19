const fs = require('fs');
const oldHtml = fs.readFileSync('scripts/old_clean.html', 'utf-8');
const match = oldHtml.match(/<main[^>]*>/i);
console.log('main tag:', match ? match[0] : 'None');

