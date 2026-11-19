const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const BLOGS_DIR = path.join(ROOT_DIR, 'blogs');

const formHtml = `
            <!-- Quick Architecture Consultation Form -->
            <div class="blog-form-card">
              <div class="toc-header" style="border-bottom: none; margin-bottom: 0.5rem; padding-bottom: 0;">
                <span>⚡</span>
                <span>Get Expert Advisory</span>
              </div>
              <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.45; margin-bottom: 1rem;">
                Discuss your project directly with Sanjeev Kumar Malik — Senior Full-Stack Architect.
              </p>
              
              <form class="service-form blog-sidebar-form">
                <div class="form-group" style="margin-bottom: 0.75rem;">
                  <input type="text" class="form-input" style="padding: 0.65rem 0.85rem; font-size: 0.825rem;" placeholder="Your Name *" required>
                </div>
                <div class="form-group" style="margin-bottom: 0.75rem;">
                  <input type="tel" class="form-input" style="padding: 0.65rem 0.85rem; font-size: 0.825rem;" placeholder="Phone / WhatsApp *" required>
                </div>
                <div class="form-group" style="margin-bottom: 0.75rem;">
                  <input type="email" class="form-input" style="padding: 0.65rem 0.85rem; font-size: 0.825rem;" placeholder="Email Address *" required>
                </div>
                <button type="submit" class="btn-service-submit" style="padding: 0.65rem; font-size: 0.82rem;">
                  <span>Claim Advisory Call →</span>
                </button>
                <div style="font-size: 0.7rem; color: #94A3B8; text-align: center; margin-top: 0.4rem;">
                  🔒 Strict NDA • Direct review &lt; 4h
                </div>
              </form>
              <div class="service-form-success" style="display: none; padding: 0.75rem; font-size: 0.8rem;">
                <strong>✓ Request Sent!</strong> Sanjeev will connect within 4 hours.
              </div>
            </div>`;

function reorderBlog(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  const layoutStart = content.indexOf('<div class="blog-article-layout">');
  if (layoutStart === -1) {
    console.log('No blog-article-layout in', filePath);
    return;
  }

  const asideStart = content.indexOf('<aside class="blog-sidebar-sticky"', layoutStart);
  const articleStart = content.indexOf('<article class="blog-article-content"', layoutStart);

  if (asideStart === -1 || articleStart === -1) {
    console.log('Missing aside or article in', filePath);
    return;
  }

  // Check if aside is currently BEFORE article
  if (asideStart < articleStart) {
    const asideEnd = content.indexOf('</aside>', asideStart) + '</aside>'.length;
    const articleEnd = content.indexOf('</article>', articleStart) + '</article>'.length;
    const layoutEnd = content.indexOf('</div>', articleEnd) + '</div>'.length;

    let asideHtml = content.substring(asideStart, asideEnd);
    const articleHtml = content.substring(articleStart, articleEnd);

    // Insert consultation form into aside if not already present
    if (!asideHtml.includes('blog-form-card')) {
      if (asideHtml.includes('<div class="tags-card">')) {
        asideHtml = asideHtml.replace('<div class="tags-card">', formHtml + '\n\n            <div class="tags-card">');
      } else {
        asideHtml = asideHtml.replace('</aside>', formHtml + '\n          </aside>');
      }
    }

    const newLayout = `<div class="blog-article-layout">\n          \n          <!-- LEFT COLUMN: Main Article Content -->\n          ${articleHtml}\n\n          <!-- RIGHT SIDEBAR: TOC, Author, Form & Tags -->\n          ${asideHtml}\n\n        </div>`;

    content = content.substring(0, layoutStart) + newLayout + content.substring(layoutEnd);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✓ Successfully moved sidebar to RIGHT in', path.relative(ROOT_DIR, filePath));
  } else {
    // Aside is already after article, ensure form is present
    const asideEnd = content.indexOf('</aside>', asideStart) + '</aside>'.length;
    let asideHtml = content.substring(asideStart, asideEnd);

    if (!asideHtml.includes('blog-form-card')) {
      if (asideHtml.includes('<div class="tags-card">')) {
        const newAsideHtml = asideHtml.replace('<div class="tags-card">', formHtml + '\n\n            <div class="tags-card">');
        content = content.substring(0, asideStart) + newAsideHtml + content.substring(asideEnd);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('✓ Added form to right sidebar in', path.relative(ROOT_DIR, filePath));
      }
    } else {
      console.log('Already reordered with form:', path.relative(ROOT_DIR, filePath));
    }
  }
}

// Process all 10 blog files in blogs/ AND in blogs/*/index.html
const blogFiles = fs.readdirSync(BLOGS_DIR).filter(f => f.endsWith('.html') && f !== 'index.html');

blogFiles.forEach(file => {
  const rootBlogPath = path.join(BLOGS_DIR, file);
  reorderBlog(rootBlogPath);

  const slug = file.replace(/\.html$/, '');
  const dirBlogPath = path.join(BLOGS_DIR, slug, 'index.html');
  if (fs.existsSync(dirBlogPath)) {
    reorderBlog(dirBlogPath);
  }
});

console.log('✨ All blog articles successfully have TOC, Author & Form on the RIGHT SIDE!');
