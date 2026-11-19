const fs = require('fs');

const serviceFiles = [
  'services/ecommerce-website-development.html',
  'services/landing-page-design-development.html',
  'services/ui-ux-design-services.html',
  'services/web-development-for-startups-smes.html',
  'services/custom-web-application-development.html',
  'services/website-redesign-speed-optimization.html',
  'services/wordpress-web-development.html'
];

serviceFiles.forEach(file => {
  console.log(`\n=================== ${file} ===================`);
  const content = fs.readFileSync(file, 'utf-8');
  const sections = [...content.matchAll(/<section[^>]*>([\s\S]*?)<\/section>/gi)];
  sections.forEach((s, i) => {
    const h = s[0].match(/<(h[1-3])[^>]*>([\s\S]*?)<\/\1>/i);
    const id = s[0].match(/id=["']([^"']+)["']/i);
    console.log(`  Section ${i+1}: id=${id ? id[1] : 'none'}, heading=${h ? h[2].replace(/<[^>]+>/g, '').trim() : 'none'}`);
  });
});

