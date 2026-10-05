import React, { useEffect } from "react";
import { HomeNav as Navbar } from "@/components/home/HomeNav";
import { HomeFooter as Footer } from "@/components/home/ContactFooter";
import MobileStickyCTA from "@/components/portfolio/MobileStickyCTA";
import PricingHero from "@/components/pricing/PricingHero";
import PricingCards from "@/components/pricing/PricingCards";
import CarePlan from "@/components/pricing/CarePlan";
import AddOnsTable from "@/components/pricing/AddOnsTable";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import PricingCTA from "@/components/pricing/PricingCTA";

const PAGE_TITLE =
  "Pricing | £4,495 Signature Website for Building Firms | Jay Alminshawi";
const PAGE_DESCRIPTION =
  "The £4,495 Signature package: a complete website for building firms — bespoke design, project galleries, quote forms, CRM integrations and 30 days launch support.";
const DEFAULT_TITLE =
  "Web Design for Building Firms | Jay Alminshawi";
const DEFAULT_DESCRIPTION =
  "Websites for building firms across the UK. Look like the premium choice and turn homeowners into enquiries.";

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
      className="relative bg-[#09090b] text-white font-jakarta antialiased"
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
