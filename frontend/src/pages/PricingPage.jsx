import React, { useEffect } from "react";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import MobileStickyCTA from "@/components/portfolio/MobileStickyCTA";
import PricingHero from "@/components/pricing/PricingHero";
import PricingQuiz from "@/components/pricing/PricingQuiz";
import PricingCards from "@/components/pricing/PricingCards";
import CarePlan from "@/components/pricing/CarePlan";
import AddOnsTable from "@/components/pricing/AddOnsTable";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import PricingCTA from "@/components/pricing/PricingCTA";

const PAGE_TITLE = "Website Pricing | Affordable Website Packages from £99.";
const PAGE_DESCRIPTION =
  "Explore website packages starting from just £99. Professionally designed, conversion-focused websites built to help businesses generate more enquiries and grow online.";
const DEFAULT_TITLE = "Jay Alminshawi — Web Designer & Developer";
const DEFAULT_DESCRIPTION =
  "Jay Alminshawi — a one-man creative & developer building high-performing, fast and modern websites that elevate brands and drive results.";

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
      <PricingQuiz />
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
