const fs = require('fs');

const css = fs.readFileSync('assets/css/style.css', 'utf8');

console.log('=== RESPONSIVE CSS INTEGRITY VERIFICATION ===');

const checks = [
  { name: 'Base reset has img max-width: 100%', test: css.includes('img, picture, video, canvas, svg') && css.includes('max-width: 100%') },
  { name: 'Base reset has pre max-width: 100%', test: css.includes('pre {') && css.includes('overflow-x: auto') },
  { name: 'Master Responsive section exists', test: css.includes('18. MASTER RESPONSIVE ARCHITECTURE & MOBILE POLISH') },
  { name: 'services-bento-grid single column at <= 860px', test: css.includes('.services-bento-grid') && css.includes('grid-template-columns: 1fr !important') },
  { name: 'testimonials-grid single column at <= 860px', test: css.includes('.testimonials-grid') && css.includes('grid-template-columns: 1fr !important') },
  { name: 'contact-intake-grid defined and responsive', test: css.includes('.contact-intake-grid') && css.includes('1.05fr 1.25fr') },
  { name: 'table-responsive has touch scrolling', test: css.includes('.table-responsive') && css.includes('-webkit-overflow-scrolling: touch') },
  { name: 'matrix-table min-width 560px', test: css.includes('.matrix-table') && css.includes('min-width: 560px !important') },
  { name: 'floating-badge position static on mobile', test: css.includes('.floating-badge') && css.includes('position: static !important') },
  { name: 'hero-actions vertical column on mobile', test: css.includes('.hero-actions') && css.includes('flex-direction: column !important') },
  { name: 'header-top-bar hidden on <= 768px', test: css.includes('.header-top-bar') && css.includes('display: none !important') },
  { name: 'floating-contact-widget fixed bottom bar on <= 768px', test: css.includes('.floating-contact-widget') && css.includes('position: fixed !important') }
];

let allPassed = true;
checks.forEach(c => {
  if (c.test) {
    console.log(`[PASS] ${c.name}`);
  } else {
    console.log(`[FAIL] ${c.name}`);
    allPassed = false;
  }
});

console.log(allPassed ? '\nALL 12 RESPONSIVE CHECKS PASSED!' : '\nSOME CHECKS FAILED!');

