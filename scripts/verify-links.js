const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === 'node_modules' || file === '.git' || file === 'scripts') continue;
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(getHtmlFiles(full));
    } else if (file.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const files = getHtmlFiles(ROOT_DIR);
console.log('Found ' + files.length + ' HTML files.');
let broken = 0;

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const regex = /(?:href|src)=["']([^"'#:]+)["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const target = match[1];
    if (target.startsWith('mailto:') || target.startsWith('tel:') || target.startsWith('http') || target.startsWith('data:')) {
      continue;
    }
    
    // Resolve target path
    let resolved;
    if (target === '/' || target === '') {
      resolved = path.join(ROOT_DIR, 'index.html');
    } else if (target.startsWith('/')) {
      const sub = target.slice(1);
      resolved = path.join(ROOT_DIR, sub);
    } else {
      resolved = path.resolve(path.dirname(f), target);
    }

    // Check if target exists directly, or with .html, or as directory index.html
    const exists = fs.existsSync(resolved) || 
                   fs.existsSync(resolved + '.html') || 
                   (fs.existsSync(resolved) && fs.statSync(resolved).isDirectory() && fs.existsSync(path.join(resolved, 'index.html')));

    if (!exists) {
      console.error('Broken link in ' + path.relative(ROOT_DIR, f) + ' -> ' + target + ' (resolved: ' + resolved + ')');
      broken++;
    }
  }
}

if (broken === 0) {
  console.log('SUCCESS: All internal links in all ' + files.length + ' HTML files are 100% valid!');
} else {
  console.error('ERROR: Total broken links = ' + broken);
  process.exit(1);
}
