// Portfolio data — single source of truth
export const SECTORS = [
  { name: "Renovation firms", blurb: "Full-house refurbishments and period property renovations." },
  { name: "Construction & building firms", blurb: "Main contractors, groundworks, civils and general builders." },
  { name: "New build specialists", blurb: "Self-build, developer and one-off bespoke homes." },
  { name: "Kitchen & bathroom fitters", blurb: "Design-and-install showrooms and independent fitters." },
  { name: "Extension specialists", blurb: "Rear, side-return, wraparound and loft conversions." },
];

export const PARTNERS = [
  {
    name: "City Civils Construction",
    trade: true,
    src: "https://customer-assets.emergentagent.com/job_jay-minimal-pro/artifacts/afl9bojg_Copy%20of%20C%20%281%29.png",
  },
  {
    name: "LashMek & Co",
    src: "https://customer-assets.emergentagent.com/job_jay-minimal-pro/artifacts/cumbqz89_Copy%20of%20C%20%282%29.png",
  },
  {
    name: "Celunéa Skincare",
    src: "https://customer-assets.emergentagent.com/job_jay-minimal-pro/artifacts/d5aoyplk_Copy%20of%20C%20%2813%29.png",
  },
  {
    name: "EDN Renovation Group",
    trade: true,
    src: "https://customer-assets.emergentagent.com/job_jay-minimal-pro/artifacts/ecm2ahxa_Copy%20of%20C%20%2814%29.png",
  },
  {
    name: "B&A Landscaping",
    trade: true,
    src: "https://customer-assets.emergentagent.com/job_jay-minimal-pro/artifacts/icj99f3b_B%26A%20LANDSCAPING.png",
  },
  {
    name: "MA Home Interiors",
    trade: true,
    src: "https://customer-assets.emergentagent.com/job_jay-minimal-pro/artifacts/5gj3usg5_Copy%20of%20C%20%2818%29.png",
  },
  {
    name: "Refined Spaces",
    trade: true,
    src: "https://customer-assets.emergentagent.com/job_jay-minimal-pro/artifacts/21sqgwu2_Copy%20of%20C%20%2817%29.png",
  },
  {
    name: "Pulse Performance",
    src: "https://customer-assets.emergentagent.com/job_jay-minimal-pro/artifacts/vojuu1i2_Copy%20of%20C%20%2816%29.png",
  },
  {
    name: "Ace Of Spades Landscapes",
    trade: true,
    src: "https://customer-assets.emergentagent.com/job_jay-minimal-pro/artifacts/2jovh8s3_Copy%20of%20C%20%2815%29.png",
  },
];

export const TRADE_PARTNERS = PARTNERS.filter((p) => p.trade);

// Verified asset → brand mapping:
// yhaksnqh = City Civils (Construction)
// 15hcg86z = DC Valeting
// c7ekj4qk = Play_Co (Fitness coaching by Jay)
// 4jswi790 = LashMek & Co (Beauty)
// d87iar8q = Celunéa Skincare (used here as MA Home Interiors / placeholder)

export const WORK = [
  {
    name: "EDN Renovation Group",
    mockup: "/work/mock/edn.webp",
    tags: ["Web design","Development"],
    description: "Calm, editorial website for an Edinburgh renovation specialist.",
    type: "Client work",
    image: "/work/edn.webp",
  },
  {
    name: "Complete Heating",
    mockup: "/work/mock/completeheating.webp",
    tags: ["Web design", "Development"],
    description: "Clean, modern website for an Edinburgh boiler installation specialist.",
    type: "Client work",
    image: "/work/mock/completeheating.webp",
  },
  {
    name: "City Civils Construction",
    mockup: "/work/mock/citycivils.webp",
    tags: ["Web design","Development"],
    description: "Striking site for groundworks, drainage and landscaping across Central Scotland.",
    type: "Client work",
    url: "https://www.citycivilsconstructionltd.co.uk/",
    image: "/work/citycivils.webp",
  },
  {
    name: "ETN Joinery",
    mockup: "/work/mock/etn.webp",
    tags: ["Web design","Concept"],
    description: "Dark, premium concept for a Glasgow bespoke joinery brand.",
    type: "Concept",
    image: "/work/etn.webp",
  },
  {
    name: "Capital Window Cleaning",
    mockup: "/work/mock/capital.webp",
    tags: ["Web design", "Concept"],
    description: "Crisp, trust-led concept for a professional window cleaning company.",
    type: "Concept",
    image: "/work/mock/capital.webp",
  },
  {
    name: "RHA Construction",
    mockup: "/work/mock/rha.webp",
    tags: ["Web design", "Concept"],
    description: "Refined, editorial concept for a luxury new-build and extension specialist across Scotland.",
    type: "Concept",
    image: "/work/mock/rha.webp",
  },
];

