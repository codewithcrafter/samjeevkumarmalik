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

slugs.forEach(s => {
  const file = path.join('blogs', s + '.html');
  const content = fs.readFileSync(file, 'utf8');
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const bottomTags = content.includes('article-tags-bottom-bar');
  const sidebarTags = content.includes('tags-card');
  const cloudMatch = content.match(/<div class="article-tags-cloud">([\s\S]*?)<\/div>/i);

  console.log(s, {
    hasH1: !!h1Match,
    hasBottomTags: bottomTags,
    hasSidebarTags: sidebarTags,
    tagsCount: cloudMatch ? (cloudMatch[1].match(/<a/g) || []).length : 0
  });
});

