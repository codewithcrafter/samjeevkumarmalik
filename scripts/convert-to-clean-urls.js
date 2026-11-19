const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const SERVICE_SLUGS = fs.readdirSync(path.join(ROOT_DIR, 'services'))
  .filter(f => f.endsWith('.html'))
  .map(f => f.replace(/\.html$/, ''));

const BLOG_SLUGS = fs.readdirSync(path.join(ROOT_DIR, 'blogs'))
  .filter(f => f.endsWith('.html'))
  .map(f => f.replace(/\.html$/, ''));

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

function cleanUrlsInHtml(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Replace Home links
  content = content.replace(/href=["'](?:\.\.\/)?index\.html["']/g, 'href="/"');

  // 2. Replace About links
  content = content.replace(/href=["'](?:\.\.\/)?about-sanjeev-kumar-malik\.html["']/g, 'href="/about-sanjeev-kumar-malik"');

  // 3. Replace Blogs listing links
  content = content.replace(/href=["'](?:\.\.\/)?blogs\.html["']/g, 'href="/blogs"');

  // 4. Replace Contact links
  content = content.replace(/href=["'](?:\.\.\/)?contact-us\.html["']/g, 'href="/contact-us"');
  content = content.replace(/https:\/\/sanjeevkumarmalik\.in\/contact-us\.html/g, 'https://sanjeevkumarmalik.in/contact-us');

  // 5. Replace Services links
  SERVICE_SLUGS.forEach(slug => {
    const regexFull = new RegExp(`href=["'](?:\\.\\.\\/)?services\\/${slug}\\.html["']`, 'g');
    content = content.replace(regexFull, `href="/services/${slug}"`);

    const regexSibling = new RegExp(`href=["']${slug}\\.html["']`, 'g');
    content = content.replace(regexSibling, `href="/services/${slug}"`);

    const regexHttp = new RegExp(`https:\\/\\/sanjeevkumarmalik\\.in\\/services\\/${slug}\\.html`, 'g');
    content = content.replace(regexHttp, `https://sanjeevkumarmalik.in/services/${slug}`);
  });

  // 6. Replace Blog articles links
  BLOG_SLUGS.forEach(slug => {
    const regexFull = new RegExp(`href=["'](?:\\.\\.\\/)?blogs\\/${slug}\\.html["']`, 'g');
    content = content.replace(regexFull, `href="/blogs/${slug}"`);

    const regexSibling = new RegExp(`href=["']${slug}\\.html["']`, 'g');
    content = content.replace(regexSibling, `href="/blogs/${slug}"`);

    const regexHttp = new RegExp(`https:\\/\\/sanjeevkumarmalik\\.in\\/blogs\\/${slug}\\.html`, 'g');
    content = content.replace(regexHttp, `https://sanjeevkumarmalik.in/blogs/${slug}`);
  });

  // 7. Canonical link tag clean up
  content = content.replace(/<link rel="canonical" href="https:\/\/sanjeevkumarmalik\.in\/index\.html"/g, '<link rel="canonical" href="https://sanjeevkumarmalik.in/"');
  content = content.replace(/<link rel="canonical" href="https:\/\/sanjeevkumarmalik\.in\/([^"]+?)\.html"/g, '<link rel="canonical" href="https://sanjeevkumarmalik.in/$1"');

  // 8. Open Graph & Twitter URL clean up
  content = content.replace(/<meta property="og:url" content="https:\/\/sanjeevkumarmalik\.in\/index\.html"/g, '<meta property="og:url" content="https://sanjeevkumarmalik.in/"');
  content = content.replace(/<meta property="og:url" content="https:\/\/sanjeevkumarmalik\.in\/([^"]+?)\.html"/g, '<meta property="og:url" content="https://sanjeevkumarmalik.in/$1"');
  content = content.replace(/<meta name="twitter:url" content="https:\/\/sanjeevkumarmalik\.in\/index\.html"/g, '<meta name="twitter:url" content="https://sanjeevkumarmalik.in/"');
  content = content.replace(/<meta name="twitter:url" content="https:\/\/sanjeevkumarmalik\.in\/([^"]+?)\.html"/g, '<meta name="twitter:url" content="https://sanjeevkumarmalik.in/$1"');

  // 9. Schema JSON-LD clean up
  content = content.replace(/"url":\s*"https:\/\/sanjeevkumarmalik\.in\/index\.html"/g, '"url": "https://sanjeevkumarmalik.in/"');
  content = content.replace(/"url":\s*"https:\/\/sanjeevkumarmalik\.in\/([^"]+?)\.html"/g, '"url": "https://sanjeevkumarmalik.in/$1"');
  content = content.replace(/"@id":\s*"https:\/\/sanjeevkumarmalik\.in\/([^"]+?)\.html"/g, '"@id": "https://sanjeevkumarmalik.in/$1"');
  content = content.replace(/"item":\s*"https:\/\/sanjeevkumarmalik\.in\/([^"]+?)\.html"/g, '"item": "https://sanjeevkumarmalik.in/$1"');

  fs.writeFileSync(filePath, content, 'utf8');
}

// Convert all HTML files
const htmlFiles = getHtmlFiles(ROOT_DIR);
console.log(`Processing ${htmlFiles.length} HTML files...`);
htmlFiles.forEach(cleanUrlsInHtml);
console.log('✓ All 21 HTML files updated with clean URLs!');
