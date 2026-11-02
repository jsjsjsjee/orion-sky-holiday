/* ========================================
   ORION SKY HOLIDAY — Itinerary Data & JS
   ======================================== */

(function () {
  'use strict';

  /* --- Itinerary Data --- */
  const itineraries = [
    {
      title: 'Vietnam Highlights',
      slug: 'vietnam-highlights',
      destination: 'vietnam',
      duration: '8 Days / 7 Nights',
      price: '$1,200',
      bestFor: 'First-time visitors',
      heroImage: 'assets/images/itineraries/vietnam-highlights.jpg',
      days: [
        { day: 1, title: 'Arrival in Hanoi', description: 'Welcome to Hanoi. Airport transfer and evening street food walk through the Old Quarter.' },
        { day: 2, title: 'Hanoi City Tour', description: 'Visit Ho Chi Minh Mausoleum, Temple of Literature, and Hoan Kiem Lake.' },
        { day: 3, title: 'Ha Long Bay Cruise', description: 'Full-day cruise through the limestone karsts of Ha Long Bay.' },
        { day: 4, title: 'Ha Long to Hue', description: 'Morning at leisure on the bay. Transfer to Hue via Da Nang.' },
        { day: 5, title: 'Hue Exploration', description: 'Visit the Imperial Citadel, royal tombs, and Thien Mu Pagoda.' },
        { day: 6, title: 'Hoi An Ancient Town', description: 'Explore the UNESCO-listed Hoi An old town and tailor shops.' },
        { day: 7, title: 'Ho Chi Minh City', description: 'Fly to HCMC. Visit War Remnants Museum and Ben Thanh Market.' },
        { day: 8, title: 'Departure', description: 'Free morning. Airport transfer for your onward journey.' },
      ],
      included: ['Accommodation', 'Daily breakfast', 'Airport transfers', 'Guided tours', 'Internal flights'],
      notIncluded: ['International flights', 'Travel insurance', 'Meals not mentioned', 'Personal expenses'],
      hotelOptions: ['3-star', '4-star', '5-star'],
      customizationOptions: ['Add Mekong Delta day trip', 'Extend in Hoi An', 'Upgrade to luxury cruise'],
    },
    {
      title: 'Thailand Escape',
      slug: 'thailand-escape',
      destination: 'thailand',
      duration: '7 Days / 6 Nights',
      price: '$950',
      bestFor: 'Beach & culture lovers',
      heroImage: 'assets/images/itineraries/thailand-escape.jpg',
      days: [
        { day: 1, title: 'Arrival in Bangkok', description: 'Airport pickup. Evening at Khao San Road or rooftop bar.' },
        { day: 2, title: 'Bangkok Temples', description: 'Visit Grand Palace, Wat Pho, and Wat Arun.' },
        { day: 3, title: 'Floating Market & Train', description: 'Day trip to Damnoen Saduak Floating Market and Maeklong Railway.' },
        { day: 4, title: 'Fly to Chiang Mai', description: 'Afternoon arrival. Explore Night Bazaar.' },
        { day: 5, title: 'Chiang Mai Temples', description: 'Visit Doi Suthep and old city temples.' },
        { day: 6, title: 'Elephant Sanctuary', description: 'Visit ethical elephant sanctuary. Evening cooking class.' },
        { day: 7, title: 'Departure', description: 'Free morning. Airport transfer.' },
      ],
      included: ['Accommodation', 'Daily breakfast', 'Airport transfers', 'Guided tours', 'Domestic flight'],
      notIncluded: ['International flights', 'Travel insurance', 'Meals not mentioned', 'Personal expenses'],
      hotelOptions: ['3-star', '4-star', '5-star'],
      customizationOptions: ['Add Phuket extension', 'Add Krabi beach days', 'Private cooking class'],
    },
    {
      title: 'Japan Discovery',
      slug: 'japan-discovery',
      destination: 'japan',
      duration: '10 Days / 9 Nights',
      price: '$2,400',
      bestFor: 'Culture enthusiasts',
      heroImage: 'assets/images/itineraries/japan-discovery.jpg',
      days: [
        { day: 1, title: 'Arrival in Tokyo', description: 'Airport transfer. Welcome dinner in Shibuya.' },
        { day: 2, title: 'Tokyo Exploration', description: 'Visit Senso-ji, Meiji Shrine, and Harajuku.' },
        { day: 3, title: 'Day Trip to Mt. Fuji', description: 'Excursion to Hakone and views of Mt. Fuji.' },
        { day: 4, title: 'Bullet Train to Kyoto', description: 'Shinkansen to Kyoto. Evening walk in Gion.' },
        { day: 5, title: 'Kyoto Temples', description: 'Visit Fushimi Inari, Kinkaku-ji, and Arashiyama Bamboo.' },
        { day: 6, title: 'Nara Day Trip', description: 'Visit Nara Park and Todai-ji Temple.' },
        { day: 7, title: 'Osaka Food Tour', description: 'Street food tour in Dotonbori and Osaka Castle.' },
        { day: 8, title: 'Hiroshima & Miyajima', description: 'Day trip to Peace Memorial and floating torii gate.' },
        { day: 9, title: 'Return to Tokyo', description: 'Free afternoon for shopping.' },
        { day: 10, title: 'Departure', description: 'Airport transfer for your flight home.' },
      ],
      included: ['Accommodation', 'Daily breakfast', 'Japan Rail Pass', 'Airport transfers', 'Guided tours'],
      notIncluded: ['International flights', 'Travel insurance', 'Most lunches & dinners', 'Personal expenses'],
      hotelOptions: ['3-star', '4-star', 'Ryokan experience'],
      customizationOptions: ['Add Hakone hot spring stay', 'Add Hiroshima overnight', 'Add anime/tokyo pop culture tour'],
    },
  ];

  /* Expose data */
  window.orionItineraries = itineraries;

  /* --- Helper: get itinerary by slug --- */
  window.orionGetItinerary = function (slug) {
    return itineraries.find(function (it) {
      return it.slug === slug;
    });
  };

  /* --- Helper: get itineraries by destination --- */
  window.orionGetItinerariesByDestination = function (destSlug) {
    return itineraries.filter(function (it) {
      return it.destination === destSlug;
    });
  };
})();
