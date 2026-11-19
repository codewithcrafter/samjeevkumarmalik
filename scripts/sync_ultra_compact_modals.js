const fs = require('fs');
const path = require('path');

// 1. New Compact Booking Modal HTML snippet
const compactBookingModalHtml = `  <!-- Interactive Booking Modal (Ultra-Compact Antigravity Light) -->
  <div id="bookingModal" class="booking-modal-overlay" aria-hidden="true" role="dialog">
    <div class="booking-modal-card" style="max-width: 380px !important; width: 90% !important; padding: 1.1rem 1.25rem 1rem !important; border-radius: 16px !important; max-height: 84vh !important; overflow-y: auto !important; box-sizing: border-box !important;">
      <button id="closeBookingModal" class="modal-close-btn" aria-label="Close modal" style="top: 0.75rem !important; right: 0.75rem !important; width: 28px !important; height: 28px !important; font-size: 1.15rem !important;">&times;</button>
      
      <div class="modal-header" style="margin-bottom: 0.45rem !important;">
        <span class="modal-badge" style="margin-bottom: 0.25rem !important; padding: 0.12rem 0.55rem !important; font-size: 0.68rem !important;">🟢 Direct Founder Access</span>
        <h3 class="modal-title" style="font-size: 1.05rem !important; margin-bottom: 0.15rem !important; line-height: 1.2 !important;">Book Founder Session</h3>
        <p class="modal-subtitle" style="font-size: 0.74rem !important; color: #64748B !important; line-height: 1.35 !important; margin: 0 !important;">Speak directly with Sanjeev Kumar Malik (15+ Years). Zero sales layers.</p>
      </div>

      <form class="modal-form" id="founderBookingForm" style="gap: 0.38rem !important;">
        <div class="form-row" style="display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 0.45rem !important;">
          <div class="form-group" style="gap: 0.12rem !important;">
            <label for="modalName" style="font-size: 0.72rem !important; font-weight: 700 !important; color: #334155 !important;">Your Name *</label>
            <input type="text" id="modalName" required placeholder="e.g. Rohit" class="form-input" style="padding: 0.4rem 0.6rem !important; font-size: 0.82rem !important; height: 34px !important; border-radius: 8px !important;">
          </div>
          <div class="form-group" style="gap: 0.12rem !important;">
            <label for="modalPhone" style="font-size: 0.72rem !important; font-weight: 700 !important; color: #334155 !important;">Phone / WhatsApp *</label>
            <input type="tel" id="modalPhone" required placeholder="+91 98765 43210" class="form-input" style="padding: 0.4rem 0.6rem !important; font-size: 0.82rem !important; height: 34px !important; border-radius: 8px !important;">
          </div>
        </div>

        <div class="form-row" style="display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 0.45rem !important;">
          <div class="form-group" style="gap: 0.12rem !important;">
            <label for="modalEmail" style="font-size: 0.72rem !important; font-weight: 700 !important; color: #334155 !important;">Email *</label>
            <input type="email" id="modalEmail" required placeholder="name@company.com" class="form-input" style="padding: 0.4rem 0.6rem !important; font-size: 0.82rem !important; height: 34px !important; border-radius: 8px !important;">
          </div>
          <div class="form-group" style="gap: 0.12rem !important;">
            <label for="modalService" style="font-size: 0.72rem !important; font-weight: 700 !important; color: #334155 !important;">Interest *</label>
            <select id="modalService" required class="form-select" style="padding: 0.4rem 0.6rem !important; font-size: 0.82rem !important; height: 34px !important; border-radius: 8px !important;">
              <option value="">Select Service</option>
              <option value="WordPress Development">WordPress Development</option>
              <option value="E-Commerce Development">E-Commerce Store</option>
              <option value="Custom Web Applications">Custom Web Applications</option>
              <option value="Website Redesign & Speed">Website Redesign & Speed</option>
              <option value="Landing Page CRO">Landing Page CRO</option>
              <option value="UI/UX Design Services">UI/UX Design Services</option>
              <option value="Startups & SMEs">Startups & SMEs</option>
            </select>
          </div>
        </div>

        <button type="submit" class="btn-submit-modal" id="modalSubmitBtn" style="padding: 0.55rem 0.85rem !important; height: 38px !important; font-size: 0.84rem !important; font-weight: 800 !important; border-radius: 9px !important; margin-top: 0.2rem !important;">
          <span>Confirm Architecture Session →</span>
        </button>
        <p class="modal-footer-note" style="font-size: 0.65rem !important; color: #64748B !important; text-align: center !important; margin: 0.25rem 0 0 0 !important;">🔒 Direct 1-on-1 review with Sanjeev • Response &lt; 4 hours</p>
      </form>

      <div class="popup-success-banner" id="bookingSuccessBanner" style="display: none;">
        <div style="font-size: 1.75rem; margin-bottom: 0.35rem;">🎉</div>
        <h4 style="font-size: 1.15rem; font-weight: 800; color: #065F46; margin-bottom: 0.25rem;">Session Requested!</h4>
        <p style="font-size: 0.82rem; color: #047857; line-height: 1.4; margin-bottom: 0.75rem;">
          Thank you! Sanjeev Kumar Malik will connect with you directly via WhatsApp/Phone within 4 hours.
        </p>
        <button type="button" class="btn-primary" id="bookingSuccessCloseBtn" style="width: 100%; justify-content: center; padding: 0.6rem 1rem; font-size: 0.85rem;">
          Back to Website
        </button>
      </div>
    </div>
  </div>`;

