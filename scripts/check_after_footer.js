const fs = require('fs');

const curHtml = fs.readFileSync('index.html', 'utf-8');
const footerEnd = curHtml.indexOf('</footer>');
console.log(curHtml.slice(footerEnd + 9));

