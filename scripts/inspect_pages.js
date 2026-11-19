const fs = require('fs');

const pages = [
  'index.html',
  'about-sanjeev-kumar-malik.html',
  'contact-us.html',
  'blogs.html',
  'services/wordpress-web-development.html',
  'services/ecommerce-website-development.html',
  'services/custom-web-application-development.html',
  'services/website-redesign-speed-optimization.html',
  'services/landing-page-design-development.html',
  'services/ui-ux-design-services.html',
  'services/web-development-for-startups-smes.html',
  'blogs/custom-wordpress-plugin-vs-off-the-shelf.html',
  'blogs/ecommerce-checkout-flow-indian-shoppers.html'
];

pages.forEach(p => {
  const content = fs.readFileSync(p, 'utf8');
  console.log(`\n================= ${p} =================`);
  const sections = [...content.matchAll(/<section[^>]*class="([^"]+)"[^>]*>/g)].map(m => m[1]);
  console.log('Sections:', sections);
  
  // Check any elements with hardcoded widths or min-widths
  const inlineStyles = [...content.matchAll(/style="([^"]+)"/g)].map(m => m[1]);
  const suspiciousStyles = inlineStyles.filter(s => s.includes('width:') || s.includes('min-width:'));
  if (suspiciousStyles.length > 0) {
    console.log('Suspicious inline styles:');
    suspiciousStyles.slice(0, 5).forEach(s => console.log('  -', s));
  }
});

