import React from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { AuditMockup } from "./AuditMockup";

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.15 + i * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  }),
};

const TRUST = ["Personally reviewed", "No generic automated report", "No obligation"];

export const AuditHero = ({ onStart }) => (
  <section
    data-testid="audit-hero"
    className="relative w-full overflow-hidden bg-[#050505] pt-10 sm:pt-14 lg:pt-20"
  >
    <div className="absolute inset-0 vertical-panels opacity-60 pointer-events-none" />
    <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[520px] w-[1200px] rounded-full bg-white/[0.04] blur-[160px] pointer-events-none" />
    <div className="absolute inset-0 noise-overlay pointer-events-none" />

    <div className="relative mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12 pb-20 sm:pb-28">
      <div className="grid lg:grid-cols-12 gap-14 lg:gap-8 items-center">
        <div className="lg:col-span-6">
          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="font-heading text-[11px] sm:text-[12px] tracking-[0.32em] uppercase text-white/55 mb-7"
          >
            <span className="inline-block h-px w-8 align-middle mr-3 bg-white/30" />
            Free Personalised Website Audit
          </motion.p>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="show" custom={1}
            data-testid="audit-headline"
            className="font-display uppercase text-white leading-[0.85] tracking-[-0.035em] text-[10vw] sm:text-[9vw] lg:text-[4.6vw] xl:text-[4.4vw] break-words"
          >
            <span className="block">See what&apos;s holding your</span>
            <span className="block text-white/95">website back.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="mt-8 max-w-xl text-[15px] sm:text-base text-white/55 leading-relaxed"
          >
            I&apos;ll personally review your website and identify opportunities
            to improve its design, user experience, lead generation and overall
            online presence.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-8 sm:mt-10">
            <button
              data-testid="audit-hero-cta"
              onClick={onStart}
              className="group relative inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white text-black w-full sm:w-auto px-6 h-12 text-[12px] tracking-[0.22em] uppercase font-medium hover:bg-transparent hover:text-white transition-all duration-300"
            >
              Get My Free Website Audit
              <span className="inline-block w-4 h-px bg-current group-hover:w-6 transition-all" />
            </button>
          </motion.div>

          <motion.ul
            variants={fadeUp} initial="hidden" animate="show" custom={4}
            data-testid="audit-trust-points"
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-x-7 sm:gap-y-2"
          >
            {TRUST.map((t) => (
              <li key={t} className="inline-flex items-center gap-2.5 font-mono-grotesk text-[10.5px] sm:text-[11px] tracking-[0.22em] uppercase text-white/45">
                <Check size={12} strokeWidth={2.5} className="text-white/70" />
                {t}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="lg:col-span-6 relative"
        >
          <AuditMockup />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="mt-16 sm:mt-24 flex items-center justify-between gap-4"
      >
        <button
          onClick={onStart}
          className="flex items-center gap-3 text-white/40 hover:text-white/70 transition-colors text-[10.5px] sm:text-[11px] tracking-[0.3em] uppercase"
        >
          <span className="animate-scroll-bounce inline-flex"><ChevronDown size={14} /></span>
          Start Your Audit Below
        </button>
        <div className="hidden sm:block font-mono-grotesk text-[10.5px] tracking-[0.32em] uppercase text-white/30">
          Takes About 2 Minutes
        </div>
      </motion.div>
    </div>
  </section>
);

export default AuditHero;
