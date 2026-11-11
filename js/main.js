/**
 * STACKLY WEALTH MANAGEMENT - CORE INTERACTION ENGINE
 * Master Standards: Font Awesome Only, Full-Background Hero Slider, Strict Form Validation, AOS Animation
 */

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

let _wmLenis = null;
let _wmLenisRafId = null;

function wmSyncLenisScroll(y, targetEl = null) {
  if (!_wmLenis) return;
  try {
    const wrapper = _wmLenis.options && _wmLenis.options.wrapper;
    if (targetEl && wrapper !== targetEl) return;
    if (!targetEl && wrapper && wrapper !== window) return;
    _wmLenis.scrollTo(y, { immediate: true, force: true });
  } catch (err) {}
}

let _wmScrollRestoreRaf = null;
function wmInstantScrollTo(y) {
  if (_wmScrollRestoreRaf) cancelAnimationFrame(_wmScrollRestoreRaf);
  const html = document.documentElement;
  html.style.scrollBehavior = 'auto';
  wmSyncLenisScroll(y);
  try {
    window.scrollTo({ top: y, left: 0, behavior: 'instant' });
  } catch (e) {
    window.scrollTo(0, y);
  }
  html.scrollTop = y;
  if (document.body) document.body.scrollTop = y;
  _wmScrollRestoreRaf = requestAnimationFrame(() => {
    html.style.removeProperty('scroll-behavior');
    _wmScrollRestoreRaf = null;
  });
}

function wmGetNavType() {
  const navEntry = (typeof performance !== 'undefined' && performance.getEntriesByType)
    ? performance.getEntriesByType('navigation')[0]
    : null;
  if (navEntry && navEntry.type) return navEntry.type;
  if (typeof performance !== 'undefined' && performance.navigation) {
    if (performance.navigation.type === 1) return 'reload';
    if (performance.navigation.type === 2) return 'back_forward';
  }
  return 'navigate';
}

function wmGetScrollStateKey() {
  return 'wm_scroll_state:' + window.location.pathname + window.location.search;
}

function wmReadBackSignal() {
  let flag = false;
  try {
    if (sessionStorage.getItem('wm_returning_from_404') === '1') flag = true;
  } catch (err) {}
  try {
    if (window.name === 'wm_back_from_404=1') flag = true;
  } catch (err) {}
  return flag;
}

function wmClearBackSignal() {
  try { sessionStorage.removeItem('wm_returning_from_404'); } catch (err) {}
  try { if (window.name === 'wm_back_from_404=1') window.name = ''; } catch (err) {}
}

function wmReadForceTopSignal() {
  let flag = false;
  try {
    if (sessionStorage.getItem('wm_force_top') === '1') flag = true;
  } catch (err) {}
  try {
    if (window.name === 'wm_force_top=1') flag = true;
  } catch (err) {}
  return flag;
}

function wmSetForceTopSignal() {
  try { sessionStorage.setItem('wm_force_top', '1'); } catch (err) {}
  try { window.name = 'wm_force_top=1'; } catch (err) {}
}

function wmClearForceTopSignal() {
  try { sessionStorage.removeItem('wm_force_top'); } catch (err) {}
  try { if (window.name === 'wm_force_top=1') window.name = ''; } catch (err) {}
}

function wmClearCurrentHistoryScrollState() {
  try {
    if (history.state && ('wmScrollY' in history.state || 'wmAuthTop' in history.state)) {
      const clean = Object.assign({}, history.state);
      delete clean.wmScrollY;
      delete clean.wmAuthTop;
      history.replaceState(clean, '');
    }
  } catch (err) {}
}

