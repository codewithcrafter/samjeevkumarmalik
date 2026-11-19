const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (!['node_modules', '.git', '.gemini', 'brain', 'scripts'].includes(file)) {
        results = results.concat(getHtmlFiles(full));
      }
    } else if (file.endsWith('.html')) {
      results.push(full);
    }
  });
  return results;
}

const htmlFiles = getHtmlFiles('.');
let updated = 0;

htmlFiles.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;

  if (content.includes('style.css?v=4.0')) {
    content = content.split('style.css?v=4.0').join('style.css?v=4.1');
    changed = true;
  }
  if (content.includes('app.js?v=4.0')) {
    content = content.split('app.js?v=4.0').join('app.js?v=4.1');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(f, content);
    updated++;
  }
});

console.log(`Bumped cache version to v=4.1 across ${updated} HTML files.`);

