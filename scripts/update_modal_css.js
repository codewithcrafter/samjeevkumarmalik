const fs = require('fs');
let css = fs.readFileSync('assets/css/style.css', 'utf8');

// Replacement for Section 11 (Interactive Booking Modal)
const newBookingModalCss = `/* ==========================================================================
   INTERACTIVE BOOKING MODAL (ULTRA-COMPACT ANTIGRAVITY LIGHT THEME)
   ========================================================================== */
.booking-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.22s ease, visibility 0.22s ease;
}

.booking-modal-overlay.open,
.booking-modal-overlay[aria-hidden="false"] {
  opacity: 1;
  visibility: visible;
}

.booking-modal-card {
  background: #FFFFFF !important;
  border: 1px solid rgba(226, 232, 240, 0.95) !important;
  border-radius: 16px !important;
  box-shadow: 0 20px 50px -10px rgba(15, 23, 42, 0.35) !important;
  max-width: 380px !important;
  width: 90% !important;
  max-height: 84vh !important;
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch !important;
  position: relative !important;
  padding: 1.1rem 1.25rem 1rem !important;
  box-sizing: border-box !important;
  transform: scale(0.96) translateY(8px);
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

.booking-modal-overlay.open .booking-modal-card,
.booking-modal-overlay[aria-hidden="false"] .booking-modal-card {
  transform: scale(1) translateY(0);
}

.modal-close-btn {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #F1F5F9;
  border: none;
  font-size: 1.15rem;
  line-height: 1;
  color: #64748B;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;
}

.modal-close-btn:hover {
  background: #E2E8F0;
  color: #0F172A;
  transform: rotate(90deg);
}

.modal-header {
  margin-bottom: 0.45rem;
  text-align: left;
}

.modal-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.68rem;
  font-weight: 700;
  color: #065F46;
  background: #F0FDF4;
  border: 1px solid rgba(16, 185, 129, 0.3);
  padding: 0.12rem 0.55rem;
  border-radius: 9999px;
  margin-bottom: 0.25rem;
}

.modal-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: #0F172A;
  line-height: 1.2;
  margin-bottom: 0.15rem;
}

.modal-subtitle {
  font-size: 0.74rem;
  color: #64748B;
  line-height: 1.35;
  margin: 0;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 0.38rem;
}

.modal-form .form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.45rem;
}

.modal-form .form-group {
  display: flex;
  flex-direction: column;
  gap: 0.12rem;
  text-align: left;
}

.modal-form label {
  font-size: 0.72rem;
  font-weight: 700;
  color: #334155;
}

.modal-form .form-input,
.modal-form .form-select,
.modal-form .form-textarea {
  background: #F8FAFC;
  border: 1.5px solid #CBD5E1;
  border-radius: 8px;
  padding: 0.4rem 0.6rem;
  font-size: 0.82rem;
  color: #0F172A;
  font-family: var(--font-sans);
  width: 100%;
  height: 34px;
  box-sizing: border-box;
  transition: all 0.2s ease;
  outline: none;
}

.modal-form .form-input:focus,
.modal-form .form-select:focus,
.modal-form .form-textarea:focus {
  border-color: #2563EB;
  background: #FFFFFF;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}

.btn-submit-modal {
  width: 100%;
  padding: 0.55rem 0.85rem;
  height: 38px;
  background: linear-gradient(135deg, #1D4ED8 0%, #2563EB 50%, #0EA5E9 100%);
  color: #FFFFFF;
  font-weight: 800;
  font-size: 0.84rem;
  font-family: var(--font-sans);
  border: none;
  border-radius: 9px;
  cursor: pointer;
  box-shadow: 0 6px 18px -3px rgba(37, 99, 235, 0.4);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  margin-top: 0.2rem;
}

.btn-submit-modal:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 22px -3px rgba(37, 99, 235, 0.5);
}

.modal-footer-note {
  font-size: 0.65rem;
  color: #64748B;
  text-align: center;
  margin: 0.25rem 0 0 0;
}`;

