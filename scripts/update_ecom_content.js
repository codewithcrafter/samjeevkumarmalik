const fs = require('fs');

function updateEcom(content) {
  let html = content;

  // HERO
  html = html.replace(
    /<div class="section-eyebrow">[\s\S]*?<\/div>/i,
    `<div class="section-eyebrow">E-commerce Website Development Company - Delhi</div>`
  );

  html = html.replace(
    /<h1 class="section-title">[\s\S]*?<\/h1>/i,
    `<h1 class="section-title">Ecommerce Website Development Company - Delhi | Online Store Creation including Payment Gateway - <span class="gradient-text">Sanjeev Kumar Malik</span></h1>`
  );

  html = html.replace(
    /<p class="section-description" style="max-width: 860px; margin: 0 auto;">[\s\S]*?<\/p>/i,
    `<p class="section-description" style="max-width: 860px; margin: 0 auto;">
          We build customised Shopify and WooCommerce stores that are fast and headless to reduce lost sales at checkout from online stores in India. Our stores come with fast payment gateways such as UPI, Razorpay and Cashfree. We implement automated shipping solutions as well as multi currency checkout with correct GST.
        </p>`
  );

  // SECTION 1: Checkout Optimization
  html = html.replace(
    /<div class="section-eyebrow" style="margin-bottom: 0\.5rem;">[\s\S]*?<\/div>\s*<h2 style="font-size: 2\.2rem; margin-bottom: 1rem;">[\s\S]*?<\/h2>\s*<p style="color: var\(--text-secondary\); line-height: 1\.7; font-size: 1\.05rem;">[\s\S]*?<\/p>\s*<div style="display: flex; gap: 0\.75rem; margin-top: 1\.5rem; flex-wrap: wrap;">[\s\S]*?<\/div>/i,
    `<div class="section-eyebrow" style="margin-bottom: 0.5rem;">Indian Checkout Optimisations</div>
            <h2 style="font-size: 2.2rem; margin-bottom: 1rem;">70% Cart Abandonment Cliff Removed</h2>
            <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1.05rem;">
              7 out of 10 customers leave items in their basket due to slow checkout pages (&gt; 2s), needing to create an account and unclear delivery timeframes. Our e-commerce website development company in Delhi implement fast checkout including one click checkout, inbuilt UPI intent, OTP auto-fill, fast pincode validation with Shiprocket or Delhivery and COD verification.
            </p>
            <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem; flex-wrap: wrap;">
              <span class="hero-tech-chip">&lt;0.8s Product Pages</span>
              <span class="hero-tech-chip">Fast UPI &amp; Razorpay Checkout</span>
              <span class="hero-tech-chip">Fast Pincode &amp; COD Verification</span>
              <span class="hero-tech-chip">Multi Currency (USD/EUR/AED/INR)</span>
            </div>`
  );

  // SECTION 2: Pillars
  html = html.replace(
    /<div class="section-eyebrow">Commerce Engineering Pillars<\/div>\s*<h2 class="section-title">Architected for Scalable Conversions<\/h2>[\s\S]*?<div class="channels-grid">[\s\S]*?<\/div>\s*<\/div>/i,
    `<div class="section-eyebrow">Commerce Engineering</div>
          <h2 class="section-title">Fast &amp; Optimised</h2>
          <p class="section-description" style="text-align: center; max-width: 700px; margin: 0 auto 3rem;">
            Our e-commerce website development company in Delhi will always deliver a fast checkout:
          </p>
        </div>

        <div class="channels-grid">
          <div class="channel-card">
            <div class="channel-icon">🛍️</div>
            <h3 class="channel-title">Custom Shopify Development (Liquid)</h3>
            <p class="channel-desc">Our Shopify development in Delhi provides customised development with clean Liquid coding. We include all checkout features including custom cart drawers, subscription options, bundle builder and dynamic upselling.</p>
          </div>

          <div class="channel-card">
            <div class="channel-icon">⚡</div>
            <h3 class="channel-title">WooCommerce (Large Catalogues)</h3>
            <p class="channel-desc">Our WooCommerce development in Delhi includes optimised databases with Redis object caching and database indexing. Search and filtering are super fast even when there are lots of products.</p>
          </div>

          <div class="channel-card">
            <div class="channel-icon">💳</div>
            <h3 class="channel-title">Payment &amp; Shipping Automation</h3>
            <p class="channel-desc">Our e-commerce website development includes payment gateways such as Razorpay, Cashfree, PayU &amp; Stripe. We will also setup automated shipping labels, webhooks and WhatsApp updates with Shiprocket, Bluedart &amp; Delhivery.</p>
          </div>

          <div class="channel-card">
            <div class="channel-icon">🌍</div>
            <h3 class="channel-title">Multi Currency</h3>
            <p class="channel-desc">We will include multi currency support with Geo-IP detection, automatic currency conversion, GST compliant invoice and customs ready documentation. Perfect for D2C who wish to sell globally.</p>
          </div>
        </div>`
  );

  // SECTION 4: Deployment Lifecycle
  html = html.replace(
    /<div class="section-header" style="margin-top: 5rem;">\s*<div class="section-eyebrow">Engineering Protocol<\/div>\s*<h2 class="section-title">The 4-Stage Commerce Deployment Lifecycle<\/h2>[\s\S]*?<\/div>\s*<div class="timeline-container"[\s\S]*?<\/div>\s*<\/div>/i,
    `<div class="section-header" style="margin-top: 5rem;">
          <div class="section-eyebrow">Architecture Workflow</div>
          <h2 class="section-title">4 Stage E-Commerce Process</h2>
          <p class="section-description">
            How our e-commerce website development company in Delhi will build your store.
          </p>
        </div>

        <div class="timeline-container" style="max-width: 900px; margin: 0 auto;">
          <div class="timeline-item">
            <div class="timeline-badge">01</div>
            <div class="timeline-content">
              <div class="timeline-date">01 • Discovery</div>
              <h3 class="timeline-title">Product, Customer &amp; Revenue Strategy</h3>
              <p class="timeline-desc">
                We will analyse your products, customers &amp; current conversion rate.
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-badge">02</div>
            <div class="timeline-content">
              <div class="timeline-date">02 • Design</div>
              <h3 class="timeline-title">Fast Mobile Product Pages &amp; Checkout</h3>
              <p class="timeline-desc">
                Mobile friendly product pages with fast checkout with Indian payment methods.
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-badge">03</div>
            <div class="timeline-content">
              <div class="timeline-date">03 • Build</div>
              <h3 class="timeline-title">E-Commerce Platform, Payment Gateway &amp; Shipping Setup</h3>
              <p class="timeline-desc">
                We will design customised e-commerce website development with payment gateways (Razorpay/Cashfree/PayU/Stripe), automatic shipping, GST rules &amp; WhatsApp updates.
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-badge">04</div>
            <div class="timeline-content">
              <div class="timeline-date">04 • Load Testing &amp; Launch</div>
              <h3 class="timeline-title">Load Testing &amp; Launch</h3>
              <p class="timeline-desc">
                We will perform load testing to ensure your basket &amp; checkout will never break.
              </p>
            </div>
          </div>
        </div>`
  );

  return html;
}

const curEcom = fs.readFileSync('services/ecommerce-website-development.html', 'utf-8');
const updatedEcom = updateEcom(curEcom);

fs.writeFileSync('services/ecommerce-website-development.html', updatedEcom);
fs.writeFileSync('services/ecommerce-website-development/index.html', updatedEcom);

console.log('Successfully re-updated ecommerce-website-development.html and alias!');
