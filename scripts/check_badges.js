const fs = require('fs');

const css = fs.readFileSync('assets/css/style.css', 'utf8');

const badges = [
  'about-eyebrow-badge',
  'section-eyebrow',
  'hero-status-pill',
  'article-meta-strip',
  'profile-glass-badge',
  'service-card-footer',
  'floating-badge',
  'mockup-floating-badge',
  'mockup-floating-pill-bottom',
  'hero-tech-chip',
  'timeline-year-tag',
  'timeline-chips',
  'timeline-chip',
  'breadcrumb-nav',
  'hero-tech-strip',
  'blogs-filter-strip',
  'about-trust-row',
  'about-trust-item'
];

badges.forEach(b => {
  console.log(`\n=== .${b} ===`);
  let idx = 0;
  while ((idx = css.indexOf('.' + b, idx)) !== -1) {
    console.log(css.substring(idx - 10, idx + 140).trim());
    idx += b.length + 1;
  }
});

