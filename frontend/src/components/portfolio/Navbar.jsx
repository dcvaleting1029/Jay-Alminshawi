import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { label: "HOME", id: "home" },
  { label: "PROJECTS", id: "projects" },
  { label: "SERVICES", id: "services" },
  { label: "ABOUT", id: "about" },
  { label: "CONTACT", id: "contact" },
];

const smoothScrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        data-testid="site-navbar"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-black/55 border-b border-white/[0.06]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
          <button
            data-testid="nav-brand"
            onClick={() => smoothScrollTo("home")}
            className="font-heading text-[11px] sm:text-[13px] tracking-[0.28em] uppercase text-white/90 hover:text-white transition"
          >
            Jay Alminshawi
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              data-testid="nav-build-website"
              onClick={() => smoothScrollTo("contact")}
              className="group relative inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 sm:px-5 h-9 sm:h-10 text-[11px] sm:text-[12px] tracking-[0.22em] uppercase font-medium text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              <span>Build Your Website</span>
              <ArrowUpRight size={14} className="opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <button
              data-testid="nav-menu-toggle"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="grid place-items-center h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-white/15 bg-white/[0.03] text-white hover:bg-white hover:text-black transition-colors"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="nav-menu-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/85 backdrop-blur-2xl"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <ul className="flex flex-col items-center gap-7 sm:gap-9">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                  >
                    <button
                      data-testid={`nav-link-${link.id}`}
                      onClick={() => {
                        smoothScrollTo(link.id);
                        setOpen(false);
                      }}
                      className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-white/80 hover:text-white transition-colors"
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