function wmIsTopNavLink(linkEl) {
  if (!linkEl || linkEl.tagName !== 'A') return false;
  const href = (linkEl.getAttribute('href') || '').trim();
  if (!href || href === '404.html' || /^(\#|javascript:|mailto:|tel:)/i.test(href)) return false;
  return Boolean(
    linkEl.closest('.wm-header, .wm-mobile-drawer, .wm-footer') ||
    linkEl.classList.contains('wm-auth-back-link') ||
    linkEl.classList.contains('wm-auth-form-logo')
  );
}

function wmIsSameWindowNav(e, linkEl) {
  if (!linkEl) return false;
  if (e && (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey)) return false;
  if (typeof e?.button === 'number' && e.button !== 0) return false;
  const targetAttr = (linkEl.getAttribute('target') || '').trim().toLowerCase();
  return !targetAttr || targetAttr === '_self';
}

function wmGetSavedScrollSnapshot() {
  try {
    if (history.state && typeof history.state.wmScrollY === 'number') {
      return {
        y: history.state.wmScrollY,
        authTop: typeof history.state.wmAuthTop === 'number' ? history.state.wmAuthTop : 0
      };
    }
  } catch (err) {}
  try {
    const raw = sessionStorage.getItem(wmGetScrollStateKey());
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed.y === 'number' ? parsed : null;
  } catch (err) {
    return null;
  }
}

const _wmInitialNavType = wmGetNavType();
const _wmForceTopOnLoad = wmReadForceTopSignal();
if (_wmForceTopOnLoad) {
  wmClearForceTopSignal();
  wmClearBackSignal();
  try { sessionStorage.removeItem(wmGetScrollStateKey()); } catch (err) {}
  wmClearCurrentHistoryScrollState();
}

let _wmRestoreFlag = !_wmForceTopOnLoad && (
  _wmInitialNavType === 'back_forward' ||
  (_wmInitialNavType !== 'reload' && wmReadBackSignal())
);
let _wmInitialSnap = (_wmRestoreFlag && _wmInitialNavType !== 'reload')
  ? wmGetSavedScrollSnapshot()
  : null;
// Consume one-shot 404-back flag immediately so it cannot leak to subsequent navbar/footer clicks
wmClearBackSignal();

let _wmUserScrolledDuringRestore = false;
let _wmUserScrolledOnInit = false;
let _wmRestoringLock = false;
let _wmSuppressNextScrollSave = false;
let _wmCancelRestoreListenersAttached = false;

function wmAttachUserCancelListeners() {
  if (_wmCancelRestoreListenersAttached) return;
  _wmCancelRestoreListenersAttached = true;
  ['wheel', 'touchstart', 'keydown'].forEach((evt) => {
    window.addEventListener(evt, () => {
      _wmUserScrolledOnInit = true;
      if (_wmRestoringLock) {
        _wmUserScrolledDuringRestore = true;
        _wmRestoringLock = false;
      }
    }, { passive: true });
  });
}

function wmCurrentScrollY() {
  return Math.max(
    window.scrollY || 0,
    window.pageYOffset || 0,
    document.documentElement ? document.documentElement.scrollTop : 0,
    document.body ? document.body.scrollTop : 0
  );
}

function wmSaveScrollSnapshot(force = false) {
  if (_wmSuppressNextScrollSave) return;
  if (!force && _wmRestoringLock) return;
  if (force) {
    _wmRestoringLock = false;
    _wmUserScrolledDuringRestore = true;
  }
  const y = wmCurrentScrollY();
  const authSide = document.querySelector('.wm-auth-form-side');
  const authTop = authSide ? authSide.scrollTop : 0;
  try {
    const nextState = Object.assign({}, history.state || {}, {
      wmScrollY: y,
      wmAuthTop: authTop
    });
    history.replaceState(nextState, '');
  } catch (err) {}
  try {
    sessionStorage.setItem(wmGetScrollStateKey(), JSON.stringify({
      y: y,
      authTop: authTop,
      ts: Date.now()
    }));
    sessionStorage.setItem('wm_last_page_href', window.location.href);
  } catch (err) {}
}

function wmHandleTopNavNavigation(linkEl) {
  const rawHref = (linkEl.getAttribute('href') || '').trim();
  if (!rawHref) return;
  wmClearBackSignal();
  wmSetForceTopSignal();
  try {
    const targetUrl = new URL(rawHref, window.location.href);
    sessionStorage.removeItem('wm_scroll_state:' + targetUrl.pathname + targetUrl.search);
    const isSameDoc = targetUrl.pathname === window.location.pathname &&
      targetUrl.search === window.location.search;
    if (isSameDoc && !targetUrl.hash) {
      _wmSuppressNextScrollSave = true;
      wmClearCurrentHistoryScrollState();
    }
  } catch (err) {}
}

function wmApplyRestoredScroll(snap) {
  if (!snap || _wmUserScrolledDuringRestore) return false;
  wmInstantScrollTo(snap.y);
  const authSide = document.querySelector('.wm-auth-form-side');
  if (authSide && typeof snap.authTop === 'number') {
    authSide.scrollTop = snap.authTop;
    wmSyncLenisScroll(snap.authTop, authSide);
  }
  return true;
}

function wmScheduleBackRestorePin(snap) {
  if (!snap) return;
  _wmRestoringLock = true;
  _wmUserScrolledDuringRestore = false;
  wmAttachUserCancelListeners();
  wmApplyRestoredScroll(snap);
  requestAnimationFrame(() => wmApplyRestoredScroll(snap));
  setTimeout(() => wmApplyRestoredScroll(snap), 60);
  setTimeout(() => {
    wmApplyRestoredScroll(snap);
    if (typeof AOS !== 'undefined') AOS.refresh();
  }, 180);
  setTimeout(() => {
    _wmRestoringLock = false;
  }, 250);
}

function wmResetScrollOnRefresh() {
  const navType = wmGetNavType();
  if (_wmRestoreFlag && navType !== 'reload' && !_wmForceTopOnLoad) {
    const snap = _wmInitialSnap || wmGetSavedScrollSnapshot();
    if (snap) {
      wmScheduleBackRestorePin(snap);
      return;
    }
  }
  if (_wmForceTopOnLoad || navType === 'reload' || !window.location.hash) {
    if (_wmForceTopOnLoad || navType === 'reload') {
      wmClearBackSignal();
      try { sessionStorage.removeItem(wmGetScrollStateKey()); } catch (err) {}
      wmClearCurrentHistoryScrollState();
    }
    wmInstantScrollTo(0);
    const authSide = document.querySelector('.wm-auth-form-side');
    if (authSide) {
      authSide.scrollTop = 0;
      wmSyncLenisScroll(0, authSide);
    }
  }
}

function wmObservePreloaderDone(onDone) {
  const preloader = document.getElementById('wm-preloader');
  if (!preloader) return;
  const obs = new MutationObserver(() => {
    if (preloader.style.display === 'none') {
      obs.disconnect();
      onDone();
      if (typeof AOS !== 'undefined') AOS.refreshHard();
    }
  });
  obs.observe(preloader, { attributes: true, attributeFilter: ['style', 'class'] });
  setTimeout(() => obs.disconnect(), 4000);
}

wmResetScrollOnRefresh();

let _wmScrollSaveTimer = null;
window.addEventListener('scroll', () => {
  if (_wmRestoringLock) return;
  if (_wmScrollSaveTimer) return;
  _wmScrollSaveTimer = setTimeout(() => {
    _wmScrollSaveTimer = null;
    wmSaveScrollSnapshot();
  }, 120);
}, { passive: true });

window.addEventListener('pagehide', wmSaveScrollSnapshot);
window.addEventListener('beforeunload', wmSaveScrollSnapshot);
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') wmSaveScrollSnapshot();
});
document.addEventListener('pointerdown', (e) => {
  const link = e.target && e.target.closest ? e.target.closest('a[href]') : null;
  if (link && wmIsTopNavLink(link)) {
    if (wmIsSameWindowNav(e, link)) wmHandleTopNavNavigation(link);
    return;
  }
  if (e.target && e.target.closest && e.target.closest('a[href], button, .wm-podcast-card')) {
    wmSaveScrollSnapshot(true);
  }
}, true);
document.addEventListener('click', (e) => {
  const link = e.target && e.target.closest ? e.target.closest('a[href]') : null;
  if (link && wmIsTopNavLink(link)) {
    if (wmIsSameWindowNav(e, link)) wmHandleTopNavNavigation(link);
    return;
  }
  if (e.target && e.target.closest && e.target.closest('a[href], button, .wm-podcast-card')) {
    wmSaveScrollSnapshot(true);
  }
}, true);

