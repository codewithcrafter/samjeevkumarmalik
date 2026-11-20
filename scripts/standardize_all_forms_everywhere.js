const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const STANDARD_BOOKING_FORM = `      <form class="modal-form" id="founderBookingForm">
        <div class="form-row">
          <div class="form-group">
            <label for="modalName">Your Name *</label>
            <input type="text" id="modalName" required placeholder="e.g. Rahul Sharma" class="form-input">
          </div>
          <div class="form-group">
            <label for="modalEmail">Work Email *</label>
            <input type="email" id="modalEmail" required placeholder="name@company.com" class="form-input">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="modalPhone">Phone / WhatsApp *</label>
            <input type="tel" id="modalPhone" required placeholder="+91 98765 43210" class="form-input">
          </div>
          <div class="form-group">
            <label for="modalService">Service Needed (Optional)</label>
            <select id="modalService" class="form-select">
              <option value="">Select Service Scope (Optional)...</option>
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
      </form>`;

const STANDARD_CONTACT_FORM = `            <form class="contact-page-form" id="mainContactForm" onsubmit="event.preventDefault(); document.getElementById('contactFormSuccess').style.display='block'; this.style.display='none';">
              
              <div class="form-row">
                <div class="form-group">
                  <label for="contactFullName">Your Name *</label>
                  <input type="text" id="contactFullName" class="form-input" placeholder="e.g. Rahul Sharma" required>
                </div>
                <div class="form-group">
                  <label for="contactWorkEmail">Work Email *</label>
                  <input type="email" id="contactWorkEmail" class="form-input" placeholder="name@company.com" required>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="contactPhone">Phone / WhatsApp *</label>
                  <input type="tel" id="contactPhone" class="form-input" placeholder="+91 98765 43210" required>
                </div>
                <div class="form-group">
                  <label for="contactService">Service Needed (Optional)</label>
                  <select id="contactService" class="form-select">
                    <option value="">Select Service Scope (Optional)...</option>
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

              <button type="submit" class="btn-contact-submit">
                <span>Send Requirements for Direct Founder Review →</span>
              </button>

              <div class="contact-trust-strip">
                <span>🔒 Strict Mutual NDA Assured</span>
                <span>⚡ Direct Founder Response &lt; 4 hours</span>
                <span>🎯 Actionable Roadmap</span>
              </div>
            </form>`;

const STANDARD_SERVICE_FORM = `              <form class="service-form">
                <div class="form-group">
                  <label>Your Name *</label>
                  <input type="text" class="form-input" placeholder="e.g. Rahul Sharma" required>
                </div>
                <div class="form-group">
                  <label>Work Email *</label>
                  <input type="email" class="form-input" placeholder="name@company.com" required>
                </div>
                <div class="form-group">
                  <label>Phone / WhatsApp *</label>
                  <input type="tel" class="form-input" placeholder="+91 98765 43210" required>
                </div>
                <div class="form-group">
                  <label>Service Needed (Optional)</label>
                  <select class="form-select">
                    <option value="">Select Service Scope (Optional)...</option>
                    <option value="WordPress Development">WordPress Development (Custom / Headless)</option>
                    <option value="E-Commerce Development">E-Commerce Websites (Shopify / WooCommerce)</option>
                    <option value="Custom Web Applications">Custom Web Applications (React / Next.js / PHP)</option>
                    <option value="Website Redesign & Speed">Website Redesign & Speed Optimization</option>
                    <option value="Landing Page CRO">Landing Page CRO & Paid Funnels</option>
                    <option value="UI/UX Design Services">UI/UX Design Services & Frontend</option>
                    <option value="Startups & SMEs">Startups & SMEs MVP Sprint</option>
                  </select>
                </div>
                <button type="submit" class="btn-service-submit">
                  <span>Claim Architecture Discovery →</span>
                </button>
                <div style="font-size: 0.75rem; color: #94A3B8; text-align: center; margin-top: 0.4rem;">
                  🔒 Strict NDA • Direct founder review &lt; 4 hours
                </div>
              </form>`;

