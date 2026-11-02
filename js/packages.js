/* ========================================
   PACKAGES & BROCHURES — Lightbox
   ======================================== */
(function () {
  'use strict';

  var triggers = Array.prototype.slice.call(document.querySelectorAll('[data-brochure]'));
  var lightbox = document.getElementById('brochure-lightbox');
  if (!triggers.length || !lightbox) return;

  var img = lightbox.querySelector('.brochure-lightbox__img');
  var titleEl = lightbox.querySelector('.brochure-lightbox__title');
  var metaEl = lightbox.querySelector('.brochure-lightbox__meta');
  var countEl = lightbox.querySelector('.brochure-lightbox__count');
  var originalEl = lightbox.querySelector('.brochure-lightbox__original');
  var closeBtn = lightbox.querySelector('.brochure-lightbox__close');
  var prevBtn = lightbox.querySelector('.brochure-lightbox__nav--prev');
  var nextBtn = lightbox.querySelector('.brochure-lightbox__nav--next');

  var items = triggers.map(function (el) {
    return {
      src: el.getAttribute('data-brochure'),
      title: el.getAttribute('data-title') || '',
      meta: el.getAttribute('data-meta') || '',
      alt: (el.querySelector('img') && el.querySelector('img').getAttribute('alt')) || ''
    };
  });

  var current = 0;
  var lastFocused = null;

  function render(index) {
    current = (index + items.length) % items.length;
    var item = items[current];

    img.src = item.src;
    img.alt = item.alt || item.title;
    titleEl.textContent = item.title;
    metaEl.textContent = item.meta;
    countEl.textContent = (current + 1) + ' of ' + items.length;
    originalEl.href = item.src;
  }

  function open(index) {
    lastFocused = document.activeElement;
    render(index);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-lightbox-open');
    closeBtn.focus();
  }

  function close() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-lightbox-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  function next() {
    render(current + 1);
  }

  function prev() {
    render(current - 1);
  }

  triggers.forEach(function (el, index) {
    el.addEventListener('click', function () {
      open(index);
    });
  });

  closeBtn.addEventListener('click', close);
  nextBtn.addEventListener('click', function (e) { e.stopPropagation(); next(); });
  prevBtn.addEventListener('click', function (e) { e.stopPropagation(); prev(); });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft') prev();
  });

  // Swipe support on touch devices
  var touchStartX = null;
  lightbox.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener('touchend', function (e) {
    if (touchStartX === null) return;
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX = null;
  }, { passive: true });
})();
