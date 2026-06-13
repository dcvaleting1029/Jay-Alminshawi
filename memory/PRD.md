# Jay Alminshawi — Portfolio PRD

## Original Problem Statement
Premium, cinematic, dark portfolio website for "Jay Alminshawi — Web Designer & Developer".
Deep black background, charcoal sections, white typography, thin grey borders, large bold
typography, smooth cinematic animations, immersive 3D laptop mockups, Webflow-agency aesthetic.

## Architecture
- **Frontend**: React 19 + Tailwind + Framer Motion + Shadcn primitives + Sonner toasts.
  Single-page portfolio with smooth-scroll sections.
- **Backend**: FastAPI + Motor (async MongoDB). `/api` prefix. Stores contact submissions.
- **DB**: MongoDB collection `contacts`.
- **Fonts**: Anton (display), Outfit (headings), Manrope (body), Space Grotesk (mono).

## User Personas
1. Prospective client (small business / agency owner) browsing portfolio, filling contact form.
2. Jay (owner) — reviewing submissions.

## Core Requirements (static)
- Cinematic dark hero with 3D angled laptop mockup (City Civils on screen).
- Trusted By logo marquee.
- 8-card Projects grid with laptop mockups and hover tilt/lift.
- 6-card Services grid (line icons, hover glow border).
- 3 Testimonials + decorative laptop mockup.
- About/Philosophy with word-by-word fade-in and bolded keywords.
- Working Contact form posting to `/api/contact`.
- Oversized footer with display brand text and social/nav links.

## What's Been Implemented (2026-06-13)
- [x] Backend `POST/GET /api/contact` with EmailStr validation and Mongo persistence.
- [x] Frontend full portfolio: Navbar, Hero, TrustedBy, Projects (8), Services (6),
      Testimonials (3) + decor laptop, About, Contact form, Footer.
- [x] Verified asset → brand mapping (City Civils, DC Valeting, Play_Co, LashMek).
- [x] Smooth-scroll nav + magnetic-style button hovers + staggered framer-motion reveals.
- [x] Custom `LaptopMockup` component (CSS perspective transforms + metallic shine sweep).
- [x] Testing agent: 100% backend, 100% frontend pass.

## P0/P1 Backlog
- P1: Add a `/admin` route to view contact submissions (currently only via API GET).
- P1: Rate-limit `/api/contact` (e.g., slowapi) + add hCaptcha to prevent spam.
- P2: Add individual project detail pages (`/projects/:slug`).
- P2: Replace placeholder Unsplash images for Prime Exterior Cleaning, Ace Of Spades,
      Trim2Fresh with real client screenshots when available.
- P2: Wire CMS-like JSON file for projects/testimonials so non-devs can edit.

## Next Tasks
1. Optional: SEO meta tags, OpenGraph card image.
2. Optional: cookie/analytics consent.
3. Optional: Email notification to Jay on new contact submission (Resend or SendGrid).
