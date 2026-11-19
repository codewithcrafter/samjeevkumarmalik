const fs = require('fs');

// Let's inspect the head of a blog, a service, about, contact, and index
const sampleFiles = [
  'index.html',
  'about-sanjeev-kumar-malik.html',
  'contact-us.html',
  'services/wordpress-web-development.html',
  'blogs/custom-wordpress-plugin-vs-off-the-shelf.html',
  'blogs.html'
];

sampleFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf-8');
  const headMatch = content.match(/<head[\s\S]*?<\/head>/i);
  console.log('=== ' + f + ' HEAD ===');
  console.log(headMatch ? headMatch[0].slice(-400) : 'No head');
});

