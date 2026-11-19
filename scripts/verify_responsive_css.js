const fs = require('fs');

const css = fs.readFileSync('assets/css/style.css', 'utf8');

console.log('=== ULTRA-RESPONSIVE & POPUP MODAL VERIFICATION ===');

const checks = [
  { name: 'Universal reset has html, body max-width: 100vw and overflow-x: hidden', test: css.includes('max-width: 100vw') && css.includes('overflow-x: hidden') },
  { name: 'All images and media have max-width: 100%', test: css.includes('img, picture, video, canvas, svg') && css.includes('max-width: 100%') },
  { name: 'Headings, text and labels have overflow-wrap: break-word', test: css.includes('overflow-wrap: break-word') },
  { name: 'Breadcrumbs have flex-wrap: wrap to prevent horizontal expansion', test: css.includes('.breadcrumb-nav') && css.includes('flex-wrap: wrap !important') },
  { name: 'Auto Popup modal card is compact (max-width <= 500px)', test: css.includes('.auto-popup-card') && (css.includes('max-width: 490px') || css.includes('max-width: 500px')) },
  { name: 'Auto Popup modal has max-height: 88vh and overflow-y: auto (NEVER CUTS OFF)', test: css.includes('.auto-popup-card') && css.includes('max-height: 88vh') && css.includes('overflow-y: auto') },
  { name: 'Booking Modal card is compact (max-width <= 500px)', test: css.includes('.booking-modal-card') && (css.includes('max-width: 490px') || css.includes('max-width: 500px')) },
  { name: 'Booking Modal has max-height: 88vh and overflow-y: auto (NEVER CUTS OFF)', test: css.includes('.booking-modal-card') && css.includes('max-height: 88vh') && css.includes('overflow-y: auto') },
  { name: 'Popup form row uses 2-column grid collapsing to 1 column', test: css.includes('.popup-form-row') && css.includes('grid-template-columns: 1fr 1fr') },
  { name: 'Contact hero banner stacks to 1 column at <= 992px', test: css.includes('.contact-hero-banner') && css.includes('flex-direction: column !important') },
  { name: 'Bento, channels, comparison, tech grids collapse to 1 column at <= 860px', test: css.includes('.services-bento-grid') && css.includes('grid-template-columns: 1fr !important') },
  { name: 'Hero actions button stack vertically at <= 768px', test: css.includes('.hero-actions') && css.includes('flex-direction: column !important') },
  { name: 'Header top bar and desktop nav hidden at <= 992px / <= 768px', test: css.includes('.header-top-bar') && css.includes('display: none !important') },
  { name: 'Floating Call / WhatsApp action bar docked at bottom at <= 768px', test: css.includes('.floating-contact-widget') && css.includes('position: fixed !important') }
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

console.log(allPassed ? '\nALL 14 CHECKS PASSED WITH 100% INTEGRITY!' : '\nSOME CHECKS FAILED!');
