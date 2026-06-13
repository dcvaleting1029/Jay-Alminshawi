import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
    </main>
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
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
