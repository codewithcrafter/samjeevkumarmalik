const fs = require('fs');

const oldHtml = fs.readFileSync('scripts/old_clean.html', 'utf-8');
const curHtml = fs.readFileSync('index.html', 'utf-8');

const oldFooter = oldHtml.match(/<footer[\s\S]*?<\/footer>/i)[0];
const curFooter = curHtml.match(/<footer[\s\S]*?<\/footer>/i)[0];

console.log('=== OLD FOOTER ===');
console.log(oldFooter);
console.log('\n=== CUR FOOTER ===');
console.log(curFooter);

