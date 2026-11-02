/**
 * QRCode generator for Orion Sky Holiday
 * Standalone lightweight QR Code generator
 */
(function(window) {
  'use strict';

  // Minimal standalone QR Code generation
  // Uses QuickChart / Google Chart QR API as primary crisp image with offline SVG fallback
  function renderInstagramQR(containerId, url) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var targetUrl = url || 'https://www.instagram.com/orionskyholiday?psln=d2NnNGR2NGc3YWI3&utm_source=qr';
    var encodedUrl = encodeURIComponent(targetUrl);
    
    // Primary high-res QR code image with failover
    var img = document.createElement('img');
    img.src = 'https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=' + encodedUrl + '&margin=1';
    img.alt = 'Scan to visit @orionskyholiday on Instagram';
    img.className = 'qr-code-img';
    img.loading = 'lazy';
    img.width = 180;
    img.height = 180;
    
    img.onerror = function() {
      // Offline fallback: SVG QR placeholder with direct scan link
      container.innerHTML = '<div class="qr-offline-card">' +
        '<a href="' + targetUrl + '" target="_blank" rel="noopener" class="qr-fallback-link">' +
        '<svg viewBox="0 0 100 100" width="160" height="160" fill="currentColor">' +
        '<rect width="100" height="100" fill="#fff" rx="8"/>' +
        '<rect x="10" y="10" width="28" height="28" fill="#0f4c5c" rx="4"/>' +
        '<rect x="15" y="15" width="18" height="18" fill="#fff" rx="2"/>' +
        '<rect x="19" y="19" width="10" height="10" fill="#e36414"/>' +
        '<rect x="62" y="10" width="28" height="28" fill="#0f4c5c" rx="4"/>' +
        '<rect x="67" y="15" width="18" height="18" fill="#fff" rx="2"/>' +
        '<rect x="71" y="19" width="10" height="10" fill="#e36414"/>' +
        '<rect x="10" y="62" width="28" height="28" fill="#0f4c5c" rx="4"/>' +
        '<rect x="15" y="67" width="18" height="18" fill="#fff" rx="2"/>' +
        '<rect x="19" y="71" width="10" height="10" fill="#e36414"/>' +
        '<circle cx="50" cy="50" r="12" fill="#e36414"/>' +
        '<text x="50" y="54" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif" font-weight="bold">IG</text>' +
        '</svg>' +
        '<span style="display:block;margin-top:8px;font-size:0.85rem;color:#e36414;font-weight:600;">@orionskyholiday</span>' +
        '</a></div>';
    };

    container.innerHTML = '';
    container.appendChild(img);
  }

  window.renderInstagramQR = renderInstagramQR;

  document.addEventListener('DOMContentLoaded', function() {
    renderInstagramQR('insta-qr-container');
    renderInstagramQR('footer-insta-qr');
    renderInstagramQR('contact-insta-qr');
  });
})(window);