// 2. Update assets/js/app.js
let appJs = fs.readFileSync('assets/js/app.js', 'utf8');

// Update ensureBookingModal inside app.js
const ensureBookingStart = appJs.indexOf('function ensureBookingModal()');
const ensureBookingEnd = appJs.indexOf('const openModal = () =>', ensureBookingStart);

const newEnsureBookingFunction = `function ensureBookingModal() {
    let modal = document.getElementById('bookingModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'bookingModal';
      modal.className = 'booking-modal-overlay';
      modal.setAttribute('aria-hidden', 'true');
      modal.setAttribute('role', 'dialog');
      modal.innerHTML = \`
        <div class="booking-modal-card" style="max-width: 380px !important; width: 90% !important; padding: 1.1rem 1.25rem 1rem !important; border-radius: 16px !important; max-height: 84vh !important; overflow-y: auto !important; box-sizing: border-box !important;">
          <button id="closeBookingModal" class="modal-close-btn" aria-label="Close modal" style="top: 0.75rem !important; right: 0.75rem !important; width: 28px !important; height: 28px !important; font-size: 1.15rem !important;">&times;</button>
          
          <div class="modal-header" style="margin-bottom: 0.45rem !important;">
            <span class="modal-badge" style="margin-bottom: 0.25rem !important; padding: 0.12rem 0.55rem !important; font-size: 0.68rem !important;">🟢 Direct Founder Access</span>
            <h3 class="modal-title" style="font-size: 1.05rem !important; margin-bottom: 0.15rem !important; line-height: 1.2 !important;">Book Founder Session</h3>
            <p class="modal-subtitle" style="font-size: 0.74rem !important; color: #64748B !important; line-height: 1.35 !important; margin: 0 !important;">Speak directly with Sanjeev Kumar Malik (15+ Years). Zero sales layers.</p>
          </div>

          <form class="modal-form" id="founderBookingForm" style="gap: 0.38rem !important;">
            <div class="form-row" style="display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 0.45rem !important;">
              <div class="form-group" style="gap: 0.12rem !important;">
                <label for="modalName" style="font-size: 0.72rem !important; font-weight: 700 !important; color: #334155 !important;">Your Name *</label>
                <input type="text" id="modalName" required placeholder="e.g. Rohit" class="form-input" style="padding: 0.4rem 0.6rem !important; font-size: 0.82rem !important; height: 34px !important; border-radius: 8px !important;">
              </div>
              <div class="form-group" style="gap: 0.12rem !important;">
                <label for="modalPhone" style="font-size: 0.72rem !important; font-weight: 700 !important; color: #334155 !important;">Phone / WhatsApp *</label>
                <input type="tel" id="modalPhone" required placeholder="+91 98765 43210" class="form-input" style="padding: 0.4rem 0.6rem !important; font-size: 0.82rem !important; height: 34px !important; border-radius: 8px !important;">
              </div>
            </div>

            <div class="form-row" style="display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 0.45rem !important;">
              <div class="form-group" style="gap: 0.12rem !important;">
                <label for="modalEmail" style="font-size: 0.72rem !important; font-weight: 700 !important; color: #334155 !important;">Email *</label>
                <input type="email" id="modalEmail" required placeholder="name@company.com" class="form-input" style="padding: 0.4rem 0.6rem !important; font-size: 0.82rem !important; height: 34px !important; border-radius: 8px !important;">
              </div>
              <div class="form-group" style="gap: 0.12rem !important;">
                <label for="modalService" style="font-size: 0.72rem !important; font-weight: 700 !important; color: #334155 !important;">Interest *</label>
                <select id="modalService" required class="form-select" style="padding: 0.4rem 0.6rem !important; font-size: 0.82rem !important; height: 34px !important; border-radius: 8px !important;">
                  <option value="">Select Service</option>
                  <option value="WordPress Development">WordPress Development</option>
                  <option value="E-Commerce Development">E-Commerce Store</option>
                  <option value="Custom Web Applications">Custom Web Applications</option>
                  <option value="Website Redesign & Speed">Website Redesign & Speed</option>
                  <option value="Landing Page CRO">Landing Page CRO</option>
                  <option value="UI/UX Design Services">UI/UX Design Services</option>
                  <option value="Startups & SMEs">Startups & SMEs</option>
                </select>
              </div>
            </div>

            <button type="submit" class="btn-submit-modal" id="modalSubmitBtn" style="padding: 0.55rem 0.85rem !important; height: 38px !important; font-size: 0.84rem !important; font-weight: 800 !important; border-radius: 9px !important; margin-top: 0.2rem !important;">
              <span>Confirm Architecture Session →</span>
            </button>
            <p class="modal-footer-note" style="font-size: 0.65rem !important; color: #64748B !important; text-align: center !important; margin: 0.25rem 0 0 0 !important;">🔒 Direct 1-on-1 review with Sanjeev • Response &lt; 4 hours</p>
          </form>

          <div class="popup-success-banner" id="bookingSuccessBanner" style="display: none;">
            <div style="font-size: 1.75rem; margin-bottom: 0.35rem;">🎉</div>
            <h4 style="font-size: 1.15rem; font-weight: 800; color: #065F46; margin-bottom: 0.25rem;">Session Requested!</h4>
            <p style="font-size: 0.82rem; color: #047857; line-height: 1.4; margin-bottom: 0.75rem;">
              Thank you! Sanjeev Kumar Malik will connect with you directly via WhatsApp/Phone within 4 hours.
            </p>
            <button type="button" class="btn-primary" id="bookingSuccessCloseBtn" style="width: 100%; justify-content: center; padding: 0.6rem 1rem; font-size: 0.85rem;">
              Back to Website
            </button>
          </div>
        </div>\`;
      document.body.appendChild(modal);
    }
    return modal;
  }

  `;