export const PROJECTS = [
  {
    name: "City Civils Construction Ltd",
    category: "Construction",
    url: "https://www.citycivilsconstructionltd.co.uk/",
    image: "https://customer-assets.emergentagent.com/job_jay-minimal-pro/artifacts/yhaksnqh_ChatGPT%20Image%20Jun%2013%2C%202026%2C%2006_08_36%20AM.png",
  },
  {
    name: "Ace of Spades Landscapes",
    category: "Landscaping",
    url: "https://www.aceofspadeslandscapes.org/",
    image: "https://customer-assets.emergentagent.com/job_jay-minimal-pro/artifacts/qi631dz2_Ace%20of%20Spades%20Landscapes%20Homepage%20%281%29.png",
  },
  {
    name: "LASHMEK&CO.",
    category: "Beauty",
    url: "https://www.lashmekco.com/",
    image: "https://customer-assets.emergentagent.com/job_jay-minimal-pro/artifacts/0h3e648b_Beauty%20and%20Aesthetics%20Clinic%20Website%20Homepage%20%281%29.png",
  },
  {
    name: "MA Home Interiors",
    category: "Interior Design",
    url: "https://www.mahomeinteriors.com/",
    image: "https://customer-assets.emergentagent.com/job_jay-minimal-pro/artifacts/20tovakn_Luxury%20Home%20Interior%20Design%20Website%20Landing%20Page.png",
  },
  {
    name: "DC Valeting",
    category: "Valeting",
    url: "https://www.dcvaleting.company/",
    image: "https://customer-assets.emergentagent.com/job_jay-minimal-pro/artifacts/gjxb3hxq_ChatGPT%20Image%20Jun%2013%2C%202026%2C%2006_29_10%20AM.png",
  },
  {
    name: "Crawford Tree Surgery",
    category: "Tree Surgery",
    url: "https://crawfordtreesurgery.com/",
    image: "https://customer-assets.emergentagent.com/job_jay-minimal-pro/artifacts/pxi38kdg_Crawford%20Tree%20Surgery%20Website%20Homepage%20%281%29.png",
  },
  {
    name: "Celunéa Skincare",
    category: "Skincare",
    url: "https://celunea-luxury.preview.emergentagent.com/",
    image: "https://customer-assets.emergentagent.com/job_jay-minimal-pro/artifacts/gqq19nad_Skincare%20Brand%20Website%20Homepage.png",
  },
];

export const SERVICES = [
  {
    title: "Website Design",
    icon: "PenTool",
    items: ["Bespoke design for building firms", "Looks premium, wins bigger jobs", "Mobile-first for homeowners", "Fast and conversion-focused"],
  },
  {
    title: "Quote & Enquiry Forms",
    icon: "Code2",
    items: ["Quote request forms", "WhatsApp & click-to-call", "Instant email alerts", "Spam protection"],
  },
  {
    title: "Project Galleries",
    icon: "Sparkles",
    items: ["Before & after showcase", "Project case studies", "Filter by extension, kitchen, new build", "Google reviews built-in"],
  },
  {
    title: "Local SEO",
    icon: "Search",
    items: ["Rank for 'builders near me'", "Google Business Profile", "Pages for every area you cover", "Fast, indexable pages"],
  },
  {
    title: "Redesigns & Rescues",
    icon: "ShoppingBag",
    items: ["Outdated site rebuilds", "Checkatrade-only firms go independent", "Faster load times", "More enquiries from the same traffic"],
  },
  {
    title: "CRM Integrations",
    icon: "Users",
    items: ["HubSpot / Zoho / Pipedrive", "Auto-sync new enquiries", "Quote pipeline tracking", "Follow-up automations"],
  },
  {
    title: "Google Ads",
    icon: "Target",
    items: ["Campaign setup", "Landing pages per service", "Local geo-targeting", "Monthly ad management"],
  },
  {
    title: "Care & Hosting",
    icon: "Wrench",
    items: ["UK-based hosting", "SSL & daily backups", "Content updates", "Priority support"],
  },
];

