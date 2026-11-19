const fs = require('fs');
const html = fs.readFileSync('about-sanjeev-kumar-malik.html', 'utf-8');
console.log('H1:', html.includes('About Sanjeev Kumar Malik — <span class="gradient-text">Founder &amp; Web Development Expert in Delhi</span>'));
console.log('Hero Subtext:', html.includes('Fifteen years of building revenue-driven websites for businesses that want one accountable person'));
console.log('Profile Para 1:', html.includes('Sanjeev Kumar Malik is a full-stack web developer who has spent 15 years building websites'));
console.log('Timeline H2:', html.includes('15 Years in the Trenches'));
console.log('Diff H2:', html.includes('Why Direct Founder Architecture Wins'));
console.log('CTA text:', html.includes('Book an upfront discovery session with a web development expert in Delhi.'));

