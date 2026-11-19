const fs = require('fs');

const oldHtml = fs.readFileSync('scripts/old_clean.html', 'utf-8');

// Let's list all elements with class or id in oldHtml
console.log('--- HEAD TITLE & METAS ---');
const titleMatch = oldHtml.match(/<title>([\s\S]*?)<\/title>/i);
console.log('Title:', titleMatch ? titleMatch[1] : '');

const descMatch = oldHtml.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
console.log('Description:', descMatch ? descMatch[1] : '');

const kwMatch = oldHtml.match(/<meta\s+name=["']keywords["']\s+content=["']([\s\S]*?)["']/i);
console.log('Keywords:', kwMatch ? kwMatch[1] : '');

// Let's inspect each section in oldHtml
const sectionsRegex = /<section[^>]*id=["']([^"']+)["'][^>]*>([\s\S]*?)<\/section>/gi;
let match;
while ((match = sectionsRegex.exec(oldHtml)) !== null) {
  const id = match[1];
  const body = match[2];
  console.log(`\n================ SECTION #${id} ================`);
  
  // Find all headings
  const h = [...body.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi)].map(m => `${m[1]}: ${m[2].replace(/<[^>]+>/g, '').trim()}`);
  console.log('Headings:', h);

  // Eyebrows
  const eyebrows = [...body.matchAll(/class=["'][^"']*eyebrow[^"']*["'][^>]*>([\s\S]*?)<\/[a-z0-9]+>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  if (eyebrows.length) console.log('Eyebrows:', eyebrows);

  // Paragraphs
  const p = [...body.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  console.log(`Paragraphs (${p.length}):`);
  p.forEach((text, i) => console.log(`  [${i+1}] ${text}`));
}

// Check what comes after the last section in oldHtml (e.g. conversion banner, footer, booking modal)
const afterSections = oldHtml.slice(oldHtml.lastIndexOf('</section>') + 10);
console.log('\n================ AFTER SECTIONS ================');
const afterHeadings = [...afterSections.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi)].map(m => `${m[1]}: ${m[2].replace(/<[^>]+>/g, '').trim()}`);
console.log('Headings after sections:', afterHeadings);

const afterP = [...afterSections.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log(`Paragraphs after sections (${afterP.length}):`);
afterP.forEach((text, i) => console.log(`  [${i+1}] ${text}`));

