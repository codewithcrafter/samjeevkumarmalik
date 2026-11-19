const fs = require('fs');
const about = fs.readFileSync('about-sanjeev-kumar-malik.html', 'utf-8');

const sections = [...about.matchAll(/<section[^>]*>([\s\S]*?)<\/section>/gi)];
console.log('Total sections in about:', sections.length);
sections.forEach((s, i) => {
  const h = s[0].match(/<(h[1-3])[^>]*>([\s\S]*?)<\/\1>/i);
  const id = s[0].match(/id=["']([^"']+)["']/i);
  console.log(`Section ${i+1}: id=${id ? id[1] : 'none'}, heading=${h ? h[2].replace(/<[^>]+>/g, '').trim() : 'none'}`);
});

