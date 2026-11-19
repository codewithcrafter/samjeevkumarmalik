const fs = require('fs');

let css = fs.readFileSync('assets/css/style.css', 'utf8');

// 1. Fix .service-hero-banner-main & .service-hero-banner-aside min-widths
const oldBannerMain = `.service-hero-banner-main {
  flex: 1.15;
  min-width: 320px;
}`;

const newBannerMain = `.service-hero-banner-main {
  flex: 1.15;
  min-width: 0;
  max-width: 100%;
}`;

const oldBannerAside = `.service-hero-banner-aside {
  flex: 0.85;
  display: flex;
  justify-content: center;
  min-width: 320px;
  width: 100%;
}`;

const newBannerAside = `.service-hero-banner-aside {
  flex: 0.85;
  display: flex;
  justify-content: center;
  min-width: 0;
  width: 100%;
  max-width: 100%;
}`;

if (css.includes(oldBannerMain)) {
  css = css.replace(oldBannerMain, newBannerMain);
  console.log('Fixed .service-hero-banner-main min-width');
}

if (css.includes(oldBannerAside)) {
  css = css.replace(oldBannerAside, newBannerAside);
  console.log('Fixed .service-hero-banner-aside min-width');
}

// 2. Replace Section 18 Master Responsive Architecture with enhanced rock-solid responsive rules
const s18StartIdx = css.indexOf('/* ==========================================================================\n   PRIMARY HANDHELD BREAKPOINT (<= 860px)');
if (s18StartIdx === -1) {
  console.log('ERROR: Could not find start of Section 18 in style.css');
  process.exit(1);
}