document.addEventListener('DOMContentLoaded', () => {
  wmAttachUserCancelListeners();
  if (_wmRestoreFlag && wmGetNavType() !== 'reload' && !_wmForceTopOnLoad) {
    const snap = _wmInitialSnap || wmGetSavedScrollSnapshot();
    if (snap) {
      wmScheduleBackRestorePin(snap);
      wmObservePreloaderDone(() => {
        wmApplyRestoredScroll(snap);
        requestAnimationFrame(() => wmApplyRestoredScroll(snap));
      });
    }
  } else {
    wmResetScrollOnRefresh();
    if (!window.location.hash) {
      wmObservePreloaderDone(() => {
        if (!_wmUserScrolledOnInit) {
          wmInstantScrollTo(0);
          const authSide = document.querySelector('.wm-auth-form-side');
          if (authSide) authSide.scrollTop = 0;
        }
      });
    }
  }
  initLenisScroll();
  initAOS();
  initStickyHeader();
  initMobileMenu();
  initHeroSlider();
  initStatCounters();
  initStrategyTabs();
  initWealthCalculator();
  initPricingToggle();
  initFormValidation();
  initTestimonialsSlider();
});

/* ==========================================================================
   0. Lenis Smooth Scroll Animation
   ========================================================================== */
function wmDestroyLenis() {
  if (_wmLenisRafId) {
    cancelAnimationFrame(_wmLenisRafId);
    _wmLenisRafId = null;
  }
  if (_wmLenis) {
    try { _wmLenis.destroy(); } catch (err) {}
    _wmLenis = null;
  }
}

function initLenisScroll() {
  if (typeof Lenis === 'undefined') return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const authSide = document.querySelector('.wm-auth-form-side');
  let mode = 'window';

  function createLenisForMode() {
    wmDestroyLenis();
    const isAuthDesktop = Boolean(
      authSide &&
      window.innerWidth > 1024 &&
      getComputedStyle(authSide).overflowY !== 'visible'
    );
    mode = isAuthDesktop ? 'auth' : 'window';

    const opts = {
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5
    };
    if (isAuthDesktop) {
      opts.wrapper = authSide;
      opts.content = authSide;
    }

    _wmLenis = new Lenis(opts);
    function raf(time) {
      if (_wmLenis) _wmLenis.raf(time);
      _wmLenisRafId = requestAnimationFrame(raf);
    }
    _wmLenisRafId = requestAnimationFrame(raf);
  }

  createLenisForMode();

  if (authSide) {
    window.addEventListener('resize', () => {
      const nextMode = (window.innerWidth > 1024 && getComputedStyle(authSide).overflowY !== 'visible') ? 'auth' : 'window';
      if (nextMode !== mode) createLenisForMode();
    });
  }
}

/* ==========================================================================
   1. AOS Animation Initialization (Section 9)
   ========================================================================== */
function initAOS() {
  function startAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: false,       // Continuously animates when scrolling into view
        offset: 50,        // Responsive viewport trigger offset
        delay: 0,
        disable: false,    // Enabled across all viewports (mobile, tablet, desktop)
        mirror: true       // Smoothly animates elements when scrolling back
      });
      return true;
    }
    return false;
  }

  if (!startAOS()) {
    // Retry polling in case script is loading from CDN or local buffer
    var retryCount = 0;
    var timer = setInterval(function() {
      retryCount++;
      if (startAOS() || retryCount > 30) {
        clearInterval(timer);
      }
    }, 100);
  }
}

// Window load refresh ensuring all layout dimensions and images are settled
window.addEventListener('load', () => {
  if (_wmRestoreFlag && wmGetNavType() !== 'reload' && !_wmForceTopOnLoad) {
    const snap = _wmInitialSnap || wmGetSavedScrollSnapshot();
    if (snap) {
      wmScheduleBackRestorePin(snap);
    }
    wmClearBackSignal();
  } else if (!_wmUserScrolledOnInit) {
    wmResetScrollOnRefresh();
    requestAnimationFrame(() => {
      if (!_wmUserScrolledOnInit) wmResetScrollOnRefresh();
    });
  }
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
});