const STANDARD_BLOG_SIDEBAR_FORM = `              <form class="service-form blog-sidebar-form" onsubmit="event.preventDefault(); this.innerHTML='<div style=\\'text-align:center; padding:1.5rem 0.5rem; color:#065F46;\\'><h4>🎉 Request Sent!</h4><p style=\\'font-size:0.85rem; margin-top:0.35rem;\\'>Sanjeev will connect within 4 hours.</p></div>';">
                <div class="form-group" style="margin-bottom: 0.75rem;">
                  <input type="text" class="form-input" style="padding: 0.7rem 0.85rem; font-size: 0.85rem; height: 44px; border-radius: 10px;" placeholder="Your Name *" required>
                </div>
                <div class="form-group" style="margin-bottom: 0.75rem;">
                  <input type="email" class="form-input" style="padding: 0.7rem 0.85rem; font-size: 0.85rem; height: 44px; border-radius: 10px;" placeholder="Work Email *" required>
                </div>
                <div class="form-group" style="margin-bottom: 0.75rem;">
                  <input type="tel" class="form-input" style="padding: 0.7rem 0.85rem; font-size: 0.85rem; height: 44px; border-radius: 10px;" placeholder="Phone / WhatsApp *" required>
                </div>
                <div class="form-group" style="margin-bottom: 0.75rem;">
                  <select class="form-select" style="padding: 0.7rem 0.85rem; font-size: 0.85rem; height: 44px; border-radius: 10px;">
                    <option value="">Service Needed (Optional)...</option>
                    <option value="WordPress Development">WordPress Development</option>
                    <option value="E-Commerce Development">E-Commerce Store</option>
                    <option value="Custom Web Applications">Custom Web Applications</option>
                    <option value="Website Redesign & Speed">Website Redesign & Speed</option>
                    <option value="Landing Page CRO">Landing Page CRO</option>
                    <option value="UI/UX Design Services">UI/UX Design Services</option>
                    <option value="Startups & SMEs">Startups & SMEs</option>
                  </select>
                </div>
                <button type="submit" class="btn-primary" style="width: 100%; justify-content: center; font-size: 0.9rem; padding: 0.75rem 1rem; border-radius: 12px; height: 46px;">
                  Claim Advisory Call →
                </button>
              </form>`;

function getAllTargetFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const item of list) {
    if (item === 'node_modules' || item === '.git' || item === 'admin' || item === 'scripts' || item === 'includes') continue;
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getAllTargetFiles(fullPath));
    } else if (item.endsWith('.html') || item.endsWith('.php')) {
      results.push(fullPath);
    }
  }
  return results;
}

const allFiles = getAllTargetFiles(ROOT_DIR);
console.log(`Found ${allFiles.length} files to check and standardize.`);

let updatedCount = 0;

allFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Standardize #founderBookingForm
  content = content.replace(/<form class="modal-form" id="founderBookingForm"[^>]*>[\s\S]*?<\/form>/, STANDARD_BOOKING_FORM);

  // 2. Standardize #mainContactForm
  if (filePath.includes('contact-us')) {
    content = content.replace(/<form class="contact-page-form" id="mainContactForm"[^>]*>[\s\S]*?<\/form>/, STANDARD_CONTACT_FORM);
  }

  // 3. Standardize .service-form in services/
  if (filePath.includes('services')) {
    content = content.replace(/<form class="service-form"[^>]*>[\s\S]*?<\/form>/, STANDARD_SERVICE_FORM);
  }

  // 4. Standardize .blog-sidebar-form in blog pages
  if (filePath.includes('blog') || filePath.includes('blogs')) {
    content = content.replace(/<form class="service-form blog-sidebar-form"[^>]*>[\s\S]*?<\/form>/, STANDARD_BLOG_SIDEBAR_FORM);
  }

  // 5. Cache-bust style.css and app.js to v=6.0
  content = content.replace(/\/assets\/css\/style\.css(\?v=[^"']*)?/g, '/assets/css/style.css?v=6.0');
  content = content.replace(/\/assets\/js\/app\.js(\?v=[^"']*)?/g, '/assets/js/app.js?v=6.0');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`Updated: ${path.relative(ROOT_DIR, filePath)}`);
  }
});

console.log(`\nSuccessfully standardized ${updatedCount} files.`);
