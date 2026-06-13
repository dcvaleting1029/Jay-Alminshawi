import React from "react";
import { motion } from "framer-motion";
import { PARTNERS } from "../../data/portfolio";

export const TrustedBy = () => {
  const items = [...PARTNERS, ...PARTNERS]; // duplicated for seamless marquee
  return (
    <section
      data-testid="trusted-by"
      className="relative py-16 sm:py-20 border-y border-white/[0.06] bg-[#070707] overflow-hidden"
    >
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center font-heading text-[10.5px] sm:text-[11px] tracking-[0.32em] uppercase text-white/40 mb-10"
        >
          Trusted by ambitious brands
        </motion.p>

        <div className="relative gradient-fade-x">
          <div
            className="flex w-max items-center gap-12 sm:gap-20 animate-logo-marquee whitespace-nowrap"
            data-testid="trusted-logos"
          >
            {items.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[0.04em] text-white/35 hover:text-white/80 transition-colors"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
