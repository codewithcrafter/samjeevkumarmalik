const fs = require('fs');
const path = require('path');

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

let processed = 0;

slugs.forEach(slug => {
  const filePath1 = path.join(__dirname, '..', 'blogs', `${slug}.html`);
  const filePath2 = path.join(__dirname, '..', 'blogs', slug, 'index.html');

  [filePath1, filePath2].forEach(filePath => {
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Extract existing tags from the sidebar tags card
    const tagMatch = content.match(/<div class="article-tags-cloud">([\s\S]*?)<\/div>/i);
    let tagsCloudHtml = '';
    if (tagMatch) {
      tagsCloudHtml = tagMatch[1].trim();
    }

    // 2. Inject .article-tags-bottom-bar if not already present
    if (!content.includes('article-tags-bottom-bar') && tagsCloudHtml) {
      const bottomTagsHtml = `            <!-- Prominent Article Tags Section -->
            <div class="article-tags-bottom-bar">
              <div class="tags-bar-header">
                <span class="tags-icon">🏷️</span>
                <strong>Article Topics &amp; Core Architecture Tags:</strong>
              </div>
              <div class="article-tags-cloud">
                ${tagsCloudHtml}
              </div>
            </div>\n\n`;

      if (content.includes('class="article-navigation-strip"')) {
        content = content.replace(/(<!-- Article Navigation Strip -->\s*<div class="article-navigation-strip">)/i, `${bottomTagsHtml}$1`);
      } else if (content.includes('</article>')) {
        content = content.replace(/<\/article>/i, `${bottomTagsHtml}</article>`);
      }
    }

    // 3. Ensure author founder card has updated styling and WhatsApp button
    if (content.includes('class="author-card-sidebar"') && !content.includes('class="article-founder-card"')) {
      // Add author-founder card inside article if not there
      const founderCardHtml = `            <!-- Author Bio & Founder Partnership Card -->
            <div class="article-founder-card">
              <div class="founder-card-inner">
                <div class="author-avatar-large">S</div>
                <div class="founder-card-content">
                  <div class="founder-tag-strip">
                    <span class="verified-founder-pill">✓ Verified Principal Architect</span>
                    <span class="sprint-avail-pill">⚡ 15+ Yrs Exp • Delhi NCR &amp; Global</span>
                  </div>
                  <h3 class="founder-card-name">Sanjeev Kumar Malik</h3>
                  <p class="founder-card-bio">
                    Principal Web Architect designing high-velocity enterprise WordPress platforms, custom Next.js applications, and conversion-engineered e-commerce stores with sub-0.8s Core Web Vitals.
                  </p>
                  <div class="founder-card-actions">
                    <a href="/contact-us" class="btn-primary open-booking-modal">Schedule Founder Architecture Review →</a>
                    <a href="https://wa.me/919718604362" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-outline">
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>\n\n`;

      if (content.includes('<!-- Article Navigation Strip -->')) {
        content = content.replace(/(<!-- Article Navigation Strip -->)/i, `${founderCardHtml}$1`);
      }
    }

    fs.writeFileSync(filePath, content, 'utf8');
    processed++;
  });
});

console.log(`Processed ${processed} static blog HTML files.`);
