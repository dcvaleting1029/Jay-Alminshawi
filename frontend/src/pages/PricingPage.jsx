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

const PricingPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
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
