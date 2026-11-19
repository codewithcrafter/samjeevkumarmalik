const fs = require('fs');
const html = fs.readFileSync('services/web-development-for-startups-smes.html', 'utf-8');
console.log('H1:', html.includes('Web Development for Startups in Delhi | Get MVP to Market Fast – <span class="gradient-text">Sanjeev Kumar Malik</span>'));
console.log('Hero subtext:', html.includes('As an early-stage founder you have to be fast but also avoid technical debt.'));
console.log('Hero Card H2:', html.includes('Fractional CTO for Your Startup'));
console.log('Pillars H2:', html.includes('Tailored for Founder Velocity &amp; Runway Protection'));
console.log('Matrix H2:', html.includes('Delhi Web Development for Startups at Every Funding Stage'));
console.log('Sprint H2:', html.includes('4 Step MVP Sprint Process'));
console.log('CTA H2:', html.includes('Start Building Your MVP'));
console.log('CTA text:', html.includes('Book a 30 minute 1-1 with Sanjeev Kumar Malik to discuss your web development for startups in Delhi.'));

