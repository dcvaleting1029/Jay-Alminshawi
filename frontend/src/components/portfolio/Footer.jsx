import React from "react";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail, ArrowUpRight } from "lucide-react";

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
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12 pt-20 sm:pt-24 pb-10">
        {/* Top grid */}
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-6">
            <p className="font-heading text-[11px] tracking-[0.32em] uppercase text-white/40 mb-5">
              <span className="inline-block h-px w-8 align-middle mr-3 bg-white/30" />
              Let&apos;s Work Together
            </p>
            <button
              data-testid="footer-cta"
              onClick={() => smoothTo("contact")}
              className="group inline-flex items-center gap-3 font-heading text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white hover:text-white/80 transition-colors"
            >
              Start a project
              <span className="grid place-items-center h-12 w-12 rounded-full border border-white/15 group-hover:bg-white group-hover:text-black transition-all">
                <ArrowUpRight size={18} />
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
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 text-[13px] tracking-[0.22em] uppercase text-white/60 hover:text-white transition-colors"
                >
                  <Instagram size={14} /> Instagram
                </a>
              </li>
              <li>
                <a
                  data-testid="social-linkedin"
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 text-[13px] tracking-[0.22em] uppercase text-white/60 hover:text-white transition-colors"
                >
                  <Linkedin size={14} /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  data-testid="social-email"
                  href="mailto:hello@jayalminshawi.com"
                  className="inline-flex items-center gap-3 text-[13px] tracking-[0.22em] uppercase text-white/60 hover:text-white transition-colors"
                >
                  <Mail size={14} /> Email
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
            className="font-display uppercase text-white/95 leading-[0.82] tracking-[-0.04em] text-[15vw] sm:text-[14vw] lg:text-[11.5vw] text-left"
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
