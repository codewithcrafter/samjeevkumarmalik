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
    if (preg_match('#/blogs/([^/?#]+)#', $uri, $m)) {
        $slug = $m[1];
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
      <link rel="stylesheet" href="/assets/css/style.css?v=5.0">
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
  <link rel="stylesheet" href="/assets/css/style.css?v=5.0">

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

  <!-- Global Full-Width Dual-Tier Sticky Header -->
  <header class="site-header-full" id="siteHeader">
    <!-- Tier 1: Top Utility & Direct Contact Strip -->
    <div class="header-top-bar">
      <div class="header-top-container">
        <div class="top-bar-left">
          <span class="status-indicator-badge">
            <span class="status-pulse-dot"></span>
            <span>Available for Q4/2026 Sprints</span>
          </span>
          <span class="top-bar-sep" aria-hidden="true">•</span>
          <span class="top-bar-location">Delhi NCR &amp; Global</span>
          <span class="top-bar-sep desktop-only" aria-hidden="true">•</span>
          <span class="top-bar-metric desktop-only">15+ Yrs Exp • 1,700+ Websites Delivered</span>
        </div>

        <div class="top-bar-right">
          <a href="tel:+919718604362" class="top-contact-link">
            <svg class="top-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>+91 97186 04362</span>
          </a>
          <span class="top-bar-sep" aria-hidden="true">•</span>
          <a href="mailto:info@sanjeevkumarmalik.in" class="top-contact-link desktop-only">
            <svg class="top-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span>info@sanjeevkumarmalik.in</span>
          </a>
          <span class="top-bar-sep desktop-only" aria-hidden="true">•</span>
          <a href="https://wa.me/919718604362?text=Hello%20Sanjeev,%20I%20would%20like%20to%20discuss%20a%20website%20project." target="_blank" rel="noopener noreferrer" class="top-whatsapp-pill">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span>WhatsApp Direct</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Tier 2: Main Edge-to-Edge Navigation Bar -->
    <nav class="navbar-full" id="navbar" aria-label="Main Navigation">
      <div class="navbar-full-container">
        <!-- Brand Logo Lockup with Monogram Icon -->
        <a href="/" class="nav-brand-modern" aria-label="Sanjeev Kumar Malik Homepage">
          <div class="brand-monogram-box">
            <span class="monogram-letter">S</span>
            <span class="monogram-dot" aria-hidden="true"></span>
          </div>
          <div class="brand-text-group">
            <span class="brand-name">sanjeevkumarmalik</span>
            <span class="brand-role">Principal Web Architect</span>
          </div>
        </a>

        <!-- Desktop Nav Menu -->
        <ul class="nav-menu">
          <li class="nav-item">
            <a href="/" class="nav-link">Home</a>
          </li>
          <li class="nav-item nav-dropdown" id="servicesDropdown">
            <a href="/services/wordpress-web-development" class="nav-link dropdown-toggle" aria-haspopup="true" aria-expanded="false">
              <span>Services</span>
              <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </a>
            <!-- Mega Menu -->
            <div class="nav-mega-menu dropdown-menu services-mega-menu" role="menu">
              <a href="/services/ecommerce-website-development" class="mega-item">
                <div class="mega-icon">🛒</div>
                <div>
                  <span class="mega-title">E-commerce Development</span>
                  <span class="mega-desc">Shopify &amp; WooCommerce</span>
                </div>
              </a>
              <a href="/services/landing-page-design-development" class="mega-item">
                <div class="mega-icon">🎯</div>
                <div>
                  <span class="mega-title">Landing Page Design</span>
                  <span class="mega-desc">Google &amp; Meta ad funnels</span>
                </div>
              </a>
              <a href="/services/ui-ux-design-services" class="mega-item">
                <div class="mega-icon">🎨</div>
                <div>
                  <span class="mega-title">UI/UX Design Services</span>
                  <span class="mega-desc">Accessible micro-interactions</span>
                </div>
              </a>
              <a href="/services/web-development-for-startups-smes" class="mega-item">
                <div class="mega-icon">🚀</div>
                <div>
                  <span class="mega-title">Startups &amp; SMEs</span>
                  <span class="mega-desc">Scalable MVPs with zero debt</span>
                </div>
              </a>
              <a href="/services/custom-web-application-development" class="mega-item">
                <div class="mega-icon">🌐</div>
                <div>
                  <span class="mega-title">Custom Web Applications</span>
                  <span class="mega-desc">Full-stack React &amp; Laravel</span>
                </div>
              </a>
              <a href="/services/website-redesign-speed-optimization" class="mega-item">
                <div class="mega-icon">⚡</div>
                <div>
                  <span class="mega-title">Website Redesign &amp; Speed</span>
                  <span class="mega-desc">Zero ranking loss</span>
                </div>
              </a>
              <a href="/services/wordpress-web-development" class="mega-item" style="grid-column: span 2;">
                <div class="mega-icon">🛠️</div>
                <div>
                  <span class="mega-title">WordPress Development Services</span>
                  <span class="mega-desc">Bespoke themes &amp; plugins from scratch</span>
                </div>
              </a>
            </div>
          </li>
          <li class="nav-item"><a href="/about-sanjeev-kumar-malik" class="nav-link">About Sanjeev Kumar Malik</a></li>
          <li class="nav-item"><a href="/blogs" class="nav-link active">Blogs</a></li>
          <li class="nav-item"><a href="/contact-us" class="nav-link">Contact Us</a></li>
        </ul>

        <!-- Right Side Quick Contact & CTA Actions -->
        <div class="nav-actions-modern">
          <a href="tel:+919718604362" class="nav-call-badge" title="Call Sanjeev directly">
            <span class="call-badge-icon">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </span>
            <span class="call-badge-number">+91 97186 04362</span>
          </a>

          <!-- Action Trigger: Sleek Non-Distorted Pill Button -->
          <a href="/contact-us" class="nav-cta open-booking-modal" id="navBookCta">
            <span class="live-radar-dot" aria-hidden="true"></span>
            <span>Book Founder Session →</span>
          </a>

          <!-- Mobile Hamburger Button -->
          <button class="mobile-nav-toggle" id="mobileNavToggle" aria-label="Toggle navigation menu" aria-expanded="false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

      </div>
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
              <!-- Category & Badges Bar -->
              <div class="article-header-badges">
                <span class="blog-category-tag"><?= htmlspecialchars($category) ?></span>
                <span class="header-badge-sep">•</span>
                <span class="article-read-badge">⏱️ <?= (int)$readTime ?> min read</span>
                <span class="header-badge-sep">•</span>
                <span class="article-date-badge">📅 <?= htmlspecialchars($publishDateFormatted) ?></span>
              </div>

              <h1 class="article-main-title"><?= htmlspecialchars($title) ?></h1>

              <?php if (!empty($blog['short_excerpt'])): ?>
                <p class="article-lead-excerpt"><?= htmlspecialchars($blog['short_excerpt']) ?></p>
              <?php endif; ?>

              <!-- Author & Social Share Meta Strip -->
              <div class="article-author-meta-bar">
                <div class="author-profile-pill">
                  <div class="author-avatar-chip">S</div>
                  <div class="author-details">
                    <div class="author-name-row">
                      <span class="author-name"><?= htmlspecialchars($author) ?></span>
                      <span class="author-verified-badge" title="Verified Web Architect">✓</span>
                    </div>
                    <span class="author-role-sub">Principal Web Architect • Delhi NCR &amp; Global</span>
                  </div>
                </div>

                <!-- Social Sharing Controls -->
                <div class="article-share-group">
                  <span class="share-label">Share:</span>
                  <a href="https://twitter.com/intent/tweet?url=<?= urlencode($canonicalUrl) ?>&amp;text=<?= urlencode($title) ?>" target="_blank" rel="noopener noreferrer" class="share-icon-btn" title="Share on X / Twitter">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=<?= urlencode($canonicalUrl) ?>" target="_blank" rel="noopener noreferrer" class="share-icon-btn" title="Share on LinkedIn">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0-.01-3.28 1.64 1.64 0 0 0 .01 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z"/></svg>
                  </a>
                  <button type="button" class="share-icon-btn copy-link-btn" title="Copy Article URL" onclick="navigator.clipboard.writeText(window.location.href); alert('Link copied to clipboard!');">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                  </button>
                </div>
              </div>
            </header>

            <!-- Featured Image -->
            <div class="article-featured-image-box">
              <img src="<?= htmlspecialchars($featuredImg) ?>" alt="<?= htmlspecialchars($featuredImgAlt) ?>" class="article-featured-image" onerror="this.src='/assets/images/Web-Development.webp'">
            </div>

            <!-- Body Content with Prose Styling -->
            <div class="article-prose article-prose-content" id="articleBody">
              <?= $bodyHtml ?>
            </div>

            <!-- Prominent Article Tags Section (Visible directly on page) -->
            <div class="article-tags-bottom-bar">
              <div class="tags-bar-header">
                <span class="tags-icon">🏷️</span>
                <strong>Article Topics &amp; Core Architecture Tags:</strong>
              </div>
              <div class="article-tags-cloud">
                <?php foreach ($tagsList as $tag): ?>
                  <a href="/blogs" class="article-tag">#<?= htmlspecialchars(ltrim($tag, '#')) ?></a>
                <?php endforeach; ?>
              </div>
            </div>

            <!-- Dynamic FAQs Accordion if configured in Admin -->
            <?php if (!empty($faqs)): ?>
              <section class="article-faq-section" style="margin-top: 3.5rem; padding-top: 2rem; border-top: 1px solid var(--border-card);">
                <div class="section-eyebrow" style="margin-bottom: 0.5rem;">Article FAQs</div>
                <h2 style="font-size: 1.75rem; font-weight: 850; color: var(--text-primary); margin-bottom: 1.5rem;">Frequently Asked Questions</h2>
                
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

            <!-- Author Bio & Founder Direct Partnership Card -->
            <div class="article-founder-card">
              <div class="founder-card-inner">
                <div class="author-avatar-large">S</div>
                <div class="founder-card-content">
                  <div class="founder-tag-strip">
                    <span class="verified-founder-pill">✓ Verified Principal Architect</span>
                    <span class="sprint-avail-pill">⚡ 15+ Yrs Exp • Delhi NCR &amp; Global</span>
                  </div>
                  <h3 class="founder-card-name"><?= htmlspecialchars($author) ?></h3>
                  <p class="founder-card-bio">
                    Senior full-stack web architect designing high-velocity enterprise WordPress platforms, custom Next.js applications, and conversion-engineered e-commerce stores with sub-0.8s Core Web Vitals.
                  </p>
                  <div class="founder-card-actions">
                    <a href="/contact-us" class="btn-primary open-booking-modal">Schedule Founder Architecture Review →</a>
                    <a href="https://wa.me/919718604362?text=Hello%20Sanjeev,%20I%20read%20your%20article%20on%20<?= urlencode($title) ?>%20and%20want%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer" class="btn-whatsapp-outline">
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
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

            <!-- Tags Cloud Card in Sidebar -->
            <div class="tags-card">
              <div class="tags-header">
                <span>🏷️</span>
                <span>Topics &amp; Tags</span>
              </div>
              <div class="article-tags-cloud">
                <?php foreach ($tagsList as $tag): ?>
                  <a href="/blogs" class="article-tag">#<?= htmlspecialchars(ltrim($tag, '#')) ?></a>
                <?php endforeach; ?>
              </div>
            </div>

            <!-- Quick Architecture Consultation Form -->
            <div class="blog-form-card">
              <div class="toc-header" style="border-bottom: none; margin-bottom: 0.5rem; padding-bottom: 0;">
                <span>⚡</span>
                <span>Get Expert Advisory</span>
              </div>
              <p style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.45; margin-bottom: 1rem;">
                Discuss your project directly with Sanjeev Kumar Malik — Senior Full-Stack Architect.
              </p>
              
              <form class="service-form blog-sidebar-form" onsubmit="event.preventDefault(); this.innerHTML='<div style=\'text-align:center; padding:1.5rem 0.5rem; color:#065F46;\'><h4>🎉 Request Sent!</h4><p style=\'font-size:0.85rem; margin-top:0.35rem;\'>Sanjeev will connect within 4 hours.</p></div>';">
                <div class="form-group" style="margin-bottom: 0.75rem;">
                  <input type="text" class="form-input" style="padding: 0.7rem 0.85rem; font-size: 0.85rem; height: 44px; border-radius: 10px;" placeholder="Your Name *" required>
                </div>
                <div class="form-group" style="margin-bottom: 0.75rem;">
                  <input type="tel" class="form-input" style="padding: 0.7rem 0.85rem; font-size: 0.85rem; height: 44px; border-radius: 10px;" placeholder="Phone / WhatsApp *" required>
                </div>
                <div class="form-group" style="margin-bottom: 0.75rem;">
                  <input type="email" class="form-input" style="padding: 0.7rem 0.85rem; font-size: 0.85rem; height: 44px; border-radius: 10px;" placeholder="Email Address *" required>
                </div>
                <button type="submit" class="btn-primary" style="width: 100%; justify-content: center; font-size: 0.9rem; padding: 0.75rem 1rem; border-radius: 12px; height: 46px;">
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
        <div>&copy; <?= date('Y') ?> Sanjeev Kumar Malik. All Rights Reserved.</div>
        <div class="footer-status-pill">
          <span class="live-radar-dot" style="width: 7px; height: 7px;"></span>
          <span>Designed by <a href="https://buzzspiremedia.com/" target="_blank" rel="noopener">Buzzspire Media Pvt. Ltd.</a></span>
          <span style="margin: 0 0.5rem; color: #CBD5E1;">•</span>
          <a href="/admin/login.php" style="color: #64748B; font-size: 0.78rem; text-decoration: none;">Admin Portal</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Interactive Booking Modal (Ultra-Spacious Antigravity Light) -->
  <div id="bookingModal" class="booking-modal-overlay" aria-hidden="true" role="dialog">
    <div class="booking-modal-card">
      <button id="closeBookingModal" class="modal-close-btn" aria-label="Close modal">&times;</button>
      
      <div class="modal-header">
        <span class="modal-badge">
          <span class="live-radar-dot"></span>
          <span>Direct Founder Access • 15+ Yrs Experience</span>
        </span>
        <h3 class="modal-title">Plan Your Project With Sanjeev</h3>
        <p class="modal-subtitle">Direct architectural roadmap, tech stack evaluation, and fixed sprint proposal — zero sales reps.</p>
      </div>

      <form class="modal-form" id="founderBookingForm">
        <div class="form-row">
          <div class="form-group">
            <label for="modalName">Your Name *</label>
            <input type="text" id="modalName" required placeholder="e.g. Rohit Sharma" class="form-input">
          </div>
          <div class="form-group">
            <label for="modalPhone">Phone / WhatsApp *</label>
            <input type="tel" id="modalPhone" required placeholder="+91 98765 43210" class="form-input">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="modalEmail">Work Email *</label>
            <input type="email" id="modalEmail" required placeholder="name@company.com" class="form-input">
          </div>
          <div class="form-group">
            <label for="modalService">Primary Service Needed *</label>
            <select id="modalService" required class="form-select">
              <option value="">Select Service Scope...</option>
              <option value="WordPress Development">WordPress Development (Custom / Headless)</option>
              <option value="E-Commerce Development">E-Commerce Websites (Shopify / WooCommerce)</option>
              <option value="Custom Web Applications">Custom Web Applications (React / Next.js / PHP)</option>
              <option value="Website Redesign & Speed">Website Redesign & Speed Optimization</option>
              <option value="Landing Page CRO">Landing Page CRO & Paid Funnels</option>
              <option value="UI/UX Design Services">UI/UX Design Services & Frontend</option>
              <option value="Startups & SMEs">Startups & SMEs MVP Sprint</option>
            </select>
          </div>
        </div>

        <button type="submit" class="btn-submit-modal" id="modalSubmitBtn">
          <span>Confirm Architecture Session →</span>
        </button>
        <div class="modal-trust-strip">
          <span>🔒 Strict Mutual NDA</span>
          <span>•</span>
          <span>⚡ Response &lt; 4 Hours</span>
          <span>•</span>
          <span>⭐ 1,700+ Delivered</span>
        </div>
      </form>

      <div class="popup-success-banner" id="bookingSuccessBanner" style="display: none;">
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎉</div>
        <h4 style="font-size: 1.25rem; font-weight: 800; color: #065F46; margin-bottom: 0.35rem;">Session Requested!</h4>
        <p style="font-size: 0.9rem; color: #047857; line-height: 1.5; margin-bottom: 1rem;">
          Thank you! Sanjeev Kumar Malik will personally inspect your requirements and connect via WhatsApp/Phone within 4 hours.
        </p>
        <button type="button" class="btn-primary" id="bookingSuccessCloseBtn" style="width: 100%; justify-content: center; padding: 0.75rem 1.25rem; font-size: 0.92rem;">
          Back to Website
        </button>
      </div>
    </div>
  </div>

    <!-- Floating Quick Contact Actions (WhatsApp & Call) -->
  <div id="floatingContactWidget" class="floating-contact-widget" aria-label="Quick Contact Actions">
    <a href="tel:+919718604362" class="floating-action-btn fab-call" aria-label="Call Sanjeev Kumar Malik Directly">
      <span class="fab-tooltip">Call +91 97186 04362</span>
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
      <span class="fab-btn-label">Call Now</span>
    </a>
    <a href="https://wa.me/919718604362?text=Hello%20Sanjeev,%20I%20would%20like%20to%20discuss%20a%20website%20project." target="_blank" rel="noopener noreferrer" class="floating-action-btn fab-whatsapp" aria-label="Chat on WhatsApp with Sanjeev Kumar Malik">
      <span class="fab-tooltip">Chat on WhatsApp</span>
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path>
      </svg>
      <span class="fab-btn-label">WhatsApp</span>
    </a>
  </div>


  <script src="/assets/js/app.js?v=5.0"></script>
</body>
</html>

