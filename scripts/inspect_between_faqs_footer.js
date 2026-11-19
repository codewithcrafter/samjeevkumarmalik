const fs = require('fs');
const oldHtml = fs.readFileSync('scripts/old_clean.html', 'utf-8');

const faqsEnd = oldHtml.indexOf('</section>', oldHtml.indexOf('id="faqs"'));
const footerStart = oldHtml.indexOf('<footer');

console.log('Between faqs and footer in oldHtml:');
console.log(oldHtml.slice(faqsEnd, footerStart));

