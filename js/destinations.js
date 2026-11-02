/* ========================================
   ORION SKY HOLIDAY — Destinations Data & JS
   ======================================== */

(function () {
  'use strict';

  // DEMO DESTINATION DATA
  // Replace with confirmed client destinations before launch.
  var destinations = [
    {
      name: 'Vietnam',
      slug: 'vietnam',
      region: 'Southeast Asia',
      image: '../assets/images/destinations/vietnam.jpg',
      shortDescription: 'Discover historic cities, dramatic landscapes and unforgettable food.',
      hook: 'Culture & Coastlines',
      budget: 'From \u20B9XX,XXX',
      bestTime: 'October \u2013 April',
      duration: '7\u201312 days',
      flightTime: '~4.5 hours',
      visa: 'E-Visa available',
    },
    {
      name: 'Thailand',
      slug: 'thailand',
      region: 'Southeast Asia',
      image: '../assets/images/destinations/thailand.jpg',
      shortDescription: 'Golden temples, tropical islands, and legendary hospitality.',
      hook: 'Temples & Islands',
      budget: 'From \u20B9XX,XXX',
      bestTime: 'November \u2013 March',
      duration: '5\u201312 days',
      flightTime: '~4 hours',
      visa: 'Visa-free for many',
    },
    {
      name: 'Bali',
      slug: 'bali',
      region: 'Southeast Asia',
      image: '../assets/images/destinations/bali.jpg',
      shortDescription: 'Emerald rice terraces, sacred temples, and pristine beaches.',
      hook: 'Island of Gods',
      budget: 'From \u20B9XX,XXX',
      bestTime: 'April \u2013 October',
      duration: '5\u201310 days',
      flightTime: '~6 hours',
      visa: 'Visa on arrival',
    },
    {
      name: 'Singapore',
      slug: 'singapore',
      region: 'Southeast Asia',
      image: '../assets/images/destinations/singapore.jpg',
      shortDescription: 'A futuristic city-state blending cultures and world-class attractions.',
      hook: 'Future City',
      budget: 'From \u20B9XX,XXX',
      bestTime: 'Year-round',
      duration: '3\u20135 days',
      flightTime: '~5.5 hours',
      visa: 'Visa-free for many',
    },
    {
      name: 'Japan',
      slug: 'japan',
      region: 'East Asia',
      image: '../assets/images/destinations/japan.jpg',
      shortDescription: 'Where centuries of tradition meet modern cities and remarkable food.',
      hook: 'Tradition & Innovation',
      budget: 'From \u20B9XX,XXX',
      bestTime: 'Mar\u2013May, Sep\u2013Nov',
      duration: '8\u201316 days',
      flightTime: '~7 hours',
      visa: 'Visa required',
    },
    {
      name: 'South Korea',
      slug: 'south-korea',
      region: 'East Asia',
      image: '../assets/images/destinations/south-korea.jpg',
      shortDescription: 'K-culture, historic palaces, mountain trails and incredible food.',
      hook: 'K-Culture & Heritage',
      budget: 'From \u20B9XX,XXX',
      bestTime: 'Mar\u2013May, Sep\u2013Nov',
      duration: '6\u201310 days',
      flightTime: '~6.5 hours',
      visa: 'Visa-free for many',
    },
    {
      name: 'Maldives',
      slug: 'maldives',
      region: 'South Asia',
      image: '../assets/images/destinations/maldives.jpg',
      shortDescription: 'Crystal-clear waters, overwater villas, and untouched coral reefs.',
      hook: 'Overwater Paradise',
      budget: 'From \u20B9XX,XXX',
      bestTime: 'November \u2013 April',
      duration: '4\u20138 days',
      flightTime: '~4.5 hours',
      visa: 'Visa on arrival',
    },
    {
      name: 'Sri Lanka',
      slug: 'sri-lanka',
      region: 'South Asia',
      image: '../assets/images/destinations/sri-lanka.jpg',
      shortDescription: 'Tea-covered hills, ancient ruins, wildlife and endless coastline.',
      hook: 'Timeless Journeys',
      budget: 'From \u20B9XX,XXX',
      bestTime: 'December \u2013 March',
      duration: '7\u201312 days',
      flightTime: '~3.5 hours',
      visa: 'ETA available',
    },
    {
      name: 'Georgia',
      slug: 'georgia',
      region: 'Central & West Asia',
      image: '../assets/images/destinations/georgia.jpg',
      shortDescription: 'Dramatic Caucasus mountains, ancient wine culture and warm hospitality.',
      hook: 'Caucasus Discovery',
      budget: 'From \u20B9XX,XXX',
      bestTime: 'May \u2013 October',
      duration: '6\u201310 days',
      flightTime: '~5 hours',
      visa: 'Visa-free for many',
    },
    {
      name: 'Turkey',
      slug: 'turkey',
      region: 'Central & West Asia',
      image: '../assets/images/destinations/turkey.jpg',
      shortDescription: 'Bazaars, bosphorus views, fairy chimneys and rich heritage.',
      hook: 'East Meets West',
      budget: 'From \u20B9XX,XXX',
      bestTime: 'Apr\u2013Jun, Sep\u2013Nov',
      duration: '7\u201314 days',
      flightTime: '~6 hours',
      visa: 'E-Visa available',
    },
    {
      name: 'UAE',
      slug: 'uae',
      region: 'Central & West Asia',
      image: '../assets/images/destinations/uae.jpg',
      shortDescription: 'Ultra-modern skyline, luxury shopping, desert adventures and culture.',
      hook: 'Modern Luxury',
      budget: 'From \u20B9XX,XXX',
      bestTime: 'October \u2013 April',
      duration: '4\u20138 days',
      flightTime: '~3.5 hours',
      visa: 'Visa on arrival',
    },
  ];

  /* Expose data */
  window.orionDestinations = destinations;

  /* --- Helper: get destination by slug --- */
  window.orionGetDestination = function (slug) {
    return destinations.find(function (d) {
      return d.slug === slug;
    });
  };

  /* --- Helper: get destinations by region --- */
  window.orionGetDestinationsByRegion = function (region) {
    return destinations.filter(function (d) {
      return d.region === region;
    });
  };

  /* --- Generate destination card HTML (for hub page) --- */
  window.orionHubCard = function (dest) {
    return (
      '<a href="' + dest.slug + '.html" class="hub-card" data-region="' + dest.region + '" data-name="' + dest.name.toLowerCase() + '" data-hook="' + dest.hook.toLowerCase() + '" data-search="' + (dest.name + ' ' + dest.hook + ' ' + dest.region + ' ' + dest.shortDescription).toLowerCase() + '">' +
        '<div class="hub-card__img">' +
          '<img src="' + dest.image + '" alt="' + dest.name + ' travel destination" loading="lazy">' +
        '</div>' +
        '<div class="hub-card__body">' +
          '<span class="hub-card__region">' + dest.region + '</span>' +
          '<h3 class="hub-card__name">' + dest.name + '</h3>' +
          '<p class="hub-card__hook">' + dest.hook + '</p>' +
          '<p class="hub-card__desc">' + dest.shortDescription + '</p>' +
          '<div class="hub-card__meta">' +
            '<span class="hub-card__price">' + dest.budget + ' / person</span>' +
            '<span class="hub-card__duration">' + dest.duration + '</span>' +
          '</div>' +
          '<span class="hub-card__cta">Explore ' + dest.name + ' &rarr;</span>' +
        '</div>' +
      '</a>'
    );
  };

  /* --- Generate homepage destination card --- */
  window.orionDestinationCard = function (dest) {
    return (
      '<a href="destinations/' + dest.slug + '.html" class="dest-card">' +
        '<div class="dest-card__img">' +
          '<img src="' + dest.image.replace('..', '') + '" alt="' + dest.name + '" loading="lazy">' +
        '</div>' +
        '<div class="dest-card__overlay"></div>' +
        '<div class="dest-card__body">' +
          '<span class="dest-card__region">' + dest.region + '</span>' +
          '<h3 class="dest-card__title">' + dest.name + '</h3>' +
          '<p class="dest-card__hook">' + dest.hook + '</p>' +
          '<span class="dest-card__price">' + dest.budget + ' / person</span>' +
          '<span class="dest-card__cta">Explore &rarr;</span>' +
        '</div>' +
      '</a>'
    );
  };
})();
