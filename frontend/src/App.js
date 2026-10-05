import React, { useEffect, useState } from "react";
import "@/App.css";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

import IntroScreen, { INTRO_DURATION } from "@/components/home/IntroScreen";
import MobileStickyCTA from "@/components/portfolio/MobileStickyCTA";
import { HomeNav } from "@/components/home/HomeNav";
import { HomeHero, Statement, Sectors } from "@/components/home/HomeHero";
import { WorkGrid, LogoWall } from "@/components/home/WorkSections";
import { ServicesSplit } from "@/components/home/ProofSections";
import { Reviews } from "@/components/home/Reviews";
import { HomeContact, HomeFooter } from "@/components/home/ContactFooter";
import PricingPage from "@/pages/PricingPage";
import BookPage from "@/pages/BookPage";
import AuditPage from "@/pages/AuditPage";
import PrivacyPage from "@/pages/PrivacyPage";
import AdminPage from "@/pages/AdminPage";
import AuditViewPage from "@/pages/AuditViewPage";

const LOADER_KEY = "jay_loader_seen";

const Home = ({ introActive }) => {
  const location = useLocation();
  const [heroDelay] = useState(() => (introActive ? (INTRO_DURATION + 500) / 1000 : 0));

  // Scroll to hash target (e.g. /#contact from Pricing page) after mount
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    // Delay so sections mount before we scroll
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
    return () => clearTimeout(t);
  }, [location.hash]);

  return (
    <main data-testid="home-main" className="relative bg-[#09090b] text-white font-jakarta antialiased">
      <HomeNav />
      <HomeHero delay={heroDelay} />
      <Statement />
      <Sectors />
      <WorkGrid />
      <LogoWall />
      <Reviews />
      <ServicesSplit />
      <HomeContact />
      <HomeFooter />
      <MobileStickyCTA />
    </main>
  );
};

const AppShell = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  // Only show loader on the home route AND if not already shown this session
  const [showLoader, setShowLoader] = useState(
    () => isHome && sessionStorage.getItem(LOADER_KEY) !== "1"
  );

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader && (
          <IntroScreen
            key="intro-screen"
            onDone={() => {
              sessionStorage.setItem(LOADER_KEY, "1");
              setShowLoader(false);
            }}
          />
        )}
      </AnimatePresence>
      <Routes>
        <Route path="/" element={<Home introActive={showLoader} />} />
        <Route path="/projects" element={<Navigate to="/#work" replace />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/audit" element={<AuditPage />} />
        <Route path="/audit/view/:token" element={<AuditViewPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0b0b0b",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.08)",
              fontFamily: "Manrope, system-ui, sans-serif",
            },
          }}
        />
        <AppShell />
      </BrowserRouter>
    </div>
  );
}

export default App;
