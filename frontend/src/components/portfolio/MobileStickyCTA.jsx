import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * MobileStickyCTA — floating "Build Your Website" pill shown on small screens
 * once the user has scrolled past the hero. Hides itself while the contact
 * section is in view so it never blocks the form.
 */
export const MobileStickyCTA = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let raf = 0;
    const computeVisibility = () => {
      const heroBottom = document.getElementById("home")?.getBoundingClientRect().bottom ?? 0;
      const contactTop = document.getElementById("contact")?.getBoundingClientRect().top ?? Infinity;
      const past = heroBottom < 100;
      const inContact = contactTop < window.innerHeight - 80;
      setShow(past && !inContact);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(computeVisibility);
    };
    computeVisibility();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          data-testid="mobile-sticky-cta"
          type="button"
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Build Your Website"
          className="lg:hidden fixed z-40 bottom-5 right-5 inline-flex items-center gap-2 rounded-full bg-white text-black px-5 h-12 text-[11px] tracking-[0.22em] uppercase font-semibold shadow-2xl shadow-black/60 hover:bg-black hover:text-white hover:border-white/20 border border-transparent transition-colors"
        >
          Build Your Website
          <ArrowUpRight size={14} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default MobileStickyCTA;
