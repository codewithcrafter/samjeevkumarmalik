<?php
/**
 * SANJEEV KUMAR MALIK — DYNAMIC BLOG ARTICLE ENGINE
 * Fetches from MySQL, parses Markdown, extracts TOC, renders Dynamic Schema & FAQs
 */
require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/functions.php';

// Get slug from query parameter (e.g. ?slug=dark-mode-website-design-worth-building)
$slug = trim($_GET['slug'] ?? '');

// If slug is empty, check request URI
if (empty($slug)) {
    $uri = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);
    $parts = explode('/', trim($uri, '/'));
    if (count($parts) >= 2 && $parts[0] === 'blogs') {
        $slug = $parts[1];
    }
}

$blog = null;
if (!empty($slug) && $pdo) {
    $stmt = $pdo->prepare("SELECT * FROM blogs WHERE slug = ? LIMIT 1");
    $stmt->execute([$slug]);
    $blog = $stmt->fetch();

    if ($blog) {
        // Increment views count asynchronously
        $pdo->prepare("UPDATE blogs SET views_count = views_count + 1 WHERE id = ?")->execute([$blog['id']]);
    }
}

// Fallback to static HTML file if DB record not found
if (!$blog && !empty($slug) && file_exists(__DIR__ . "/blogs/{$slug}.html")) {
    include __DIR__ . "/blogs/{$slug}.html";
    exit;
}

// If still not found, render 404
if (!$blog) {
    http_response_code(404);
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Article Not Found — Sanjeev Kumar Malik</title>
      <link rel="stylesheet" href="/assets/css/style.css?v=4.2">
    </head>
    <body style="min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; background: #F8FAFC;">
      <div style="max-width: 500px; padding: 2rem;">
        <h1 style="font-size: 3rem; margin-bottom: 0.5rem; color: #0F172A;">404</h1>
        <h2 style="font-size: 1.4rem; color: #334155; margin-bottom: 1rem;">Article Not Found</h2>
        <p style="color: #64748B; margin-bottom: 1.5rem;">The article you are looking for does not exist or has been moved.</p>
        <a href="/blogs" class="btn-primary" style="display: inline-flex;">← Return to All Articles</a>
      </div>
    </body>
    </html>
    <?php
    exit;
}

// Parse Dynamic Elements
$title = $blog['title'];
$seoTitle = !empty($blog['seo_title']) ? $blog['seo_title'] : $title . ' — Sanjeev Kumar Malik';
$metaDesc = !empty($blog['meta_description']) ? $blog['meta_description'] : $blog['short_excerpt'];
$canonicalUrl = "https://sanjeevkumarmalik.in/blogs/" . htmlspecialchars($blog['slug']);
$category = $blog['category_name'];
$publishDateFormatted = date('F d, Y', strtotime($blog['publish_date']));
$monthYearDate = date('M Y', strtotime($blog['publish_date']));
$readTime = (int)$blog['read_time'];
$author = $blog['author_name'];
$featuredImg = !empty($blog['featured_image']) ? $blog['featured_image'] : '/assets/images/Web-Development.webp';
$featuredImgAlt = !empty($blog['featured_image_alt']) ? $blog['featured_image_alt'] : $title;

// Body content & TOC
$bodyHtml = parseMarkdown($blog['content']);
$toc = extractTocFromHtml($bodyHtml);

// FAQs
$faqs = !empty($blog['faqs_json']) ? json_decode($blog['faqs_json'], true) : [];
if (!is_array($faqs)) $faqs = [];

// Tags array
$tagsList = !empty($blog['tags']) ? array_map('trim', explode(',', $blog['tags'])) : ['Web Architecture', $category, 'Performance'];

