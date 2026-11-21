const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (!['node_modules', '.git', '.gemini', 'brain'].includes(file)) {
        results = results.concat(getFiles(full));
      }
    } else if ((file.endsWith('.html') || file.endsWith('.php')) && !full.includes('scripts')) {
      results.push(full);
    }
  });
  return results;
}

const files = getFiles('.');
console.log(`Processing ${files.length} HTML/PHP files for Services navigation...`);

let updatedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // 1. Update dropdown toggle link from /services/wordpress-web-development to /services
  content = content.replace(
    /(<li class="nav-item nav-dropdown"[^>]*>\s*<a href=")\/services\/wordpress-web-development(" class="nav-link dropdown-toggle")/g,
    '$1/services$2'
  );

  // 2. Add All Services Hub link in mobile drawer if not already present
  if (!content.includes('href="/services"') && !file.includes('services.html') && !file.includes('services\\index.html')) {
    content = content.replace(
      /(<div class="mobile-nav-drawer"[^>]*>\s*<a href="\/" class="nav-link">Home<\/a>)/g,
      '$1\n    <a href="/services" class="nav-link" style="font-weight: 800; color: #2563EB;">✨ All 7 Services Hub</a>'
    );
  }

  // 3. Add All Services Hub in footer services list if not present
  if (!content.includes('<li><a href="/services"') && !content.includes('<li><a href="/services"')) {
    content = content.replace(
      /(<div class="footer-col-title">Services \(7 Hubs\)<\/div>\s*<ul class="footer-nav-list">)/g,
      '$1\n            <li><a href="/services" style="font-weight: 750; color: #2563EB;">All 7 Services Hub</a></li>'
    );
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    updatedCount++;
  }
});

console.log(`Successfully updated Services links in ${updatedCount} files.`);
