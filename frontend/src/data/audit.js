export const SPECIALISMS = [
  "Renovations",
  "Extensions",
  "Kitchens & Bathrooms",
  "Landscaping",
  "New Builds",
  "Other",
];

export const OBJECTIVES = [
  "Generate more enquiries",
  "Attract higher-value projects",
  "Look more professional / premium",
  "Rank better on Google",
  "Improve conversion rates",
  "Showcase our projects better",
  "Replace an outdated website",
  "Add new functionality",
  "We're not sure yet",
];

export const LEAD_SOURCES = [
  "Google Ads",
  "Google organic / search",
  "Facebook / Instagram Ads",
  "Social media",
  "Referrals / word of mouth",
  "Checkatrade / Bark / MyBuilder etc.",
  "Other",
  "We don't have a consistent system",
];

export const PROJECT_VALUES = [
  "Under £2,500",
  "£2,500 – £10,000",
  "£10,000 – £25,000",
  "£25,000 – £50,000",
  "£50,000 – £100,000",
  "£100,000+",
];

export const ENQUIRY_VOLUMES = ["0–5", "5–10", "10–25", "25–50", "50+", "Not sure"];

export const INVESTMENT_LEVELS = [
  "Under £1,000",
  "£1,000 – £2,500",
  "£2,500 – £5,000",
  "£5,000 – £8,000",
  "£8,000+",
  "I'm not sure yet",
];

export const TIMELINES = [
  "As soon as possible",
  "Within 30 days",
  "1–3 months",
  "3–6 months",
  "Just exploring at the moment",
];

export const DECISION_MAKERS = [
  "Just me",
  "Me and my business partner",
  "Multiple directors",
  "Marketing team",
  "Someone else",
];

export const INITIAL_ANSWERS = {
  first_name: "",
  company: "",
  website: "",
  specialism: "",
  specialism_other: "",
  objectives: [],
  lead_sources: [],
  lead_sources_other: "",
  project_value: "",
  enquiry_volume: "",
  website_issue: "",
  investment: "",
  timeline: "",
  decision_makers: "",
  decision_makers_other: "",
  email: "",
  phone: "",
  consent: false,
};

export const STEPS = [
  {
    id: "business",
    heading: "Let's take a look at your website.",
    supporting: "First, tell me a little about your business.",
  },
  {
    id: "objectives",
    heading: "What would you most like your website to improve?",
    supporting: "Select everything that's important to you.",
    field: "objectives",
    options: OBJECTIVES,
    multi: true,
  },
  {
    id: "lead_sources",
    heading: "How are you currently generating most of your enquiries?",
    supporting: "Select all that apply.",
    field: "lead_sources",
    options: LEAD_SOURCES,
    multi: true,
    otherField: "lead_sources_other",
    otherLabel: "Tell me a little more (optional)",
  },
  {
    id: "project_value",
    heading: "What's the typical value of a project for your business?",
    supporting: "This helps me understand the type of customers you're trying to attract.",
    field: "project_value",
    options: PROJECT_VALUES,
  },
  {
    id: "enquiry_volume",
    heading: "Roughly how many enquiries do you currently receive each month?",
    field: "enquiry_volume",
    options: ENQUIRY_VOLUMES,
    compact: true,
  },
  {
    id: "website_issue",
    heading: "What's the biggest issue with your current website?",
    supporting:
      "Tell me anything you're unhappy with — design, enquiries, Google rankings, speed, functionality, or anything else.",
    field: "website_issue",
    textarea: true,
    optional: true,
  },
  {
    id: "investment",
    heading:
      "If we identify an opportunity to significantly improve your website, what level of investment would you be comfortable considering?",
    field: "investment",
    options: INVESTMENT_LEVELS,
  },
  {
    id: "timeline",
    heading: "When would you ideally like your new website live?",
    field: "timeline",
    options: TIMELINES,
  },
  {
    id: "decision_makers",
    heading: "Who would be involved in making the final decision?",
    field: "decision_makers",
    options: DECISION_MAKERS,
    otherField: "decision_makers_other",
    otherTrigger: "Someone else",
    otherLabel: "Who else would be involved? (optional)",
  },
  {
    id: "contact",
    heading: "Where should I send your personalised audit?",
    supporting:
      "I'll use these details to send your audit and contact you if I need any additional information.",
  },
];
