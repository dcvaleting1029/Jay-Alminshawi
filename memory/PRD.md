# Jay Alminshawi — Portfolio PRD

## Original Problem Statement
Premium, cinematic, dark portfolio website for "Jay Alminshawi — Web Designer & Developer".
Deep black background, charcoal sections, white typography, thin grey borders, large bold
typography, smooth cinematic animations, immersive 3D laptop mockups, Webflow-agency aesthetic.

## Architecture
- **Frontend**: React 19 + Tailwind + Framer Motion + Shadcn primitives + Sonner toasts.
  Two routes: `/` (single-page portfolio) and `/pricing` (dedicated pricing page).
- **Backend**: FastAPI (dormant — /api/contact endpoints removed).
- **DB**: MongoDB (not actively used).
- **Fonts**: Anton (display), Outfit (headings), Manrope (body), Space Grotesk (mono).
- **3rd party**: Calendly inline widget on `/#contact` for discovery-call booking.

## User Personas
1. Prospective client (small business / agency owner) browsing portfolio, comparing pricing, booking calls.
2. Jay (owner) — sharing site link with leads.

## Core Requirements
- Cinematic dark hero + intro video (autoplay-blocked, click-to-play with sound).
- Trusted By logo marquee.
- 8-card Projects grid with real client website screenshots inside laptop mockups.
- 6-card Services grid.
- Google Reviews Testimonials (5 real reviews + rating badge + "See all reviews on Google" link).
- About/Philosophy section.
- Calendly inline booking widget.
- Full pricing page at `/pricing` with 4 tier cards, care plan, add-ons, FAQ, final CTA.
- Favicon + Apple web-clip icon (JA monogram).
- Fully responsive across mobile / tablet / desktop.

## What's Been Implemented
### Session 1 (2026-06-13)
- [x] Full portfolio single-page.
- [x] `LaptopMockup` CSS 3D perspective component.

### Session 2 (2026-07-15+)
- [x] Removed custom contact form / admin dashboard → replaced with Calendly widget.
- [x] Mobile sticky CTA + typography scaling.
- [x] All 8 project images swapped to real client screenshots.
- [x] Jay Alminshawi Fitness — latest hero image swapped in laptop mockup.
- [x] Intro Video section (full-width cinematic banner, .mov transcoded to 19MB MP4, click-to-play with sound, scroll-into-view resets to start).
- [x] Favicon suite + Apple web-clip icon + manifest.json (JA monogram logo).
- [x] Testimonials rebuilt as Google Reviews (5 real reviews) with Google G badge, colored avatar initials, star ratings, "See all reviews on Google" CTA linking to public Google Business profile.
- [x] `/pricing` dedicated page: PricingHero, 4 PricingCards (Launch £99 / Growth £499 highlight / Pro £1,500 / Scale Custom), CarePlan £40/month horizontal card, AddOnsTable (9 rows), PricingFAQ (6 accordion items), PricingCTA final section. Count-up animated prices. Conic-gradient spinning border on Growth card. All CTAs route to `/#contact` (Calendly).
- [x] Navbar refactored to support cross-route navigation (hash + pathname targets). PRICING link added.
- [x] Placement fixes on pricing cards (badge overflow, uniform CTA widths, aligned tops/bottoms).
- [x] Testing agent: 100% frontend pass on /pricing page.

## P0/P1 Backlog
- P2: SEO meta tags + OpenGraph card image.
- P2: Cookie/analytics consent banner.
- P2: Case study detail pages `/projects/:slug`.
- P2: Blog / articles section.
- P2: Google Places API integration for auto-refreshing reviews.

## Next Tasks
1. Optional: SEO / OG image work.
2. Optional: Case study pages.
3. Optional: Payment/deposit flow (Stripe) integrated into pricing CTAs.

## Test Credentials
N/A — no authenticated flows (Calendly handles booking).