window.addEventListener('pageshow', (e) => {
  if (e.persisted) {
    if (wmReadForceTopSignal()) {
      wmClearForceTopSignal();
      wmClearBackSignal();
      try { sessionStorage.removeItem(wmGetScrollStateKey()); } catch (err) {}
      wmClearCurrentHistoryScrollState();
      wmInstantScrollTo(0);
      const authSide = document.querySelector('.wm-auth-form-side');
      if (authSide) authSide.scrollTop = 0;
      return;
    }
    wmClearBackSignal();
    const snap = wmGetSavedScrollSnapshot();
    if (snap) {
      wmScheduleBackRestorePin(snap);
    }
  }
});

/* ==========================================================================
   2. Sticky Header
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.wm-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   3. Mobile Drawer Navigation
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.wm-mobile-toggle');
  const drawer = document.querySelector('.wm-mobile-drawer');
  const closeBtn = document.querySelector('.wm-drawer-close');
  const drawerLinks = document.querySelectorAll('.wm-drawer-link');

  if (!toggleBtn || !drawer) return;

  let isLocked = false;
  let lockedScrollY = 0;
  let touchStartY = 0;

  const shouldAllowDrawerScroll = (target, deltaY) => {
    if (!target || !drawer.contains(target)) return false;
    const maxScroll = drawer.scrollHeight - drawer.clientHeight;
    if (maxScroll <= 1) return false;
    if (deltaY < 0 && drawer.scrollTop <= 0) return false;
    if (deltaY > 0 && drawer.scrollTop >= maxScroll - 1) return false;
    return true;
  };

  const handleWheelLock = (e) => {
    if (!isLocked) return;
    if (!shouldAllowDrawerScroll(e.target, e.deltaY)) {
      e.preventDefault();
    }
  };

  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length) {
      touchStartY = e.touches[0].clientY;
    }
  };

  const handleTouchMoveLock = (e) => {
    if (!isLocked) return;
    if (e.touches && e.touches.length > 1) return;
    const currentY = (e.touches && e.touches.length) ? e.touches[0].clientY : touchStartY;
    const deltaY = touchStartY - currentY;
    if (!shouldAllowDrawerScroll(e.target, deltaY)) {
      e.preventDefault();
    }
  };

  const handleKeyScrollLock = (e) => {
    if (!isLocked) return;
    const tag = e.target && e.target.tagName ? e.target.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'select' || (e.target && e.target.isContentEditable)) {
      return;
    }
    if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'PageUp' || e.key === 'PageDown' ||
        e.key === 'End' || e.key === 'Home' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
    }
  };

  const handleScrollPin = () => {
    if (!isLocked) return;
    if (Math.abs((window.scrollY || window.pageYOffset || 0) - lockedScrollY) > 1) {
      document.documentElement.style.scrollBehavior = 'auto';
      try {
        window.scrollTo({ top: lockedScrollY, left: 0, behavior: 'instant' });
      } catch (err) {
        window.scrollTo(0, lockedScrollY);
      }
      document.documentElement.scrollTop = lockedScrollY;
    }
  };

  const lockScroll = () => {
    if (isLocked) return;
    lockedScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    const html = document.documentElement;
    const sbWidth = window.innerWidth - html.clientWidth;
    if (sbWidth > 0) {
      html.style.paddingRight = sbWidth + 'px';
    }
    isLocked = true;
    html.classList.add('wm-scroll-locked');
    window.addEventListener('wheel', handleWheelLock, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMoveLock, { passive: false });
    document.addEventListener('keydown', handleKeyScrollLock);
    window.addEventListener('scroll', handleScrollPin, { passive: true });
  };

  const unlockScroll = () => {
    if (!isLocked) return;
    const html = document.documentElement;
    html.style.scrollBehavior = 'auto';
    isLocked = false;
    window.removeEventListener('wheel', handleWheelLock, { passive: false });
    window.removeEventListener('touchstart', handleTouchStart, { passive: true });
    window.removeEventListener('touchmove', handleTouchMoveLock, { passive: false });
    document.removeEventListener('keydown', handleKeyScrollLock);
    window.removeEventListener('scroll', handleScrollPin, { passive: true });
    html.classList.remove('wm-scroll-locked');
    html.style.paddingRight = '';
    if (Math.abs((window.scrollY || window.pageYOffset || 0) - lockedScrollY) > 1) {
      try {
        window.scrollTo({ top: lockedScrollY, left: 0, behavior: 'instant' });
      } catch (err) {
        window.scrollTo(0, lockedScrollY);
      }
      html.scrollTop = lockedScrollY;
      if (document.body) document.body.scrollTop = lockedScrollY;
    }
    requestAnimationFrame(() => {
      html.style.scrollBehavior = '';
    });
  };

  drawer.setAttribute('data-lenis-prevent', '');

  const openDrawer = () => {
    if (drawer.classList.contains('open')) return;
    if (_wmLenis) {
      try { _wmLenis.stop(); } catch (err) {}
    }
    lockScroll();
    drawer.classList.add('open');
  };

  const closeDrawer = () => {
    if (!drawer.classList.contains('open') && !isLocked) return;
    const activeInside = document.activeElement && drawer.contains(document.activeElement);
    drawer.classList.remove('open');
    unlockScroll();
    if (_wmLenis) {
      try {
        wmSyncLenisScroll(lockedScrollY);
        _wmLenis.start();
      } catch (err) {}
    }
    if (activeInside && toggleBtn) {
      try {
        toggleBtn.focus({ preventScroll: true });
      } catch (err) {}
    }
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   4. Hero Full-Background Image Slider (Section 4)
   ========================================================================== */
