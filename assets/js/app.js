/**
 * SANJEEV KUMAR MALIK — MULTI-PAGE PLATFORM ENGINE
 * Micro-interactions, Count-up, Terminal Clipboard, Filter Tabs, and Modal
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar Elevation on Scroll
  const navbar = document.getElementById('navbar');
  const siteHeader = document.getElementById('siteHeader') || document.querySelector('.site-header-full, .header-wrapper');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar?.classList.add('scrolled');
      siteHeader?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
      siteHeader?.classList.remove('scrolled');
    }
  });

  // 2. Active Route Highlighting (Universal Clean URLs)
  const normPath = (p) => {
    if (!p) return '';
    let clean = p.split('?')[0].split('#')[0];
    clean = clean.replace(/\.html$/, '').replace(/\/index$/, '');
    if (clean.endsWith('/') && clean.length > 1) clean = clean.slice(0, -1);
    return clean || '/';
  };

  const currentClean = normPath(window.location.pathname);
  const currentLast = currentClean.split('/').pop() || 'index';
  const navLinks = document.querySelectorAll('.nav-link, .mega-item, .mobile-nav-drawer a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
      const linkClean = normPath(href);
      const linkLast = linkClean.split('/').pop() || 'index';
      if (linkClean === currentClean || (currentClean === '/' && (linkClean === '/' || linkClean === '')) || (linkLast !== '' && linkLast !== 'index' && linkLast === currentLast)) {
        link.classList.add('active');
      }
    }
  });

  // 2a. Address Bar Clean URLs: Strip .html and trailing slashes in real-time
  if (window.location.protocol !== 'file:') {
    let path = window.location.pathname;
    let clean = path.replace(/\.html$/, '').replace(/\/index$/, '');
    if (clean.length > 1 && clean.endsWith('/')) {
      clean = clean.slice(0, -1);
    }
    if (clean !== path) {
      window.history.replaceState(null, '', clean + window.location.search + window.location.hash);
    }
  }

  // 2b. Local file:// Protocol Offline Navigation Helper
  if (window.location.protocol === 'file:') {
    document.addEventListener('click', function(e) {
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.endsWith('.html') || href.endsWith('.css') || href.endsWith('.js') || href.endsWith('.png') || href.endsWith('.jpg') || href.endsWith('.svg') || href.endsWith('.webp')) return;
      
      e.preventDefault();
      const current = window.location.href;
      const isInSubfolder = current.includes('/services/') || current.includes('/blogs/');
      
      if (href === '/' || href === '') {
        window.location.href = isInSubfolder ? '../index.html' : 'index.html';
      } else if (href.startsWith('/')) {
        const clean = href.slice(1);
        window.location.href = isInSubfolder ? '../' + clean + '.html' : clean + '.html';
      } else {
        window.location.href = href + '.html';
      }
    });
  }

  // 2b. Services Mega-Menu Click-Lock & Hover Bridge Controller
  const allNavItems = document.querySelectorAll('.nav-dropdown, .nav-item');
  const dropdownItems = Array.from(allNavItems).filter(item => 
    item.querySelector('.nav-mega-menu, .dropdown-menu, .services-mega-menu')
  );

  dropdownItems.forEach(dropdown => {
    const trigger = dropdown.querySelector('.nav-link');
    const menu = dropdown.querySelector('.nav-mega-menu, .dropdown-menu, .services-mega-menu');
    let closeTimer = null;

    if (!trigger || !menu) return;

    // Smooth hover buffer (graceful hover intent)
    dropdown.addEventListener('mouseenter', () => {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
      dropdown.classList.add('is-open');
    });

    dropdown.addEventListener('mouseleave', () => {
      // If not click-locked open, close gracefully after 350ms buffer
      if (!dropdown.classList.contains('is-locked')) {
        closeTimer = setTimeout(() => {
          dropdown.classList.remove('is-open');
        }, 350);
      }
    });

    // Click-Lock Architecture (Clicking Services toggles persistent lock open on desktop)
    trigger.addEventListener('click', (e) => {
      if (window.innerWidth > 992) {
        const isLocked = dropdown.classList.contains('is-locked');
        if (!isLocked) {
          e.preventDefault();
          dropdown.classList.add('is-open', 'is-locked');
          trigger.setAttribute('aria-expanded', 'true');
        } else {
          dropdown.classList.remove('is-open', 'is-locked');
          trigger.setAttribute('aria-expanded', 'false');
        }
      }
    });

    // Close when clicking any menu destination item
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        dropdown.classList.remove('is-open', 'is-locked');
        trigger.setAttribute('aria-expanded', 'false');
      });
    });
  });

  // Global click outside dismisses click-locked menu
  document.addEventListener('click', (e) => {
    dropdownItems.forEach(dropdown => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('is-open', 'is-locked');
        const trigger = dropdown.querySelector('.nav-link');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Global ESC key dismisses menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdownItems.forEach(dropdown => {
        dropdown.classList.remove('is-open', 'is-locked');
        const trigger = dropdown.querySelector('.nav-link');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // 3. Mobile Nav Drawer Toggle
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', (e) => {
      if (!mobileDrawer.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });

    const mobileLinks = mobileDrawer.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 4. Count-up Animation for Metrics
  const metricNumbers = document.querySelectorAll('.stat-number, .about-stat-number');
  let counted = false;

  const countUp = (element, target, duration = 1800, isFloat = false) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      if (isFloat) {
        element.textContent = (easeProgress * target).toFixed(1);
      } else {
        element.textContent = Math.floor(easeProgress * target).toLocaleString();
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = isFloat ? target.toFixed(1) : target.toLocaleString();
      }
    };
    window.requestAnimationFrame(step);
  };

  const statsSection = document.getElementById('homeStatsStrip') || document.getElementById('founderProfile');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
          counted = true;
          metricNumbers.forEach(el => {
            const targetAttr = el.getAttribute('data-target');
            if (targetAttr) {
              const target = parseFloat(targetAttr);
              const isFloat = targetAttr.includes('.');
              countUp(el, target, 1600, isFloat);
            }
          });
        }
      });
    }, { threshold: 0.2 });

    observer.observe(statsSection);
  }

  // 5. Live Developer Terminal Copy Code
  const copyBtn = document.getElementById('copyManifestoBtn');
  const codeBlock = document.getElementById('manifestoCode');

  if (copyBtn && codeBlock) {
    copyBtn.addEventListener('click', async () => {
      const codeText = codeBlock.innerText;
      try {
        await navigator.clipboard.writeText(codeText);
        const originalHtml = copyBtn.innerHTML;
        copyBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Copied! ✓</span>
        `;
        copyBtn.classList.add('copied');
        showToast('TypeScript config copied to clipboard!');

        setTimeout(() => {
          copyBtn.innerHTML = originalHtml;
          copyBtn.classList.remove('copied');
        }, 2500);
      } catch (err) {
        const textArea = document.createElement('textarea');
        textArea.value = codeText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('TypeScript config copied to clipboard!');
      }
    });
  }

  // 6. Blog Category Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const blogCards = document.querySelectorAll('.blog-card');

  if (filterBtns.length > 0 && blogCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-category');
        blogCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (category === 'all' || cardCat === category) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 7. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.faq-question-btn');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        item.classList.toggle('active', !isActive);
        btn.setAttribute('aria-expanded', !isActive);
      });
    }
  });

  // 8. Interactive Booking Modal (Antigravity Light System)
  const modal = document.getElementById('bookingModal');
  const closeModalBtn = document.getElementById('closeBookingModal');
  const bookingForm = document.getElementById('founderBookingForm') || document.getElementById('bookingForm');
  const successBanner = document.getElementById('bookingSuccessBanner');

  function ensureBookingModal() {
    let modal = document.getElementById('bookingModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'bookingModal';
      modal.className = 'booking-modal-overlay';
      modal.setAttribute('aria-hidden', 'true');
      modal.setAttribute('role', 'dialog');
      modal.innerHTML = `
        <div class="booking-modal-card">
          <button id="closeBookingModal" class="modal-close-btn" aria-label="Close modal">&times;</button>
          
          <div class="modal-header">
            <span class="modal-badge">🟢 Direct Founder Access</span>
            <h3 class="modal-title">Book Direct Founder Session</h3>
            <p class="modal-subtitle">Speak directly with Sanjeev Kumar Malik — Senior Full-Stack Architect (15+ Years). Zero sales layers.</p>
          </div>

          <form class="modal-form" id="founderBookingForm">
            <div class="form-row">
              <div class="form-group">
                <label for="modalName">Your Name *</label>
                <input type="text" id="modalName" required placeholder="e.g. Rohit Malhotra" class="form-input">
              </div>
              <div class="form-group">
                <label for="modalPhone">Phone / WhatsApp *</label>
                <input type="tel" id="modalPhone" required placeholder="+91 98765 43210" class="form-input">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="modalEmail">Email Address *</label>
                <input type="email" id="modalEmail" required placeholder="rohit@company.com" class="form-input">
              </div>
              <div class="form-group">
                <label for="modalService">Project Interest *</label>
                <select id="modalService" required class="form-select">
                  <option value="">Select Service Area</option>
                  <option value="WordPress Development">WordPress Development</option>
                  <option value="E-Commerce Development">E-Commerce Development</option>
                  <option value="Custom Web Applications">Custom Web Applications</option>
                  <option value="Website Redesign & Speed">Website Redesign & Speed</option>
                  <option value="High-Converting Landing Page">High-Converting Landing Page</option>
                  <option value="UI/UX & Frontend Architecture">UI/UX & Frontend Architecture</option>
                  <option value="Startups & SMEs Architecture">Startups & SMEs Architecture</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="modalNotes">Project Scope or Goal (Optional)</label>
              <input type="text" id="modalNotes" placeholder="e.g. Target launch date or main requirement" class="form-input">
            </div>

            <button type="submit" class="btn-submit-modal" id="modalSubmitBtn">
              <span>Confirm Architecture Session →</span>
            </button>
            <p class="modal-footer-note">🔒 Direct 1-on-1 review with Sanjeev • Response in &lt; 4 hours</p>
          </form>

          <div class="popup-success-banner" id="bookingSuccessBanner" style="display: none;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎉</div>
            <h4 style="font-size: 1.25rem; font-weight: 800; color: #065F46; margin-bottom: 0.35rem;">Session Requested!</h4>
            <p style="font-size: 0.9rem; color: #047857; line-height: 1.5; margin-bottom: 1rem;">
              Thank you! Sanjeev Kumar Malik has received your request and will connect with you directly on Phone/WhatsApp within 4 hours.
            </p>
            <button type="button" class="btn-primary" id="bookingSuccessCloseBtn" style="width: 100%; justify-content: center;">
              Back to Website
            </button>
          </div>
        </div>`;
      document.body.appendChild(modal);
    }
    return modal;
  }

  const openModal = () => {
    const activeModal = ensureBookingModal();
    if (activeModal) {
      activeModal.classList.add('open');
      activeModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        const firstInput = activeModal.querySelector('input:not([type="hidden"])');
        if (firstInput) firstInput.focus();
      }, 120);
    }
  };

  const closeModal = () => {
    const activeModal = document.getElementById('bookingModal');
    if (activeModal) {
      activeModal.classList.remove('open');
      activeModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (bookingForm) {
        bookingForm.reset();
        bookingForm.style.display = 'flex';
      }
      if (successBanner) {
        successBanner.style.display = 'none';
        successBanner.classList.remove('visible');
      }
    }
  };

  // Delegated Click Handler for all Modal Open Triggers
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.open-booking-modal, #navBookCta, a[href*="contact-us"].btn-primary, [data-modal="booking"]');
    if (trigger) {
      // Don't intercept if submitting the contact-us main page form
      if (trigger.getAttribute('type') === 'submit') return;
      e.preventDefault();
      openModal();
    }
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  }

  // Close when clicking modal backdrop or close button
  document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'bookingModal') {
      closeModal();
    }
    if (e.target && e.target.closest('#closeBookingModal, .modal-close-btn')) {
      e.preventDefault();
      closeModal();
    }
  });

  // Global ESC key listener to dismiss modal
  document.addEventListener('keydown', (e) => {
    const activeModal = document.getElementById('bookingModal');
    if (e.key === 'Escape' && activeModal && activeModal.classList.contains('open')) {
      closeModal();
    }
  });

  // Modal Form Submission Handler
  const activeForm = document.getElementById('founderBookingForm') || document.getElementById('bookingForm');
  if (activeForm) {
    activeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = activeForm.querySelector('.btn-submit-modal, .form-submit-btn, button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Confirm Architecture Session →';
      if (submitBtn) {
        submitBtn.innerHTML = '<span>⚡ Securing Founder Session...</span>';
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }
        activeForm.style.display = 'none';
        const banner = document.getElementById('bookingSuccessBanner');
        if (banner) {
          banner.style.display = 'block';
          banner.classList.add('visible');
        }
        showToast('✓ Founder session requested! Response in < 4 hours.');
      }, 650);
    });
  }

  // 9. Interactive Micro-Tilt
  const tiltCards = document.querySelectorAll('.hero-profile-card, .service-card, .comparison-sanjeev, .about-founder-card, .channel-card');
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // 10. Toast Helper
  function showToast(message) {
    let toast = document.getElementById('appToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'appToast';
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;

    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // 11. Interactive eCommerce Mockup Demo Action
  const ecomCartBtn = document.getElementById('ecomDemoCartBtn');
  if (ecomCartBtn) {
    ecomCartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const origHtml = ecomCartBtn.innerHTML;
      ecomCartBtn.innerHTML = '<span>⚡ Processing UPI Intent...</span>';
      ecomCartBtn.style.background = '#059669';

      setTimeout(() => {
        ecomCartBtn.innerHTML = '<span>✓ Order Verified • Delivery in 24h</span>';
        showToast('Instant UPI checkout intent simulation completed successfully!');
        setTimeout(() => {
          ecomCartBtn.innerHTML = origHtml;
          ecomCartBtn.style.background = '';
        }, 2200);
      }, 700);
    });
  }

  // 12. Floating Action Buttons (WhatsApp & Call at Bottom-Right)
  function initFloatingActions() {
    if (document.getElementById('floatingContactWidget')) return;

    const widget = document.createElement('div');
    widget.id = 'floatingContactWidget';
    widget.className = 'floating-contact-widget';
    widget.setAttribute('aria-label', 'Quick Contact Actions');

    widget.innerHTML = `
      <a href="tel:+919718604362" 
         class="floating-action-btn fab-call" 
         aria-label="Call Sanjeev Kumar Malik Directly">
        <span class="fab-tooltip">Call +91 97186 04362</span>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        <span class="fab-btn-label">Call Now</span>
      </a>

      <a href="https://wa.me/919718604362?text=Hello%20Sanjeev,%20I%20would%20like%20to%20discuss%20a%20website%20project." 
         target="_blank" 
         rel="noopener noreferrer" 
         class="floating-action-btn fab-whatsapp" 
         aria-label="Chat on WhatsApp with Sanjeev Kumar Malik">
        <span class="fab-tooltip">Chat on WhatsApp</span>
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
        <span class="fab-btn-label">WhatsApp</span>
      </a>
    `;

    document.body.appendChild(widget);
  }
  initFloatingActions();

  // 13. Dramatic 3-Second Automatic Popup Modal
  function init3SecondAutoPopup() {
    let popupOverlay = document.getElementById('autoPopupModal');
    
    if (!popupOverlay) {
      popupOverlay = document.createElement('div');
      popupOverlay.id = 'autoPopupModal';
      popupOverlay.className = 'auto-popup-overlay';
      popupOverlay.setAttribute('aria-hidden', 'true');
      popupOverlay.setAttribute('role', 'dialog');

      popupOverlay.innerHTML = `
        <div class="auto-popup-card">
          <button type="button" class="popup-close-btn" id="closeAutoPopupBtn" aria-label="Close modal">&times;</button>
          
          <div class="popup-badge">
            <span class="radar-dot" style="width: 6px; height: 6px;"></span>
            <span>Direct Founder Access • 15+ Yrs Exp</span>
          </div>
          
          <h3 class="popup-title">Plan Your Project With Sanjeev</h3>
          <p class="popup-desc">Get upfront technical roadmap & milestone pricing directly from Sanjeev Kumar Malik — zero sales layers.</p>

          <form class="popup-form" id="autoPopupForm">
            <div class="popup-form-row">
              <div class="form-group">
                <label for="popupName">Your Name *</label>
                <input type="text" id="popupName" class="form-input" placeholder="e.g. Rahul Sharma" required>
              </div>
              <div class="form-group">
                <label for="popupContact">Phone / WhatsApp *</label>
                <input type="tel" id="popupContact" class="form-input" placeholder="+91 98765 43210" required>
              </div>
            </div>

            <div class="popup-form-row">
              <div class="form-group">
                <label for="popupEmail">Email Address *</label>
                <input type="email" id="popupEmail" class="form-input" placeholder="name@company.com" required>
              </div>
              <div class="form-group">
                <label for="popupProject">Project Type *</label>
                <select id="popupProject" class="form-select" required>
                  <option value="">Select Project Scope</option>
                  <option value="WordPress Custom Build">WordPress Custom Build</option>
                  <option value="E-Commerce Store">E-Commerce Store (Shopify/Woo)</option>
                  <option value="Custom Web App">Custom Web App (React/Next/PHP)</option>
                  <option value="Website Redesign & Speed">Website Redesign & Speed Optimization</option>
                  <option value="High-Converting Landing Page">High-Converting Landing Page</option>
                  <option value="UI/UX & Frontend Architecture">UI/UX & Frontend Architecture</option>
                  <option value="Startup/SME MVP Architecture">Startup / SME MVP Architecture</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="popupMessage">Brief Goal or Requirement (Optional)</label>
              <input type="text" id="popupMessage" class="form-input" placeholder="e.g. 20-page corporate build, sub-second speed">
            </div>

            <button type="submit" class="btn-popup-submit" id="popupSubmitBtn">
              <span>Get Free Architecture Discovery →</span>
            </button>
            <p class="popup-footer-note">🔒 100% Confidential • Direct response in &lt; 4 hours</p>
          </form>

          <div class="popup-success-banner" id="popupSuccessBanner">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎉</div>
            <h4 style="font-size: 1.25rem; font-weight: 800; color: #065F46; margin-bottom: 0.35rem;">Request Received!</h4>
            <p style="font-size: 0.9rem; color: #047857; line-height: 1.5; margin-bottom: 1rem;">
              Thank you! Sanjeev Kumar Malik will personally inspect your requirements and connect with you on WhatsApp/Phone within 4 hours.
            </p>
            <button type="button" class="btn-primary" id="popupSuccessCloseBtn" style="width: 100%; justify-content: center;">
              Continue Browsing
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(popupOverlay);
    }

    const openPopup = () => {
      popupOverlay.classList.add('open');
      popupOverlay.setAttribute('aria-hidden', 'false');
      const firstInput = popupOverlay.querySelector('#popupName');
      if (firstInput) setTimeout(() => firstInput.focus(), 300);
    };

    const closePopup = () => {
      popupOverlay.classList.remove('open');
      popupOverlay.setAttribute('aria-hidden', 'true');
    };

    // Close Button
    const closeBtn = document.getElementById('closeAutoPopupBtn');
    if (closeBtn) closeBtn.addEventListener('click', closePopup);

    const successCloseBtn = document.getElementById('popupSuccessCloseBtn');
    if (successCloseBtn) successCloseBtn.addEventListener('click', closePopup);

    // Backdrop Click
    popupOverlay.addEventListener('click', (e) => {
      if (e.target === popupOverlay) closePopup();
    });

    // ESC Key Listener
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && popupOverlay.classList.contains('open')) {
        closePopup();
      }
    });

    // Form Submit Handler
    const form = document.getElementById('autoPopupForm');
    const successBanner = document.getElementById('popupSuccessBanner');
    const submitBtn = document.getElementById('popupSubmitBtn');

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span>⚡ Securing Architecture Session...</span>';
        }

        setTimeout(() => {
          form.style.display = 'none';
          if (successBanner) successBanner.classList.add('visible');
          showToast('Consultation request sent successfully to Sanjeev!');
        }, 600);
      });
    }

    // Trigger precisely 3 seconds after page load or refresh
    setTimeout(openPopup, 3000);
  }
  init3SecondAutoPopup();

  // 14. Service Hero Forms Submission Handler
  function initServiceHeroForms() {
    const serviceForms = document.querySelectorAll('.service-form');
    serviceForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('.btn-service-submit, button[type="submit"]');
        const origText = submitBtn ? submitBtn.innerHTML : 'Submit';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span>⚡ Submitting to Sanjeev...</span>';
        }

        setTimeout(() => {
          const successDiv = form.parentElement.querySelector('.service-form-success');
          if (successDiv) {
            form.style.display = 'none';
            successDiv.style.display = 'block';
          }
          showToast('Project requirements received! Sanjeev will contact you within 4 hours.');
        }, 600);
      });
    });
  }
  initServiceHeroForms();

  // 15. Article Table of Contents (TOC) Scroll-Spy & Active Link Sync
  function initTocScrollSpy() {
    const tocLinks = document.querySelectorAll('.toc-link');
    if (tocLinks.length === 0) return;

    const headingIds = Array.from(tocLinks).map(link => {
      const href = link.getAttribute('href');
      return href && href.startsWith('#') ? href.substring(1) : null;
    }).filter(Boolean);

    const headings = headingIds.map(id => document.getElementById(id)).filter(Boolean);

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 140;
      let currentId = '';

      headings.forEach(heading => {
        if (heading.offsetTop <= scrollPos) {
          currentId = heading.id;
        }
      });

      tocLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }, { passive: true });
  }
  initTocScrollSpy();
});

