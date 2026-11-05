/* ========================================
   ORION SKY HOLIDAY — Enquiry Form JS
   ======================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initHeroForm();
    initEnquiryForm();
    initWhatsAppButton();
  });

  /* --- Hero Mini Form --- */
  function initHeroForm() {
    const heroForm = document.querySelector('.hero-form');
    if (!heroForm) return;

    heroForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const destination = heroForm.querySelector('[name="destination"]');
      const month = heroForm.querySelector('[name="month"]');
      const travellers = heroForm.querySelector('[name="travellers"]');

      /* Basic validation */
      let isValid = true;

      if (destination && !destination.value) {
        destination.focus();
        isValid = false;
      }

      if (month && !month.value) {
        month.focus();
        isValid = false;
      }

      if (!isValid) return;

      /* Build query string */
      const params = new URLSearchParams();
      if (destination && destination.value) params.set('destination', destination.value);
      if (month && month.value) params.set('month', month.value);
      if (travellers && travellers.value) params.set('travellers', travellers.value);

      /* Redirect to plan-your-trip page with params */
      window.location.href = 'plan-your-trip.html?' + params.toString();
    });
  }

  /* --- Enquiry Form Handling --- */
  function initEnquiryForm() {
    const form = document.querySelector('.enquiry-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      /* Basic validation */
      const name = form.querySelector('[name="name"]');
      const email = form.querySelector('[name="email"]');
      const phone = form.querySelector('[name="phone"]');
      const destination = form.querySelector('[name="destination"]');
      const message = form.querySelector('[name="message"]');

      let isValid = true;

      /* Clear previous errors */
      form.querySelectorAll('.form-error').forEach(function (err) {
        err.textContent = '';
      });
      form.querySelectorAll('.form-group').forEach(function (group) {
        group.classList.remove('has-error');
      });

      if (name && !name.value.trim()) {
        showError(name, 'Please enter your name');
        isValid = false;
      }

      if (email && !isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
      }

      if (phone && !phone.value.trim()) {
        showError(phone, 'Please enter your phone number');
        isValid = false;
      }

      if (isValid) {
        /* In a real project, this would POST to a server */
        /* For now, redirect to thank-you page */
        window.location.href = 'thank-you.html';
      }
    });
  }

  function showError(input, message) {
    const group = input.closest('.form-group');
    if (group) {
      group.classList.add('has-error');
      const errorEl = group.querySelector('.form-error');
      if (errorEl) {
        errorEl.textContent = message;
      }
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* --- WhatsApp Button with Dynamic Message --- */
  function initWhatsAppButton() {
    const whatsappBtns = document.querySelectorAll('.whatsapp-float');
    const defaultMessage = "Hi, I'd like to plan a trip with Orion Sky Holiday.";

    whatsappBtns.forEach(function (btn) {
      const destination = btn.getAttribute('data-destination');
      let message = defaultMessage;

      if (destination) {
        message = "Hi, I'd like to plan a trip to " + destination + " with Orion Sky Holiday.";
      }

      const phone = '919428301111';
      const url = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message);

      btn.setAttribute('href', url);
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer');
    });
  }
})();
