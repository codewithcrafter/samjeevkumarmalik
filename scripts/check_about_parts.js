const fs = require('fs');

const about = fs.readFileSync('about-sanjeev-kumar-malik.html', 'utf-8');

function showSection(id) {
  const match = about.match(new RegExp(`<section[^>]*id=["']${id}["'][^>]*>([\\s\\S]*?)<\\/section>`, 'i'));
  console.log(`\n=== SECTION #${id} ===`);
  if (match) {
    console.log(match[0].slice(0, 1000));
  } else {
    console.log('Not found');
  }
}

showSection('hero');
showSection('founderProfile');
showSection('timeline');
showSection('difference');

