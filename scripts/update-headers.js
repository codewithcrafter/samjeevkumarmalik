const fs = require('fs');
const path = require('path');

function getHeaderTemplate(prefix) {
  return `  <!-- Global Full-Width Dual-Tier Sticky Header -->
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
            <svg class="top-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>+91 97186 04362</span>
          </a>
          <span class="top-bar-sep" aria-hidden="true">•</span>
          <a href="mailto:info@sanjeevkumarmalik.in" class="top-contact-link desktop-only">
            <svg class="top-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
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
        <a href="${prefix}index.html" class="nav-brand-modern" aria-label="Sanjeev Kumar Malik Homepage">
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
            <a href="${prefix}index.html" class="nav-link">Home</a>
          </li>
          <li class="nav-item nav-dropdown" id="servicesDropdown">
            <a href="${prefix}services/wordpress-web-development.html" class="nav-link dropdown-toggle" aria-haspopup="true" aria-expanded="false">
              <span>Services</span>
              <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </a>
            <!-- Mega Menu -->
            <div class="nav-mega-menu dropdown-menu services-mega-menu" role="menu">
              <a href="${prefix}services/ecommerce-website-development.html" class="mega-item">
                <div class="mega-icon">🛒</div>
                <div>
                  <span class="mega-title">E-commerce Development</span>
                  <span class="mega-desc">Shopify &amp; WooCommerce</span>
                </div>
              </a>
              <a href="${prefix}services/landing-page-design-development.html" class="mega-item">
                <div class="mega-icon">🎯</div>
                <div>
                  <span class="mega-title">Landing Page Design</span>
                  <span class="mega-desc">Google &amp; Meta ad funnels</span>
                </div>
              </a>
              <a href="${prefix}services/ui-ux-design-services.html" class="mega-item">
                <div class="mega-icon">🎨</div>
                <div>
                  <span class="mega-title">UI/UX Design Services</span>
                  <span class="mega-desc">Accessible micro-interactions</span>
                </div>
              </a>
              <a href="${prefix}services/web-development-for-startups-smes.html" class="mega-item">
                <div class="mega-icon">🚀</div>
                <div>
                  <span class="mega-title">Startups &amp; SMEs</span>
                  <span class="mega-desc">Scalable MVPs with zero debt</span>
                </div>
              </a>
              <a href="${prefix}services/custom-web-application-development.html" class="mega-item">
                <div class="mega-icon">🌐</div>
                <div>
                  <span class="mega-title">Custom Web Applications</span>
                  <span class="mega-desc">Full-stack React &amp; Laravel</span>
                </div>
              </a>
              <a href="${prefix}services/website-redesign-speed-optimization.html" class="mega-item">
                <div class="mega-icon">⚡</div>
                <div>
                  <span class="mega-title">Website Redesign &amp; Speed</span>
                  <span class="mega-desc">Zero ranking loss</span>
                </div>
              </a>
              <a href="${prefix}services/wordpress-web-development.html" class="mega-item" style="grid-column: span 2;">
                <div class="mega-icon">🛠️</div>
                <div>
                  <span class="mega-title">WordPress Development Services</span>
                  <span class="mega-desc">Bespoke themes &amp; plugins from scratch</span>
                </div>
              </a>
            </div>
          </li>
          <li class="nav-item"><a href="${prefix}about-sanjeev-kumar-malik.html" class="nav-link">About Sanjeev Kumar Malik</a></li>
          <li class="nav-item"><a href="${prefix}blogs.html" class="nav-link">Blogs</a></li>
          <li class="nav-item"><a href="${prefix}contact-us.html" class="nav-link">Contact Us</a></li>
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
          <a href="${prefix}contact-us.html" class="nav-cta open-booking-modal" id="navBookCta">
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
  </header>`;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const normalized = filePath.replace(/\\/g, '/');
  const isSubfolder = normalized.startsWith('services/') || normalized.startsWith('blogs/') || normalized.includes('/services/') || normalized.includes('/blogs/');
  const prefix = isSubfolder ? '../' : '';

  const headerRegex = /<header class="(?:header-wrapper|site-header-full)"[\s\S]*?<\/header>/;
  if (!headerRegex.test(content)) {
    console.log('Skipping (no matching header):', filePath);
    return;
  }

  const newHeader = getHeaderTemplate(prefix);
  content = content.replace(headerRegex, newHeader);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated header in:', filePath, '(prefix: "' + prefix + '")');
}

function walkDir(dir) {
  const list = fs.readdirSync(dir);
  for (const item of list) {
    if (item === 'node_modules' || item === '.git' || item === 'scripts') continue;
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walkDir(full);
    } else if (item.endsWith('.html') && item !== 'index.html') {
      processFile(full);
    }
  }
}

walkDir('.');
console.log('Finished updating headers cleanly.');
