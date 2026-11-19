const fs = require('fs');
const html = fs.readFileSync('services/custom-web-application-development.html', 'utf-8');
console.log('H1:', html.includes('Custom Web Application Development in Delhi | Scalable SaaS &amp; Enterprise Portals – <span class="gradient-text">Sanjeev Kumar Malik</span>'));
console.log('Intro Paragraph:', html.includes('Off-the-shelf software rarely fits the way your business actually runs.'));
console.log('Bespoke Box H2:', html.includes('Replace Clunky Spreadsheets With Purpose-Built Software'));
console.log('Capabilities H2:', html.includes('Built for Enterprise Concurrency &amp; Data Integrity'));
console.log('Matrix H2:', html.includes('Laravel vs MERN Stack vs Next.js Fullstack — Choosing the Right Foundation'));
console.log('Lifecycle H2:', html.includes('The 4-Stage Software Engineering Protocol'));
console.log('CTA H2:', html.includes('Have a Complex Web App or Portal in Mind?'));
console.log('CTA Paragraph:', html.includes('Share your feature list and get a technical feasibility review and architecture roadmap'));