if (ensureBookingStart !== -1 && ensureBookingEnd !== -1) {
  appJs = appJs.slice(0, ensureBookingStart) + newEnsureBookingFunction + appJs.slice(ensureBookingEnd);
  console.log('Updated ensureBookingModal in app.js');
}

// Update init3SecondAutoPopup inside app.js
const autoPopupStart = appJs.indexOf('function init3SecondAutoPopup()');
const autoPopupCardStart = appJs.indexOf('<div class="auto-popup-card"', autoPopupStart);
const autoPopupCardEnd = appJs.indexOf('`;\n\n      document.body.appendChild(popupOverlay);', autoPopupCardStart);

const newAutoPopupCardHtml = `<div class="auto-popup-card" style="max-width: 360px !important; width: 90% !important; padding: 1rem 1.15rem 0.95rem !important; border-radius: 16px !important; max-height: 82vh !important; overflow-y: auto !important; box-sizing: border-box !important;">
          <button type="button" class="popup-close-btn" id="closeAutoPopupBtn" aria-label="Close modal" style="top: 0.75rem !important; right: 0.75rem !important; width: 28px !important; height: 28px !important; font-size: 1.15rem !important;">&times;</button>
          
          <div class="popup-badge" style="margin-bottom: 0.25rem !important; padding: 0.12rem 0.55rem !important; font-size: 0.68rem !important;">
            <span class="radar-dot" style="width: 5px; height: 5px;"></span>
            <span>Direct Founder Access • 15+ Yrs Exp</span>
          </div>
          
          <h3 class="popup-title" style="font-size: 1.05rem !important; margin-bottom: 0.15rem !important; line-height: 1.2 !important;">Plan Your Project With Sanjeev</h3>
          <p class="popup-desc" style="font-size: 0.74rem !important; margin-bottom: 0.5rem !important; line-height: 1.35 !important; color: #64748B !important;">Get upfront roadmap & fixed pricing directly from Sanjeev Kumar Malik — zero sales reps.</p>

          <form class="popup-form" id="autoPopupForm" style="gap: 0.38rem !important;">
            <div class="popup-form-row" style="display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 0.45rem !important;">
              <div class="form-group" style="gap: 0.12rem !important;">
                <label for="popupName" style="font-size: 0.72rem !important; font-weight: 700 !important; color: #334155 !important;">Your Name *</label>
                <input type="text" id="popupName" class="form-input" placeholder="e.g. Rahul" required style="padding: 0.4rem 0.6rem !important; font-size: 0.82rem !important; height: 34px !important; border-radius: 8px !important;">
              </div>
              <div class="form-group" style="gap: 0.12rem !important;">
                <label for="popupContact" style="font-size: 0.72rem !important; font-weight: 700 !important; color: #334155 !important;">Phone / WhatsApp *</label>
                <input type="tel" id="popupContact" class="form-input" placeholder="+91 98765 43210" required style="padding: 0.4rem 0.6rem !important; font-size: 0.82rem !important; height: 34px !important; border-radius: 8px !important;">
              </div>
            </div>

            <div class="form-group" style="gap: 0.12rem !important;">
              <label for="popupProject" style="font-size: 0.72rem !important; font-weight: 700 !important; color: #334155 !important;">Service Needed *</label>
              <select id="popupProject" class="form-select" required style="padding: 0.4rem 0.6rem !important; font-size: 0.82rem !important; height: 34px !important; border-radius: 8px !important;">
                <option value="">Select Project Scope</option>
                <option value="WordPress Custom Build">WordPress Custom Build (No Bloat)</option>
                <option value="E-Commerce Store">E-Commerce Store (Shopify/Woo)</option>
                <option value="Custom Web App">Custom Web App (React/Next/PHP)</option>
                <option value="Website Redesign & Speed">Website Redesign & Speed Optimization</option>
                <option value="High-Converting Landing Page">High-Converting Landing Page</option>
                <option value="UI/UX & Frontend Architecture">UI/UX & Frontend Architecture</option>
                <option value="Startup/SME MVP Architecture">Startup / SME MVP Architecture</option>
              </select>
            </div>

            <button type="submit" class="btn-popup-submit" id="popupSubmitBtn" style="padding: 0.55rem 0.85rem !important; height: 38px !important; font-size: 0.84rem !important; font-weight: 800 !important; border-radius: 9px !important; margin-top: 0.2rem !important;">
              <span>Get Free Discovery Call →</span>
            </button>
            <p class="popup-footer-note" style="font-size: 0.65rem !important; color: #64748B !important; text-align: center !important; margin: 0.25rem 0 0 0 !important;">🔒 100% Confidential • Direct response in &lt; 4 hours</p>
          </form>

          <div class="popup-success-banner" id="popupSuccessBanner">
            <div style="font-size: 1.75rem; margin-bottom: 0.35rem;">🎉</div>
            <h4 style="font-size: 1.15rem; font-weight: 800; color: #065F46; margin-bottom: 0.25rem;">Request Received!</h4>
            <p style="font-size: 0.82rem; color: #047857; line-height: 1.4; margin-bottom: 0.75rem;">
              Sanjeev Kumar Malik will personally inspect your requirements and connect via WhatsApp/Phone within 4 hours.
            </p>
            <button type="button" class="btn-primary" id="popupSuccessCloseBtn" style="width: 100%; justify-content: center; padding: 0.6rem 1rem; font-size: 0.85rem;">
              Continue Browsing
            </button>
          </div>
        </div>`;

