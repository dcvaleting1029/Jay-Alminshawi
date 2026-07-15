import React from "react";
import { motion } from "framer-motion";

export const PricingHero = () => {
  return (
    <section
      data-testid="pricing-hero"
      className="relative pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-24 bg-[#050505] overflow-hidden"
    >
      {/* Floating background gradients */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-white/[0.035] blur-[140px]" />
        <div className="absolute top-20 right-0 w-[480px] h-[480px] rounded-full bg-white/[0.025] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="max-w-4xl"
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
            className="font-heading text-[11px] tracking-[0.32em] uppercase text-white/40 mb-6"
          >
            <span className="inline-block h-px w-8 align-middle mr-3 bg-white/30" />
            Pricing
          </motion.p>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="font-display uppercase text-white leading-[0.9] tracking-tight text-5xl sm:text-6xl lg:text-7xl xl:text-[88px]"
          >
            Affordable websites <br className="hidden sm:block" />
            <span className="text-white/60">that grow with your business.</span>
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
            }}
            className="mt-8 sm:mt-10 text-[16px] sm:text-lg text-white/60 max-w-2xl leading-relaxed"
          >
            Whether you&apos;re just getting started or ready to scale, choose the
            package that fits your business today. Every website is designed to
            generate enquiries and create a professional first impression.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingHero;
