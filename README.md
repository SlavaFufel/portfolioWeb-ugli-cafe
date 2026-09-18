# Ugli Coffee — Artisanal Coffee & Roastery

A landing page for an artisanal coffee roastery based in Moscow. Built as a portfolio project showcasing interactive UX, clean layout, and smooth animations.

> **Note:** This is a client-side frontend project without a live backend. Table reservation and newsletter subscription forms operate entirely on the client side to demonstrate input validation and user interaction flows.

---

## Features

- **Interactive Menu:** 6 categories with tag-based filtering (*vegan, gluten-free, new*). Clickable item cards with detailed descriptions and images.
- **Table Reservation:** Form with date, time, and guest count selector (stepper). Features step-by-step inline validation and a confirmation stamp interface.
- **Interactive Gallery:** Editorial asymmetric grid with a custom lightbox. Includes full keyboard navigation (`Arrow keys`, `Esc`), focus trap inside the modal, and focus restoration upon closing.
- **Dynamic Open/Closed Status:** Schedule component that automatically computes whether the coffee shop is currently open, correctly handling late-night hours (closing past midnight) and displaying a "closing soon" state.
- **Location & Delivery:** Styled OpenStreetMap matching the site's palette, quick route building via Yandex Maps, and links to delivery services.
- **GSAP Animations:** Smooth scroll reveals, image parallax effects, and micro-interactions. Fully respects `prefers-reduced-motion`.

---

## Tech Stack

- **Core:** React 18 + Vite 6
- **Animation:** GSAP 3.13 (`@gsap/react`, `ScrollTrigger`)
- **Styling:** Pure CSS with Custom Properties (Design Tokens), no UI frameworks
- **Typography:** Google Fonts — Fraunces (display) + Manrope (body)
- **Code Quality:** ESLint (Flat Config)

---

## Project Structure

```text
public/
├── images/            # Interior, menu, and concept images
├── favicon.svg
└── _headers           # Security headers for static hosting

src/
├── data/
│   ├── menu.js        # Menu items and categories
│   └── content.js     # Copywriting, schedule, and contact info
├── hooks/
│   ├── useOpenNow.js  # Live status calculation
│   ├── useReveal.js   # Scroll reveal animation hook
│   └── useParallax.js # Image parallax hook
├── lib/
│   ├── gsap.js        # GSAP setup & plugin registration
│   └── scrollLock.js  # Scroll lock manager for modals
├── components/        # Page sections (Nav, Hero, Menu, Gallery, etc.)
│   └── ui/            # UI components (Tag, OpenStatus, Steam, WaxSeal)
├── styles/
│   ├── tokens.css     # Design tokens (colors, typography, spacing)
│   └── global.css     # Reset, base styles, utilities
├── App.jsx
└── main.jsx