const enhancedSection18 = `/* ==========================================================================
   PRIMARY HANDHELD BREAKPOINT (<= 860px)
   ========================================================================== */
@media (max-width: 860px) {
  /* All Content Grids to Single Column */
  .services-bento-grid,
  .channels-grid,
  .testimonials-grid,
  .comparison-grid,
  .blogs-grid,
  .hubs-grid,
  .tech-matrix-grid,
  .guarantees-grid,
  .bento-principles-grid,
  .capabilities-matrix-grid,
  .case-study-grid,
  .deliverables-checklist-grid,
  .protocol-strip,
  .contact-intake-grid,
  .saas-grid-stats,
  .case-metrics-matrix,
  .funnel-metrics-strip,
  .speed-split-grid,
  .about-hero-grid {
    grid-template-columns: 1fr !important;
  }

  .service-card,
  .service-card-span-all,
  .service-card[style*="grid-column"],
  .blog-card,
  .testimonial-card,
  .comparison-card {
    grid-column: span 1 !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }

  /* All Eyebrow Badges, Status Pills & Breadcrumbs: wrap cleanly */
  .about-eyebrow-badge,
  .section-eyebrow,
  .hero-status-pill,
  .breadcrumb-nav {
    white-space: normal !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    word-break: break-word !important;
  }

  /* Flexible Footers, Chips & Meta Rows */
  .service-card-footer,
  .blog-meta-footer,
  .payment-rails-row,
  .uiux-tokens-row,
  .profile-glass-badge,
  .sprint-step-row,
  .about-trust-row {
    flex-wrap: wrap !important;
    gap: 0.5rem !important;
  }

  /* Table Scrollers with smooth touch inertia */
  .table-responsive,
  .decision-matrix-card {
    width: 100% !important;
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch !important;
    display: block !important;
  }
  .matrix-table {
    min-width: 540px !important;
    width: 100% !important;
  }
}

/* ==========================================================================
   MOBILE DEVICES BREAKPOINT (<= 768px)
   ========================================================================== */
@media (max-width: 768px) {
  /* Section Spacing & Containers */
  .container {
    padding: 0 1.25rem !important;
  }
  .section {
    padding: 3.25rem 0 !important;
  }
  .page-header-section {
    padding-top: 6.25rem !important;
    padding-bottom: 2.25rem !important;
  }
  .section-header {
    margin-bottom: 2rem !important;
  }
  .section-title {
    font-size: clamp(1.55rem, 5.8vw, 2.2rem) !important;
    line-height: 1.22 !important;
    word-break: break-word !important;
  }
  .section-description {
    font-size: 0.95rem !important;
    line-height: 1.6 !important;
  }

  /* Hero Section */
  .section-hero {
    padding-top: 6.25rem !important;
    padding-bottom: 2.75rem !important;
  }
  .hero-grid {
    grid-template-columns: 1fr !important;
    gap: 2.25rem !important;
    text-align: center !important;
  }
  .hero-content {
    align-items: center !important;
    text-align: center !important;
  }
  .hero-status-pill {
    font-size: 0.78rem !important;
    padding: 0.35rem 0.8rem !important;
    max-width: 100% !important;
    white-space: normal !important;
    text-align: center !important;
  }
  .hero-headline {
    font-size: clamp(1.6rem, 6.5vw, 2.35rem) !important;
    line-height: 1.18 !important;
    letter-spacing: -0.02em !important;
    word-break: break-word !important;
  }
  .hero-bio {
    font-size: 0.98rem !important;
    line-height: 1.6 !important;
    margin: 0 auto 1.35rem !important;
  }
  .hero-actions {
    flex-direction: column !important;
    width: 100% !important;
    gap: 0.75rem !important;
  }
  .hero-actions .btn-primary,
  .hero-actions .btn-secondary {
    width: 100% !important;
    justify-content: center !important;
    text-align: center !important;
  }
  .hero-tech-strip {
    justify-content: center !important;
    gap: 0.5rem !important;
  }
  .hero-visual-wrapper {
    flex-direction: column !important;
    gap: 1rem !important;
    width: 100% !important;
  }
  .hero-profile-card {
    max-width: 360px !important;
    width: 100% !important;
    margin: 0 auto !important;
  }
  .floating-badge {
    position: static !important;
    transform: none !important;
    animation: none !important;
    width: 100% !important;
    max-width: 360px !important;
    margin: 0.4rem auto !important;
    box-sizing: border-box !important;
  }
  .floating-badge:hover {
    transform: none !important;
  }

  /* Stats Strip */
  .stats-strip {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 1rem !important;
    padding: 1.25rem 1rem !important;
  }

  /* About Page Responsive */
  .about-hero-title {
    font-size: clamp(1.55rem, 5.8vw, 2.25rem) !important;
    line-height: 1.2 !important;
    word-break: break-word !important;
    text-align: center !important;
  }
  .about-hero-content {
    text-align: center !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
  }
  .about-trust-row {
    justify-content: center !important;
    gap: 1rem !important;
  }

  /* Blog Article Page */
  .blog-article-layout {
    grid-template-columns: 1fr !important;
    gap: 2rem !important;
  }
  .blog-article-content {
    order: 1 !important;
    padding: 1.65rem 1.2rem !important;
    border-radius: 1.25rem !important;
  }
  .article-main-title {
    font-size: clamp(1.45rem, 5.5vw, 2.1rem) !important;
    line-height: 1.22 !important;
    word-break: break-word !important;
  }
  .blog-sidebar-sticky {
    order: 2 !important;
    position: static !important;
    max-height: none !important;
    overflow-y: visible !important;
    width: 100% !important;
  }
  .article-nav-row {
    grid-template-columns: 1fr !important;
  }

  /* FAQ Section Scaling */
  .faq-accordion {
    width: 100% !important;
    max-width: 100% !important;
  }
  .faq-question-btn {
    padding: 1.1rem 1.15rem !important;
    font-size: 0.98rem !important;
    gap: 0.75rem !important;
    text-align: left !important;
  }
  .faq-answer {
    padding: 0 1.15rem 1.15rem 1.15rem !important;
    font-size: 0.9rem !important;
    line-height: 1.6 !important;
  }

  /* Bottom Docked Floating Action Bar */
  body {
    padding-bottom: 74px !important;
  }
  .floating-contact-widget {
    position: fixed !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    width: 100% !important;
    background: rgba(255, 255, 255, 0.96) !important;
    backdrop-filter: blur(18px) !important;
    -webkit-backdrop-filter: blur(18px) !important;
    border-top: 1px solid rgba(226, 232, 240, 0.95) !important;
    box-shadow: 0 -8px 30px -4px rgba(15, 23, 42, 0.14) !important;
    padding: 10px 14px calc(10px + env(safe-area-inset-bottom, 0px)) 14px !important;
    flex-direction: row !important;
    justify-content: stretch !important;
    align-items: center !important;
    gap: 10px !important;
    z-index: 9999 !important;
    box-sizing: border-box !important;
    margin: 0 !important;
  }
  .floating-action-btn {
    flex: 1 1 50% !important;
    width: auto !important;
    height: 48px !important;
    border-radius: 0.75rem !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 0.5rem !important;
  }
  .fab-btn-label {
    display: inline-block !important;
    font-size: 0.9rem !important;
    font-weight: 700 !important;
  }
}

/* ==========================================================================
   INTERMEDIATE HANDHELD & TABLET PORTRAIT (<= 600px)
   ========================================================================== */
@media (max-width: 600px) {
  /* Timeline on Mobile */
  .timeline-container {
    padding: 1rem 0 !important;
  }
  .timeline-item {
    gap: 1rem !important;
    margin-bottom: 2.25rem !important;
  }
  .timeline-line {
    left: 18px !important;
  }
  .timeline-node {
    width: 38px !important;
    height: 38px !important;
  }
  .timeline-node-inner {
    width: 16px !important;
    height: 16px !important;
  }
  .timeline-card {
    padding: 1.25rem 1.1rem !important;
    border-radius: 1.25rem !important;
  }
  .timeline-title {
    font-size: 1.2rem !important;
  }
  .timeline-narrative {
    font-size: 0.9rem !important;
    line-height: 1.6 !important;
    margin-bottom: 1rem !important;
  }

  /* Service Hero Banner */
  .contact-hero-banner {
    padding: 1.5rem 1rem !important;
  }
  .service-hero-banner-main,
  .service-hero-banner-aside {
    min-width: 0 !important;
    width: 100% !important;
  }
}

/* ==========================================================================
   PHABLET & COMPACT SMARTPHONE (<= 540px)
   ========================================================================== */
@media (max-width: 540px) {
  /* Ultra-Compact Modals: Keep 2 columns for paired inputs */
  .popup-form-row,
  .modal-form .form-row {
    grid-template-columns: 1fr 1fr !important;
    gap: 0.45rem !important;
  }
  .auto-popup-card {
    padding: 1rem 1.15rem 0.95rem !important;
    max-width: 360px !important;
    width: 92% !important;
  }
  .booking-modal-card {
    padding: 1.1rem 1.25rem 1rem !important;
    max-width: 380px !important;
    width: 92% !important;
  }

  .funnel-metrics-strip,
  .saas-grid-stats {
    grid-template-columns: 1fr !important;
  }
  .funnel-mini-form {
    flex-direction: column !important;
  }
  .ecom-product-card {
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
  }
}

/* ==========================================================================
   SMALL SMARTPHONE BREAKPOINT (<= 480px)
   ========================================================================== */
@media (max-width: 480px) {
  .container {
    padding: 0 1rem !important;
  }
  .section {
    padding: 2.5rem 0 !important;
  }
  .page-header-section {
    padding-top: 5.5rem !important;
    padding-bottom: 2rem !important;
  }
  .section-hero {
    padding-top: 5.5rem !important;
    padding-bottom: 2.25rem !important;
  }
  .section-title {
    font-size: clamp(1.4rem, 6vw, 1.85rem) !important;
  }
  .about-hero-title {
    font-size: clamp(1.4rem, 6vw, 1.85rem) !important;
  }
  .hero-headline {
    font-size: clamp(1.4rem, 6.2vw, 1.95rem) !important;
  }
  .about-eyebrow-badge,
  .section-eyebrow {
    font-size: 0.72rem !important;
    padding: 0.25rem 0.65rem !important;
    line-height: 1.35 !important;
    text-align: center !important;
  }

  /* Stats Strip to single column on small phones */
  .stats-strip {
    grid-template-columns: 1fr !important;
    gap: 0.75rem !important;
    padding: 1.15rem 0.85rem !important;
  }
  .stat-item::after {
    display: none !important;
  }

  /* Service Metrics Strip */
  .service-metrics-strip {
    grid-template-columns: 1fr !important;
    padding: 1.15rem 0.85rem !important;
    gap: 1.15rem !important;
  }
  .service-metric-item::after {
    display: none !important;
  }

  /* FAQ Accordion Compact */
  .faq-question-btn {
    padding: 0.9rem 0.85rem !important;
    font-size: 0.9rem !important;
  }
  .faq-answer {
    padding: 0 0.85rem 0.9rem 0.85rem !important;
    font-size: 0.84rem !important;
  }

  /* Timeline on 480px */
  .timeline-item {
    gap: 0.75rem !important;
  }
  .timeline-line {
    left: 15px !important;
  }
  .timeline-node {
    width: 32px !important;
    height: 32px !important;
  }
  .timeline-node-inner {
    width: 14px !important;
    height: 14px !important;
  }
  .timeline-card {
    padding: 1rem 0.85rem !important;
  }
  .timeline-narrative {
    font-size: 0.85rem !important;
  }
  .timeline-chip {
    font-size: 0.68rem !important;
    padding: 0.2rem 0.5rem !important;
  }

  /* Contact Hero Banner */
  .contact-hero-banner {
    padding: 1.35rem 0.85rem !important;
    border-radius: 1.15rem !important;
  }
  .hero-interactive-mockup {
    padding: 0.85rem 0.65rem !important;
    border-radius: 0.85rem !important;
  }
  .mockup-floating-badge {
    font-size: 0.65rem !important;
    padding: 0.2rem 0.5rem !important;
    top: -10px !important;
    left: 8px !important;
    max-width: 85% !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
  .mockup-floating-pill-bottom {
    font-size: 0.65rem !important;
    padding: 0.2rem 0.5rem !important;
    bottom: -10px !important;
    right: 8px !important;
    max-width: 85% !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }

  /* Inputs & iOS Zoom Prevention */
  .form-row {
    grid-template-columns: 1fr !important;
    gap: 0.75rem !important;
  }
  .form-input,
  .form-textarea,
  .form-select {
    font-size: 16px !important;
  }

  /* Blog article inner typography */
  .blog-article-content {
    padding: 1.25rem 0.85rem !important;
  }
  .article-title {
    font-size: clamp(1.35rem, 5.5vw, 1.75rem) !important;
  }
  .article-body h2 {
    font-size: 1.25rem !important;
  }
  .article-body h3 {
    font-size: 1.05rem !important;
  }
}

/* ==========================================================================
   ULTRA-COMPACT SMARTPHONE BREAKPOINT (<= 360px)
   ========================================================================== */
@media (max-width: 360px) {
  .container {
    padding: 0 0.65rem !important;
  }
  .navbar-full-container {
    padding: 0.5rem 0.65rem !important;
  }
  .nav-brand-modern {
    gap: 0.5rem !important;
  }
  .brand-monogram-box {
    width: 34px !important;
    height: 34px !important;
    font-size: 0.9rem !important;
  }
  .brand-name {
    font-size: 0.92rem !important;
  }
  .hero-actions .btn-primary,
  .hero-actions .btn-secondary,
  .btn-primary,
  .btn-secondary {
    font-size: 0.82rem !important;
    padding: 0.6rem 0.75rem !important;
  }
  .floating-contact-widget {
    padding: 8px 8px calc(8px + env(safe-area-inset-bottom, 0px)) 8px !important;
    gap: 6px !important;
  }
  .floating-action-btn {
    height: 42px !important;
  }
  .fab-btn-label {
    font-size: 0.8rem !important;
  }
  .service-card,
  .blog-card,
  .testimonial-card,
  .comparison-card {
    padding: 1.15rem 0.85rem !important;
    border-radius: 1.15rem !important;
  }
  .auto-popup-card,
  .booking-modal-card {
    width: 95% !important;
    padding: 0.85rem 0.8rem !important;
  }
}
`;

css = css.slice(0, s18StartIdx) + enhancedSection18;
fs.writeFileSync('assets/css/style.css', css);
console.log('Successfully applied Master Responsive Enhancements! New length:', css.length);
