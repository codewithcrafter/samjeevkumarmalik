<?php
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/functions.php';
require_once __DIR__ . '/includes/functions.php';

$blogs = [];
if ($pdo) {
    $stmt = $pdo->query("SELECT * FROM blogs WHERE publish_stage = 'published' ORDER BY publish_date DESC, id DESC");
    $blogs = $stmt->fetchAll();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <title>Technical Web Engineering Blogs &amp; Insights — Sanjeev Kumar Malik</title>
  <meta name="description" content="In-depth technical guides, WordPress engineering, UI/UX design patterns, Core Web Vitals, and e-commerce optimization authored for founders and technical teams.">
  <link rel="canonical" href="https://sanjeevkumarmalik.in/blogs">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Technical Web Engineering Blogs &amp; Insights — Sanjeev Kumar Malik">
  <meta property="og:description" content="Read 10 actionable engineering essays on WordPress, Next.js, Core Web Vitals, and E-commerce conversion flows.">
  <meta property="og:image" content="assets/images/Web-Development.webp">

  <!-- Favicon & Stylesheet -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%232563EB'/><text x='50' y='64' font-size='42' font-family='sans-serif' font-weight='bold' fill='white' text-anchor='middle'>S</text></svg>">
  <link rel="stylesheet" href="/assets/css/style.css?v=6.2">
  <!-- Structured Data (JSON-LD) -->
  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "@id": "https://sanjeevkumarmalik.in/blogs#blog",
      "url": "https://sanjeevkumarmalik.in/blogs",
      "name": "Technical Web Engineering Blogs & Insights — Sanjeev Kumar Malik",
      "description": "In-depth technical guides, WordPress engineering, UI/UX design patterns, Core Web Vitals, and e-commerce optimization authored for founders and technical teams.",
      "publisher": {
        "@type": "Person",
        "@id": "https://sanjeevkumarmalik.in/#person",
        "name": "Sanjeev Kumar Malik",
        "url": "https://sanjeevkumarmalik.in"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://sanjeevkumarmalik.in/blogs#breadcrumbs",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://sanjeevkumarmalik.in/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Technical Blogs",
          "item": "https://sanjeevkumarmalik.in/blogs"
        }
      ]
    }
  ]
}
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

  <!-- Global Floating Navbar -->
    <!-- Global Full-Width Dual-Tier Sticky Header -->
    <!-- Global Full-Width Dual-Tier Sticky Header -->
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
            <a href="/services" class="nav-link dropdown-toggle" aria-haspopup="true" aria-expanded="false">
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
          <li class="nav-item"><a href="/blogs" class="nav-link">Blogs</a></li>
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
    
    <!-- Mobile Services Accordion Dropdown -->
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
          <span class="item-text">
            <strong>WordPress Web Development</strong>
            <small>Gutenberg &amp; Custom Headless Stacks</small>
          </span>
        </a>
        <a href="/services/ecommerce-website-development" class="mobile-service-item">
          <span class="item-icon">🛍️</span>
          <span class="item-text">
            <strong>E-commerce Website Development</strong>
            <small>Shopify, WooCommerce &amp; Razorpay</small>
          </span>
        </a>
        <a href="/services/custom-web-application-development" class="mobile-service-item">
          <span class="item-icon">⚙️</span>
          <span class="item-text">
            <strong>Custom Web Applications</strong>
            <small>Full-Stack React, Node.js &amp; Next.js</small>
          </span>
        </a>
        <a href="/services/website-redesign-speed-optimization" class="mobile-service-item">
          <span class="item-icon">🚀</span>
          <span class="item-text">
            <strong>Website Redesign &amp; Speed</strong>
            <small>Core Web Vitals &amp; Sub-0.8s Loading</small>
          </span>
        </a>
        <a href="/services/landing-page-design-development" class="mobile-service-item">
          <span class="item-icon">🎯</span>
          <span class="item-text">
            <strong>Landing Page Design &amp; Dev</strong>
            <small>High-Converting Paid Traffic Funnels</small>
          </span>
        </a>
        <a href="/services/ui-ux-design-services" class="mobile-service-item">
          <span class="item-icon">✨</span>
          <span class="item-text">
            <strong>UI/UX Design Services</strong>
            <small>Figma to Scalable Clean Code</small>
          </span>
        </a>
        <a href="/services/web-development-for-startups-smes" class="mobile-service-item">
          <span class="item-icon">🌱</span>
          <span class="item-text">
            <strong>Startups &amp; SMEs Development</strong>
            <small>Rapid MVPs &amp; Fractional CTO Guidance</small>
          </span>
        </a>
      </div>
    </div>

    <a href="/about-sanjeev-kumar-malik" class="nav-link">About Sanjeev Kumar Malik</a>
    <a href="/blogs" class="nav-link">Technical Blogs</a>
    <a href="/contact-us" class="nav-link">Contact Us</a>
    <a href="/contact-us" class="btn-primary open-booking-modal" style="width: 100%; text-align: center; margin-top: 0.5rem;">Book Founder Session →</a>
  </div>

  <main>
    <!-- Header Section -->
    <section class="page-header-section">
      <div class="container">
        <div class="breadcrumb-nav">
          <a href="/">Home</a>
          <span>/</span>
          <span>Technical Blogs</span>
        </div>
        <div class="section-eyebrow">Insights &amp; Engineering Standards</div>
        <h1 class="section-title">
          Engineering Blogs &amp; <span class="gradient-text">Architectural Essays</span>
        </h1>
        <p class="section-description" style="max-width: 780px; margin: 0 auto;">
          Practical, battle-tested perspectives on WordPress development, headless architecture, UI/UX conversions, and technical SEO written for founders and engineers.
        </p>
      </div>
    </section>

    <!-- Blog Directory Grid with Filter Tabs -->
    <section class="section" style="padding-top: 0;">
      <div class="container">
        
        <!-- Dynamic Filter Tabs -->
        <?php
          $catsCount = [
            'all' => count($blogs),
            'wordpress' => 0,
            'uiux' => 0,
            'ecommerce' => 0,
            'webapps' => 0
          ];
          foreach ($blogs as $b) {
            $catLower = strtolower($b['category_name'] ?? '');
            if (strpos($catLower, 'word') !== false) $catsCount['wordpress']++;
            elseif (strpos($catLower, 'ui') !== false || strpos($catLower, 'ux') !== false || strpos($catLower, 'design') !== false) $catsCount['uiux']++;
            elseif (strpos($catLower, 'ecom') !== false || strpos($catLower, 'shop') !== false) $catsCount['ecommerce']++;
            else $catsCount['webapps']++;
          }
        ?>
        <div class="blogs-filter-strip">
          <button class="filter-btn active" data-category="all">All Articles (<?= (int)$catsCount['all'] ?>)</button>
          <button class="filter-btn" data-category="wordpress">WordPress (<?= (int)$catsCount['wordpress'] ?>)</button>
          <button class="filter-btn" data-category="uiux">UI/UX &amp; Design (<?= (int)$catsCount['uiux'] ?>)</button>
          <button class="filter-btn" data-category="ecommerce">E-commerce (<?= (int)$catsCount['ecommerce'] ?>)</button>
          <?php if ($catsCount['webapps'] > 0): ?>
            <button class="filter-btn" data-category="webapps">Web Apps &amp; Tech (<?= (int)$catsCount['webapps'] ?>)</button>
          <?php endif; ?>
        </div>
