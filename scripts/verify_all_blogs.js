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

let allPassed = true;

slugs.forEach(slug => {
  const file1 = path.join('blogs', `${slug}.html`);
  const file2 = path.join('blogs', slug, 'index.html');

  [file1, file2].forEach(file => {
    const html = fs.readFileSync(file, 'utf8');
    const imgIdx = html.indexOf('article-featured-image-box');
    const containerIdx = html.indexOf('article-toc-form-container');
    const proseIdx = html.indexOf('article-prose');
    const sidebarIdx = html.indexOf('blog-sidebar-sticky');

    const ok = (imgIdx !== -1) && 
               (containerIdx !== -1) && 
               (proseIdx !== -1) && 
               (containerIdx > imgIdx) && 
               (containerIdx < proseIdx) && 
               (sidebarIdx === -1);

    if (!ok) {
      allPassed = false;
      console.error(`FAIL: ${file} (img=${imgIdx}, container=${containerIdx}, prose=${proseIdx}, sidebar=${sidebarIdx})`);
    }
  });
});

// Also check blog.php
const php = fs.readFileSync('blog.php', 'utf8');
const pImg = php.indexOf('article-featured-image-box');
const pCont = php.indexOf('article-toc-form-container');
const pProse = php.indexOf('article-prose');
const pSide = php.indexOf('blog-sidebar-sticky');

const phpOk = (pImg !== -1) && (pCont !== -1) && (pProse !== -1) && (pCont > pImg) && (pCont < pProse) && (pSide === -1);
if (!phpOk) {
  allPassed = false;
  console.error(`FAIL: blog.php (img=${pImg}, container=${pCont}, prose=${pProse}, sidebar=${pSide})`);
}

if (allPassed) {
  console.log('ALL 20 STATIC BLOGS + BLOG.PHP PASSED PERFECTLY!');
} else {
  console.error('Some files failed verification.');
}
