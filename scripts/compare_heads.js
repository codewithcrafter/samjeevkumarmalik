const fs = require('fs');

const oldHtml = fs.readFileSync('scripts/old_clean.html', 'utf-8');
const curHtml = fs.readFileSync('index.html', 'utf-8');

console.log('=== OLD HEAD ===');
console.log(oldHtml.match(/<head[\s\S]*?<\/head>/i)[0]);

console.log('\n=== CUR HEAD ===');
console.log(curHtml.match(/<head[\s\S]*?<\/head>/i)[0]);