function initHeroSlider() {
  const sliderContainer = document.querySelector('.wm-hero-slider-container');
  const slides = document.querySelectorAll('.wm-hero-slide');
  const prevBtn = document.querySelector('.wm-slider-prev');
  const nextBtn = document.querySelector('.wm-slider-next');
  const dots = document.querySelectorAll('.wm-slider-dot');

  if (!slides.length) return;

  let currentSlide = 0;
  let slideInterval = null;
  const slideDuration = 5500; // 5.5 seconds per slide
  let isPaused = false;

  function goToSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    let nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex);
  }

  function prevSlide() {
    let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prevIndex);
  }

  function startAutoplay() {
    stopAutoplay();
    slideInterval = setInterval(() => {
      if (!isPaused) {
        nextSlide();
      }
    }, slideDuration);
  }

  function stopAutoplay() {
    if (slideInterval) clearInterval(slideInterval);
  }

  // Arrow controls
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoplay();
    });
  }

  // Pagination Dots
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      goToSlide(idx);
      startAutoplay();
    });
  });

  // Pause on hover / interaction
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => {
      isPaused = true;
    });
    sliderContainer.addEventListener('mouseleave', () => {
      isPaused = false;
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    sliderContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      isPaused = true;
    }, { passive: true });

    sliderContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      isPaused = false;
      if (touchStartX - touchEndX > 50) {
        nextSlide();
      } else if (touchEndX - touchStartX > 50) {
        prevSlide();
      }
      startAutoplay();
    }, { passive: true });
  }

  // Initialize first slide and start autoplay
  goToSlide(0);
  startAutoplay();
}

/* ==========================================================================
   5. Form Validation & Inline Errors (Section 6 Strict Requirements)
   ========================================================================== */
