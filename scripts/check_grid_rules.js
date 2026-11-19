const fs = require('fs');
const css = fs.readFileSync('assets/css/style.css', 'utf8');

const targetClasses = [
  'about-hero-grid',
  'bento-principles-grid',
  'blogs-grid',
  'capabilities-matrix-grid',
  'case-study-grid',
  'channels-grid',
  'comparison-grid',
  'contact-intake-grid',
  'deliverables-checklist-grid',
  'guarantees-grid',
  'hero-grid',
  'hubs-grid',
  'saas-grid-stats',
  'services-bento-grid',
  'speed-split-grid',
  'tech-matrix-grid',
  'testimonials-grid',
  'contact-hero-banner',
  'stats-strip',
  'service-metrics-strip',
  'funnel-metrics-strip',
  'footer-top',
  'footer-bottom',
  'blog-article-layout',
  'matrix-table'
];

targetClasses.forEach(cls => {
  let count = 0;
  let idx = 0;
  console.log(`\n=================== .${cls} ===================`);
  while ((idx = css.indexOf('.' + cls, idx)) !== -1) {
    count++;
    // Find the enclosing selector and rule
    const start = Math.max(0, css.lastIndexOf('{', idx) - 40);
    const end = Math.min(css.length, css.indexOf('}', idx) + 1);
    
    // Check if within a media query
    const prevMedia = css.lastIndexOf('@media', idx);
    let mediaStr = 'DEFAULT';
    if (prevMedia !== -1 && prevMedia > css.lastIndexOf('}', start)) {
      const mediaEnd = css.indexOf('{', prevMedia);
      mediaStr = css.substring(prevMedia, mediaEnd).trim();
    }
    console.log(`[Occurrence ${count}] Media: ${mediaStr}`);
    console.log(css.substring(idx - 10, idx + 120).trim());
    idx += cls.length + 1;
  }
});