// Replacement for Section 13 (Automatic 3-Second Discovery Popup)
const newAutoPopupCss = `/* ==========================================================================
   13. COMPACT DISCOVERY POPUP MODAL (NON-INTRUSIVE & ULTRA-COMPACT)
   ========================================================================== */
.auto-popup-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
}

.auto-popup-overlay.open {
  opacity: 1;
  pointer-events: auto;
}

.auto-popup-card {
  width: 90% !important;
  max-width: 360px !important;
  background: #FFFFFF !important;
  border-radius: 16px !important;
  padding: 1rem 1.15rem 0.95rem !important;
  box-shadow: 0 20px 50px -10px rgba(15, 23, 42, 0.35) !important;
  position: relative !important;
  max-height: 82vh !important;
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch !important;
  box-sizing: border-box !important;
  transform: scale(0.96) translateY(8px);
  opacity: 0;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
}

.auto-popup-overlay.open .auto-popup-card {
  transform: scale(1) translateY(0);
  opacity: 1;
}

.auto-popup-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3.5px;
  background: linear-gradient(90deg, #2563EB, #0EA5E9, #10B981, #6366F1, #2563EB);
  background-size: 300% 100%;
  animation: popupBorderGlow 4s linear infinite;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

@keyframes popupBorderGlow {
  0% { background-position: 0% 0%; }
  100% { background-position: 300% 0%; }
}

.popup-close-btn {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #F1F5F9;
  border: none;
  font-size: 1.15rem;
  color: #64748B;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;
}

.popup-close-btn:hover {
  background: #E2E8F0;
  color: #0F172A;
  transform: rotate(90deg);
}

.popup-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.12rem 0.55rem;
  background: #F0FDF4;
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 9999px;
  font-size: 0.68rem;
  font-weight: 700;
  color: #065F46;
  margin-bottom: 0.25rem;
}

.popup-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: #0F172A;
  line-height: 1.2;
  margin-bottom: 0.15rem;
}

.popup-desc {
  font-size: 0.74rem;
  color: #64748B;
  line-height: 1.35;
  margin-bottom: 0.5rem;
}

.popup-form {
  display: flex;
  flex-direction: column;
  gap: 0.38rem;
}

.popup-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.45rem;
}

.popup-form .form-group {
  display: flex;
  flex-direction: column;
  gap: 0.12rem;
  text-align: left;
}

.popup-form label {
  font-size: 0.72rem;
  font-weight: 700;
  color: #334155;
}

.popup-form .form-input,
.popup-form .form-select,
.popup-form .form-textarea {
  background: #F8FAFC;
  border: 1.5px solid #CBD5E1;
  border-radius: 8px;
  padding: 0.4rem 0.6rem;
  font-size: 0.82rem;
  color: #0F172A;
  font-family: var(--font-sans);
  width: 100%;
  height: 34px;
  box-sizing: border-box;
  transition: all 0.2s ease;
  outline: none;
}

.popup-form .form-input:focus,
.popup-form .form-select:focus,
.popup-form .form-textarea:focus {
  border-color: #2563EB;
  background: #FFFFFF;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}

.btn-popup-submit {
  width: 100%;
  padding: 0.55rem 0.85rem;
  height: 38px;
  background: linear-gradient(135deg, #1D4ED8 0%, #2563EB 50%, #0EA5E9 100%);
  background-size: 200% auto;
  color: #FFFFFF;
  font-weight: 800;
  font-size: 0.84rem;
  font-family: var(--font-sans);
  border: none;
  border-radius: 9px;
  cursor: pointer;
  box-shadow: 0 6px 18px -3px rgba(37, 99, 235, 0.4);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  margin-top: 0.2rem;
}

.btn-popup-submit:hover {
  background-position: right center;
  transform: translateY(-1px);
  box-shadow: 0 10px 22px -3px rgba(37, 99, 235, 0.5);
}

.popup-footer-note {
  font-size: 0.65rem;
  color: #64748B;
  text-align: center;
  margin-top: 0.25rem;
  margin-bottom: 0;
}`;

// 1. Replace Section 11
const s11Header = '/* ==========================================================================\n   INTERACTIVE BOOKING MODAL (COMPACT ANTIGRAVITY LIGHT THEME)';
const s11EndHeader = '/* ==========================================================================\n   11. ABOUT PAGE REDES';

const s11StartIdx = css.indexOf(s11Header);
const s11EndIdx = css.indexOf(s11EndHeader);
console.log('s11StartIdx:', s11StartIdx, 's11EndIdx:', s11EndIdx);
if (s11StartIdx !== -1 && s11EndIdx !== -1) {
  css = css.slice(0, s11StartIdx) + newBookingModalCss + '\n\n' + css.slice(s11EndIdx);
  console.log('Section 11 replaced successfully');
}

// 2. Replace Section 13
const s13Header = '/* ==========================================================================\n   13. COMPACT DISCOVERY POPUP MODAL';
const s14Header = '/* ==========================================================================\n   14. BLOG IMAGES & CARD ENHANCEMENTS';

const s13StartIdx = css.indexOf(s13Header);
const s14StartIdx = css.indexOf(s14Header);
console.log('s13StartIdx:', s13StartIdx, 's14StartIdx:', s14StartIdx);
if (s13StartIdx !== -1 && s14StartIdx !== -1) {
  css = css.slice(0, s13StartIdx) + newAutoPopupCss + '\n\n' + css.slice(s14StartIdx);
  console.log('Section 13 replaced successfully');
}

// 3. Update Section 18 responsive modal styling
const target540 = `@media (max-width: 540px) {
  /* Modals Stack to 1 Column */
  .popup-form-row,
  .modal-form .form-row {
    grid-template-columns: 1fr !important;
    gap: 0.55rem !important;
  }
  .auto-popup-card,
  .booking-modal-card {
    padding: 1.15rem 1rem 1rem !important;
    max-width: 95% !important;
  }`;

const replacement540 = `@media (max-width: 540px) {
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
  }`;

if (css.includes(target540)) {
  css = css.replace(target540, replacement540);
  console.log('Section 18 responsive modal rule updated successfully');
} else {
  console.log('Notice: target540 not matched verbatim, applying regex replacement');
  css = css.replace(/@media \(max-width: 540px\) \{\s*\/\* Modals Stack to 1 Column \*\/\s*\.popup-form-row,\s*\.modal-form \.form-row \{\s*grid-template-columns: 1fr !important;\s*gap: 0\.55rem !important;\s*\}\s*\.auto-popup-card,\s*\.booking-modal-card \{\s*padding: 1\.15rem 1rem 1rem !important;\s*max-width: 95% !important;\s*\}/, replacement540);
}

fs.writeFileSync('assets/css/style.css', css);
console.log('Updated style.css successfully! New length:', css.length);
