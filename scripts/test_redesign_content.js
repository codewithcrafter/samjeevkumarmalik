const fs = require('fs');
const html = fs.readFileSync('services/website-redesign-speed-optimization.html', 'utf-8');
console.log('H1:', html.includes('Website Redesign Services Delhi | Speed Optimised &amp; No SEO Loss – <span class="gradient-text">Sanjeev Kumar Malik</span>'));
console.log('Sub-heading:', html.includes('Worry No More About Lost Enquiries After Website Redesign!'));
console.log('Intro Paragraph:', html.includes('As a reliable Website Redesign Company Delhi NCR, I redesign your slow and outdated website'));
console.log('Box 1 H2:', html.includes('Why You Will Lose 40% Of Organic Traffic With A Website Redesign'));
console.log('Section 2 H2:', html.includes('SEO Friendly &amp; User Friendly Website'));
console.log('Section 3 H2:', html.includes('Do You Need A Reskin, Rebuild Or Speed Optimisation?'));
console.log('Section 4 H2:', html.includes('4 Step Website Update Process'));

