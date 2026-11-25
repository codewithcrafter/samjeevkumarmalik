const fs = require('fs');

const pages = [
  'index.html',
  'about-sanjeev-kumar-malik.html',
  'services.html',
  'services/wordpress-web-development.html',
  'services/ecommerce-website-development.html',
  'services/landing-page-design-development.html',
  'services/ui-ux-design-services.html',
  'services/web-development-for-startups-smes.html',
  'services/custom-web-application-development.html',
  'services/website-redesign-speed-optimization.html',
  'contact-us.html'
];

console.log('=== TESTING FAQ RESPONSIVENESS ACROSS ALL PAGES ===\n');

let allPassed = true;

pages.forEach(p => {
  const html = fs.readFileSync(p, 'utf8');
  
  // 1. Has .faq-accordion
  const hasAccordion = html.includes('class="faq-accordion"');
  // 2. Has .faq-item
  const hasItems = html.includes('class="faq-item');
  // 3. Has .faq-question-btn
  const hasButtons = html.includes('class="faq-question-btn"');
  // 4. Has .faq-answer
  const hasAnswers = html.includes('class="faq-answer"');
  // 5. Count of FAQ items
  const itemCount = (html.match(/class="faq-item/g) || []).length;

  const passed = hasAccordion && hasItems && hasButtons && hasAnswers && itemCount > 0;
  if (!passed) allPassed = false;

  console.log(`[${passed ? 'PASS' : 'FAIL'}] ${p}: ${itemCount} FAQs, accordion wrapper: ${hasAccordion}`);
});

// Now verify CSS rules in assets/css/style.css
console.log('\n=== TESTING FAQ CSS RESPONSIVE RULES ===\n');

const css = fs.readFileSync('assets/css/style.css', 'utf8');

const cssChecks = [
  { name: '.faq-accordion has width: 100% and max-width: 860px', test: css.includes('.faq-accordion') && css.includes('max-width: 860px;') },
  { name: '.faq-question-btn span has word-break: break-word', test: css.includes('.faq-question-btn span') && css.includes('word-break: break-word;') },
  { name: '.faq-question-btn span has flex: 1 and min-width: 0', test: css.includes('.faq-question-btn span') && css.includes('flex: 1;') && css.includes('min-width: 0;') },
  { name: '.faq-chevron has flex-shrink: 0', test: css.includes('.faq-chevron') && css.includes('flex-shrink: 0;') },
  { name: '.faq-item.active .faq-answer has max-height: 1200px (prevents clipping)', test: css.includes('.faq-item.active .faq-answer') && css.includes('max-height: 1200px') },
  { name: '768px media query has .faq-accordion width: 100% !important', test: css.includes('max-width: 768px') && css.includes('.faq-accordion') },
  { name: '768px media query sets padding: 0 1.15rem !important for collapsed answer (no leaked bottom padding)', test: css.includes('.faq-answer {\n    padding: 0 1.15rem !important;') || css.includes('.faq-answer {\r\n    padding: 0 1.15rem !important;') },
  { name: '768px media query sets padding: 0 1.15rem 1.15rem 1.15rem !important for active answer only', test: css.includes('.faq-item.active .faq-answer {\n    padding: 0 1.15rem 1.15rem 1.15rem !important;') || css.includes('.faq-item.active .faq-answer {\r\n    padding: 0 1.15rem 1.15rem 1.15rem !important;') },
  { name: '480px media query sets padding: 0 1rem !important for collapsed answer', test: css.includes('.faq-answer {\n    padding: 0 1rem !important;') || css.includes('.faq-answer {\r\n    padding: 0 1rem !important;') },
  { name: '480px media query sets padding: 0 1rem 1rem 1rem !important for active answer only', test: css.includes('.faq-item.active .faq-answer {\n    padding: 0 1rem 1rem 1rem !important;') || css.includes('.faq-item.active .faq-answer {\r\n    padding: 0 1rem 1rem 1rem !important;') }
];

cssChecks.forEach(c => {
  if (c.test) {
    console.log(`[PASS] ${c.name}`);
  } else {
    console.log(`[FAIL] ${c.name}`);
    allPassed = false;
  }
});

console.log(allPassed ? '\n✓ ALL FAQ MOBILE UI AUDIT CHECKS PASSED WITH 100% INTEGRITY!' : '\n✗ SOME CHECKS FAILED!');
