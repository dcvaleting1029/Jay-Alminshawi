import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const CALENDLY_URL =
  "https://calendly.com/jay_alminshawi/discovery-call?background_color=1a1a1a&text_color=ffffff&primary_color=ffffff";
const CALENDLY_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";

// WhatsApp — international format, no leading + or spaces
const WHATSAPP_NUMBER = "447000000000";
const WHATSAPP_MESSAGE =
  "Hi Jay, I'm interested in a new website for my construction/renovation business. Can we chat?";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

/**
 * CalendlyInline — drops Calendly's inline scheduler into the page.
 * - Injects widget.js once per session (no global index.html edit)
 * - Calls Calendly.initInlineWidget on (re)mount so the iframe is created
 *   into the local container, not appended to the document body.
 */
const CalendlyInline = ({ url, className = "" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const mount = () => {
      const node = containerRef.current;
      if (cancelled || !node || !window.Calendly?.initInlineWidget) return;
      // Clear any iframe added by a previous render before re-init
      node.innerHTML = "";
      window.Calendly.initInlineWidget({ url, parentElement: node });
    };

    const existing = document.querySelector(`script[src="${CALENDLY_SCRIPT}"]`);
    if (window.Calendly?.initInlineWidget) {
      mount();
    } else if (existing) {
      existing.addEventListener("load", mount, { once: true });
    } else {
      const s = document.createElement("script");
      s.src = CALENDLY_SCRIPT;
      s.async = true;
      s.addEventListener("load", mount, { once: true });
      document.body.appendChild(s);
    }
    return () => { cancelled = true; };
  }, [url]);

  return (
    <div
      ref={containerRef}
      data-testid="calendly-inline"
      style={{ minWidth: 320, height: 720 }}
      className={`w-full rounded-2xl overflow-hidden border border-white/[0.08] bg-[#1a1a1a] ${className}`}
    />
  );
};

export const Contact = () => {
  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative py-20 sm:py-28 lg:py-32 bg-[#050505] border-t border-white/[0.05]"
    >
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Heading */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            className="lg:col-span-5"
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
                show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7 } },
              }}
              className="font-heading text-[11px] tracking-[0.32em] uppercase text-white/40 mb-5"
            >
              <span className="inline-block h-px w-8 align-middle mr-3 bg-white/30" />
              Book a Discovery Call
            </motion.p>
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
                show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85 } },
              }}
              className="font-display uppercase text-white leading-[0.9] tracking-tight text-5xl sm:text-6xl lg:text-7xl"
            >
              Win Your <br /> Next Job.
            </motion.h2>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
              }}
              className="mt-6 sm:mt-7 text-[15px] sm:text-base text-white/55 max-w-md leading-relaxed"
            >
              Pick a time that suits you and we&apos;ll jump on a 30-minute
              discovery call. Tell me about your business, the jobs you want to
              win, and I&apos;ll show you what your new website could look like.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
              }}
              className="mt-10 sm:mt-12 space-y-3 font-mono-grotesk text-[12px] tracking-[0.2em] uppercase text-white/45"
            >
              <p><span className="text-white/30 mr-3">EMAIL</span> jayalminshawi@gmail.com</p>
              <p><span className="text-white/30 mr-3">SERVING</span> Construction &amp; Renovation, UK-Wide</p>
              <p><span className="text-white/30 mr-3">AVAILABILITY</span> Open for Q1 2026</p>
            </motion.div>

            {/* WhatsApp — alternative to booking a call */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
              }}
              className="mt-8"
            >
              <div className="flex items-center gap-4 my-6">
                <span className="h-px flex-1 bg-white/10" />
                <span className="font-mono-grotesk text-[10px] tracking-[0.32em] uppercase text-white/35">
                  Or
                </span>
                <span className="h-px flex-1 bg-white/10" />
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="whatsapp-cta"
                className="group relative flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md p-4 sm:p-5 hover:border-[#25D366]/40 hover:bg-white/[0.05] transition-all duration-300 overflow-hidden"
              >
                {/* WhatsApp glyph */}
                <span className="grid place-items-center h-12 w-12 rounded-xl bg-[#25D366] shrink-0 shadow-[0_10px_30px_-8px_rgba(37,211,102,0.55)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    width="22"
                    height="22"
                    fill="#0a1a12"
                    aria-hidden
                  >
                    <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.82.74 5.55 2.15 7.96L.5 31.5l7.73-2.03A15.44 15.44 0 0 0 16 31.5C24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5zm0 28.15c-2.4 0-4.75-.64-6.79-1.86l-.49-.29-4.59 1.2 1.23-4.47-.32-.51A12.87 12.87 0 0 1 3.13 16C3.13 8.9 8.9 3.13 16 3.13S28.87 8.9 28.87 16 23.1 28.65 16 28.65zm7.35-9.63c-.4-.2-2.38-1.17-2.75-1.3-.37-.14-.64-.2-.9.2-.28.4-1.06 1.3-1.29 1.57-.24.27-.48.3-.88.1-.4-.2-1.7-.63-3.23-2-1.2-1.07-2-2.4-2.24-2.8-.24-.4-.03-.62.17-.82.18-.18.4-.48.6-.72.2-.24.27-.4.4-.67.14-.27.07-.5-.03-.7-.1-.2-.9-2.16-1.23-2.96-.32-.78-.65-.68-.9-.7-.23-.02-.5-.02-.77-.02s-.7.1-1.07.5c-.37.4-1.4 1.37-1.4 3.33s1.44 3.87 1.64 4.13c.2.27 2.83 4.33 6.87 6.07 4.03 1.73 4.03 1.15 4.75 1.08.72-.07 2.38-.97 2.72-1.9.34-.94.34-1.75.24-1.92-.1-.17-.37-.27-.77-.47z" />
                  </svg>
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-heading text-[15px] sm:text-base text-white leading-tight">
                    Prefer to chat on WhatsApp?
                  </p>
                  <p className="mt-1 text-[13px] text-white/50 leading-snug">
                    Message me directly — I usually reply within a few hours.
                  </p>
                </div>
                <span
                  aria-hidden
                  className="grid place-items-center h-9 w-9 rounded-full border border-white/15 text-white/70 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all shrink-0"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </span>
              </a>
            </motion.div>
          </motion.div>

          {/* Calendly inline scheduler */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <CalendlyInline url={CALENDLY_URL} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
