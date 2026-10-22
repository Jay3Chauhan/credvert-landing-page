/**
 * Credvert — Premium Interactions Engine
 * Scroll reveals, parallax, 3D tilt, magnetic buttons,
 * holographic card effect, stagger animations
 */

(function () {
  'use strict';

  // ─── Intersection Observer: Scroll Reveal ─────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  function initReveal() {
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }

  // ─── Parallax on Scroll ──────────────────────────────────────────────
  const parallaxItems = [];

  function initParallax() {
    document.querySelectorAll('[data-parallax]').forEach(el => {
      parallaxItems.push({
        el,
        speed: parseFloat(el.getAttribute('data-parallax')) || 0.3,
        startY: 0
      });
    });
  }

  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    parallaxItems.forEach(({ el, speed }) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.transform = `translateY(${center * speed}px)`;
      }
    });
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  // ─── 3D Credit Card Tilt Physics ─────────────────────────────────────
  function init3DCard() {
    const wrapper = document.getElementById('heroCardWrapper');
    const sheen   = document.getElementById('cardSheen');
    if (!wrapper) return;

    let targetRX = 0, targetRY = 0;
    let currentRX = 0, currentRY = 0;
    let isHovering = false;
    let animFrame;
    let isFlipped = false;

    function lerp(a, b, t) { return a + (b - a) * t; }

    function animateCard() {
      if (!isHovering) {
        currentRX = lerp(currentRX, 0, 0.08);
        currentRY = lerp(currentRY, 0, 0.08);
      } else {
        currentRX = lerp(currentRX, targetRX, 0.12);
        currentRY = lerp(currentRY, targetRY, 0.12);
      }

      if (!isFlipped && !wrapper.classList.contains('flipped')) {
        wrapper.style.transform = `perspective(1200px) rotateX(${currentRX}deg) rotateY(${currentRY}deg)`;
      }

      // Update sheen position
      if (sheen && isHovering) {
        const normX = (currentRY / 16) * 100;
        const normY = (currentRX / 14) * 100;
        sheen.style.backgroundPosition = `${normX + 50}% ${normY + 50}%`;
        sheen.style.opacity = '1';
      } else if (sheen) {
        sheen.style.opacity = '0';
      }

      const diff = Math.abs(currentRX - targetRX) + Math.abs(currentRY - targetRY);
      if (diff > 0.01 || isHovering) {
        animFrame = requestAnimationFrame(animateCard);
      }
    }

    wrapper.addEventListener('mouseenter', () => {
      isHovering = true;
      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(animateCard);
    });

    wrapper.addEventListener('mousemove', (e) => {
      if (wrapper.classList.contains('flipped')) return;
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width  / 2;
      const cy = rect.height / 2;

      // Max tilt angles
      targetRX = -((y - cy) / cy) * 14;
      targetRY =  ((x - cx) / cx) * 16;
    });

    wrapper.addEventListener('mouseleave', () => {
      isHovering = false;
      targetRX = 0;
      targetRY = 0;
      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(animateCard);
    });

    // Touch support
    wrapper.addEventListener('touchmove', (e) => {
      if (wrapper.classList.contains('flipped') || e.touches.length !== 1) return;
      const touch = e.touches[0];
      const rect = wrapper.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      const cx = rect.width  / 2;
      const cy = rect.height / 2;
      targetRX = -((y - cy) / cy) * 10;
      targetRY =  ((x - cx) / cx) * 12;
      if (!isHovering) {
        isHovering = true;
        animFrame = requestAnimationFrame(animateCard);
      }
    }, { passive: true });

    wrapper.addEventListener('touchend', () => {
      isHovering = false;
      targetRX = 0;
      targetRY = 0;
      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(animateCard);
    });
  }

  // ─── Card Flip with momentum ──────────────────────────────────────────
  function initCardFlip() {
    const wrapper = document.getElementById('heroCardWrapper');
    const flipBtn = document.getElementById('flipCardBtn');
    if (!wrapper || !flipBtn) return;

    let flipped = false;

    function toggleFlip() {
      flipped = !flipped;
      if (flipped) {
        wrapper.style.transform = 'perspective(1200px) rotateY(180deg)';
        wrapper.classList.add('flipped');
        flipBtn.textContent = 'View Front';
      } else {
        wrapper.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
        wrapper.classList.remove('flipped');
        flipBtn.textContent = 'Flip to Back';
      }
    }

    flipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFlip();
    });

    wrapper.addEventListener('click', (e) => {
      if (!e.target.closest('button')) toggleFlip();
    });

    window._cardFlipState = { get: () => flipped };
  }

  // ─── Magnetic Button Effect ───────────────────────────────────────────
  function initMagneticButtons() {
    document.querySelectorAll('.btn-primary, .btn-lg').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width  / 2;
        const y = e.clientY - rect.top  - rect.height / 2;
        const maxMove = 8;
        btn.style.transform = `translateY(${Math.max(-maxMove, Math.min(maxMove, y * 0.35))}px) translateX(${Math.max(-maxMove, Math.min(maxMove, x * 0.35))}px) scale(1.02)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ─── Gradient Range Slider Fill ───────────────────────────────────────
  function updateSliderFill(slider) {
    const min = parseFloat(slider.min) || 0;
    const max = parseFloat(slider.max) || 100;
    const val = parseFloat(slider.value) || 0;
    const pct = ((val - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, var(--gold) 0%, var(--gold) ${pct}%, var(--bg-3) ${pct}%, var(--bg-3) 100%)`;
  }

  function initSliders() {
    document.querySelectorAll('input[type="range"]').forEach(slider => {
      updateSliderFill(slider);
      slider.addEventListener('input', () => updateSliderFill(slider));
    });
  }

  // ─── Staggered Grid Animations ────────────────────────────────────────
  function initStaggeredChildren() {
    document.querySelectorAll('[data-stagger]').forEach(container => {
      const children = Array.from(container.children);
      const delay = parseFloat(container.getAttribute('data-stagger-delay') || 0.1);
      children.forEach((child, i) => {
        child.classList.add('reveal');
        child.style.transitionDelay = `${i * delay}s`;
        revealObserver.observe(child);
      });
    });
  }

  // ─── Number Counter Animation ─────────────────────────────────────────
  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-target') || el.textContent.replace(/[^0-9.]/g, ''));
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      // Ease out exponential
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = target * eased;
      el.textContent = prefix + (Number.isInteger(target)
        ? Math.floor(current).toLocaleString('en-IN')
        : current.toFixed(1)
      ) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  function initCounters() {
    document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));
  }

  // ─── Active Nav Highlight on Scroll ──────────────────────────────────
  function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { threshold: 0.35 });

    sections.forEach(s => sectionObserver.observe(s));
  }

  // ─── Holographic card position on mouse ──────────────────────────────
  function initCatalogCardHover() {
    document.querySelectorAll('.catalog-card-item').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width)  * 100;
        const y = ((e.clientY - rect.top)  / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
      });
    });
  }

  // ─── Smooth Scroll for nav links ─────────────────────────────────────
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        const headerH = document.querySelector('.site-header')?.offsetHeight || 80;
        const targetY = target.getBoundingClientRect().top + window.scrollY - headerH - 20;
        window.scrollTo({ top: targetY, behavior: 'smooth' });

        // Close mobile menu if open
        const menu = document.querySelector('.nav-menu');
        if (menu) menu.classList.remove('mobile-open');
      });
    });
  }

  // ─── Mobile Menu Toggle ───────────────────────────────────────────────
  function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const menu   = document.querySelector('.nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      menu.classList.toggle('mobile-open');
      toggle.textContent = menu.classList.contains('mobile-open') ? '✕' : '☰';
    });
  }

  // ─── Floating orb interactive shift ──────────────────────────────────
  function initOrbInteraction() {
    let mouseX = 0, mouseY = 0;
    const orbGold     = document.querySelector('.orb-gold');
    const orbSapphire = document.querySelector('.orb-sapphire');

    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    let orbTick = false;
    function updateOrbs() {
      if (orbGold)     orbGold.style.transform     = `translate(${mouseX * -25}px, ${mouseY * -20}px) scale(1)`;
      if (orbSapphire) orbSapphire.style.transform = `translate(${mouseX * 20}px, ${mouseY * 25}px) scale(1)`;
      orbTick = false;
    }

    document.addEventListener('mousemove', () => {
      if (!orbTick) {
        requestAnimationFrame(updateOrbs);
        orbTick = true;
      }
    }, { passive: true });
  }

  // ─── Custom FAQ Accordion ─────────────────────────────────────────────
  function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
      const question = item.querySelector('.faq-question');
      if (!question) return;
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });
    // Open first by default
    const first = document.querySelector('.faq-item');
    if (first) first.classList.add('open');
  }

  // ─── Toast Notification System ────────────────────────────────────────
  window.showToast = function (msg, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const icons = {
      success: `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`,
      info:    `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
      copy:    `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`
    };

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">${icons[type] || icons.success}</span><span>${msg}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 320);
    }, 3000);
  };

  // ─── Header scroll effect ─────────────────────────────────────────────
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // ─── Theme toggle ─────────────────────────────────────────────────────
  function initTheme() {
    const btn = document.getElementById('themeToggleBtn');
    const saved = localStorage.getItem('cv_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    if (btn) updateThemeBtn(saved, btn);

    btn?.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('cv_theme', next);
      updateThemeBtn(next, btn);
      showToast(`${next === 'dark' ? '🌙 Dark' : '☀️ Light'} mode activated`);
    });
  }

  function updateThemeBtn(theme, btn) {
    btn.innerHTML = theme === 'dark'
      ? `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
      : `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }

  // ─── INIT ─────────────────────────────────────────────────────────────
  function init() {
    initTheme();
    initHeaderScroll();
    initReveal();
    initParallax();
    init3DCard();
    initCardFlip();
    initSliders();
    initStaggeredChildren();
    initCounters();
    initActiveNav();
    initSmoothScroll();
    initMobileMenu();
    initOrbInteraction();
    initFAQ();
    // Slight delay for magnetic buttons so DOM is fully painted
    setTimeout(initMagneticButtons, 200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
