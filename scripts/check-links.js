const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'scripts') {
        results = results.concat(getHtmlFiles(fullPath));
      }
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = getHtmlFiles(path.join(__dirname, '..'));
let allHtmlLinks = new Set();

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.match(/href="[^"]*"/g) || [];
  matches.forEach(m => {
    const href = m.slice(6, -1);
    if (href.includes('.html')) {
      allHtmlLinks.add(href);
    }
  });
});

console.log('Total unique hrefs with .html:', allHtmlLinks.size);
console.log('Unique hrefs with .html:', Array.from(allHtmlLinks).sort());

