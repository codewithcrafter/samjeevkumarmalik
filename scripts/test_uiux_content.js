const fs = require('fs');
const html = fs.readFileSync('services/ui-ux-design-services.html', 'utf-8');
console.log('H1:', html.includes('UI UX Design Services Delhi | Human Centred UI/UX Design by <span class="gradient-text">Sanjeev Kumar Malik</span>'));
console.log('Hero Paragraph:', html.includes('Great design is very important. Good design will make your website visitors understand'));
console.log('Feature Box H2:', html.includes('Closing The Gap Between Figma And Code'));
console.log('Pillars H2:', html.includes('User Friendly &amp; Convertive Design'));
console.log('Matrix H3:', html.includes('Why Beautiful Designs Often Fail &amp; How We Ensure You Get The Best UI UX Design Services In Delhi'));
console.log('Process H2:', html.includes('4 STEP UX ENGINEERING PROCESS'));
console.log('CTA H2:', html.includes('Want A UI/UX Design That Will Help Boost Sales?'));
console.log('CTA text:', html.includes('Book A Direct Session To Get An In Depth UX Review Of Your Current Product'));

