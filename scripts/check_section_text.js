const fs = require('fs');

const oldMain = fs.readFileSync('scripts/old_main.html', 'utf-8');
const curMain = fs.readFileSync('scripts/cur_main.html', 'utf-8');

// Let's compare the sections one by one
const sectionNames = [
  'hero',
  'servicesOverview',
  'workflow',
  'testimonials',
  'coverage',
  'faqs'
];

function getSection(html, id) {
  const reg = new RegExp(`<section[^>]*id=["']${id}["'][^>]*>([\\s\\S]*?)<\\/section>`, 'i');
  const m = html.match(reg);
  return m ? m[1] : '';
}

for (const sec of sectionNames) {
  const o = getSection(oldMain, sec);
  const c = getSection(curMain, sec);
  console.log(`\n=================== ${sec} ===================`);
  if (!o) console.log('Old missing ' + sec);
  if (!c) console.log('Cur missing ' + sec);
  
  // Compare clean text
  const oText = o.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const cText = c.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  
  if (oText === cText) {
    console.log('TEXT MATCHES 100%!');
  } else {
    console.log('TEXT DIFFERS!');
    // Let's print out what differs
    console.log('OLD length:', oText.length, 'CUR length:', cText.length);
  }
}