<div class="blogs-grid">
          
          <?php if (empty($blogs)): ?>
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
              <p style="font-size: 1.1rem; color: var(--text-secondary);">No articles found in this category.</p>
            </div>
          <?php else: ?>
            <?php foreach ($blogs as $b): ?>
              <?php
                $catLower = strtolower($b['category_name'] ?? '');
                $dataCat = 'webapps';
                if (strpos($catLower, 'word') !== false) $dataCat = 'wordpress';
                elseif (strpos($catLower, 'ui') !== false || strpos($catLower, 'ux') !== false || strpos($catLower, 'design') !== false) $dataCat = 'uiux';
                elseif (strpos($catLower, 'ecom') !== false || strpos($catLower, 'shop') !== false) $dataCat = 'ecommerce';

                $featuredImg = !empty($b['featured_image']) ? $b['featured_image'] : '/assets/images/Web-Development.webp';
                $pubDateStr = date('M Y', strtotime($b['publish_date'] ?? date('Y-m-d')));
              ?>
              <article class="blog-card" data-category="<?= htmlspecialchars($dataCat) ?>">
                <div class="blog-image-box">
                  <a href="/blogs/<?= htmlspecialchars($b['slug']) ?>" class="blog-image-link" aria-label="Read <?= htmlspecialchars($b['title']) ?>">
                    <img src="<?= htmlspecialchars($featuredImg) ?>" alt="<?= htmlspecialchars($b['featured_image_alt'] ?: $b['title']) ?>" class="blog-image" loading="lazy" onerror="this.src='/assets/images/Web-Development.webp'">
                  </a>
                </div>
                <span class="blog-category-tag"><?= htmlspecialchars($b['category_name']) ?></span>
                <h2 class="blog-card-title">
                  <a href="/blogs/<?= htmlspecialchars($b['slug']) ?>"><?= htmlspecialchars($b['title']) ?></a>
                </h2>
                <p class="blog-card-excerpt">
                  <?= htmlspecialchars($b['short_excerpt']) ?>
                </p>
                <div class="blog-card-meta">
                  <span><?= htmlspecialchars($pubDateStr) ?></span>
                  <span>•</span>
                  <span><?= (int)$b['read_time'] ?> min read</span>
                </div>
              </article>
            <?php endforeach; ?>
          <?php endif; ?>
        </div>

      </div>
    </section>

    <!-- Bottom CTA Banner -->
    <section class="section" style="padding-bottom: 3.5rem;">
      <div class="container">
        <div class="contact-hero-banner">
          <div>
            <div class="section-eyebrow" style="margin-bottom: 0.5rem;">Have a Complex Project?</div>
            <h2 style="font-size: 2.25rem; margin-bottom: 0.5rem;">Turn These Technical Insights Into Your Own Platform</h2>
            <p style="color: var(--text-secondary); max-width: 650px;">
              Direct founder architecture and milestone-driven execution for ambitious Delhi NCR businesses and global startups.
            </p>
          </div>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="/contact-us" class="btn-primary">Book Founder Session →</a>
            <a href="/about-sanjeev-kumar-malik" class="btn-secondary">Meet Sanjeev Kumar Malik</a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Site Footer -->
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
          <a href="mailto:info@sanjeevkumarmalik.in" class="footer-contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span>info@sanjeevkumarmalik.in</span>
          </a>
          <a href="tel:+919718604362" class="footer-contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>+91 97186 04362</span>
          </a>
          <div class="footer-contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>Delhi NCR, India</span>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div>&copy; 2026 Sanjeev Kumar Malik. All Rights Reserved.</div>
        <div class="footer-status-pill">
          <span class="live-radar-dot" style="width: 7px; height: 7px;"></span>
          <span>Designed by <a href="https://buzzspiremedia.com/" target="_blank" rel="noopener">Buzzspire Media Pvt. Ltd.</a></span>
        </div>
      </div>
    </div>
  </footer>

  
    <!-- Interactive Booking Modal (Ultra-Compact Antigravity Light) -->
    <div id="bookingModal" class="booking-modal-overlay" aria-hidden="true" role="dialog">
    <div class="booking-modal-card">
      <button id="closeBookingModal" class="modal-close-btn" aria-label="Close modal">&times;</button>
      
      <div class="modal-header">
        <span class="modal-badge">🟢 Direct Founder Access</span>
        <h3 class="modal-title">Book Founder Session</h3>
        <p class="modal-subtitle">Speak directly with Sanjeev Kumar Malik (15+ Years). Zero sales layers.</p>
      </div>

      <form class="modal-form" id="founderBookingForm">
        <div class="form-row">
          <div class="form-group">
            <label for="modalName">Your Name *</label>
            <input type="text" id="modalName" required placeholder="e.g. Rohit" class="form-input">
          </div>
          <div class="form-group">
            <label for="modalPhone">Phone / WhatsApp *</label>
            <input type="tel" id="modalPhone" required placeholder="+91 98765 43210" class="form-input">
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


  <script src="/assets/js/app.js?v=6.2"></script>
</body>
</html>
