const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const SERVICE_SLUGS = fs.readdirSync(path.join(ROOT_DIR, 'services'))
  .filter(f => f.endsWith('.html') && f !== 'index.html')
  .map(f => f.replace(/\.html$/, ''));

const BLOG_SLUGS = fs.readdirSync(path.join(ROOT_DIR, 'blogs'))
  .filter(f => f.endsWith('.html') && f !== 'index.html')
  .map(f => f.replace(/\.html$/, ''));

const ROOT_PAGES = [
  'about-sanjeev-kumar-malik',
  'contact-us',
  'blogs'
];

function normalizeHtmlContent(content) {
  // 1. Root-relative assets
  content = content.replace(/(?:href|src)=["'](?:\.\.\/)?assets\//g, (match) => {
    return match.startsWith('href') ? 'href="/assets/' : 'src="/assets/';
  });

  // 2. Canonical & OG tags (NO trailing slash, except root domain /)
  content = content.replace(/<link rel="canonical" href="https:\/\/sanjeevkumarmalik\.in\/(?:index\.html)?"/g, '<link rel="canonical" href="https://sanjeevkumarmalik.in/"');
  content = content.replace(/<link rel="canonical" href="https:\/\/sanjeevkumarmalik\.in\/([^"]+?)(?:\.html|\/|\b)?"/g, (m, slug) => {
    if (slug === '' || slug === 'index') return '<link rel="canonical" href="https://sanjeevkumarmalik.in/">';
    return `<link rel="canonical" href="https://sanjeevkumarmalik.in/${slug}">`;
  });

  content = content.replace(/<meta property="og:url" content="https:\/\/sanjeevkumarmalik\.in\/([^"]+?)(?:\.html|\/|\b)?"/g, (m, slug) => {
    if (slug === '' || slug === 'index') return '<meta property="og:url" content="https://sanjeevkumarmalik.in/">';
    return `<meta property="og:url" content="https://sanjeevkumarmalik.in/${slug}">`;
  });

  content = content.replace(/<meta name="twitter:url" content="https:\/\/sanjeevkumarmalik\.in\/([^"]+?)(?:\.html|\/|\b)?"/g, (m, slug) => {
    if (slug === '' || slug === 'index') return '<meta name="twitter:url" content="https://sanjeevkumarmalik.in/">';
    return `<meta name="twitter:url" content="https://sanjeevkumarmalik.in/${slug}">`;
  });

  // Schema URLs
  content = content.replace(/"url":\s*"https:\/\/sanjeevkumarmalik\.in\/([^"]+?)(?:\.html|\/|\b)?"/g, (m, slug) => {
    if (slug === '' || slug === 'index') return '"url": "https://sanjeevkumarmalik.in/"';
    return `"url": "https://sanjeevkumarmalik.in/${slug}"`;
  });
  content = content.replace(/"@id":\s*"https:\/\/sanjeevkumarmalik\.in\/([^"]+?)(?:\.html|\/|\b)?"/g, (m, slug) => {
    if (slug === '' || slug === 'index') return '"@id": "https://sanjeevkumarmalik.in/"';
    return `"@id": "https://sanjeevkumarmalik.in/${slug}"`;
  });
  content = content.replace(/"item":\s*"https:\/\/sanjeevkumarmalik\.in\/([^"]+?)(?:\.html|\/|\b)?"/g, (m, slug) => {
    if (slug === '' || slug === 'index') return '"item": "https://sanjeevkumarmalik.in/"';
    return `"item": "https://sanjeevkumarmalik.in/${slug}"`;
  });

  // 3. Navigation Links - NO trailing slash (except root /)
  // Home
  content = content.replace(/href=["'](?:\.\.\/)?index(?:\.html)?["']/g, 'href="/"');

  // Root Pages
  ROOT_PAGES.forEach(slug => {
    const reg = new RegExp(`href=["'](?:\\.\\.\\/)?${slug}(?:\\.html|\\/)?["']`, 'g');
    content = content.replace(reg, `href="/${slug}"`);
  });

  // Services
  SERVICE_SLUGS.forEach(slug => {
    const regFull = new RegExp(`href=["'](?:\\.\\.\\/)?services\\/${slug}(?:\\.html|\\/)?["']`, 'g');
    content = content.replace(regFull, `href="/services/${slug}"`);

    const regShort = new RegExp(`href=["']${slug}(?:\\.html|\\/)?["']`, 'g');
    content = content.replace(regShort, `href="/services/${slug}"`);
  });

  // Blogs
  BLOG_SLUGS.forEach(slug => {
    const regFull = new RegExp(`href=["'](?:\\.\\.\\/)?blogs\\/${slug}(?:\\.html|\\/)?["']`, 'g');
    content = content.replace(regFull, `href="/blogs/${slug}"`);

    const regShort = new RegExp(`href=["']${slug}(?:\\.html|\\/)?["']`, 'g');
    content = content.replace(regShort, `href="/blogs/${slug}"`);
  });

  return content;
}

// 1. Process index.html
const indexPath = path.join(ROOT_DIR, 'index.html');
const indexClean = normalizeHtmlContent(fs.readFileSync(indexPath, 'utf8'));
fs.writeFileSync(indexPath, indexClean, 'utf8');
console.log('✓ Updated index.html');

// 2. Process root pages (about, contact, blogs)
ROOT_PAGES.forEach(slug => {
  const file = path.join(ROOT_DIR, `${slug}.html`);
  if (fs.existsSync(file)) {
    const clean = normalizeHtmlContent(fs.readFileSync(file, 'utf8'));
    fs.writeFileSync(file, clean, 'utf8');

    // Directory index.html
    const dir = path.join(ROOT_DIR, slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), clean, 'utf8');
    console.log(`✓ Synchronized /${slug} (NO trailing slash)`);
  }
});

// 3. Process services
SERVICE_SLUGS.forEach(slug => {
  const file = path.join(ROOT_DIR, 'services', `${slug}.html`);
  if (fs.existsSync(file)) {
    const clean = normalizeHtmlContent(fs.readFileSync(file, 'utf8'));
    fs.writeFileSync(file, clean, 'utf8');

    // Directory index.html
    const dir = path.join(ROOT_DIR, 'services', slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), clean, 'utf8');
    console.log(`✓ Synchronized /services/${slug} (NO trailing slash)`);
  }
});

// 4. Process blogs
BLOG_SLUGS.forEach(slug => {
  const file = path.join(ROOT_DIR, 'blogs', `${slug}.html`);
  if (fs.existsSync(file)) {
    const clean = normalizeHtmlContent(fs.readFileSync(file, 'utf8'));
    fs.writeFileSync(file, clean, 'utf8');

    // Directory index.html
    const dir = path.join(ROOT_DIR, 'blogs', slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), clean, 'utf8');
    console.log(`✓ Synchronized /blogs/${slug} (NO trailing slash)`);
  }
});

console.log('✨ All pages successfully synchronized for Clean URLs with NO trailing slashes!');