function initFormValidation() {
  // Toast notifications
  const toast = document.querySelector('.wm-toast');
  const toastMsg = document.querySelector('.wm-toast-msg');

  window.showToast = function(message) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  };

  // Helper: Show Inline Error
  function setFieldError(field, message) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    let errorEl = field.parentElement.querySelector('.wm-error-message');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'wm-error-message';
      field.parentElement.appendChild(errorEl);
    }
    errorEl.textContent = message;
    errorEl.classList.add('visible');
  }

  // Helper: Clear Inline Error
  function clearFieldError(field) {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    const errorEl = field.parentElement.querySelector('.wm-error-message');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('visible');
    }
  }

  // Real-time Name Validation rule:
  // Accept alphabetic characters and spaces (and apostrophe/hyphen).
  // Reject numbers & special symbols.
  function validateName(input, isSubmit = false) {
    const val = input.value.trim();
    if (!val) {
      if (isSubmit) setFieldError(input, 'Name is required.');
      return false;
    }
    // Only letters, spaces, hyphens, apostrophes allowed
    const nameRegex = /^[A-Za-z\s'-]+$/;
    if (!nameRegex.test(val)) {
      setFieldError(input, 'Please enter a valid name using alphabetic characters only.');
      return false;
    }
    if (val.length < 2) {
      setFieldError(input, 'Please enter at least 2 characters.');
      return false;
    }
    clearFieldError(input);
    return true;
  }

  // Real-time Phone Validation rule:
  // Digits only. Indian mobile number: 10 digits starting with 6, 7, 8, or 9.
  function validatePhone(input, isSubmit = false) {
    // Prevent non-numeric characters while typing
    input.value = input.value.replace(/\D/g, '');
    const val = input.value.trim();

    if (!val) {
      if (isSubmit) setFieldError(input, 'Phone number is required.');
      return false;
    }

    // Digits only check
    if (!/^\d+$/.test(val)) {
      setFieldError(input, 'Please enter a valid phone number using digits only.');
      return false;
    }

    // Indian mobile standard: 10 digits starting with 6-9
    if (val.length !== 10 || !/^[6-9]\d{9}$/.test(val)) {
      setFieldError(input, 'Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.');
      return false;
    }

    clearFieldError(input);
    return true;
  }

  // Email Validation rule:
  function validateEmail(input, isSubmit = false) {
    const val = input.value.trim();
    if (!val) {
      if (isSubmit) setFieldError(input, 'Email address is required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(val)) {
      setFieldError(input, 'Please enter a valid email address.');
      return false;
    }
    clearFieldError(input);
    return true;
  }

  function validateSelect(select, isSubmit = false) {
    const val = (select.value || '').trim();
    if (!val) {
      if (isSubmit) setFieldError(select, 'Please select an option.');
      return false;
    }
    clearFieldError(select);
    return true;
  }

  function wmClearFormFields(form) {
    if (!form) return;
    form.reset();
    form.querySelectorAll('input, textarea, select').forEach((el) => {
      if (el.type === 'checkbox' || el.type === 'radio') {
        el.checked = false;
      } else if (el.tagName === 'SELECT') {
        el.selectedIndex = 0;
      } else {
        el.value = '';
      }
      el.classList.remove('is-valid', 'is-invalid');
    });
    form.querySelectorAll('.wm-error-message').forEach((errEl) => {
      errEl.textContent = '';
      errEl.classList.remove('visible');
    });
  }

  let _wmPendingSubmittedForm = null;
  function wmMarkAndClearSubmittedForm(form) {
    _wmPendingSubmittedForm = form;
    try {
      sessionStorage.setItem('wm_clear_forms_on_return', window.location.pathname);
    } catch (err) {}
    wmClearFormFields(form);
  }

  function wmClearPendingSubmittedForms(consume) {
    let shouldClearAll = false;
    try {
      if (sessionStorage.getItem('wm_clear_forms_on_return') === window.location.pathname) {
        shouldClearAll = true;
        if (consume) sessionStorage.removeItem('wm_clear_forms_on_return');
      }
    } catch (err) {}
    if (_wmPendingSubmittedForm) {
      wmClearFormFields(_wmPendingSubmittedForm);
      if (consume) _wmPendingSubmittedForm = null;
    }
    if (shouldClearAll) {
      document.querySelectorAll('#consultation-form, .wm-newsletter-form').forEach(wmClearFormFields);
    }
  }

  wmClearPendingSubmittedForms(false);
  window.addEventListener('load', () => wmClearPendingSubmittedForms(true));
  window.addEventListener('pageshow', () => {
    wmClearPendingSubmittedForms(true);
    requestAnimationFrame(() => wmClearPendingSubmittedForms(true));
  });

  const isBlogOrContactPage = /(^|\/)(blog|contact)(\.html)?$/i.test(window.location.pathname);

  // Setup form inputs with live listeners
  const forms = document.querySelectorAll('#consultation-form');
  forms.forEach(form => {
    const nameInput = form.querySelector('input[name="name"], input[id$="name"]');
    const phoneInput = form.querySelector('input[type="tel"], input[name="phone"], input[id$="phone"]');
    const emailInput = form.querySelector('input[type="email"], input[name="email"], input[id$="email"]');
    const requiredSelects = form.querySelectorAll('select[required]');

    if (nameInput) {
      nameInput.addEventListener('input', () => validateName(nameInput));
      nameInput.addEventListener('blur', () => validateName(nameInput));
    }

    if (phoneInput) {
      phoneInput.addEventListener('input', () => validatePhone(phoneInput));
      phoneInput.addEventListener('blur', () => validatePhone(phoneInput));
    }

    if (emailInput) {
      emailInput.addEventListener('input', () => validateEmail(emailInput));
      emailInput.addEventListener('blur', () => validateEmail(emailInput));
    }

    requiredSelects.forEach(sel => {
      sel.addEventListener('change', () => validateSelect(sel, true));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      if (nameInput && !validateName(nameInput, true)) isValid = false;
      if (phoneInput && !validatePhone(phoneInput, true)) isValid = false;
      if (emailInput && !validateEmail(emailInput, true)) isValid = false;
      requiredSelects.forEach(sel => {
        if (!validateSelect(sel, true)) isValid = false;
      });

      if (!isValid) return;

      if (isBlogOrContactPage) {
        wmSaveScrollSnapshot(true);
        wmMarkAndClearSubmittedForm(form);
        window.location.href = '404.html';
        return;
      }

      const userName = nameInput ? nameInput.value.trim() : 'Valued Client';

      form.reset();
      form.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));

      window.showToast(`Thank you, ${userName}! Your consultation request has been received.`);
    });
  });

  // Newsletter Subscriptions
  const newsletterForms = document.querySelectorAll('.wm-newsletter-form');
  newsletterForms.forEach(form => {
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput) {
      emailInput.addEventListener('input', () => validateEmail(emailInput));
    }
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!emailInput || !validateEmail(emailInput, true)) return;

      if (isBlogOrContactPage) {
        wmSaveScrollSnapshot(true);
        wmMarkAndClearSubmittedForm(form);
        window.location.href = '404.html';
        return;
      }

      const emailVal = emailInput.value.trim();
      form.reset();
      emailInput.classList.remove('is-valid');
      window.showToast(`Success! ${emailVal} is subscribed to the Stackly Wealth Letter.`);
    });
  });

}

/* ==========================================================================
   6. Animated Stat Counters with Viewport Detection & Interactive Hover
   ========================================================================== */
