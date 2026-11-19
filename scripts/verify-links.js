const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === 'node_modules' || file === '.git' || file === 'scripts' || file === '.system_generated' || file === 'brain') continue;
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
  const regex = /(?:href|src)=["']([^"'#:]+)(?:\?[^"']*)?["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const rawTarget = match[1];
    if (rawTarget.startsWith('data:') || rawTarget.startsWith('mailto:') || rawTarget.startsWith('tel:') || rawTarget.startsWith('http')) {
      continue;
    }
    const target = rawTarget.split('?')[0].split('#')[0];
    if (!target || target === '/') continue;

    let resolved;
    if (target.startsWith('/')) {
      resolved = path.join(ROOT_DIR, target);
    } else {
      resolved = path.join(path.dirname(f), target);
    }

    // Try target directly, or target.html, or target/index.html
    const exists = fs.existsSync(resolved) ||
                   fs.existsSync(resolved + '.html') ||
                   fs.existsSync(path.join(resolved, 'index.html'));

    if (!exists) {
      console.log('Broken link in ' + path.relative(ROOT_DIR, f) + ' -> ' + target + ' (resolved: ' + resolved + ')');
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
