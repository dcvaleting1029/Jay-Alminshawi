import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const CALENDLY_URL =
  "https://calendly.com/jay_alminshawi/discovery-call?background_color=1a1a1a&text_color=ffffff&primary_color=ffffff";
const CALENDLY_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";

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
              Build Your <br /> Website.
            </motion.h2>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
              }}
              className="mt-6 sm:mt-7 text-[15px] sm:text-base text-white/55 max-w-md leading-relaxed"
            >
              Pick a time that suits you and we&apos;ll jump on a 15-minute
              discovery call. We&apos;ll talk about your brand, project, and
              goals — and how I can bring it to life.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
              }}
              className="mt-10 sm:mt-12 space-y-3 font-mono-grotesk text-[12px] tracking-[0.2em] uppercase text-white/45"
            >
              <p><span className="text-white/30 mr-3">EMAIL</span> jayalminshawi@gmail.com</p>
              <p><span className="text-white/30 mr-3">BASED</span> Edinburgh, UK</p>
              <p><span className="text-white/30 mr-3">AVAILABILITY</span> Open for Q1 2026</p>
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
