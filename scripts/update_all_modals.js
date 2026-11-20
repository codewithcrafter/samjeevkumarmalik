const fs = require('fs');
const path = require('path');

const newModalSnippet = `  <!-- Interactive Booking Modal (Ultra-Spacious Antigravity Light) -->
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
  </div>`;

function getAllHtmlAndPhpFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'admin') {
        results = results.concat(getAllHtmlAndPhpFiles(fullPath));
      }
    } else if (file.endsWith('.html') || file === 'blog.php' || file === 'blogs.php') {
      results.push(fullPath);
    }
  });
  return results;
}

const files = getAllHtmlAndPhpFiles(process.cwd());
let updatedCount = 0;

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('id="bookingModal"')) {
    // Replace modal block
    const modalRegex = /<!--\s*Interactive Booking Modal[\s\S]*?id="bookingModal"[\s\S]*?<\/div>\s*<\/div>/i;
    if (modalRegex.test(content)) {
      content = content.replace(modalRegex, newModalSnippet.trim());
      fs.writeFileSync(filePath, content, 'utf8');
      updatedCount++;
    } else {
      // Try fallback regex for bookingModal without comment
      const fallbackRegex = /<div\s+id="bookingModal"[\s\S]*?id="bookingSuccessCloseBtn"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i;
      if (fallbackRegex.test(content)) {
        content = content.replace(fallbackRegex, newModalSnippet.trim());
        fs.writeFileSync(filePath, content, 'utf8');
        updatedCount++;
      }
    }
  }
});

console.log(`Updated bookingModal in ${updatedCount} files.`);
