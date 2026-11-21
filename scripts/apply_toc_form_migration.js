const fs = require('fs');
const path = require('path');

const VOID_TAGS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);

function extractTag(content, startStr) {
  const startIndex = content.indexOf(startStr);
  if (startIndex === -1) return null;
  
  let depth = 0;
  let i = startIndex;
  
  while (i < content.length) {
    if (content[i] === '<') {
      if (content.slice(i, i + 4) === '<!--') {
        const commentEnd = content.indexOf('-->', i);
        if (commentEnd === -1) break;
        i = commentEnd + 3;
        continue;
      }
      if (content[i + 1] === '/') {
        const closeEnd = content.indexOf('>', i);
        if (closeEnd === -1) break;
        depth--;
        i = closeEnd + 1;
        if (depth === 0) {
          return {
            start: startIndex,
            end: i,
            html: content.slice(startIndex, i)
          };
        }
        continue;
      } else {
        const openEnd = content.indexOf('>', i);
        if (openEnd === -1) break;
        const tagMatch = content.slice(i + 1, openEnd).match(/^([a-zA-Z0-9-]+)/);
        const tagName = tagMatch ? tagMatch[1].toLowerCase() : '';
        const isSelfClosing = content[openEnd - 1] === '/' || VOID_TAGS.has(tagName);
        if (!isSelfClosing) {
          depth++;
        }
        i = openEnd + 1;
        continue;
      }
    }
    i++;
  }
  return null;
}

function transformBlogHtml(content, filePath) {
  const sidebarTag = extractTag(content, '<aside class="blog-sidebar-sticky"');
  if (!sidebarTag) {
    console.log(`[SKIP] No sidebar found in ${filePath}`);
    return content;
  }

  const tocTag = extractTag(sidebarTag.html, '<div class="toc-card">');
  const formTag = extractTag(sidebarTag.html, '<div class="blog-form-card">');
  const imgBoxTag = extractTag(content, '<div class="article-featured-image-box">');

  if (!tocTag || !formTag || !imgBoxTag) {
    console.log(`[WARN] Missing TOC, Form, or ImgBox in ${filePath}`);
    return content;
  }

  const tocAndForm = `\n\n            <!-- Table of Contents & Consultation Form (Directly Below Image) -->\n            <div class="article-toc-form-container">\n              ${tocTag.html}\n              ${formTag.html}\n            </div>`;

  // Insert after imgBox
  let newContent = content.slice(0, imgBoxTag.end) + tocAndForm + content.slice(imgBoxTag.end);

  // Now remove sidebar from newContent
  const newSidebarTag = extractTag(newContent, '<aside class="blog-sidebar-sticky"');
  if (newSidebarTag) {
    let removeStart = newSidebarTag.start;
    const lastCommentIdx = newContent.lastIndexOf('<!--', removeStart);
    if (lastCommentIdx !== -1 && lastCommentIdx > removeStart - 100) {
      removeStart = lastCommentIdx;
    }
    newContent = newContent.slice(0, removeStart) + newContent.slice(newSidebarTag.end);
  }

  return newContent;
}

const slugs = [
  'custom-wordpress-plugin-vs-off-the-shelf',
  'dark-mode-website-design-worth-building',
  'designing-for-trust-ux-patterns',
  'ecommerce-checkout-flow-indian-shoppers',
  'headless-wordpress-when-it-makes-sense',
  'how-ai-overviews-affect-wordpress-seo-2026',
  'micro-interactions-ui-design',
  'multi-currency-multi-language-ecommerce',
  'web-accessibility-wcag-2-2-compliance',
  'wordpress-security-hardening-checklist'
];

let processedCount = 0;

slugs.forEach(slug => {
  const file1 = path.join('blogs', `${slug}.html`);
  const file2 = path.join('blogs', slug, 'index.html');

  [file1, file2].forEach(file => {
    if (!fs.existsSync(file)) {
      console.log(`NOT FOUND: ${file}`);
      return;
    }
    const html = fs.readFileSync(file, 'utf8');
    const updated = transformBlogHtml(html, file);
    if (updated !== html) {
      fs.writeFileSync(file, updated, 'utf8');
      processedCount++;
      console.log(`[SUCCESS] Updated ${file}`);
    } else {
      console.log(`[UNCHANGED] ${file}`);
    }
  });
});

console.log(`\nTotal files updated: ${processedCount} / 20`);

