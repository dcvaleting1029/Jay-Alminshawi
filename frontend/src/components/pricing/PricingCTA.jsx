import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export const PricingCTA = () => {
  return (
    <section
      data-testid="pricing-cta-section"
      className="relative py-24 sm:py-32 lg:py-40 bg-[#09090b] overflow-hidden border-t border-white/[0.05]"
    >
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-white/[0.03] blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-[120px]" />
      </div>

      <div className="relative mx-auto w-full px-[5vw]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.7 },
              },
            }}
            className="font-heading text-[11px] tracking-widest uppercase text-white/40 mb-6"
          >
            <span className="inline-block h-px w-8 align-middle mr-3 bg-white/30" />
            Let&apos;s Build
          </motion.p>

          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="font-title font-medium text-white leading-[1.1] tracking-tight text-4xl sm:text-5xl lg:text-6xl"
          >
            Ready to build a <br className="hidden sm:block" />
            website that <br className="hidden sm:block" />
            <span className="text-white/60">actually converts?</span>
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
            }}
            className="mt-8 sm:mt-10 text-[16px] sm:text-lg text-white/55 max-w-2xl mx-auto leading-relaxed"
          >
            Whether you&apos;re a one-van renovation firm or a multi-team
            contractor, let&apos;s build the website that makes homeowners
            choose you — and start bringing in the higher-value jobs that grow
            your business.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
            }}
            className="mt-12 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="/#contact"
              data-testid="pricing-final-cta-primary"
              className="group inline-flex items-center gap-3 rounded-full bg-white text-black h-14 px-7 sm:px-8 text-[13.5px] font-medium hover:bg-white/90 transition-all duration-300 hover:scale-[1.02]"
            >
              Book Free Discovery Call
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
            <a
              href="/#work"
              data-testid="pricing-final-cta-secondary"
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.03] text-white h-14 px-7 sm:px-8 text-[13.5px] font-medium hover:bg-white hover:text-black hover:border-white transition-all duration-300"
            >
              View Portfolio
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingCTA;
