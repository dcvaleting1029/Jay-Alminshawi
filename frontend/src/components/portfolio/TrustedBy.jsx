import React from "react";
import { motion } from "framer-motion";
import { PARTNERS } from "../../data/portfolio";

export const TrustedBy = () => {
  // Duplicate the list for a seamless infinite marquee
  const items = [...PARTNERS, ...PARTNERS];
  return (
    <section
      data-testid="trusted-by"
      className="relative py-12 sm:py-16 lg:py-20 border-y border-white/[0.06] bg-[#070707] overflow-hidden"
    >
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center font-heading text-[10.5px] sm:text-[11px] tracking-[0.32em] uppercase text-white/40 mb-12"
        >
          Trusted by ambitious brands
        </motion.p>

        <div className="relative gradient-fade-x">
          <div
            data-testid="trusted-logos"
            className="flex w-max items-center gap-12 sm:gap-20 lg:gap-24 animate-logo-marquee whitespace-nowrap"
          >
            {items.map((p, i) => (
              <div
                key={`${p.name}-${i}`}
                className="shrink-0 h-12 sm:h-16 lg:h-20 w-32 sm:w-44 lg:w-52 grid place-items-center opacity-90 hover:opacity-100 transition-opacity duration-300"
                title={p.name}
                aria-label={p.name}
              >
                <img
                  src={p.src}
                  alt={p.name}
                  loading="lazy"
                  draggable={false}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
