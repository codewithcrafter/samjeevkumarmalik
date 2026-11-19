const fs = require('fs');
const css = fs.readFileSync('assets/css/style.css', 'utf8');

const mockupClasses = [
  'wp-arch-mockup',
  'wp-code-box',
  'ecom-product-card',
  'payment-rails-row',
  'saas-dash-mockup',
  'saas-grid-stats',
  'speed-gauge-card',
  'speed-split-grid',
  'speed-row-metric',
  'funnel-wireframe-grid',
  'funnel-metrics-strip',
  'funnel-mini-form',
  'uiux-wcag-banner',
  'uiux-tokens-row',
  'sprint-step-row',
  'hero-interactive-mockup',
  'mockup-floating-badge',
  'mockup-floating-pill-bottom'
];

mockupClasses.forEach(cls => {
  console.log(`\n--- .${cls} ---`);
  let idx = 0;
  let found = false;
  while ((idx = css.indexOf('.' + cls, idx)) !== -1) {
    found = true;
    console.log(css.substring(idx - 10, idx + 160).trim());
    idx += cls.length + 1;
  }
  if (!found) console.log('NOT FOUND in CSS!');
});
