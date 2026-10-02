import { INITIAL_ANSWERS, STEPS } from "@/data/audit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const URL_RE = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i;

export const validateStep = (step, a) => {
  const e = {};
  if (step.id === "business") {
    if (!a.first_name.trim()) e.first_name = "Please enter your first name.";
    if (!a.company.trim()) e.company = "Please enter your company name.";
    if (!URL_RE.test(a.website.trim())) e.website = "Please enter a valid website address.";
    if (!a.specialism) e.specialism = "Please choose the closest match.";
  } else if (step.id === "contact") {
    if (!EMAIL_RE.test(a.email.trim())) e.email = "Please enter a valid email address.";
    if (a.phone.replace(/\D/g, "").length < 7) e.phone = "Please enter a valid phone number.";
    if (!a.consent) e.consent = "Please confirm you're happy for me to get in touch.";
  } else if (step.options && !step.optional) {
    const v = a[step.field];
    if (step.multi ? v.length === 0 : !v) e[step.field] = step.multi ? "Select at least one option." : "Please select an option.";
  }
  return e;
};

export const readUtm = (search) => {
  const params = new URLSearchParams(search);
  const utm = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ref"].forEach((k) => {
    const v = params.get(k);
    if (v) utm[k] = v;
  });
  return Object.keys(utm).length ? utm : null;
};

export const buildPayload = (a, utm) => ({
  ...INITIAL_ANSWERS,
  ...a,
  first_name: a.first_name.trim(),
  company: a.company.trim(),
  website: a.website.trim(),
  email: a.email.trim(),
  phone: a.phone.trim(),
  specialism_other: a.specialism === "Other" ? a.specialism_other.trim() || null : null,
  lead_sources_other: a.lead_sources.includes("Other") ? a.lead_sources_other.trim() || null : null,
  decision_makers_other: a.decision_makers === "Someone else" ? a.decision_makers_other.trim() || null : null,
  website_issue: a.website_issue.trim() || null,
  utm,
});

export const TOTAL_STEPS = STEPS.length;
