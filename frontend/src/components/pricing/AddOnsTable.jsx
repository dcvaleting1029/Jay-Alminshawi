import React from "react";
import { motion } from "framer-motion";
import { ADD_ONS } from "../../data/pricing";

export const AddOnsTable = () => {
  return (
    <section
      data-testid="addons-section"
      className="relative py-16 sm:py-24 lg:py-28 bg-[#050505]"
    >
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="mb-10 sm:mb-14"
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
            className="font-heading text-[11px] tracking-[0.32em] uppercase text-white/40 mb-5"
          >
            <span className="inline-block h-px w-8 align-middle mr-3 bg-white/30" />
            Extras
          </motion.p>
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.85 },
              },
            }}
            className="font-display uppercase text-white leading-[0.9] tracking-tight text-4xl sm:text-5xl lg:text-6xl"
          >
            Optional Add-ons
          </motion.h2>
        </motion.div>

        <div
          data-testid="addons-table"
          className="rounded-[22px] border border-white/[0.08] bg-white/[0.02] backdrop-blur-md overflow-hidden divide-y divide-white/[0.06]"
        >
          {ADD_ONS.map((item, i) => (
            <motion.div
              key={item.name}
              data-testid={`addon-row-${i}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: 0.04 * i,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
              className="flex items-center justify-between gap-6 px-5 sm:px-7 lg:px-8 py-5 sm:py-6 transition-colors"
            >
              <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                <span className="font-mono-grotesk text-[10.5px] tracking-[0.2em] text-white/30 w-6 tabular-nums shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-heading text-[15px] sm:text-base text-white/90 truncate">
                  {item.name}
                </span>
              </div>
              <span className="font-display text-lg sm:text-xl text-white tracking-tight whitespace-nowrap">
                {item.price}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AddOnsTable;