if (autoPopupCardStart !== -1 && autoPopupCardEnd !== -1) {
  appJs = appJs.slice(0, autoPopupCardStart) + newAutoPopupCardHtml + appJs.slice(autoPopupCardEnd);
  console.log('Updated init3SecondAutoPopup in app.js');
}

fs.writeFileSync('assets/js/app.js', appJs);

// 3. Scan all HTML files
function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== '.gemini' && file !== 'brain') {
        results = results.concat(getHtmlFiles(full));
      }
    } else if (file.endsWith('.html')) {
      results.push(full);
    }
  });
  return results;
}

const htmlFiles = getHtmlFiles('.');
console.log(`Found ${htmlFiles.length} HTML files.`);

let updatedCount = 0;
htmlFiles.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;

  // 1. Update bookingModal block
  const modalComment = '<!-- Interactive Booking Modal (';
  const mStart = content.indexOf(modalComment);
  if (mStart !== -1) {
    const mEnd = content.indexOf('</div>\n  </div>', mStart);
    if (mEnd !== -1) {
      content = content.slice(0, mStart) + compactBookingModalHtml + content.slice(mEnd + 15);
      changed = true;
    }
  } else {
    // If comment is not there, check for <div id="bookingModal"
    const mDivStart = content.indexOf('<div id="bookingModal"');
    if (mDivStart !== -1) {
      const mEnd = content.indexOf('</div>\n  </div>', mDivStart);
      if (mEnd !== -1) {
        content = content.slice(0, mDivStart) + compactBookingModalHtml + content.slice(mEnd + 15);
        changed = true;
      }
    }
  }

  // 2. Cache-busting update to v=4.0
  if (content.includes('style.css?v=3.6')) {
    content = content.split('style.css?v=3.6').join('style.css?v=4.0');
    changed = true;
  } else if (content.includes('style.css') && !content.includes('style.css?v=')) {
    content = content.replace(/style\.css/g, 'style.css?v=4.0');
    changed = true;
  }

  if (content.includes('app.js?v=3.6')) {
    content = content.split('app.js?v=3.6').join('app.js?v=4.0');
    changed = true;
  } else if (content.includes('app.js') && !content.includes('app.js?v=')) {
    content = content.replace(/app\.js/g, 'app.js?v=4.0');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(f, content);
    updatedCount++;
  }
});

console.log(`Updated ${updatedCount} HTML files with ultra-compact modals and cache-busting v=4.0.`);
