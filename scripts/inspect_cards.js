const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const sIdx = html.indexOf('services-bento-grid');
const eIdx = html.indexOf('</section>', sIdx);
const snippet = html.substring(sIdx, eIdx);

const matches = snippet.match(/class="[^"]*service-card[^"]*"/gi) || [];
console.log('Cards classes:', matches);

// Check if any card has inline style
const inlineStyles = snippet.match(/style="[^"]*"/gi) || [];
console.log('Inline styles:', inlineStyles);
