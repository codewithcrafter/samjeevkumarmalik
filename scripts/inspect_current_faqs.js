const fs = require('fs');
const curHtml = fs.readFileSync('index.html', 'utf-8');
const faqsMatch = curHtml.match(/<section[^>]*id=["']faqs["'][^>]*>([\s\S]*?)<\/section>/i);
if (faqsMatch) {
  console.log(faqsMatch[1].slice(0, 1500));
} else {
  console.log('No #faqs found');
}

