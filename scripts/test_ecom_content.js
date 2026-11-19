const fs = require('fs');
const html = fs.readFileSync('services/ecommerce-website-development.html', 'utf-8');
console.log('H1:', html.includes('Ecommerce Website Development Company - Delhi | Online Store Creation including Payment Gateway - <span class="gradient-text">Sanjeev Kumar Malik</span>'));
console.log('S1 H2:', html.includes('70% Cart Abandonment Cliff Removed'));
console.log('S2 H2:', html.includes('Fast &amp; Optimised'));
console.log('S3 H2:', html.includes('Shopify vs WooCommerce vs Headless Commerce'));
console.log('S4 H2:', html.includes('4 Stage E-Commerce Process'));
console.log('S5 H2:', html.includes('Want a fast e-commerce store?'));
console.log('CTA text:', html.includes('Chat directly to Sanjeev Kumar Malik our e-commerce website developer in Delhi'));

