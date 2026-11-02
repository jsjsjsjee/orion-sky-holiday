/* ========================================
   ORION SKY HOLIDAY — Country Page JS
   Multi-step enquiry form, FAQ accordion,
   localStorage persistence, WhatsApp send
   ======================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initCountryPageNav();
    initFaqAccordion();
    initMultiStepForm();
    initWhatsAppButton();
  });

  /* ----- Country Page Sticky Nav ----- */
  function initCountryPageNav() {
    var nav = document.querySelector('.cp-nav');
    if (!nav) return;
    var offsetTop = nav.offsetTop;

    window.addEventListener('scroll', function () {
      if (window.pageYOffset >= offsetTop) {
        nav.classList.add('is-stuck');
      } else {
        nav.classList.remove('is-stuck');
      }
    });

    /* Smooth scroll for nav links */
    nav.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.querySelector(link.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70,
            behavior: 'smooth',
          });
        }
      });
    });
  }

  /* ----- FAQ Accordion ----- */
  function initFaqAccordion() {
    var faqs = document.querySelectorAll('.faq-item');
    faqs.forEach(function (item) {
      var question = item.querySelector('.faq-question');
      if (!question) return;
      question.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');
        /* Close all others */
        faqs.forEach(function (f) {
          f.classList.remove('is-open');
        });
        if (!isOpen) {
          item.classList.add('is-open');
        }
      });
    });
  }

  /* ----- Multi-Step Form ----- */
  function initMultiStepForm() {
    var form = document.querySelector('.cp-form');
    if (!form) return;

    var currentStep = 1;
    var totalSteps = 3;

    /* Load saved data from localStorage */
    loadFormData(form);

    /* Next / Prev buttons */
    form.querySelectorAll('[data-action="next"]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (validateStep(currentStep, form)) {
          saveFormData(form);
          goToStep(currentStep + 1);
        }
      });
    });

    form.querySelectorAll('[data-action="prev"]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        saveFormData(form);
        goToStep(currentStep - 1);
      });
    });

    /* Submit */
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateStep(currentStep, form)) return;
      saveFormData(form);
      sendWhatsAppMessage(form);
    });

    /* Auto-fill destination if present on page */
    var destInput = form.querySelector('[name="destination"]');
    if (destInput && destInput.value === '') {
      var pageDest = document.querySelector('.cp-hero') || document.querySelector('[data-country]');
      if (pageDest) {
        var country = pageDest.getAttribute('data-country') || '';
        if (country) destInput.value = country;
      }
    }

    function goToStep(step) {
      if (step < 1 || step > totalSteps) return;
      /* Hide all steps */
      form.querySelectorAll('.form-step').forEach(function (s) {
        s.classList.remove('is-active');
      });
      /* Show target step */
      var target = form.querySelector('.form-step[data-step="' + step + '"]');
      if (target) target.classList.add('is-active');

      /* Update progress */
      form.querySelectorAll('.form-progress-item').forEach(function (item, i) {
        if (i + 1 < step) {
          item.classList.add('is-completed');
          item.classList.remove('is-active');
        } else if (i + 1 === step) {
          item.classList.add('is-active');
          item.classList.remove('is-completed');
        } else {
          item.classList.remove('is-active', 'is-completed');
        }
      });

      currentStep = step;
    }
  }

  /* ----- Validation ----- */
  function validateStep(step, form) {
    clearErrors(form);
    var isValid = true;

    if (step === 1) {
      var name = form.querySelector('[name="name"]');
      var email = form.querySelector('[name="email"]');
      var phone = form.querySelector('[name="phone"]');

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
    }

    if (step === 2) {
      var dest = form.querySelector('[name="destination"]');
      var travelDate = form.querySelector('[name="travel-date"]');
      var travellers = form.querySelector('[name="travellers"]');

      if (dest && !dest.value.trim()) {
        showError(dest, 'Please enter a destination');
        isValid = false;
      }
      if (travelDate && !travelDate.value) {
        showError(travelDate, 'Please select a travel month');
        isValid = false;
      }
      if (travellers && !travellers.value) {
        showError(travellers, 'Please select travellers');
        isValid = false;
      }
    }

    return isValid;
  }

  function showError(input, message) {
    var group = input.closest('.form-group');
    if (group) {
      group.classList.add('has-error');
      var err = group.querySelector('.form-error');
      if (err) err.textContent = message;
    }
  }

  function clearErrors(form) {
    form.querySelectorAll('.form-error').forEach(function (e) {
      e.textContent = '';
    });
    form.querySelectorAll('.form-group').forEach(function (g) {
      g.classList.remove('has-error');
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ----- localStorage Persistence ----- */
  function saveFormData(form) {
    if (form.getAttribute('data-no-persist')) return;
    var data = {};
    form.querySelectorAll('input, select, textarea').forEach(function (el) {
      if (el.name) data[el.name] = el.value;
    });
    try {
      localStorage.setItem('orionEnquiry', JSON.stringify(data));
    } catch (e) { /* silent */ }
  }

  function loadFormData(form) {
    if (form.getAttribute('data-no-persist')) return;
    try {
      var raw = localStorage.getItem('orionEnquiry');
      if (!raw) return;
      var data = JSON.parse(raw);
      Object.keys(data).forEach(function (key) {
        var el = form.querySelector('[name="' + key + '"]');
        if (el && data[key]) el.value = data[key];
      });
    } catch (e) { /* silent */ }
  }

  /* ----- WhatsApp Send ----- */
  function sendWhatsAppMessage(form) {
    var phone = '917990829583';
    var name = (form.querySelector('[name="name"]') || {}).value || '';
    var destination = (form.querySelector('[name="destination"]') || {}).value || '';
    var travelDate = (form.querySelector('[name="travel-date"]') || {}).value || '';
    var travellers = (form.querySelector('[name="travellers"]') || {}).value || '';
    var budget = (form.querySelector('[name="budget"]') || {}).value || '';
    var message = (form.querySelector('[name="message"]') || {}).value || '';

    var text = 'Hi, I\'d like to plan a trip to ' + destination + '.';
    if (name) text += '\nName: ' + name;
    if (travelDate) text += '\nTravel Month: ' + travelDate;
    if (travellers) text += '\nTravellers: ' + travellers;
    if (budget) text += '\nBudget: ' + budget;
    if (message) text += '\nNote: ' + message;
    text += '\n\nPlease share the best options.';

    window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(text), '_blank');
  }

  /* ----- WhatsApp Float Button ----- */
  function initWhatsAppButton() {
    var btns = document.querySelectorAll('.whatsapp-float');
    var defaultMsg = "Hi, I'd like to plan a trip with Orion Sky Holiday.";

    btns.forEach(function (btn) {
      var destination = btn.getAttribute('data-destination');
      var msg = destination
        ? "Hi, I'd like to plan a trip to " + destination + " with Orion Sky Holiday."
        : defaultMsg;

      var phone = '917990829583';
      btn.setAttribute('href', 'https://wa.me/' + phone + '?text=' + encodeURIComponent(msg));
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer');
    });
  }
})();
