const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (!['node_modules', '.git', '.gemini', 'brain', 'scripts'].includes(file)) {
        results = results.concat(getFiles(full));
      }
    } else if (file.endsWith('.html') || file.endsWith('.php')) {
      results.push(full);
    }
  });
  return results;
}

const files = getFiles('.');
let count = 0;

files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  let original = c;
  c = c.replace(/style\.css\?v=[0-9.]+/g, 'style.css?v=6.2');
  c = c.replace(/app\.js\?v=[0-9.]+/g, 'app.js?v=6.2');
  if (c !== original) {
    fs.writeFileSync(f, c, 'utf8');
    count++;
  }
});

console.log(`Bumped cache version to v=6.2 in ${count} files.`);
