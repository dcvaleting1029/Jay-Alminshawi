// Portfolio data — single source of truth
export const PARTNERS = [
  "CITY CIVILS",
  "PRIME EXTERIOR CLEANING FIFE",
  "LASHMEK & CO",
  "ACE OF SPADES LANDSCAPES",
  "B&A LAMBSC.",
];

// Verified asset → brand mapping:
// yhaksnqh = City Civils (Construction)
// 15hcg86z = DC Valeting
// c7ekj4qk = Play_Co (Fitness coaching by Jay)
// 4jswi790 = LashMek & Co (Beauty)
// d87iar8q = Celunéa Skincare (used here as MA Home Interiors / placeholder)

export const PROJECTS = [
  {
    name: "City Civils",
    category: "Construction",
    image: "https://customer-assets.emergentagent.com/job_jay-minimal-pro/artifacts/yhaksnqh_ChatGPT%20Image%20Jun%2013%2C%202026%2C%2006_08_36%20AM.png",
  },
  {
    name: "Prime Exterior Cleaning",
    category: "Exterior Cleaning",
    image: "https://images.unsplash.com/photo-1697292859724-0d2501966448?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwxfHxkYXJrJTIwc2xlZWslMjBtb2Rlcm4lMjB3ZWJzaXRlJTIwbW9ja3VwfGVufDB8fHx8MTc4MTM1NjM0MHww&ixlib=rb-4.1.0&q=85",
  },
  {
    name: "Ace Of Spades",
    category: "Landscaping",
    image: "https://images.unsplash.com/photo-1776186243408-3c0489503faa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYWVzdGhldGljJTIwbW9kZXJuJTIwbGFuZHNjYXBpbmd8ZW58MHx8fHwxNzgxMzU2MzQwfDA&ixlib=rb-4.1.0&q=85",
  },
  {
    name: "LashMek & Co",
    category: "Beauty",
    image: "https://customer-assets.emergentagent.com/job_jay-minimal-pro/artifacts/4jswi790_Beauty%20and%20Aesthetics%20Clinic%20Website%20Homepage%20%281%29.png",
  },
  {
    name: "MA Home Interiors",
    category: "Interior Design",
    image: "https://customer-assets.emergentagent.com/job_jay-minimal-pro/artifacts/d87iar8q_Skincare%20Brand%20Website%20Homepage.png",
  },
  {
    name: "DC Valeting",
    category: "Valeting",
    image: "https://customer-assets.emergentagent.com/job_jay-minimal-pro/artifacts/15hcg86z_June%2013%2C%202026%206_41_19%20am%20-%20Screenshot.png",
  },
  {
    name: "Trim2Fresh",
    category: "Barbers",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkYXJrJTIwYmFyYmVyJTIwbW9kZXJufGVufDB8fHx8MTc4MTM1NjM0MHww&ixlib=rb-4.1.0&q=85",
  },
  {
    name: "Play_Co",
    category: "Coaching",
    image: "https://customer-assets.emergentagent.com/job_jay-minimal-pro/artifacts/c7ekj4qk_June%2013%2C%202026%206_45_10%20am%20-%20Screenshot.png",
  },
];

export const SERVICES = [
  {
    title: "Website Design",
    icon: "PenTool",
    items: ["Custom website design", "Modern & responsive", "Conversion focused", "High performance"],
  },
  {
    title: "Webflow Development",
    icon: "Code2",
    items: ["Custom Webflow builds", "CMS & dynamic sites", "Smooth animations", "Scalable & fast"],
  },
  {
    title: "Brand Identity",
    icon: "Sparkles",
    items: ["Brand strategy", "Visual identity", "Typography", "Brand guidelines"],
  },
  {
    title: "E-commerce Solutions",
    icon: "ShoppingBag",
    items: ["Shopify/Webflow ecom", "Product pages", "Cart & checkout", "Optimised UX/UI"],
  },
  {
    title: "SEO & Search Visibility",
    icon: "Search",
    items: ["SEO optimised", "Fast load times", "On-page SEO", "Better rankings"],
  },
  {
    title: "Maintenance & Support",
    icon: "Wrench",
    items: ["Ongoing maintenance", "Updates & backups", "Performance monitoring", "Technical support"],
  },
];

export const TESTIMONIALS = [
  {
    brand: "LashMek & Co",
    quote:
      "Jay completely elevated our online presence. The site feels premium, loads instantly and clients comment on it daily. Bookings have climbed noticeably since launch.",
    rating: 5,
  },
  {
    brand: "Ace Of Spades Landscapes",
    quote:
      "Working with Jay was effortless. He understood the brand instantly and delivered a website that looks better than anything our competitors have.",
    rating: 5,
  },
  {
    brand: "DC Valeting",
    quote:
      "The new site is fast, modern and converts. The booking flow is seamless and the design is something I'm genuinely proud to share.",
    rating: 5,
  },
];

// Hero displays City Civils (verified)
export const HERO_LAPTOP_SCREEN =
  "https://customer-assets.emergentagent.com/job_jay-minimal-pro/artifacts/yhaksnqh_ChatGPT%20Image%20Jun%2013%2C%202026%2C%2006_08_36%20AM.png";
