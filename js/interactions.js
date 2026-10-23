/**
 * Credvert — Premium Interactions Engine
 * Implements Apple Design (fluid interruptible springs, 1:1 direct manipulation,
 * optical typography, multimodal sound & haptic feedback) + Interaction Design
 * (microinteractions, state transitions, zero-jank accordions, toast notifications).
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────────────────────
   *  1. MULTIMODAL SOUND SYNTHESIZER (Apple Design §13)
   * ───────────────────────────────────────────────────────────────────────── */
  const SoundFX = (function () {
    let ctx = null;
    let enabled = localStorage.getItem('cv_sound') === 'on';

    function getAudioContext() {
      if (!ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        ctx = new AudioCtx();
      }
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      return ctx;
    }

    // Gentle tactile click for buttons, tabs, category chips (1.8ms duration)
    function playClick() {
      if (!enabled) return;
      try {
        const c = getAudioContext();
        if (!c) return;
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1400, c.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, c.currentTime + 0.018);

        gain.gain.setValueAtTime(0.04, c.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.018);

        osc.connect(gain);
        gain.connect(c.destination);
        osc.start();
        osc.stop(c.currentTime + 0.02);
      } catch (e) {}
    }

    // High confirmation chime for biometric reveal, coupon copy, success
    function playChime() {
      if (!enabled) return;
      try {
        const c = getAudioContext();
        if (!c) return;
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, c.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1320, c.currentTime + 0.12);

        gain.gain.setValueAtTime(0.07, c.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.14);

        osc.connect(gain);
        gain.connect(c.destination);
        osc.start();
        osc.stop(c.currentTime + 0.15);
      } catch (e) {}
    }

    // Airy filtered swoosh for card flip
    function playFlip() {
      if (!enabled) return;
      try {
        const c = getAudioContext();
        if (!c) return;
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, c.currentTime);
        osc.frequency.exponentialRampToValueAtTime(160, c.currentTime + 0.15);

        gain.gain.setValueAtTime(0.05, c.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.15);

        osc.connect(gain);
        gain.connect(c.destination);
        osc.start();
        osc.stop(c.currentTime + 0.16);
      } catch (e) {}
    }

    // Digital scanner pulse for SMS on-device parser
    function playScan() {
      if (!enabled) return;
      try {
        const c = getAudioContext();
        if (!c) return;
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, c.currentTime);
        osc.frequency.setValueAtTime(659.25, c.currentTime + 0.04);
        osc.frequency.setValueAtTime(783.99, c.currentTime + 0.08);

        gain.gain.setValueAtTime(0.05, c.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.14);

        osc.connect(gain);
        gain.connect(c.destination);
        osc.start();
        osc.stop(c.currentTime + 0.15);
      } catch (e) {}
    }

    return {
      playClick,
      playChime,
      playFlip,
      playScan,
      isEnabled: () => enabled,
      toggle: () => {
        enabled = !enabled;
        localStorage.setItem('cv_sound', enabled ? 'on' : 'off');
        if (enabled) {
          getAudioContext();
          playClick();
        }
        return enabled;
      }
    };
  })();

  window.cvSound = SoundFX;

  /* ─────────────────────────────────────────────────────────────────────────
   *  2. SOUND TOGGLE BUTTON
   * ───────────────────────────────────────────────────────────────────────── */
  function initSoundToggle() {
    const btn = document.getElementById('soundToggleBtn');
    if (!btn) return;

    function renderState() {
      const on = SoundFX.isEnabled();
      btn.classList.toggle('sound-on', on);
      btn.title = on ? 'Sound feedback (Enabled)' : 'Sound feedback (Muted)';
      btn.innerHTML = on
        ? `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`
        : `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;
    }

    renderState();

    btn.addEventListener('click', () => {
      const isNowOn = SoundFX.toggle();
      renderState();
      window.showToast && window.showToast(isNowOn ? '🔊 Sound effects enabled' : '🔇 Sound effects muted', 'info');
    });
  }

  /* ─────────────────────────────────────────────────────────────────────────
   *  3. INTERRUPTIBLE 3D CARD SPRING PHYSICS (Apple Design §2-§6)
   * ───────────────────────────────────────────────────────────────────────── */
  function init3DCard() {
    const wrapper = document.getElementById('heroCardWrapper');
    const sheen   = document.getElementById('cardSheen');
    if (!wrapper) return;

    // Physical Spring Parameters (Apple Designing Fluid Interfaces)
    // Response = 0.35s, Critically Damped ratio ≈ 1.0
    const stiffness = 160;
    const damping   = 18;
    const mass      = 1.0;

    let currentRX = 0, currentRY = 0;
    let targetRX  = 0, targetRY  = 0;
    let velRX     = 0, velRY     = 0;

    let isTracking = false;
    let animId     = null;
    let lastTime   = performance.now();

    // History buffer for velocity handoff (§5)
    const history = [];

    // Momentum projection exponential decay (§6)
    function project(v, decel = 0.998) {
      return (v / 1000) * decel / (1 - decel);
    }

    function stepSpring(now) {
      const dt = Math.min((now - lastTime) / 1000, 0.033);
      lastTime = now;

      if (!isTracking) {
        // Spring physics: F = -k*(x - target) - c*v
        const forceX = -stiffness * (currentRX - targetRX) - damping * velRX;
        const accelX = forceX / mass;
        velRX += accelX * dt;
        currentRX += velRX * dt;

        const forceY = -stiffness * (currentRY - targetRY) - damping * velRY;
        const accelY = forceY / mass;
        velRY += accelY * dt;
        currentRY += velRY * dt;
      } else {
        // Direct 1:1 manipulation with responsive follow
        const followSpeed = 18;
        currentRX += (targetRX - currentRX) * Math.min(1, followSpeed * dt);
        currentRY += (targetRY - currentRY) * Math.min(1, followSpeed * dt);
      }

      // Apply 3D perspective transform if not flipped
      if (!wrapper.classList.contains('flipped')) {
        wrapper.style.transform = `perspective(1200px) rotateX(${currentRX.toFixed(3)}deg) rotateY(${currentRY.toFixed(3)}deg)`;
      }

      // Dynamic Holographic Foil Specular Sheen (Reacts to Roll and Pitch)
      if (sheen) {
        const sheenX = Math.max(0, Math.min(100, 50 + (currentRY / 16) * 45));
        const sheenY = Math.max(0, Math.min(100, 50 - (currentRX / 14) * 45));
        sheen.style.setProperty('--sheen-x', `${sheenX.toFixed(1)}%`);
        sheen.style.setProperty('--sheen-y', `${sheenY.toFixed(1)}%`);

        const tiltMagnitude = Math.sqrt(currentRX * currentRX + currentRY * currentRY);
        sheen.style.opacity = isTracking || tiltMagnitude > 0.8 ? '1' : '0';
      }

      // Continue animating until settled
      const rest = Math.abs(currentRX - targetRX) < 0.01 &&
                   Math.abs(currentRY - targetRY) < 0.01 &&
                   Math.abs(velRX) < 0.05 &&
                   Math.abs(velRY) < 0.05;

      if (!rest || isTracking) {
        animId = requestAnimationFrame(stepSpring);
      } else {
        currentRX = targetRX;
        currentRY = targetRY;
        velRX = 0;
        velRY = 0;
        animId = null;
      }
    }

    function startLoop() {
      if (!animId) {
        lastTime = performance.now();
        animId = requestAnimationFrame(stepSpring);
      }
    }

    // Pointer Events with Pointer Capture (§2 Direct manipulation)
    wrapper.addEventListener('pointerdown', (e) => {
      if (wrapper.classList.contains('flipped') || e.target.closest('button')) return;
      isTracking = true;
      try { wrapper.setPointerCapture(e.pointerId); } catch(err) {}

      history.length = 0;
      history.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      startLoop();
    });

    wrapper.addEventListener('pointermove', (e) => {
      if (wrapper.classList.contains('flipped')) return;
      const rect = wrapper.getBoundingClientRect();
      const cx   = rect.left + rect.width / 2;
      const cy   = rect.top  + rect.height / 2;

      // Calculate tilt angles based on pointer offset from center
      const normX = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
      const normY = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));

      targetRX = -normY * 13;
      targetRY =  normX * 16;

      const now = performance.now();
      history.push({ x: e.clientX, y: e.clientY, t: now });
      if (history.length > 5) history.shift();

      startLoop();
    });

    function handlePointerRelease(e) {
      if (!isTracking) return;
      isTracking = false;
      try { wrapper.releasePointerCapture(e.pointerId); } catch(err) {}

      // Calculate release velocity for velocity handoff (§5)
      let releaseVx = 0, releaseVy = 0;
      if (history.length >= 2) {
        const first = history[0];
        const last  = history[history.length - 1];
        const dtMs  = Math.max(1, last.t - first.t);
        releaseVx   = ((last.x - first.x) / dtMs) * 1000;
        releaseVy   = ((last.y - first.y) / dtMs) * 1000;
      }

      // Project momentum forward (§6) and hand off initial spring velocity
      velRY = (releaseVx / 100) * 1.5;
      velRX = -(releaseVy / 100) * 1.5;

      // Spring smoothly back to rest (0, 0)
      targetRX = 0;
      targetRY = 0;
      startLoop();
    }

    wrapper.addEventListener('pointerup', handlePointerRelease);
    wrapper.addEventListener('pointercancel', handlePointerRelease);

    wrapper.addEventListener('pointerleave', () => {
      if (!isTracking) {
        targetRX = 0;
        targetRY = 0;
        startLoop();
      }
    });
  }

  /* ─────────────────────────────────────────────────────────────────────────
   *  4. CARD FLIP (Spring Perspective)
   * ───────────────────────────────────────────────────────────────────────── */
  function initCardFlip() {
    const wrapper = document.getElementById('heroCardWrapper');
    const flipBtn = document.getElementById('flipCardBtn');
    if (!wrapper || !flipBtn) return;

    let flipped = false;

    function toggleFlip() {
      flipped = !flipped;
      SoundFX.playFlip();

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
  }

  /* ─────────────────────────────────────────────────────────────────────────
   *  5. APPLE SEGMENTED CONTROL GLIDER (Apple Design §4 & §7)
   * ───────────────────────────────────────────────────────────────────────── */
  function initSegmentedGliders() {
    function setupGlider(containerId, gliderId, btnSelector) {
      const container = document.getElementById(containerId);
      const glider    = document.getElementById(gliderId);
      if (!container || !glider) return;

      function updateGlider() {
        const activeBtn = container.querySelector(`${btnSelector}.active`);
        if (!activeBtn) {
          glider.classList.remove('visible');
          return;
        }

        const left  = activeBtn.offsetLeft;
        const width = activeBtn.offsetWidth;
        glider.style.transform = `translateX(${left}px)`;
        glider.style.width     = `${width}px`;
        glider.classList.add('visible');
      }

      // Initial update
      setTimeout(updateGlider, 100);

      // Recalibrate on click
      container.addEventListener('click', (e) => {
        const btn = e.target.closest(btnSelector);
        if (!btn) return;
        SoundFX.playClick();
        setTimeout(updateGlider, 20);
      });

      // Recalibrate on window resize
      window.addEventListener('resize', updateGlider, { passive: true });

      return updateGlider;
    }

    window.updateHeroGlider    = setupGlider('cardSwitcherDock', 'cardSwitcherGlider', '.card-pill-btn');
    window.updateCatalogGlider = setupGlider('catalogTabs', 'catalogTabsGlider', '.tab-btn');
  }

  /* ─────────────────────────────────────────────────────────────────────────
   *  6. ZERO-JANK CSS GRID ACCORDION (Interaction Design §2)
   * ───────────────────────────────────────────────────────────────────────── */
  function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
      const question = item.querySelector('.faq-question');
      if (!question) return;

      question.addEventListener('click', () => {
        SoundFX.playClick();
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });

    // Default open first item
    const first = document.querySelector('.faq-item');
    if (first) first.classList.add('open');
  }

  /* ─────────────────────────────────────────────────────────────────────────
   *  7. MAGNETIC BUTTON INTERACTION (Interaction Design §4)
   * ───────────────────────────────────────────────────────────────────────── */
  function initMagneticButtons() {
    // Apply only on devices with hover capability (desktop)
    if (!window.matchMedia('(hover: hover)').matches) return;

    document.querySelectorAll('.btn-primary, .btn-xl').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x    = e.clientX - rect.left - rect.width  / 2;
        const y    = e.clientY - rect.top  - rect.height / 2;
        const max  = 6;
        btn.style.transform = `translate(${Math.max(-max, Math.min(max, x * 0.25))}px, ${Math.max(-max, Math.min(max, y * 0.25))}px) scale(1.02)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ─────────────────────────────────────────────────────────────────────────
   *  8. GRADIENT RANGE SLIDER FILL (Continuous 1:1 Feedback)
   * ───────────────────────────────────────────────────────────────────────── */
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
      slider.addEventListener('input', () => {
        updateSliderFill(slider);
      });
    });
  }

  /* ─────────────────────────────────────────────────────────────────────────
   *  9. NUMBER COUNTER SPRING ANIMATION (Apple Design §15)
   * ───────────────────────────────────────────────────────────────────────── */
  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-target') || el.textContent.replace(/[^0-9.]/g, ''));
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      // Apple-style exponential deceleration
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
  }, { threshold: 0.4 });

  function initCounters() {
    document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));
  }

  /* ─────────────────────────────────────────────────────────────────────────
   *  10. SCROLL REVEAL & PARALLAX
   * ───────────────────────────────────────────────────────────────────────── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -50px 0px' });

  function initReveal() {
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }

  const parallaxItems = [];
  function initParallax() {
    document.querySelectorAll('[data-parallax]').forEach(el => {
      parallaxItems.push({
        el,
        speed: parseFloat(el.getAttribute('data-parallax')) || 0.25
      });
    });
  }

  let ticking = false;
  function updateParallax() {
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
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  /* ─────────────────────────────────────────────────────────────────────────
   *  11. TOAST NOTIFICATION SYSTEM (Spring Entrance)
   * ───────────────────────────────────────────────────────────────────────── */
  window.showToast = function (msg, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const icons = {
      success: `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`,
      info:    `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
      warning: `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
    };

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">${icons[type] || icons.success}</span><span>${msg}</span>`;
    container.appendChild(toast);

    // Click or touch to dismiss
    toast.addEventListener('click', () => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 250);
    });

    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  };

  /* ─────────────────────────────────────────────────────────────────────────
   *  12. HEADER SCROLL & ACTIVE NAV
   * ───────────────────────────────────────────────────────────────────────── */
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { threshold: 0.35 });

    sections.forEach(s => observer.observe(s));
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        SoundFX.playClick();
        const headerH = document.querySelector('.site-header')?.offsetHeight || 72;
        const targetY = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
        window.scrollTo({ top: targetY, behavior: 'smooth' });

        const menu = document.querySelector('.nav-menu');
        if (menu) menu.classList.remove('mobile-open');
      });
    });
  }

  function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const menu   = document.querySelector('.nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      SoundFX.playClick();
      menu.classList.toggle('mobile-open');
      toggle.textContent = menu.classList.contains('mobile-open') ? '✕' : '☰';
    });
  }

  /* ─────────────────────────────────────────────────────────────────────────
   *  13. THEME TOGGLE
   * ───────────────────────────────────────────────────────────────────────── */
  function initTheme() {
    const btn = document.getElementById('themeToggleBtn');
    const saved = localStorage.getItem('cv_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    if (btn) updateThemeBtn(saved, btn);

    btn?.addEventListener('click', () => {
      SoundFX.playClick();
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('cv_theme', next);
      updateThemeBtn(next, btn);
      window.showToast && window.showToast(`${next === 'dark' ? '🌙 Dark' : '☀️ Light'} mode activated`, 'info');
    });
  }

  function updateThemeBtn(theme, btn) {
    btn.innerHTML = theme === 'dark'
      ? `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
      : `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }

  /* ─────────────────────────────────────────────────────────────────────────
   *  14. STAGGERED GRID ENTRANCES
   * ───────────────────────────────────────────────────────────────────────── */
  function initStaggeredChildren() {
    document.querySelectorAll('[data-stagger]').forEach(container => {
      const children = Array.from(container.children);
      const delay    = parseFloat(container.getAttribute('data-stagger-delay') || 0.08);
      children.forEach((child, i) => {
        child.classList.add('reveal');
        child.style.transitionDelay = `${(i * delay).toFixed(2)}s`;
        revealObserver.observe(child);
      });
    });
  }

  /* ─────────────────────────────────────────────────────────────────────────
   *  15. INIT BOOT
   * ───────────────────────────────────────────────────────────────────────── */
  function init() {
    initTheme();
    initSoundToggle();
    initHeaderScroll();
    initReveal();
    initParallax();
    init3DCard();
    initCardFlip();
    initSegmentedGliders();
    initSliders();
    initStaggeredChildren();
    initCounters();
    initActiveNav();
    initSmoothScroll();
    initMobileMenu();
    initFAQ();
    setTimeout(initMagneticButtons, 200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
