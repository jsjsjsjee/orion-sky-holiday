# Orion Sky Holiday

Premium customised travel experiences across Asia.

## Technology

- HTML5
- CSS3 (Custom Properties, Flexbox, Grid, clamp())
- Vanilla JavaScript (ES6, no frameworks)

**No frameworks, no libraries, no build tools.**

## Folder Structure

```
orion-sky-holiday/
│
├── index.html
│
├── destinations/
│   ├── index.html
│   ├── vietnam.html
│   ├── thailand.html
│   ├── japan.html
│   ├── singapore.html
│   ├── bali.html
│   └── maldives.html
│
├── itineraries/
│   ├── vietnam-highlights.html
│   ├── thailand-escape.html
│   ├── japan-discovery.html
│   └── ...
│
├── trip-styles/
│   ├── honeymoon.html
│   ├── family.html
│   ├── adventure.html
│   └── luxury.html
│
├── plan-your-trip.html
├── about.html
├── reviews.html
├── travel-guides.html
├── contact.html
├── thank-you.html
├── 404.html
│
├── legal/
│   ├── terms-and-conditions.html
│   ├── privacy-policy.html
│   ├── booking-and-cancellation-policy.html
│   └── payment-terms.html
│
├── css/
│   ├── style.css          — Core design system & layout
│   ├── responsive.css     — Breakpoint overrides
│   └── components.css     — Reusable UI components
│
├── js/
│   ├── main.js            — Global init, smooth scroll, utilities
│   ├── navbar.js          — Sticky header, mega menu, mobile nav
│   ├── animations.js      — Scroll reveal animations
│   ├── destinations.js    — Destination data & helpers
│   ├── itinerary.js       — Itinerary data & helpers
│   └── enquiry-form.js    — Form validation & WhatsApp integration
│
├── assets/
│   ├── images/
│   │   ├── hero/
│   │   ├── destinations/
│   │   ├── itineraries/
│   │   ├── experiences/
│   │   ├── testimonials/
│   │   ├── blog/
│   │   └── general/
│   ├── icons/
│   └── logo/
│
└── README.md
```

## How to Run Locally

### Option 1: VS Code Live Server (Recommended)

1. Install [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code
2. Open the `orion-sky-holiday` folder in VS Code
3. Right-click `index.html` → **Open with Live Server**
4. The site will open at `http://127.0.0.1:5500`

### Option 2: Python Simple Server

```bash
cd orion-sky-holiday
python -m http.server 8000
```

Then open `http://localhost:8000`

### Option 3: Node http-server

```bash
npx http-server orion-sky-holiday -p 8000
```

## How to Replace Images

1. Place your images in the appropriate `assets/images/` subfolder
2. Use the same filenames as the placeholders, or update the `src` attributes in HTML and the data objects in `js/destinations.js` and `js/itinerary.js`
3. Recommended formats: `.jpg` for photos, `.webp` for optimized delivery
4. Hero images: 1920×1080px recommended
5. Destination cards: 800×600px recommended
6. All below-the-fold images use `loading="lazy"`

## How to Update Destinations

Edit the `destinations` array in `js/destinations.js`:

```javascript
const destinations = [
  {
    name: "Vietnam",
    slug: "vietnam",
    region: "Southeast Asia",
    image: "assets/images/destinations/vietnam.jpg",
    shortDescription: "...",
    bestTime: "Oct – Apr",
    visa: "E-Visa available",
    duration: "7 – 14 days",
    budget: "From $800",
    flightTime: "~4.5 hours",
  },
  // Add more destinations here
];
```

## How to Update Itineraries

Edit the `itineraries` array in `js/itinerary.js`:

```javascript
const itineraries = [
  {
    title: "Vietnam Highlights",
    slug: "vietnam-highlights",
    destination: "vietnam",
    duration: "8 Days / 7 Nights",
    price: "$1,200",
    bestFor: "First-time visitors",
    // ...
  },
];
```

## How to Update Contact Information

Search for the placeholder strings across HTML files and replace:

| Placeholder | Replace With |
|---|---|
| `[PHONE NUMBER]` | Your phone number |
| `[EMAIL ADDRESS]` | Your email address |
| `[WHATSAPP_NUMBER]` | WhatsApp number (digits only, with country code) |
| `[INSTAGRAM_URL]` | Your Instagram profile URL |
| `[FACEBOOK_URL]` | Your Facebook page URL |
| `[YOUTUBE_URL]` | Your YouTube channel URL |
| `[REGISTRATION NUMBER]` | Your business registration number |

## How to Update WhatsApp Number

In `js/enquiry-form.js`, replace `[WHATSAPP_NUMBER]` with your actual WhatsApp number (digits only, include country code without `+`).

Example for +1 234 567 8900: use `12345678900`

## Design System

| Token | Value | Usage |
|---|---|---|
| `--primary` | `#0F4C5C` | Primary brand color |
| `--sand` | `#E8D5B7` | Warm accent |
| `--coral` | `#E85D3D` | CTA / accent |
| `--off-white` | `#FAF7F2` | Page background |

**Fonts:** Playfair Display (headings) + Inter (body)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari / Chrome on iOS/Android

## Notes

- This is a static HTML website — no build step required
- All JavaScript is vanilla ES6, no transpilation needed
- CSS uses custom properties for theming
- Responsive from 320px to 1920px+
- Respects `prefers-reduced-motion`
- Accessible: keyboard navigation, ARIA attributes, focus states
