/* ==========================================================================
   ORION SKY HOLIDAY — CRUISE BOOKINGS JAVASCRIPT (js/cruises.js)
   Handles tabs, FAQ accordion, package details modal, enquiry validation & WhatsApp integration
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initFaqAccordion();
    initDestTabs();
    initPackageDetailsToggle();
    initEnquiryForm();
    initEnquireButtons();
  });

  /* --------------------------------------------------------------------------
     1. FAQ Accordion
     -------------------------------------------------------------------------- */
  function initFaqAccordion() {
    var faqItems = document.querySelectorAll('.cruise-faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(function (item) {
      var trigger = item.querySelector('.cruise-faq-trigger');
      var content = item.querySelector('.cruise-faq-content');
      if (!trigger || !content) return;

      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');

        // Close other open items
        faqItems.forEach(function (other) {
          if (other !== item && other.classList.contains('is-open')) {
            other.classList.remove('is-open');
            var otherContent = other.querySelector('.cruise-faq-content');
            if (otherContent) otherContent.style.maxHeight = null;
          }
        });

        // Toggle current
        if (isOpen) {
          item.classList.remove('is-open');
          content.style.maxHeight = null;
        } else {
          item.classList.add('is-open');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     2. Destination Tabs (All, India, International)
     -------------------------------------------------------------------------- */
  function initDestTabs() {
    var tabBtns = document.querySelectorAll('.cruise-dest-tab-btn');
    var destCards = document.querySelectorAll('.cruise-dest-card');
    if (!tabBtns.length || !destCards.length) return;

    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');

        tabBtns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');

        destCards.forEach(function (card) {
          var region = card.getAttribute('data-region');
          if (filter === 'all' || region === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     3. Featured Package Details Toggle
     -------------------------------------------------------------------------- */
  function initPackageDetailsToggle() {
    var toggleBtn = document.getElementById('toggleItineraryBtn');
    var itinBlock = document.getElementById('packageItineraryBlock');
    if (!toggleBtn || !itinBlock) return;

    toggleBtn.addEventListener('click', function () {
      var isOpen = itinBlock.classList.contains('is-open');
      if (isOpen) {
        itinBlock.classList.remove('is-open');
        toggleBtn.textContent = 'View Package Details';
      } else {
        itinBlock.classList.add('is-open');
        toggleBtn.textContent = 'Hide Package Details';
        itinBlock.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. Pre-fill Form from "Enquire Now" Buttons
     -------------------------------------------------------------------------- */
  function initEnquireButtons() {
    var buttons = document.querySelectorAll('[data-enquire-dest], [data-enquire-cabin], [data-enquire-pkg]');
    var formSection = document.getElementById('cruise-enquiry');
    var destSelect = document.getElementById('cruiseDestination');
    var cabinSelect = document.getElementById('cabinCategory');
    var reqText = document.getElementById('specialRequirements');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var dest = btn.getAttribute('data-enquire-dest');
        var cabin = btn.getAttribute('data-enquire-cabin');
        var pkg = btn.getAttribute('data-enquire-pkg');

        if (dest && destSelect) {
          for (var i = 0; i < destSelect.options.length; i++) {
            if (destSelect.options[i].value.toLowerCase().indexOf(dest.toLowerCase()) !== -1) {
              destSelect.selectedIndex = i;
              break;
            }
          }
        }

        if (cabin && cabinSelect) {
          for (var j = 0; j < cabinSelect.options.length; j++) {
            if (cabinSelect.options[j].value.toLowerCase().indexOf(cabin.toLowerCase()) !== -1) {
              cabinSelect.selectedIndex = j;
              break;
            }
          }
        }

        if (pkg && reqText) {
          reqText.value = 'Interested in: ' + pkg + (reqText.value ? '\n' + reqText.value : '');
        }

        if (formSection) {
          formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     5. Cruise Enquiry Form Validation & Submission
     -------------------------------------------------------------------------- */
  function initEnquiryForm() {
    var form = document.getElementById('cruiseEnquiryForm');
    var successCard = document.getElementById('cruiseSuccessCard');
    var refPill = document.getElementById('cruiseSuccessRef');
    var sendWhatsAppBtn = document.getElementById('cruiseSuccessWhatsAppBtn');

    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameField = document.getElementById('fullName');
      var phoneField = document.getElementById('mobileNumber');
      var emailField = document.getElementById('emailAddress');
      var destField = document.getElementById('cruiseDestination');
      var cityField = document.getElementById('departureCity');
      var dateField = document.getElementById('travelDate');
      var adultsField = document.getElementById('adultCount');
      var childrenField = document.getElementById('childCount');
      var cabinField = document.getElementById('cabinCategory');
      var budgetField = document.getElementById('budgetRange');
      var reqField = document.getElementById('specialRequirements');

      var isValid = true;

      // Validate Name
      if (!nameField.value.trim() || nameField.value.trim().length < 2) {
        setFieldError(nameField, true);
        isValid = false;
      } else {
        setFieldError(nameField, false);
      }

      // Validate Phone (At least 10 digits)
      var phoneDigits = phoneField.value.replace(/\D/g, '');
      if (phoneDigits.length < 10) {
        setFieldError(phoneField, true);
        isValid = false;
      } else {
        setFieldError(phoneField, false);
      }

      // Validate Email
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailField.value.trim() || !emailRegex.test(emailField.value.trim())) {
        setFieldError(emailField, true);
        isValid = false;
      } else {
        setFieldError(emailField, false);
      }

      // Validate Destination
      if (!destField.value) {
        setFieldError(destField, true);
        isValid = false;
      } else {
        setFieldError(destField, false);
      }

      // If invalid, focus first error and STOP! Do not show success!
      if (!isValid) {
        var firstError = form.querySelector('.has-error input, .has-error select');
        if (firstError) firstError.focus();
        return;
      }

      // Generate Reference Code
      var timestamp = Date.now().toString().slice(-4);
      var randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      var refCode = 'OSH-CRZ-' + randomChar + timestamp;

      var enquiryData = {
        ref: refCode,
        fullName: nameField.value.trim(),
        mobile: phoneField.value.trim(),
        email: emailField.value.trim(),
        destination: destField.value,
        departureCity: cityField ? cityField.value.trim() : '',
        travelDate: dateField ? dateField.value : '',
        adults: adultsField ? adultsField.value : '2',
        children: childrenField ? childrenField.value : '0',
        cabin: cabinField ? cabinField.value : 'Interior Standard Cabin',
        budget: budgetField ? budgetField.value : '',
        requirements: reqField ? reqField.value.trim() : '',
        submittedAt: new Date().toISOString()
      };

      // Save to localStorage
      try {
        var existing = JSON.parse(localStorage.getItem('osh_cruise_enquiries') || '[]');
        existing.push(enquiryData);
        localStorage.setItem('osh_cruise_enquiries', JSON.stringify(existing));
      } catch (err) {
        console.warn('Could not save to localStorage', err);
      }

      // Compose WhatsApp Message
      var waMsg = 'Hello Orion Sky Holiday! I have submitted a cruise enquiry on your website.\n\n' +
        '*Booking Reference:* ' + enquiryData.ref + '\n' +
        '*Name:* ' + enquiryData.fullName + '\n' +
        '*Phone:* ' + enquiryData.mobile + '\n' +
        '*Destination:* ' + enquiryData.destination + '\n' +
        (enquiryData.departureCity ? '*Departure City:* ' + enquiryData.departureCity + '\n' : '') +
        (enquiryData.travelDate ? '*Travel Date:* ' + enquiryData.travelDate + '\n' : '') +
        '*Passengers:* ' + enquiryData.adults + ' Adults, ' + enquiryData.children + ' Children\n' +
        '*Cabin:* ' + enquiryData.cabin + '\n' +
        (enquiryData.budget ? '*Budget:* ' + enquiryData.budget + '\n' : '') +
        (enquiryData.requirements ? '*Notes:* ' + enquiryData.requirements + '\n' : '') +
        '\nPlease share pricing, cabin availability and booking details. Thank you!';

      var waUrl = 'https://wa.me/919428301111?text=' + encodeURIComponent(waMsg);

      // Display Success Card
      if (refPill) refPill.textContent = 'Reference ID: ' + refCode;
      if (sendWhatsAppBtn) sendWhatsAppBtn.setAttribute('href', waUrl);

      form.style.display = 'none';
      if (successCard) {
        successCard.classList.add('is-visible');
        successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    function setFieldError(field, hasError) {
      var group = field.closest('.cruise-form-group');
      if (!group) return;
      if (hasError) {
        group.classList.add('has-error');
      } else {
        group.classList.remove('has-error');
      }
    }
  }

})();

