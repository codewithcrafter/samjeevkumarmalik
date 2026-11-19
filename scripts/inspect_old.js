const fs = require('fs');
const oldHtml = fs.readFileSync('scripts/old_clean.html', 'utf-8');
const faqsMatch = oldHtml.match(/<section[^>]*id=["']faqs["'][^>]*>([\s\S]*?)<\/section>/i);
if (faqsMatch) {
  console.log(faqsMatch[1].slice(0, 1500));
} else {
  console.log('No #faqs found');
}