function initStatCounters() {
  const cards = document.querySelectorAll('.wm-stat-card');
  const counters = document.querySelectorAll('.wm-stat-number[data-target]');
  if (!counters.length) return;

  function animateCounter(el, force = false) {
    if (el._isCounting && !force) return;
    el._isCounting = true;

    const target = parseFloat(el.getAttribute('data-target'));
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const isDecimal = target % 1 !== 0;
    const duration = 1600; // 1.6s smooth duration
    const startTime = performance.now();

    el.classList.add('is-counting');

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quartic for sleek deceleration
      const ease = 1 - Math.pow(1 - progress, 4);
      const currentVal = target * ease;

      if (isDecimal) {
        el.textContent = `${prefix}${currentVal.toFixed(1)}${suffix}`;
      } else {
        el.textContent = `${prefix}${Math.floor(currentVal).toLocaleString()}${suffix}`;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = `${prefix}${isDecimal ? target.toFixed(1) : target.toLocaleString()}${suffix}`;
        el._isCounting = false;
        el._hasAnimated = true;
        setTimeout(() => el.classList.remove('is-counting'), 250);
      }
    }

    requestAnimationFrame(update);
  }

  // 1. Viewport Intersection Observer with ultra-low threshold for instant trigger
  if (typeof IntersectionObserver !== 'undefined') {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target.querySelector('.wm-stat-number[data-target]') || (entry.target.matches('.wm-stat-number[data-target]') ? entry.target : null);
          if (counter && !counter._hasAnimated) {
            animateCounter(counter);
          }
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -10px 0px' });

    cards.forEach(card => cardObserver.observe(card));
    counters.forEach(cnt => cardObserver.observe(cnt));

    const grids = document.querySelectorAll('.wm-stats-grid');
    grids.forEach(grid => {
      const gridObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const gridCounters = entry.target.querySelectorAll('.wm-stat-number[data-target]');
            gridCounters.forEach(cnt => {
              if (!cnt._hasAnimated) animateCounter(cnt);
            });
          }
        });
      }, { threshold: 0.05 });
      gridObserver.observe(grid);
    });
  }

  // 2. Immediate check for elements already in viewport (e.g. initial view or quick scroll)
  function checkInViewport() {
    counters.forEach(cnt => {
      if (!cnt._hasAnimated) {
        const rect = cnt.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top <= vh * 0.95 && rect.bottom >= 0) {
          animateCounter(cnt);
        }
      }
    });
  }

  setTimeout(checkInViewport, 80);
  window.addEventListener('scroll', checkInViewport, { passive: true });
  window.addEventListener('resize', checkInViewport, { passive: true });

  // 3. Interactive hover re-trigger: hovering over a stat card smoothly replays the count up
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const counter = card.querySelector('.wm-stat-number[data-target]');
      if (counter && !counter._isCounting) {
        animateCounter(counter, true);
      }
    });
  });
}

/* ==========================================================================
   7. Strategy / Feature Tabs
   ========================================================================== */
function initStrategyTabs() {
  const tabBtns = document.querySelectorAll('.wm-tab-btn');
  const tabPanels = document.querySelectorAll('.wm-tab-panel');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      if (typeof AOS !== 'undefined') setTimeout(() => AOS.refresh(), 80);
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
        if (typeof AOS !== 'undefined') setTimeout(() => AOS.refresh(), 80);
      }
    });
  });
}

/* ==========================================================================
   8. Wealth Growth Calculator
   ========================================================================== */
function initWealthCalculator() {
  const initialInput = document.getElementById('calc-initial');
  const monthlyInput = document.getElementById('calc-monthly');
  const yearsInput = document.getElementById('calc-years');
  const returnInput = document.getElementById('calc-return');

  if (!initialInput || !monthlyInput || !yearsInput || !returnInput) return;

  const initialValDisplay = document.getElementById('val-initial');
  const monthlyValDisplay = document.getElementById('val-monthly');
  const yearsValDisplay = document.getElementById('val-years');
  const returnValDisplay = document.getElementById('val-return');

  const totalWealthDisplay = document.getElementById('calc-result-total');
  const principalDisplay = document.getElementById('calc-result-principal');
  const interestDisplay = document.getElementById('calc-result-interest');

  const formatCurrency = (val) => '$' + Math.round(val).toLocaleString();

  function calculate() {
    const P = parseFloat(initialInput.value);
    const PMT = parseFloat(monthlyInput.value);
    const t = parseFloat(yearsInput.value);
    const annualRate = parseFloat(returnInput.value) / 100;
    const r = annualRate / 12;
    const n = t * 12;

    const futureInitial = P * Math.pow(1 + r, n);
    const futureMonthly = r > 0 ? PMT * ((Math.pow(1 + r, n) - 1) / r) : PMT * n;
    const totalWealth = futureInitial + futureMonthly;
    const totalPrincipal = P + (PMT * n);
    const totalInterest = Math.max(0, totalWealth - totalPrincipal);

    initialValDisplay.textContent = formatCurrency(P);
    monthlyValDisplay.textContent = formatCurrency(PMT) + '/mo';
    yearsValDisplay.textContent = t + ' Years';
    returnValDisplay.textContent = parseFloat(returnInput.value).toFixed(1) + '%';

    totalWealthDisplay.textContent = formatCurrency(totalWealth);
    principalDisplay.textContent = formatCurrency(totalPrincipal);
    interestDisplay.textContent = formatCurrency(totalInterest);
  }

  [initialInput, monthlyInput, yearsInput, returnInput].forEach(slider => {
    slider.addEventListener('input', calculate);
  });

  calculate();
}

/* ==========================================================================
   9. Tiered Pricing Toggle (Monthly vs Annual -20%)
   ========================================================================== */
function initPricingToggle() {
  const toggleSwitch = document.querySelector('.wm-toggle-switch');
  if (!toggleSwitch) return;

  const priceElements = document.querySelectorAll('.wm-price-val[data-monthly]');
  const periodElements = document.querySelectorAll('.wm-price-period');
  let isAnnual = false;

  toggleSwitch.addEventListener('click', () => {
    isAnnual = !isAnnual;
    toggleSwitch.classList.toggle('active', isAnnual);

    priceElements.forEach(el => {
      const monthly = el.getAttribute('data-monthly');
      const annual = el.getAttribute('data-annual');
      el.textContent = isAnnual ? annual : monthly;
    });

    periodElements.forEach(el => {
      el.textContent = isAnnual ? '/ year' : '/ month';
    });
  });
}

