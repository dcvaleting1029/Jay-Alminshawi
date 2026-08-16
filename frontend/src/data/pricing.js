// Pricing data — single source of truth for the /pricing page
export const PLANS = [
  {
    id: "signature",
    name: "Signature",
    price: 4495,
    priceLabel: "£4,495",
    tagline:
      "The complete website solution for construction & renovation firms ready to dominate their market — bespoke design, advanced functionality and every tool needed to win bigger jobs.",
    badge: "Flagship Package",
    highlight: true,
    features: [
      "Fully bespoke, cinematic design",
      "Unlimited pages",
      "Premium scroll animations",
      "Project galleries & case studies",
      "Quote & booking system",
      "Advanced SEO structure",
      "AI Chatbot integration",
      "CRM & API integrations",
      "Google Ads landing pages",
      "CMS integration",
      "Monthly optimisation",
      "Strategy sessions",
      "30 days launch support",
    ],
    cta: "Book a Call",
  },
];

export const CARE_PLAN = {
  title: "Website Care Plan",
  price: 40,
  priceLabel: "£40",
  period: "/month",
  subtitle: "Keep your website fast, secure and always performing.",
  features: [
    "Secure Hosting",
    "SSL Certificate",
    "Daily Backups",
    "Website Updates",
    "Performance Monitoring",
    "Security Monitoring",
    "Minor Content Changes",
    "Priority Support",
  ],
  cta: "Protect My Website",
};

export const ADD_ONS = [
  { name: "Extra Page", price: "£75" },
  { name: "Logo Design", price: "£150" },
  { name: "Google Business Profile Setup", price: "£99" },
  { name: "Booking System", price: "From £150" },
  { name: "Blog Setup", price: "£100" },
  { name: "Copywriting", price: "From £150" },
  { name: "Google Ads Setup", price: "From £300" },
  { name: "Google Ads Management", price: "From £200/month" },
  { name: "AI Chatbot", price: "From £250" },
];

export const PRICING_FAQ = [
  {
    q: "Do you only work with construction & renovation businesses?",
    a: "Yes — every website I build is designed specifically for builders, contractors, joiners, plumbers, electricians, roofers, decorators, groundworks and landscaping firms. That focus means I know exactly what makes a trade website win jobs: fast quote forms, project galleries, trust signals and local SEO — not generic templates.",
  },
  {
    q: "How long does the Signature website take?",
    a: "Typical delivery for the Signature package is 3–4 weeks from kick-off to launch, depending on how quickly content and imagery are supplied. You'll receive a clear, week-by-week delivery schedule on our discovery call, plus 30 days of launch support after go-live.",
  },
  {
    q: "Do you offer payment plans?",
    a: "Yes — the Signature package is split 50/50: 50% deposit to start, 50% on launch. Longer instalment plans (2–4 monthly payments) are available on request if it helps you spread the investment. Just mention it on our call.",
  },
  {
    q: "What if I want to add extras later?",
    a: "Every Signature website is built on a foundation that scales. You can add extra pages, custom functionality, Google Ads landing pages, blog setup, additional integrations or copywriting at any point using the Optional Add-ons — no rebuild required.",
  },
  {
    q: "Do I own the website?",
    a: "100%. You own the domain, hosting account, content, code and all creative assets once the project is complete. Nothing is locked to me — you have full control.",
  },
  {
    q: "Can you redesign my current website?",
    a: "Yes — redesigns are one of my specialities. If your current trade website looks outdated, loads slowly or isn't generating enquiries, book a discovery call and I'll audit it, identify the issues and rebuild it to Signature standard.",
  },
];
