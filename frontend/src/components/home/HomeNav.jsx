import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const LINKS = [
  { label: "Work", target: "#work" },
  { label: "Services", target: "#services" },
  { label: "Reviews", target: "#reviews" },
  { label: "Pricing", target: "/pricing" },
  { label: "Free audit", target: "/audit" },
];

export const ease = [0.16, 1, 0.3, 1];

export const Pill = ({ children, primary, className = "", ...props }) => (
  <button
    className={`inline-flex items-center justify-center gap-2 rounded-full h-10 px-5 text-[13.5px] font-medium transition-colors duration-300 ${
      primary
        ? "bg-white text-black hover:bg-neutral-200"
        : "border border-white/15 bg-white/[0.04] text-white hover:border-white/35 hover:bg-white/[0.08]"
    } ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const HomeNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (target) => {
    setOpen(false);
    if (!target.startsWith("#")) return navigate(target);
    if (pathname !== "/") return navigate(`/${target}`);
    document.getElementById(target.slice(1))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        data-testid="main-navbar"
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
          scrolled || open ? "bg-[#09090b]/80 backdrop-blur-xl border-b border-white/[0.06]" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto w-full px-[5vw] h-16 sm:h-[72px] flex items-center justify-between">
          <Link to="/" data-testid="navbar-logo" aria-label="Jay Alminshawi — home" className="flex items-center">
            <img src="/ja-logo.png" alt="Jay Alminshawi" className="h-7 sm:h-8 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map((l) => (
              <button key={l.label} data-testid={`nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`} onClick={() => go(l.target)}
                className="text-[13.5px] text-neutral-400 hover:text-white transition-colors">
                {l.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Pill primary data-testid="nav-book-call" onClick={() => go("#contact")} className="hidden sm:inline-flex h-9 px-4 text-[13px]">
              Book a call
            </Pill>
            <button data-testid="nav-menu-toggle" aria-label="Menu" onClick={() => setOpen((v) => !v)}
              className="md:hidden grid place-items-center h-9 w-9 rounded-full border border-white/15 text-white">
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div data-testid="nav-menu-drawer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#09090b]/95 backdrop-blur-2xl pt-28 px-8">
            <ul className="space-y-6">
              {[...LINKS, { label: "Book a call", target: "#contact" }].map((l, i) => (
                <motion.li key={l.label} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }}>
                  <button onClick={() => go(l.target)} className="text-3xl font-medium tracking-tight text-neutral-300 hover:text-white">
                    {l.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HomeNav;
