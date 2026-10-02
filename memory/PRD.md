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
- [x] `/projects` dedicated page (projects grid + Google reviews); navbar PROJECTS → `/projects`.

### Session 3 (2026-06) — Website Audit Funnel
- [x] `/audit` lead-gen funnel: minimal topbar (wordmark + "Back to website"), hero ("See what's holding your website back."), CSS-built laptop audit mockup (wireframe site, annotations, cursor, JA video bubble), trust points, CTA scrolls into funnel.
- [x] 10-step multi-step form (`components/audit/*`, config in `data/audit.js`): business info + specialism chips → objectives (multi) → lead sources (multi + other) → project value → enquiry volume → website issue (optional textarea) → investment → timeline → decision makers (+ other) → contact (email, phone, consent). Progress "01 — 10" + hairline bar, Back preserves answers, slide transitions, validation per step.
- [x] Backend `POST /api/audit-leads` (`backend/audit_leads.py`): validates, stores in Mongo `audit_leads` (id, created_at, status, email_sent, utm), emails owner via Emergent email proxy (`backend/email_service.py`, guardrail gate). Env: `EMERGENT_EMAIL_KEY`, `EMAIL_FROM_NAME`, `OWNER_EMAIL=contact@jayalminshawi.com`.
- [x] Success screen personalised (first name, company, website, "within 48 hours") + optional inline Calendly strategy-call embed. UTM params captured from URL.
- [x] Shared `CalendlyInline` component extracted (`components/portfolio/CalendlyInline.jsx`); `database.py` split out of `server.py`.
- [x] Testing agent iteration_6: 100% pass (backend pytest + full UI flow desktop/mobile + regression).
- [x] "FREE AUDIT" link added to nav drawer; "Free Website Audit" + "Privacy Policy" links in Footer.
- [x] `/privacy` page (8 plain-English sections, UK GDPR) linked from the audit consent checkbox (opens new tab).
- [x] Applicant confirmation email ("Got your website audit request, {name}") sent on submission; `confirmation_sent` tracked in DB. Reply-to = `contact@jayalminshawi.com`.
- [x] All owner email references switched to `contact@jayalminshawi.com` (Contact section, privacy page, OWNER_EMAIL, EMAIL_REPLY_TO).

### Session 4 (2026-06) — Social proof, Meta Pixel, Leads Dashboard + Audit Delivery
- [x] `AuditSocialProof` strip under /audit hero (Google 5.0 rating link + client logo marquee); reused on audit view page.
- [x] Meta Pixel helper `lib/metaPixel.js` — reads `REACT_APP_META_PIXEL_ID` (currently EMPTY → no-op). Fires `PageView` on /audit and `Lead` on funnel success.
- [x] Admin auth (`backend/auth.py`): single admin seeded from `ADMIN_EMAIL`/`ADMIN_PASSWORD` (bcrypt), JWT Bearer (12h), brute-force lockout 5/15min. Credentials in `/app/memory/test_credentials.md`.
- [x] `/admin` leads dashboard: login, filterable list, lead detail (all answers, status select, private notes), `SendAuditCard` (Loom share link + personal note → one-click send).
- [x] `POST /api/audit-leads/{id}/send-audit` emails lead a branded link `{origin}/audit/view/{token}`; email includes personal note, 5★ Google rating, trusted brands. `GET /api/audit-view/{token}` public.
- [x] `/audit/view/:token` page: heading, Loom embed, personal note, social proof, Calendly CTA; invalid token state.
- [x] Testing agent iteration_7: 100% pass (12 backend pytest + full admin/view/social-proof UI + regression).
- [x] Audit opened tracking: `GET /api/audit-view/{token}` records `open_count`, `first_opened_at`, `last_opened_at` (skipped when `?preview=true` — admin preview link uses `?preview=1`). Dashboard shows Opened/Unopened indicator per row, "Opened" filter, and a green status panel in the Send Audit card. Self-tested via curl + screenshots.

## P0/P1 Backlog
- P1: Add real Meta Pixel ID to `frontend/.env` → `REACT_APP_META_PIXEL_ID` (user doesn't have it yet).
- P2: CSV export of leads from /admin.
- P2: SEO meta tags + OpenGraph card image.

## Test Credentials
Admin dashboard `/admin`: contact@jayalminshawi.com / Jayisalive_10 (see /app/memory/test_credentials.md).
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
