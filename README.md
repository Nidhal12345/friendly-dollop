# TAFC — The Atlantic Fish Company

A premium, animation-rich seafood e-commerce **frontend** built with React. Editorial dark-ocean aesthetic, serif/sans typography pairing, smooth scrolling and cinematic scroll-driven motion throughout.

> Frontend only — no backend. Cart, filters and forms are fully functional in-memory.

## Live preview

Run `npm run dev` and open `http://localhost:3000`.

## Tech stack

| Layer      | Choice                              |
| ---------- | ----------------------------------- |
| Framework  | React 19 + Vite 8                   |
| Styling    | Tailwind CSS v4 (CSS-first `@theme`)|
| Motion     | Framer Motion 13                    |
| Scroll     | Lenis (smooth inertial scroll)      |
| Routing    | React Router 7                      |
| Icons      | Lucide React                        |
| Fonts      | Cormorant Garamond + Manrope        |

## Features

### Experience & motion
- **Preloader** with rotating taglines, counter and curtain exit
- **Custom cursor** — dot + spring-trailing ring, morphs into "View / Explore" labels on interactive media (desktop only)
- **Hero** — blur-to-sharp reveal, character-split display type, parallax background, floating product cards
- **Smooth scroll** via Lenis, with route-aware scroll-to-top and modal scroll-locking
- **Scroll-driven sections** — horizontally drifting category rail, sticky "How it works" storytelling with image swaps, parallax image stacks
- **Word / character split text reveals** with clip masks
- **Clip-path image reveals**, animated hairlines, count-up statistics
- **3D tilt product cards** with cursor-following glare
- **Magnetic buttons** with fill-swipe hover
- **Marquee tickers**, auto-rotating testimonial carousel with progress bars
- **Page transitions** with `AnimatePresence`
- Film-grain overlay for a cinematic finish

### Commerce UI
- 12-product catalogue across 4 categories with origin, latin name, tasting notes and pairings
- **Shop page** — animated category pills (`layoutId`), live search, sort dropdown, animated grid re-flow
- **Product modal** — gallery thumbnails, staggered detail reveal, quantity selector
- **Cart drawer** — slide-in panel, quantity controls, free-shipping progress bar, totals
- **Toast** notifications on add-to-cart
- Newsletter and contact forms with success states, animated FAQ accordion

### Pages
`/` Home · `/shop` Shop (supports `?cat=fish|shellfish|crustacean|delicacy`) · `/about` Our Story · `/contact` Contact

## Project structure

```
src/
├─ components/
│  ├─ home/        Hero, Marquee, Intro, Categories, Featured, Process, Stats, Testimonials, Newsletter
│  ├─ layout/      Navbar, Footer, Preloader
│  ├─ shop/        ProductCard, ProductModal, CartDrawer
│  └─ ui/          Cursor, SmoothScroll, MagneticButton, Reveal (SplitText, SplitChars, RevealImage, Line), Toast
├─ context/        CartContext (reducer-based cart state)
├─ data/           products.js (catalogue, testimonials, stats, process, licensed image map)
├─ pages/          Home, Shop, About, Contact
├─ App.jsx         Router, providers, global overlays
├─ main.jsx
└─ index.css       Tailwind theme tokens, utilities, keyframes
```

## Scripts

```bash
npm install       # install dependencies
npm run dev       # dev server on :3000
npm run build     # production build → dist/
npm run preview   # preview the production build
npm run lint      # oxlint
```

## Design system

- **Palette:** `abyss #050B14` · `deep #0A1524` · `ocean #0F2137` · `foam #EEF4F8` · `mist #B7C6D6` · `coral #FF7A59` · `gold #D7B26D` · `sea #35C2C1`
- **Type:** Cormorant Garamond (display, italics for emphasis) + Manrope (UI, wide-tracked uppercase eyebrows)
- **Motion easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out) for entrances, `cubic-bezier(0.76, 0, 0.24, 1)` for curtains/drawers

## Imagery

All photography is Creative Commons / public-domain licensed and served via CDN. See `src/data/products.js` for the image map.

## Accessibility notes

- Custom cursor and smooth scrolling disable automatically on touch devices
- All interactive elements have `aria-label`s; dialogs close on `Esc`
- Motion respects natural reading order; text remains selectable
