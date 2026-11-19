const fs = require('fs');
const html = fs.readFileSync('services/wordpress-web-development.html', 'utf-8');
console.log('H1:', html.includes('WordPress Web Development Services in Delhi | Custom WordPress Development Company – <span class="gradient-text">Sanjeev Kumar Malik</span>'));
console.log('Hero paragraph:', html.includes('Looking for wordpress web development services in delhi that won\'t slow your business down?'));
console.log('Main Card heading:', html.includes('Stop Patching Slow Sites Built on Page Builders'));
console.log('Main Card paragraph:', html.includes('A slow, cluttered website quietly costs you enquiries every day.'));
console.log('Top badge:', html.includes('Hand-Coded Core • Custom Gutenberg Blocks'));
console.log('Bottom badge:', html.includes('100% Elementor-Free Build'));
console.log('Pillars H2:', html.includes('Is Your WordPress Site Engineered for Velocity?'));
console.log('Matrix H2:', html.includes('WordPress vs Custom Code — Which Fits Your Business?'));
console.log('CTA H2:', html.includes('Get a Quote for WordPress Web Development Services in Delhi'));
console.log('CTA paragraph:', html.includes('Looking for a wordpress website development company delhi ncr brands can rely on?'));

