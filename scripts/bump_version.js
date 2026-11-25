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
console.log('Total files found:', files.length);

let updated = 0;
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let newContent = content.replace(/style\.css\?v=[0-9.]+/g, 'style.css?v=6.6');
  newContent = newContent.replace(/main\.js\?v=[0-9.]+/g, 'main.js?v=6.6');
  newContent = newContent.replace(/app\.js\?v=[0-9.]+/g, 'app.js?v=6.6');

  if (newContent !== content) {
    fs.writeFileSync(f, newContent, 'utf8');
    updated++;
  }
});

console.log(`Bumped cache version to v=6.6 across ${updated} files.`);
