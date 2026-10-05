import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Linkedin } from "lucide-react";
import { CalendlyInline } from "@/components/portfolio/CalendlyInline";
import { Reveal, Stagger, Item, Line } from "./HomeHero";

const WHATSAPP_URL = `https://wa.me/447376926302?text=${encodeURIComponent("Hi Jay, I'm interested in a new website for my business. Can we chat?")}`;

export const HomeContact = () => (
  <section id="contact" data-testid="contact-section" className="pb-24 sm:pb-32 lg:pb-40">
    <div className="mx-auto w-full px-[5vw]">
      <Line className="mb-24 sm:mb-32 lg:mb-40" />
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
      <Stagger className="lg:col-span-5" stagger={0.12}>
        <Item as="p" className="font-title text-xs uppercase tracking-widest text-neutral-500 mb-4">Contact</Item>
        <Item as="h2" className="font-title text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-tight text-white text-balance">
          Want to talk? Book a free 30-minute call.
        </Item>
        <Item as="p" className="mt-6 text-base sm:text-lg text-neutral-400 leading-relaxed max-w-md">
          Tell me about your company and the jobs you want more of, and I&apos;ll show you what your new website could look like. No obligation.
        </Item>
        <Item className="mt-10 space-y-3 text-[14.5px]">
          <a href="mailto:contact@jayalminshawi.com" data-testid="footer-email-link" className="block text-neutral-400 hover:text-white transition-colors">contact@jayalminshawi.com</a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-testid="whatsapp-cta" className="block text-neutral-400 hover:text-white transition-colors">Message me on WhatsApp →</a>
          <Link to="/audit" data-testid="contact-audit-link" className="block text-neutral-400 hover:text-white transition-colors">Or request a free website audit →</Link>
        </Item>
      </Stagger>
      <Reveal className="lg:col-span-7" delay={0.25}>
        <CalendlyInline height={700} className="!rounded-3xl !border-white/[0.06]" />
      </Reveal>
      </div>
    </div>
  </section>
);

const COLS = [
  { title: "Company", links: [["Work", "/#work"], ["Pricing", "/pricing"], ["Free audit", "/audit"], ["Privacy", "/privacy"]] },
  { title: "Connect", links: [["Instagram", "https://www.instagram.com/jay_alminshawi/", Instagram], ["TikTok", "https://www.tiktok.com/@jay_alminshawi"], ["LinkedIn", "https://www.linkedin.com/in/jay-alminshawi-012250248/", Linkedin]] },
];

export const HomeFooter = () => (
  <footer data-testid="footer-section">
    <div className="mx-auto w-full px-[5vw] pb-10">
      <Line className="mb-24 sm:mb-32" />
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <h2 className="font-title text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-tight text-white text-balance">
            They say no one reads the footer. Ha! Want to{" "}
            <button data-testid="footer-cta" onClick={() => { const el = document.getElementById("contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); else window.location.assign("/#contact"); }} className="underline underline-offset-8 decoration-white/30 hover:decoration-white transition-colors">talk</button>?
          </h2>
        </Reveal>
        <Stagger className="lg:col-span-5 grid grid-cols-2 gap-10" stagger={0.12} delay={0.15}>
          {COLS.map((c) => (
            <Item key={c.title}>
              <p className="font-title text-xs uppercase tracking-widest text-neutral-500 mb-5">{c.title}</p>
              <ul className="space-y-3">
                {c.links.map(([label, href, Icon]) => (
                  <li key={label}>
                    {href.startsWith("http") ? (
                      <a href={href} target="_blank" rel="noreferrer" data-testid={`footer-${label.toLowerCase()}`} className="inline-flex items-center gap-2 text-[14px] text-neutral-400 hover:text-white transition-colors">
                        {Icon && <Icon size={13} />}{label}
                      </a>
                    ) : (
                      <Link to={href} data-testid={`footer-${label.toLowerCase().replace(/\s+/g, "-")}`} className="text-[14px] text-neutral-400 hover:text-white transition-colors">{label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </Item>
          ))}
        </Stagger>
      </div>

      <Reveal>
        <p data-testid="footer-signature" className="font-title mt-24 sm:mt-32 text-[13vw] lg:text-[9vw] font-medium tracking-[-0.04em] leading-none text-white/[0.06] select-none whitespace-nowrap overflow-hidden">
          Jay Alminshawi
        </p>
      </Reveal>

      <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[12px] text-neutral-500">
        <p>© 2025 Jay Alminshawi. All rights reserved.</p>
        <p>Web design for building firms — UK-wide</p>
      </div>
    </div>
  </footer>
);
