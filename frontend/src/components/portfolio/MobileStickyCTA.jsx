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
          onClick={() => { const el = document.getElementById("contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); else window.location.assign("/#contact"); }}
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Book a call"
          className="lg:hidden fixed z-40 bottom-5 right-5 inline-flex items-center gap-2 rounded-full bg-white text-black px-5 h-11 text-[13px] font-medium shadow-2xl shadow-black/60 hover:bg-neutral-200 transition-colors"
        >
          Book a call
          <ArrowUpRight size={14} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default MobileStickyCTA;
