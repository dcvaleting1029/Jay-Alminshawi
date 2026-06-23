import React, { useState } from "react";
import "@/App.css";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import TrustedBy from "@/components/portfolio/TrustedBy";
import Projects from "@/components/portfolio/Projects";
import Services from "@/components/portfolio/Services";
import Testimonials from "@/components/portfolio/Testimonials";
import About from "@/components/portfolio/About";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import LoadingScreen from "@/components/portfolio/LoadingScreen";
import MobileStickyCTA from "@/components/portfolio/MobileStickyCTA";

const LOADER_KEY = "jay_loader_seen";

const Home = () => {
  return (
    <main data-testid="home-main" className="relative bg-[#050505] text-white">
      <Navbar />
      <Hero />
      <TrustedBy />
      <Projects />
      <Services />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
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
          <LoadingScreen
            key="loading-screen"
            onProgressComplete={() => {
              sessionStorage.setItem(LOADER_KEY, "1");
              setShowLoader(false);
            }}
          />
        )}
      </AnimatePresence>
      <Routes>
        <Route path="/" element={<Home />} />
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
