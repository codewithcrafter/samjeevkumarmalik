const fs = require('fs');

const oldHtml = fs.readFileSync('scripts/old_clean.html', 'utf-8');
const curHtml = fs.readFileSync('index.html', 'utf-8');

console.log('--- OLD HEADER ---');
const oldHeader = oldHtml.match(/<header[\s\S]*?<\/header>/i);
console.log(oldHeader ? oldHeader[0].slice(0, 500) : 'None');

console.log('--- CUR HEADER ---');
const curHeader = curHtml.match(/<header[\s\S]*?<\/header>/i);
console.log(curHeader ? curHeader[0].slice(0, 500) : 'None');

console.log('--- OLD FOOTER ---');
const oldFooter = oldHtml.match(/<footer[\s\S]*?<\/footer>/i);
console.log(oldFooter ? oldFooter[0].slice(0, 500) : 'None');

console.log('--- CUR FOOTER ---');
const curFooter = curHtml.match(/<footer[\s\S]*?<\/footer>/i);
console.log(curFooter ? curFooter[0].slice(0, 500) : 'None');

