/**
 * Hide-on-scroll-down / show-on-scroll-up navigation
 * Requires GSAP (loaded before this script via defer in HTML)
 */
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const HIDE_DURATION  = 0.3;
  const SHOW_DURATION  = 0.45;
  const SCROLL_THRESHOLD = 6; // px — ignore tiny jitter

  let lastY    = window.scrollY;
  let hidden   = false;
  let ticking  = false;

  function getHeaderH() {
    return header.offsetHeight;
  }

  function hide() {
    if (hidden) return;
    hidden = true;
    // Close mobile menu if open
    const nav    = header.querySelector('.header-nav');
    const toggle = header.querySelector('.nav-toggle');
    if (nav && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
    gsap.to(header, {
      y: -getHeaderH(),
      duration: HIDE_DURATION,
      ease: 'power2.in',
      overwrite: 'auto'
    });
  }

  function show() {
    if (!hidden) return;
    hidden = false;
    gsap.to(header, {
      y: 0,
      duration: SHOW_DURATION,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  }

  function update() {
    const y    = window.scrollY;
    const diff = y - lastY;

    if (y <= 0) {
      // Always visible at the very top
      show();
    } else if (diff > SCROLL_THRESHOLD) {
      // Meaningful downward scroll — hide
      hide();
    } else if (diff < -SCROLL_THRESHOLD) {
      // Meaningful upward scroll — show
      show();
    }

    lastY   = y;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
})();
