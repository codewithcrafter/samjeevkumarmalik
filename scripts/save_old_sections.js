const fs = require('fs');
const oldMain = fs.readFileSync('scripts/old_main.html', 'utf-8');

// Let's print out the exact HTML of each section from oldMain
fs.writeFileSync('scripts/section_hero.html', oldMain.match(/<section[^>]*id=["']hero["'][^>]*>[\s\S]*?<\/section>/i)[0]);
fs.writeFileSync('scripts/section_services.html', oldMain.match(/<section[^>]*id=["']servicesOverview["'][^>]*>[\s\S]*?<\/section>/i)[0]);
fs.writeFileSync('scripts/section_workflow.html', oldMain.match(/<section[^>]*id=["']workflow["'][^>]*>[\s\S]*?<\/section>/i)[0]);
fs.writeFileSync('scripts/section_testimonials.html', oldMain.match(/<section[^>]*id=["']testimonials["'][^>]*>[\s\S]*?<\/section>/i)[0]);
fs.writeFileSync('scripts/section_coverage.html', oldMain.match(/<section[^>]*id=["']coverage["'][^>]*>[\s\S]*?<\/section>/i)[0]);
fs.writeFileSync('scripts/section_faqs.html', oldMain.match(/<section[^>]*id=["']faqs["'][^>]*>[\s\S]*?<\/section>/i)[0]);

const bannerMatch = oldMain.match(/<section[^>]*class=["'][^"']*section[^"']*["'][^>]*padding-bottom:\s*3rem[\s\S]*?<\/section>/i) ||
                    oldMain.match(/<h2[^>]*>Ready To Create Your High Converting Digital Presence[\s\S]*?<\/section>/i);
if (bannerMatch) {
  fs.writeFileSync('scripts/section_banner.html', bannerMatch[0]);
}

console.log('Saved all individual old sections!');