/* ==========================================================================
   11. Service Category Filter
   ========================================================================== */
function initServiceFilter() {
  const filterBtns = document.querySelectorAll('.wm-service-filter-btn');
  const serviceCards = document.querySelectorAll('.wm-services-grid .wm-service-card[data-category]');

  if (!filterBtns.length || !serviceCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (typeof AOS !== 'undefined') setTimeout(() => AOS.refresh(), 80);

      serviceCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat.includes(category)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease-in-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   12. Blog Category Filter, Live Search & Media Triggers
   ========================================================================== */
function initBlogControls() {
  const filterBtns = document.querySelectorAll('.wm-blog-filter-btn');
  const blogCards = document.querySelectorAll('.wm-blog-card[data-category]');
  const searchInput = document.getElementById('blog-search-input');

  let activeCategory = 'all';
  let searchQuery = '';

  function filterPosts() {
    blogCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || '';
      const title = card.querySelector('.wm-blog-title')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.wm-blog-desc')?.textContent.toLowerCase() || '';

      const matchesCat = (activeCategory === 'all' || cardCategory.includes(activeCategory));
      const matchesSearch = (!searchQuery || title.includes(searchQuery) || desc.includes(searchQuery));

      if (matchesCat && matchesSearch) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.3s ease-in-out';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      if (typeof AOS !== 'undefined') setTimeout(() => AOS.refresh(), 80);
        activeCategory = btn.getAttribute('data-filter') || 'all';
        filterPosts();
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      filterPosts();
    });
  }

  // Whitepaper Download simulation with toast
  const downloadBtns = document.querySelectorAll('[data-action="download-whitepaper"]');
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.getAttribute('data-title') || 'Whitepaper';
      if (typeof window.showToast === 'function') {
        window.showToast(`Downloading: "${title}" (PDF). Direct copy sent to your email!`);
      }
    });
  });

  // Podcast & dispatch cards navigate to 404 page
  const podcastCards = document.querySelectorAll('.wm-podcast-card');
  podcastCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      window.location.href = '404.html';
    });
  });
}

/* ==========================================================================
   13. Interactive FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.wm-faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.wm-faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items in the container
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   14. Client Testimonials Auto & Manual Slider
   ========================================================================== */
function initTestimonialsSlider() {
  const track = document.getElementById('testimonialTrack');
  const sliderWrap = document.getElementById('testimonialSliderWrap');
  const prevBtn = document.getElementById('testiPrevBtn');
  const nextBtn = document.getElementById('testiNextBtn');
  const dotsContainer = document.getElementById('testimonialDots');

  if (!track || !sliderWrap) return;

  const cards = track.querySelectorAll('.wm-testimonial-card');
  if (!cards.length) return;

  let currentIndex = 0;
  let autoPlayTimer = null;
  const autoPlayDelay = 4500;
  let isHovered = false;

  function getCardsPerView() {
    return window.matchMedia('(max-width: 768px)').matches ? 1 : 2;
  }

  function getMaxIndex() {
    const perView = getCardsPerView();
    return Math.max(0, cards.length - perView);
  }

  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const maxIdx = getMaxIndex();
    const totalDots = maxIdx + 1;

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('button');
      dot.className = 'wm-testi-dot' + (i === currentIndex ? ' active' : '');
      dot.setAttribute('aria-label', `Go to testimonial slide ${i + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(i);
        resetAutoPlay();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateSlidePosition() {
    const maxIdx = getMaxIndex();
    if (currentIndex > maxIdx) currentIndex = maxIdx;
    if (currentIndex < 0) currentIndex = 0;

    const targetCard = cards[currentIndex];
    if (!targetCard) return;

    const moveAmount = targetCard.offsetLeft;
    track.style.transform = `translateX(-${moveAmount}px)`;

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.wm-testi-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    if (prevBtn) {
      prevBtn.style.opacity = currentIndex === 0 ? '0.6' : '1';
    }
    if (nextBtn) {
      nextBtn.style.opacity = currentIndex >= maxIdx ? '0.6' : '1';
    }
  }

  function goToSlide(index) {
    const maxIdx = getMaxIndex();
    if (index > maxIdx) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = maxIdx;
    } else {
      currentIndex = index;
    }
    updateSlidePosition();
  }

  function nextSlide() {
    const maxIdx = getMaxIndex();
    if (currentIndex >= maxIdx) {
      goToSlide(0);
    } else {
      goToSlide(currentIndex + 1);
    }
  }

  function prevSlide() {
    const maxIdx = getMaxIndex();
    if (currentIndex <= 0) {
      goToSlide(maxIdx);
    } else {
      goToSlide(currentIndex - 1);
    }
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(() => {
      if (!isHovered) {
        nextSlide();
      }
    }, autoPlayDelay);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoPlay();
    });
  }

  sliderWrap.addEventListener('mouseenter', () => {
    isHovered = true;
  });
  sliderWrap.addEventListener('mouseleave', () => {
    isHovered = false;
  });

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  sliderWrap.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    isHovered = true;
  }, { passive: true });

  sliderWrap.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    isHovered = false;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      resetAutoPlay();
    }
  }, { passive: true });

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      renderDots();
      updateSlidePosition();
    }, 100);
  });

  renderDots();
  updateSlidePosition();
  startAutoPlay();
}

document.addEventListener('DOMContentLoaded', () => {
  initServiceFilter();
  initBlogControls();
  initFaqAccordion();
});
