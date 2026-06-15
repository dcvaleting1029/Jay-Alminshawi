import React from "react";
import { motion } from "framer-motion";
import { Instagram, Linkedin, ArrowUpRight } from "lucide-react";

// Inline TikTok glyph (lucide-react has no native TikTok icon)
const TikTokIcon = ({ size = 14, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const LINKS = [
  { label: "HOME", id: "home" },
  { label: "PROJECTS", id: "projects" },
  { label: "SERVICES", id: "services" },
  { label: "ABOUT", id: "about" },
  { label: "CONTACT", id: "contact" },
];

const smoothTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const Footer = () => {
  return (
    <footer
      data-testid="site-footer"
      className="relative bg-[#050505] border-t border-white/[0.06] overflow-hidden"
    >
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12 pt-16 sm:pt-20 lg:pt-24 pb-10">
        {/* Top grid */}
        <div className="grid lg:grid-cols-12 gap-10 sm:gap-12 mb-12 sm:mb-16">
          <div className="lg:col-span-6">
            <p className="font-heading text-[11px] tracking-[0.32em] uppercase text-white/40 mb-5">
              <span className="inline-block h-px w-8 align-middle mr-3 bg-white/30" />
              Let&apos;s Work Together
            </p>
            <button
              data-testid="footer-cta"
              onClick={() => smoothTo("contact")}
              className="group inline-flex items-center gap-3 sm:gap-4 font-heading text-2xl sm:text-4xl lg:text-5xl tracking-tight text-white hover:text-white/80 transition-colors"
            >
              Start a project
              <span className="grid place-items-center h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-white/15 group-hover:bg-white group-hover:text-black transition-all">
                <ArrowUpRight size={16} />
              </span>
            </button>
          </div>

          <nav className="lg:col-span-3" data-testid="footer-nav">
            <p className="font-mono-grotesk text-[10.5px] tracking-[0.28em] uppercase text-white/40 mb-5">Navigate</p>
            <ul className="space-y-2.5">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    data-testid={`footer-link-${l.id}`}
                    onClick={() => smoothTo(l.id)}
                    className="text-[13px] tracking-[0.22em] uppercase text-white/60 hover:text-white transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="font-mono-grotesk text-[10.5px] tracking-[0.28em] uppercase text-white/40 mb-5">Connect</p>
            <ul className="space-y-2.5">
              <li>
                <a
                  data-testid="social-instagram"
                  href="https://www.instagram.com/jay_alminshawi/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 text-[13px] tracking-[0.22em] uppercase text-white/60 hover:text-white transition-colors"
                >
                  <Instagram size={14} /> Instagram
                </a>
              </li>
              <li>
                <a
                  data-testid="social-tiktok"
                  href="https://www.tiktok.com/@jay_alminshawi"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 text-[13px] tracking-[0.22em] uppercase text-white/60 hover:text-white transition-colors"
                >
                  <TikTokIcon size={14} /> TikTok
                </a>
              </li>
              <li>
                <a
                  data-testid="social-linkedin"
                  href="https://www.linkedin.com/in/jay-alminshawi-012250248/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 text-[13px] tracking-[0.22em] uppercase text-white/60 hover:text-white transition-colors"
                >
                  <Linkedin size={14} /> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Oversized name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <h2
            data-testid="footer-bigname"
            className="font-display uppercase text-white/95 leading-[0.84] tracking-[-0.04em] text-[11.5vw] sm:text-[14vw] lg:text-[11.5vw] text-left"
          >
            <span className="block">Jay</span>
            <span className="block">Alminshawi</span>
          </h2>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#050505] to-transparent" />
        </motion.div>

        {/* Copyright row */}
        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono-grotesk text-[10.5px] tracking-[0.28em] uppercase text-white/35">
          <p>© 2025 Jay Alminshawi — All Rights Reserved</p>
          <p>Designed &amp; Built by Jay Alminshawi</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