// Schema Markup
if ($blog['schema_type'] === 'custom' && !empty($blog['custom_schema_json'])) {
    $schemaJsonString = $blog['custom_schema_json'];
} else {
    $schemaJsonString = generateBlogSchemaJson($blog, $faqs);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <title><?= htmlspecialchars($seoTitle) ?></title>
  <meta name="description" content="<?= htmlspecialchars($metaDesc) ?>">
  <?php if (!empty($blog['meta_keywords'])): ?>
    <meta name="keywords" content="<?= htmlspecialchars($blog['meta_keywords']) ?>">
  <?php endif; ?>
  <link rel="canonical" href="<?= $canonicalUrl ?>">

  <!-- Open Graph / Social -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="<?= $canonicalUrl ?>">
  <meta property="og:title" content="<?= htmlspecialchars($seoTitle) ?>">
  <meta property="og:description" content="<?= htmlspecialchars($metaDesc) ?>">
  <meta property="og:image" content="<?= htmlspecialchars($featuredImg) ?>">
  <meta property="article:published_time" content="<?= date('c', strtotime($blog['publish_date'])) ?>">
  <meta property="article:author" content="<?= htmlspecialchars($author) ?>">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="<?= htmlspecialchars($seoTitle) ?>">
  <meta name="twitter:description" content="<?= htmlspecialchars($metaDesc) ?>">
  <meta name="twitter:image" content="<?= htmlspecialchars($featuredImg) ?>">

  <!-- Favicon & Stylesheet -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%232563EB'/><text x='50' y='64' font-size='42' font-family='sans-serif' font-weight='bold' fill='white' text-anchor='middle'>S</text></svg>">
  <link rel="stylesheet" href="/assets/css/style.css?v=4.2">

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  <?= $schemaJsonString ?>
  </script>
</head>
<body>

  <!-- Ambient Glow Canvas -->
  <div class="ambient-canvas-wrapper" aria-hidden="true">
    <div class="ambient-orb orb-1"></div>
    <div class="ambient-orb orb-2"></div>
    <div class="ambient-orb orb-3"></div>
    <div class="subtle-grid-pattern"></div>
  </div>

  <!-- Global Floating Navigation Bar -->
  <header class="header-wrapper" id="siteHeader">
    <div class="header-top-bar" aria-label="Direct Technical Support &amp; Availability">
      <div class="top-bar-inner">
        <div class="top-bar-left">
          <span class="status-indicator">
            <span class="status-dot"></span>
            Available for Q4/2026 Sprints
          </span>
          <span class="top-bar-separator">•</span>
          <span>Delhi NCR &amp; Global</span>
          <span class="top-bar-separator">•</span>
          <span>15+ Yrs Exp • 1,700+ Websites Delivered</span>
        </div>
        <div class="top-bar-right">
          <a href="tel:+919718604362" class="top-bar-link">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <span>+91 97186 04362</span>
          </a>
          <span class="top-bar-separator">•</span>
          <a href="mailto:info@sanjeevkumarmalik.in" class="top-bar-link">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
            <span>info@sanjeevkumarmalik.in</span>
          </a>
          <span class="top-bar-separator">•</span>
          <a href="https://wa.me/919718604362" target="_blank" rel="noopener noreferrer" class="top-bar-link top-bar-whatsapp">
            <span>WhatsApp Direct</span>
          </a>
        </div>
      </div>
    </div>

    <nav class="navbar" id="navbar" aria-label="Main Navigation">
      <a href="/" class="nav-brand" aria-label="Sanjeev Kumar Malik Homepage">
        <span class="brand-dot" aria-hidden="true"></span>
        <span class="brand-monogram" aria-hidden="true">S</span>
        <div class="brand-text-block">
          <span class="brand-name">sanjeevkumarmalik</span>
          <span class="brand-role-sub">PRINCIPAL WEB ARCHITECT</span>
        </div>
      </a>

      <ul class="nav-menu">
        <li class="nav-item"><a href="/" class="nav-link">Home</a></li>
        <li class="nav-item nav-dropdown" id="servicesDropdown">
          <a href="/services/wordpress-web-development" class="nav-link dropdown-toggle" aria-expanded="false" aria-haspopup="true">
            <span>Services</span>
            <svg class="dropdown-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </a>
          <div class="mega-menu" aria-label="Services Submenu">
            <div class="mega-grid">
              <a href="/services/wordpress-web-development" class="mega-item">
                <span class="mega-icon">⚡</span>
                <span class="mega-text"><strong>WordPress Development</strong><small>Gutenberg &amp; Headless Architecture</small></span>
              </a>
              <a href="/services/ecommerce-website-development" class="mega-item">
                <span class="mega-icon">🛍️</span>
                <span class="mega-text"><strong>E-commerce Websites</strong><small>Shopify, WooCommerce, Indian Checkout</small></span>
              </a>
              <a href="/services/custom-web-application-development" class="mega-item">
                <span class="mega-icon">⚙️</span>
                <span class="mega-text"><strong>Custom Web Applications</strong><small>MERN, Next.js, Node.js &amp; SaaS</small></span>
              </a>
              <a href="/services/website-redesign-speed-optimization" class="mega-item">
                <span class="mega-icon">🚀</span>
                <span class="mega-text"><strong>Redesign &amp; Speed Optimization</strong><small>Sub-0.8s Core Web Vitals Engineering</small></span>
              </a>
              <a href="/services/landing-page-design-development" class="mega-item">
                <span class="mega-icon">🎯</span>
                <span class="mega-text"><strong>Landing Page CRO</strong><small>High-Velocity Conversion Funnels</small></span>
              </a>
              <a href="/services/ui-ux-design-services" class="mega-item">
                <span class="mega-icon">✨</span>
                <span class="mega-text"><strong>UI/UX Design Services</strong><small>Figma to Clean Semantic Code</small></span>
              </a>
              <a href="/services/web-development-for-startups-smes" class="mega-item">
                <span class="mega-icon">🌱</span>
                <span class="mega-text"><strong>Startups &amp; SMEs</strong><small>Rapid MVP &amp; Fractional CTO Guidance</small></span>
              </a>
            </div>
          </div>
        </li>
        <li class="nav-item"><a href="/about-sanjeev-kumar-malik" class="nav-link">About Sanjeev Kumar Malik</a></li>
        <li class="nav-item"><a href="/blogs" class="nav-link active">Blogs</a></li>
        <li class="nav-item"><a href="/contact-us" class="nav-link">Contact Us</a></li>
      </ul>

      <div class="nav-actions">
        <a href="tel:+919718604362" class="nav-phone-chip" aria-label="Call +91 97186 04362">
          <span class="phone-chip-icon">📞</span>
          <span class="phone-chip-number">+91 97186 04362</span>
        </a>
        <a href="/contact-us" class="btn-primary open-booking-modal" id="navBookCta">
          <span class="btn-radar-dot"></span>
          <span>Book Founder Session →</span>
        </a>
      </div>

      <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle Navigation Menu" aria-expanded="false" aria-controls="mobileNavDrawer">
        <span></span><span></span><span></span>
      </button>
    </nav>
  </header>

  <!-- Mobile Drawer -->
  <div class="mobile-nav-drawer" id="mobileNavDrawer">
    <a href="/" class="nav-link">Home</a>
    
    <div class="mobile-services-accordion" id="mobileServicesAccordion">
      <button type="button" class="mobile-services-toggle" id="mobileServicesToggle" aria-expanded="false">
        <span class="toggle-label-group">
          <span>Services</span>
          <span class="toggle-badge">7 Hubs</span>
        </span>
        <svg class="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div class="mobile-services-dropdown-list" id="mobileServicesList">
        <a href="/services/wordpress-web-development" class="mobile-service-item">
          <span class="item-icon">⚡</span>
          <span class="item-text"><strong>WordPress Web Development</strong><small>Gutenberg &amp; Custom Headless Stacks</small></span>
        </a>
        <a href="/services/ecommerce-website-development" class="mobile-service-item">
          <span class="item-icon">🛍️</span>
          <span class="item-text"><strong>E-commerce Website Development</strong><small>Shopify, WooCommerce &amp; Razorpay</small></span>
        </a>
        <a href="/services/custom-web-application-development" class="mobile-service-item">
          <span class="item-icon">⚙️</span>
          <span class="item-text"><strong>Custom Web Applications</strong><small>Full-Stack React, Node.js &amp; Next.js</small></span>
        </a>
        <a href="/services/website-redesign-speed-optimization" class="mobile-service-item">
          <span class="item-icon">🚀</span>
          <span class="item-text"><strong>Website Redesign &amp; Speed</strong><small>Core Web Vitals &amp; Sub-0.8s Loading</small></span>
        </a>
        <a href="/services/landing-page-design-development" class="mobile-service-item">
          <span class="item-icon">🎯</span>
          <span class="item-text"><strong>Landing Page Design &amp; Dev</strong><small>High-Converting Paid Traffic Funnels</small></span>
        </a>
        <a href="/services/ui-ux-design-services" class="mobile-service-item">
          <span class="item-icon">✨</span>
          <span class="item-text"><strong>UI/UX Design Services</strong><small>Figma to Scalable Clean Code</small></span>
        </a>
        <a href="/services/web-development-for-startups-smes" class="mobile-service-item">
          <span class="item-icon">🌱</span>
          <span class="item-text"><strong>Startups &amp; SMEs Development</strong><small>Rapid MVPs &amp; Fractional CTO Guidance</small></span>
        </a>
      </div>
    </div>

    <a href="/about-sanjeev-kumar-malik" class="nav-link">About Sanjeev Kumar Malik</a>
    <a href="/blogs" class="nav-link active">Technical Blogs</a>
    <a href="/contact-us" class="nav-link">Contact Us</a>
    <a href="/contact-us" class="btn-primary open-booking-modal" style="width: 100%; text-align: center; margin-top: 0.5rem;">Book Founder Session →</a>
  </div>

  <main>
    <section class="section" style="padding-top: 7.5rem; padding-bottom: 5rem;">
      <div class="container">
        
        <!-- Breadcrumbs -->
        <div class="breadcrumb-nav" style="margin-bottom: 1.5rem;">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/blogs">Blogs</a>
          <span>/</span>
          <span><?= htmlspecialchars($title) ?></span>
        </div>

        <!-- 2-Column Article Layout -->
        <div class="blog-article-layout">
          
          <!-- LEFT COLUMN: Main Article Content -->
          <article class="blog-article-content" id="articleBodyContainer">
            
            <header class="article-hero-header">
              <span class="blog-category-tag"><?= htmlspecialchars($category) ?></span>
              <h1 class="article-title"><?= htmlspecialchars($title) ?></h1>
              
              <div class="article-meta-strip">
                <div class="article-author-badge">
                  <div class="author-avatar-chip">S</div>
                  <div>
                    <span class="author-name"><?= htmlspecialchars($author) ?></span>
                    <span class="author-role">Principal Web Architect</span>
                  </div>
                </div>
                <div class="article-date-read">
                  <span>📅 <?= htmlspecialchars($publishDateFormatted) ?></span>
                  <span>•</span>
                  <span>⏱️ <?= (int)$readTime ?> min read</span>
                </div>
              </div>
            </header>

            <!-- Featured Image -->
            <div class="article-featured-image-box" style="margin: 2rem 0; border-radius: 1.5rem; overflow: hidden; border: 1px solid var(--border-card);">
              <img src="<?= htmlspecialchars($featuredImg) ?>" alt="<?= htmlspecialchars($featuredImgAlt) ?>" class="article-featured-image" style="width: 100%; height: auto; display: block;" onerror="this.src='/assets/images/Web-Development.webp'">
            </div>

            <!-- Body Content -->
            <div class="article-prose-content">
              <?= $bodyHtml ?>
            </div>

            <!-- Dynamic FAQs Accordion if configured in Admin -->
            <?php if (!empty($faqs)): ?>
              <section class="article-faq-section" style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--border-card);">
                <div class="section-eyebrow" style="margin-bottom: 0.5rem;">Article FAQs</div>
                <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1.5rem;">Frequently Asked Questions</h2>
                
                <div class="faq-accordion-container" style="max-width: 100%;">
                  <?php foreach ($faqs as $fIndex => $faq): ?>
                    <div class="faq-item">
                      <button class="faq-question-btn" type="button" aria-expanded="false">
                        <span><?= htmlspecialchars($faq['question']) ?></span>
                        <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>
                      <div class="faq-answer">
                        <p><?= htmlspecialchars($faq['answer']) ?></p>
                      </div>
                    </div>
                  <?php endforeach; ?>
                </div>
              </section>
            <?php endif; ?>

            <!-- Author Bio & Founder Direct Card -->
            <div class="article-author-footer-card" style="margin-top: 4rem; background: #F8FAFC; border: 1px solid var(--border-card); border-radius: 1.5rem; padding: 2rem; display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap;">
              <div class="author-avatar-large" style="width: 72px; height: 72px; border-radius: 50%; background: #2563EB; color: #FFFFFF; font-size: 2rem; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">S</div>
              <div style="flex: 1; min-width: 240px;">
                <h3 style="font-size: 1.25rem; font-weight: 800; margin: 0 0 0.35rem;"><?= htmlspecialchars($author) ?></h3>
                <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin: 0 0 0.75rem;">
                  15+ years engineering high-concurrency web applications, enterprise headless WordPress systems, and conversion-optimized e-commerce stores across Delhi NCR and globally.
                </p>
                <a href="/contact-us" class="btn-primary" style="padding: 0.5rem 1rem; font-size: 0.82rem;">Consult Directly with Sanjeev →</a>
              </div>
            </div>

          </article>

          <!-- RIGHT COLUMN: Sticky Sidebar -->
          <aside class="blog-sidebar-sticky" aria-label="Article Outline and Tags">
            
            <!-- Table of Contents Card -->
            <?php if (!empty($toc)): ?>
              <div class="toc-card">
                <div class="toc-header">
                  <span>🧭</span>
                  <span>Table of Contents</span>
                </div>
                <ul class="toc-list">
                  <?php foreach ($toc as $tIndex => $t): ?>
                    <li class="toc-item">
                      <a href="#<?= htmlspecialchars($t['id']) ?>" class="toc-link <?= $tIndex === 0 ? 'active' : '' ?>">
                        <?= htmlspecialchars($t['title']) ?>
                      </a>
                    </li>
                  <?php endforeach; ?>
                </ul>
              </div>
            <?php endif; ?>

            <!-- Tags Cloud Card -->
            <div class="toc-card">
              <div class="toc-header">
                <span>🏷️</span>
                <span>Topics &amp; Tags</span>
              </div>
              <div class="tags-cloud">
                <?php foreach ($tagsList as $tag): ?>
                  <span class="tag-pill"><?= htmlspecialchars($tag) ?></span>
                <?php endforeach; ?>
              </div>
            </div>

            <!-- Quick Architecture Consultation Form -->
            <div class="blog-form-card">
              <div class="toc-header" style="border-bottom: none; margin-bottom: 0.5rem; padding-bottom: 0;">
                <span>⚡</span>
                <span>Get Expert Advisory</span>
              </div>
              <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.45; margin-bottom: 1rem;">
                Discuss your project directly with Sanjeev Kumar Malik — Senior Full-Stack Architect.
              </p>
              
              <form class="service-form blog-sidebar-form" onsubmit="event.preventDefault(); this.innerHTML='<div style=\'text-align:center; padding:1.5rem 0.5rem; color:#065F46;\'><h4>🎉 Request Sent!</h4><p style=\'font-size:0.85rem; margin-top:0.35rem;\'>Sanjeev will connect within 4 hours.</p></div>';">
                <div class="form-group" style="margin-bottom: 0.75rem;">
                  <input type="text" class="form-input" style="padding: 0.65rem 0.85rem; font-size: 0.825rem;" placeholder="Your Name *" required>
                </div>
                <div class="form-group" style="margin-bottom: 0.75rem;">
                  <input type="tel" class="form-input" style="padding: 0.65rem 0.85rem; font-size: 0.825rem;" placeholder="Phone / WhatsApp *" required>
                </div>
                <div class="form-group" style="margin-bottom: 0.75rem;">
                  <input type="email" class="form-input" style="padding: 0.65rem 0.85rem; font-size: 0.825rem;" placeholder="Email Address *" required>
                </div>
                <button type="submit" class="btn-primary" style="width: 100%; justify-content: center; font-size: 0.875rem; padding: 0.7rem 1rem;">
                  Claim Advisory Call →
                </button>
              </form>
            </div>

          </aside>

        </div>

      </div>
    </section>

    <!-- Bottom Global Callout Banner -->
    <section class="section" style="padding-top: 0; padding-bottom: 4rem;">
      <div class="container">
        <div class="contact-hero-banner">
          <div>
            <div class="section-eyebrow" style="margin-bottom: 0.5rem;">Direct Founder Partnership</div>
            <h2 style="font-size: 2rem; margin-bottom: 0.5rem;">Have a Complex Project Scope?</h2>
            <p style="color: var(--text-secondary); max-width: 600px;">
              Get an upfront technical architecture roadmap and fixed sprint proposal directly from Sanjeev Kumar Malik within 4 hours.
            </p>
          </div>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="/contact-us" class="btn-primary">Book Technical Session →</a>
            <a href="/blogs" class="btn-secondary">Browse All Articles →</a>
          </div>
        </div>
      </div>
    </section>

  </main>

  <!-- Global Footer -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div>
          <h3 class="footer-brand-title">Sanjeev Kumar Malik</h3>
          <p class="footer-brand-desc">
            Principal Web Development Architect &amp; Consultant helping businesses build powerful websites through Custom Development, E-commerce, and Modern Web Technologies across Delhi NCR.
          </p>
        </div>

        <div>
          <h4 class="footer-col-title">Navigation</h4>
          <ul class="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about-sanjeev-kumar-malik">About Sanjeev Kumar Malik</a></li>
            <li><a href="/blogs">Technical Blogs</a></li>
            <li><a href="/contact-us">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h4 class="footer-col-title">Services Directory</h4>
          <ul class="footer-links">
            <li><a href="/services/wordpress-web-development">WordPress Development</a></li>
            <li><a href="/services/ecommerce-website-development">E-commerce Development</a></li>
            <li><a href="/services/custom-web-application-development">Custom Web Applications</a></li>
            <li><a href="/services/website-redesign-speed-optimization">Website Redesign &amp; Speed</a></li>
            <li><a href="/services/landing-page-design-development">Landing Page Design</a></li>
            <li><a href="/services/ui-ux-design-services">UI/UX Design Services</a></li>
            <li><a href="/services/web-development-for-startups-smes">Startups &amp; SMEs</a></li>
          </ul>
        </div>

        <div>
          <h4 class="footer-col-title">Direct Contact</h4>
          <p class="footer-brand-desc" style="margin-bottom: 0.75rem;">
            <strong>Phone / WhatsApp:</strong><br>
            <a href="tel:+919718604362" style="color: inherit;">+91 97186 04362</a>
          </p>
          <p class="footer-brand-desc" style="margin-bottom: 0.75rem;">
            <strong>Work Email:</strong><br>
            <a href="mailto:info@sanjeevkumarmalik.in" style="color: inherit;">info@sanjeevkumarmalik.in</a>
          </p>
          <p class="footer-brand-desc">
            <strong>Studio Location:</strong><br>
            Delhi NCR, India (Global Remote Delivery)
          </p>
        </div>
      </div>

      <div class="footer-bottom">
        <div>&copy; <?= date('Y') ?> Sanjeev Kumar Malik. All rights reserved. Custom Engineered &amp; Maintained with Zero Bloat.</div>
        <div>
          <a href="/admin/login.php" style="color: #64748B; font-size: 0.78rem; text-decoration: none;">Admin Portal</a>
        </div>
      </div>
    </div>
  </footer>

  <script src="/assets/js/app.js?v=4.2"></script>
</body>
</html>

