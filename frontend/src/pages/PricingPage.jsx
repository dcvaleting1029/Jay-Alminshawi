import React, { useEffect } from "react";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import MobileStickyCTA from "@/components/portfolio/MobileStickyCTA";
import PricingHero from "@/components/pricing/PricingHero";
import PricingCards from "@/components/pricing/PricingCards";
import CarePlan from "@/components/pricing/CarePlan";
import AddOnsTable from "@/components/pricing/AddOnsTable";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import PricingCTA from "@/components/pricing/PricingCTA";

const PAGE_TITLE =
  "Website Pricing | Signature Web Design Package for Construction & Renovation";
const PAGE_DESCRIPTION =
  "The Signature package (£4,495) is the complete website solution for construction & renovation firms — bespoke design, unlimited pages, AI chatbot, quote system and everything needed to win bigger jobs.";
const DEFAULT_TITLE =
  "Web Design For Construction & Renovation Businesses UK | Jay Alminshawi";
const DEFAULT_DESCRIPTION =
  "Modern, mobile-first websites built for builders, contractors and renovation businesses across the UK. Win bigger jobs, generate quote requests and stand out from local competitors.";

const setMeta = (name, content, attr = "name") => {
  let tag = document.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const PricingPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    // SEO meta for /pricing
    const previousTitle = document.title;
    document.title = PAGE_TITLE;
    setMeta("description", PAGE_DESCRIPTION);
    setMeta("og:title", PAGE_TITLE, "property");
    setMeta("og:description", PAGE_DESCRIPTION, "property");
    setMeta("twitter:title", PAGE_TITLE);
    setMeta("twitter:description", PAGE_DESCRIPTION);

    return () => {
      // Restore homepage meta when navigating away
      document.title = DEFAULT_TITLE;
      setMeta("description", DEFAULT_DESCRIPTION);
      setMeta("og:title", DEFAULT_TITLE, "property");
      setMeta("og:description", DEFAULT_DESCRIPTION, "property");
      setMeta("twitter:title", DEFAULT_TITLE);
      setMeta("twitter:description", DEFAULT_DESCRIPTION);
    };
  }, []);

  return (
    <main
      data-testid="pricing-page"
      className="relative bg-[#050505] text-white"
    >
      <Navbar />
      <PricingHero />
      <PricingCards />
      <CarePlan />
      <AddOnsTable />
      <PricingFAQ />
      <PricingCTA />
      <Footer />
      <MobileStickyCTA />
    </main>
  );
};

export default PricingPage;
