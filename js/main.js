/* ========================================
   ORION SKY HOLIDAY — Main JS
   ======================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initPageHeight();
    initSmoothScroll();
    initCurrentYear();
    initActiveNavLink();
    initScrollTop();
  });

  /* --- Set 100vh properly on mobile --- */
  function initPageHeight() {
    function setVH() {
      var vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', vh + 'px');
    }
    setVH();
    window.addEventListener('resize', setVH);
  }

  /* --- Smooth scroll for anchor links --- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* --- Current year in footer --- */
  function initCurrentYear() {
    var yearEl = document.getElementById('footerYear');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
    /* Also support data-current-year attribute */
    document.querySelectorAll('[data-current-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* --- Active nav link highlighting --- */
  function initActiveNavLink() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href && href.includes(currentPage) && currentPage !== '') {
        link.classList.add('is-active');
      }
    });
  }

  /* --- Scroll Up / Back to Top Button --- */
  function initScrollTop() {
    var btn = document.getElementById('scrollTopBtn');
    if (!btn) return;

    function toggle() {
      if (window.scrollY > 300) {
        btn.classList.add('is-visible');
        btn.setAttribute('aria-hidden', 'false');
      } else {
        btn.classList.remove('is-visible');
        btn.setAttribute('aria-hidden', 'true');
      }
    }

    window.addEventListener('scroll', toggle, { passive: true });
    toggle();

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
