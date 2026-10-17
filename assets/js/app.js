/**
 * SANJEEV KUMAR MALIK — MULTI-PAGE PLATFORM ENGINE
 * Micro-interactions, Count-up, Terminal Clipboard, Filter Tabs, and Modal
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar Elevation on Scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // 2. Active Route Highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mega-item, .mobile-nav-drawer a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      const linkFile = href.split('/').pop();
      if (linkFile === currentPath || (currentPath === '' && linkFile === 'index.html')) {
        link.classList.add('active');
      }
    }
  });

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

  const openModal = () => {
    const activeModal = document.getElementById('bookingModal');
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
    const trigger = e.target.closest('.open-booking-modal, #navBookCta, a[href$="contact-us.html"].btn-primary, a[href="../contact-us.html"].btn-primary, [data-modal="booking"]');
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
});
