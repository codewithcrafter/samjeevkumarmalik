const fs = require('fs');
const path = require('path');

const pairs = [
  ['about-sanjeev-kumar-malik.html', 'about-sanjeev-kumar-malik/index.html'],
  ['contact-us.html', 'contact-us/index.html'],
  ['blogs.html', 'blogs/index.html']
];

// Add services
const serviceFiles = [
  'wordpress-web-development',
  'ecommerce-website-development',
  'custom-web-application-development',
  'website-redesign-speed-optimization',
  'landing-page-design-development',
  'ui-ux-design-services',
  'web-development-for-startups-smes'
];

serviceFiles.forEach(s => {
  pairs.push([`services/${s}.html`, `services/${s}/index.html`]);
});

// Add blogs
const blogFiles = [
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

blogFiles.forEach(b => {
  pairs.push([`blogs/${b}.html`, `blogs/${b}/index.html`]);
});

console.log(`Checking ${pairs.length} pairs of HTML files...`);
let desyncCount = 0;

pairs.forEach(([file1, file2]) => {
  if (fs.existsSync(file1) && fs.existsSync(file2)) {
    const c1 = fs.readFileSync(file1, 'utf8');
    const c2 = fs.readFileSync(file2, 'utf8');
    if (c1 !== c2) {
      console.log(`DESYNC: ${file1} vs ${file2} (lengths: ${c1.length} vs ${c2.length})`);
      desyncCount++;
      // Sync file1 into file2
      fs.writeFileSync(file2, c1, 'utf8');
      console.log(`  -> Synced ${file1} to ${file2}`);
    }
  } else {
    console.log(`MISSING FILE: ${file1} or ${file2}`);
  }
});

console.log(`Check completed. Desync count was: ${desyncCount}`);

