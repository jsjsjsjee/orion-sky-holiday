/* ========================================
   ORION SKY HOLIDAY — Navbar JS
   Handles both homepage (BEM) and country page header styles
   ======================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initStickyHeader();
    initMobileMenu();
    initMegaMenu();
    initMobileAccordion();
    initCloseOnEscape();
  });

  /* --- Sticky Header --- */
  function initStickyHeader() {
    var header = document.querySelector('.header');
    if (!header) return;
    var startsTransparent = header.classList.contains('header--transparent');

    function onScroll() {
      if (window.scrollY > 60) {
        header.classList.add('is-scrolled');
        header.classList.remove('header--transparent');
        header.classList.add('header--solid');
      } else {
        header.classList.remove('is-scrolled');
        if (startsTransparent) {
          header.classList.add('header--transparent');
          header.classList.remove('header--solid');
        } else {
          header.classList.remove('header--transparent');
          header.classList.add('header--solid');
        }
      }
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* --- Mobile Menu (handles both .hamburger/.mobile-menu and .mobile-toggle/.mobile-nav) --- */
  function initMobileMenu() {
    var toggle = document.querySelector('.hamburger') || document.querySelector('.mobile-toggle');
    var mobileMenu = document.querySelector('.mobile-menu') || document.querySelector('.mobile-nav');
    var overlay = document.querySelector('.mobile-nav__overlay');

    if (!toggle || !mobileMenu) return;

    toggle.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.contains('is-open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    if (overlay) {
      overlay.addEventListener('click', closeMobileMenu);
    }

    /* Close on link click */
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  function openMobileMenu() {
    var toggle = document.querySelector('.hamburger') || document.querySelector('.mobile-toggle');
    var mobileMenu = document.querySelector('.mobile-menu') || document.querySelector('.mobile-nav');
    var overlay = document.querySelector('.mobile-nav__overlay');

    if (toggle) toggle.classList.add('is-active');
    if (mobileMenu) mobileMenu.classList.add('is-open');
    if (overlay) overlay.classList.add('is-visible');
    document.body.classList.add('menu-open');
  }

  function closeMobileMenu() {
    var toggle = document.querySelector('.hamburger') || document.querySelector('.mobile-toggle');
    var mobileMenu = document.querySelector('.mobile-menu') || document.querySelector('.mobile-nav');
    var overlay = document.querySelector('.mobile-nav__overlay');

    if (toggle) toggle.classList.remove('is-active');
    if (mobileMenu) mobileMenu.classList.remove('is-open');
    if (overlay) overlay.classList.remove('is-visible');
    document.body.classList.remove('menu-open');

    /* Close all mobile submenus */
    document.querySelectorAll('.mobile-nav__submenu.is-open').forEach(function (sub) {
      sub.classList.remove('is-open');
    });
    document.querySelectorAll('.mobile-nav__link[aria-expanded="true"]').forEach(function (btn) {
      btn.setAttribute('aria-expanded', 'false');
    });
  }

  /* --- Desktop Mega Menu --- */
  function initMegaMenu() {
    var triggers = document.querySelectorAll('.header__nav-link--has-dropdown');
    triggers.forEach(function (trigger) {
      var megaMenu = trigger.querySelector('.mega-menu');
      if (!megaMenu) return;

      var closeTimeout;

      trigger.addEventListener('mouseenter', function () {
        clearTimeout(closeTimeout);
        closeAllMegaMenus();
        megaMenu.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      });

      trigger.addEventListener('mouseleave', function () {
        closeTimeout = setTimeout(function () {
          megaMenu.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
        }, 150);
      });

      megaMenu.addEventListener('mouseenter', function () {
        clearTimeout(closeTimeout);
      });

      megaMenu.addEventListener('mouseleave', function () {
        megaMenu.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function closeAllMegaMenus() {
    document.querySelectorAll('.mega-menu.is-open').forEach(function (m) {
      m.classList.remove('is-open');
    });
    document.querySelectorAll('.header__nav-link--has-dropdown[aria-expanded="true"]').forEach(function (t) {
      t.setAttribute('aria-expanded', 'false');
    });
  }

  /* --- Mobile Accordion (for homepage mobile nav) --- */
  function initMobileAccordion() {
    document.querySelectorAll('.mobile-nav__link[aria-expanded]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var isExpanded = this.getAttribute('aria-expanded') === 'true';
        var submenu = this.closest('div').querySelector('.mobile-nav__submenu');
        if (!submenu) return;

        if (isExpanded) {
          this.setAttribute('aria-expanded', 'false');
          submenu.classList.remove('is-open');
        } else {
          /* Close others */
          document.querySelectorAll('.mobile-nav__link[aria-expanded="true"]').forEach(function (otherBtn) {
            if (otherBtn !== btn) {
              otherBtn.setAttribute('aria-expanded', 'false');
              var otherSub = otherBtn.closest('div').querySelector('.mobile-nav__submenu');
              if (otherSub) otherSub.classList.remove('is-open');
            }
          });
          this.setAttribute('aria-expanded', 'true');
          submenu.classList.add('is-open');
        }
      });
    });
  }

  /* --- Close on ESC --- */
  function initCloseOnEscape() {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeMobileMenu();
        closeAllMegaMenus();
      }
    });
  }

  /* Expose for external use */
  window.orionCloseMobileMenu = closeMobileMenu;
})();
