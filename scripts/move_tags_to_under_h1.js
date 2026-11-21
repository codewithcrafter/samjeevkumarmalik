const fs = require('fs');
const path = require('path');

const slugs = [
  'custom-wordpress-plugin-vs-off-the-shelf',
  'dark-mode-website-design-worth-building',
  'designing-for-trust-ux-patterns',
  'ecommerce-checkout-flow-indian-shoppers',
  'headless-wordpress-when-it-makes-sense',
  'how-ai-overviews-affect-wordpress-seo-2026',
  'micro-interactions-ui-design',
  'multi-currency-multi-language-ecommerce',
  'web-accessibility-wcag-2-2-compliance',
  'wordpress-security-hardening-checklist'
];

let processedFiles = 0;

function processFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Extract the tags from the first article-tags-cloud
  const cloudMatch = content.match(/<div class="article-tags-cloud">([\s\S]*?)<\/div>/i);
  if (!cloudMatch) {
    console.warn('Could not find article-tags-cloud in', filePath);
    return;
  }

  const tagsInnerHtml = cloudMatch[1].trim();

  // Create the new article-header-tags block
  const headerTagsBlock = `
              <!-- Prominent Article Topics & Tags Directly Below H1 -->
              <div class="article-header-tags">
                <span class="header-tags-label">🏷️ Topics:</span>
                <div class="article-tags-cloud">
                  ${tagsInnerHtml}
                </div>
              </div>`;

  // Check if article-header-tags already present
  if (!content.includes('article-header-tags')) {
    // Insert after </h1\s*>
    content = content.replace(/(<h1[^>]*>[\s\S]*?<\/h1>)/i, `$1\n${headerTagsBlock}\n`);
  }

  // Remove bottom tags block
  // Pattern matches <!-- Prominent Article Tags Section --> followed by <div class="article-tags-bottom-bar">...</div>...</div>
  content = content.replace(/<!--\s*Prominent Article Tags Section[\s\S]*?-->\s*<div class="article-tags-bottom-bar">[\s\S]*?<\/div>\s*<\/div>/gi, '');
  // Fallback if comment is missing
  content = content.replace(/<div class="article-tags-bottom-bar">[\s\S]*?<\/div>\s*<\/div>/gi, '');

  // Remove sidebar tags card
  content = content.replace(/<!--\s*Tags Cloud Card in Sidebar\s*-->\s*<div class="tags-card">[\s\S]*?<\/div>\s*<\/div>/gi, '');
  // Fallback if comment differs
  content = content.replace(/<div class="tags-card">[\s\S]*?<\/div>\s*<\/div>/gi, '');

  fs.writeFileSync(filePath, content, 'utf8');
  processedFiles++;
  console.log('✓ Successfully updated tags in:', filePath);
}

slugs.forEach(s => {
  processFile(path.join('blogs', s + '.html'));
  processFile(path.join('blogs', s, 'index.html'));
});

console.log(`Finished processing ${processedFiles} blog HTML files.`);