export const TESTIMONIALS = [
  {
    author: "Scott",
    initial: "S",
    color: "#E8731A",
    company: "City Civils Construction",
    sector: "Construction",
    trade: true,
    image: "/work/citycivils.webp",
    quote:
      "Couldn't recommend him enough. He redesigned the City Civils website and the finished result is exactly what we were looking for. The site looks modern, professional and really represents our business. He did everything we asked for, nothing was ever too much hassle, and he was always quick to respond whenever we had questions or wanted changes made.",
    rating: 5,
  },
  {
    author: "Trevor",
    initial: "T",
    color: "#4F6BED",
    company: "Ace of Spades Landscapes",
    sector: "Landscaping",
    trade: true,
    image: "https://customer-assets.emergentagent.com/job_jay-minimal-pro/artifacts/qi631dz2_Ace%20of%20Spades%20Landscapes%20Homepage%20%281%29.png",
    quote:
      "He took my very plain website and transformed it into a professionally designed website. He is great to work with and does everything that you want done to provide an excellent website. I can't praise him enough.",
    rating: 5,
    date: "9 weeks ago",
  },
  {
    author: "Joe Crawford",
    initial: "J",
    color: "#1A73E8",
    badge: "Local Guide",
    company: "Crawford Tree Surgery",
    sector: "Tree surgery",
    trade: true,
    image: "https://customer-assets.emergentagent.com/job_jay-minimal-pro/artifacts/pxi38kdg_Crawford%20Tree%20Surgery%20Website%20Homepage%20%281%29.png",
    quote:
      "Excellent service. I have had a terrific response from the website Jay developed. Great attention to detail and always on hand to help. Great value. Highly recommended.",
    rating: 5,
    date: "9 weeks ago",
  },
  {
    author: "Moustapha Diaby",
    initial: "M",
    color: "#0F9D58",
    quote:
      "Loved working with Jay, he really understands what the business needs and functions were. From the design stage to coding implementation he worked really close with our team to get everything correct with our iteration and feedback. Thank you.",
    rating: 5,
  },
  {
    author: "Dylan Cramb",
    initial: "D",
    color: "#000000",
    quote:
      "Jay built our website for our business page and it is absolutely amazing. Jay listened to everything I was looking for and delivered exactly what I had in mind.",
    rating: 5,
    date: "5 days ago",
  },
  {
    author: "Kirima Alam",
    initial: "K",
    color: "#7E3FA8",
    quote:
      "Jay is amazing at what he does! Websites are always immaculate, any tweaks or changes you need it's done on the day! Fast, reliable and just 5 stars.",
    rating: 5,
    date: "6 days ago",
  },
  {
    author: "Kirima Alam",
    initial: "K",
    color: "#7E3FA8",
    quote:
      "This man has created my website and I have gained clients from my website and always hear how good my website looks! If you're looking for an 11/10 website then this is your man! Nothing but professionalism.",
    rating: 5,
    date: "9 weeks ago",
  },
];

export const TRADE_TESTIMONIALS = TESTIMONIALS.filter((t) => t.trade);
export const OTHER_TESTIMONIALS = TESTIMONIALS.filter((t) => !t.trade);

// Google Business profile — public reviews page
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=Jay+Alminshawi+/+Web+Designer&stick=H4sIAAAAAAAA_-NgU1IxqEhMMTYyTbI0MjC0MLcwT7MyqLA0NU0zsTA1TEpLMTBMTDJfxCrrlVip4JiTm5lXnJFYnqmgrxCemqTgklqcmZ6XWgQAPhKGgEgAAAA&hl=en-GB&mat=CRuKhEH0xsoyElcBa0lj_9aQDHCKwukOZXSoJZ8aGbyitKFxtGrys2jGZMfXKhMqSOAl0Fvx_P8ifkRLVRmyjXgUNe21RSSpTN4DO1BfDt5gZTAspysKxiPDFNvtFegKQDA&authuser=0";

// Hero displays City Civils (verified)
export const HERO_LAPTOP_SCREEN =
  "https://customer-assets.emergentagent.com/job_jay-minimal-pro/artifacts/yhaksnqh_ChatGPT%20Image%20Jun%2013%2C%202026%2C%2006_08_36%20AM.png";
