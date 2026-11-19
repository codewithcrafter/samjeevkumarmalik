const fs = require('fs');

const oldRaw = fs.readFileSync('scripts/old_index_pasted.html', 'utf-8');
const oldHtmlMatch = oldRaw.match(/<USER_REQUEST>([\s\S]*?)<\/html>/i);
const oldHtml = oldHtmlMatch ? (oldHtmlMatch[1] + '</html>') : oldRaw;

fs.writeFileSync('scripts/old_clean.html', oldHtml);
console.log('Saved clean old html to scripts/old_clean.html');

// Let's inspect differences in FAQs
const current = fs.readFileSync('index.html', 'utf-8');

function extractFAQs(html) {
  const summaryMatches = [...html.matchAll(/<summary[^>]*>([\s\S]*?)<\/summary>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const detailsMatches = [...html.matchAll(/<details[^>]*>[\s\S]*?<summary[^>]*>[\s\S]*?<\/summary>([\s\S]*?)<\/details>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  return summaryMatches.map((q, i) => ({ q, a: detailsMatches[i] || '' }));
}

console.log('\n--- OLD FAQS ---');
const oldFaqs = extractFAQs(oldHtml);
oldFaqs.forEach((f, i) => console.log(`Q${i+1}: ${f.q}\nA: ${f.a.slice(0, 100)}...\n`));

console.log('\n--- CURRENT FAQS ---');
const curFaqs = extractFAQs(current);
curFaqs.forEach((f, i) => console.log(`Q${i+1}: ${f.q}\nA: ${f.a.slice(0, 100)}...\n`));

