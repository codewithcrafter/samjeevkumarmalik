const fs = require('fs');

const current = fs.readFileSync('index.html', 'utf-8');
const oldRaw = fs.readFileSync('scripts/old_index_pasted.html', 'utf-8');
const oldHtmlMatch = oldRaw.match(/<USER_REQUEST>([\s\S]*?)<\/html>/i);
const oldHtml = oldHtmlMatch ? (oldHtmlMatch[1] + '</html>') : oldRaw;

function extractSection(html, id) {
  const regex = new RegExp(`<section[^>]*id=["']${id}["'][^>]*>([\\s\\S]*?)<\\/section>`, 'i');
  const match = html.match(regex);
  return match ? match[1] : null;
}

const sections = ['hero', 'servicesOverview', 'workflow', 'testimonials', 'coverage', 'faqs'];

for (const sec of sections) {
  const curContent = extractSection(current, sec);
  const oldContent = extractSection(oldHtml, sec);
  console.log(`\n=================== SECTION: ${sec} ===================`);
  console.log(`Current length: ${curContent ? curContent.length : 0}, Old length: ${oldContent ? oldContent.length : 0}`);
  
  // Extract all paragraphs or texts
  const curP = [...(curContent || '').matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const oldP = [...(oldContent || '').matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());

  console.log(`-- OLD PARAGRAPHS (${oldP.length}):`);
  oldP.forEach((p, i) => console.log(`  [${i+1}] ${p.slice(0, 100)}...`));

  console.log(`-- CURRENT PARAGRAPHS (${curP.length}):`);
  curP.forEach((p, i) => console.log(`  [${i+1}] ${p.slice(0, 100)}...`));
}

// Check also the conversion banner (usually after faqs or inside faqs / footer)
console.log('\n=================== CONVERSION BANNER / FOOTER ===================');
const curBanner = current.match(/<section[^>]*class=["'][^"']*conversion-banner[^"']*["'][^>]*>([\s\S]*?)<\/section>/i) ||
                  current.match(/class=["'][^"']*final-cta[^"']*["'][\s\S]*?<\/section>/i);
const oldBanner = oldHtml.match(/<section[^>]*class=["'][^"']*conversion-banner[^"']*["'][^>]*>([\s\S]*?)<\/section>/i) ||
                  oldHtml.match(/class=["'][^"']*final-cta[^"']*["'][\s\S]*?<\/section>/i);

console.log('Old conversion text:', oldHtml.match(/Ready To Create Your High Converting Digital Presence[\s\S]*?<\/p>/i)?.[0]);
console.log('Current conversion text:', current.match(/Ready to Build Your High-Converting Digital Flagship[\s\S]*?<\/p>/i)?.[0]);

