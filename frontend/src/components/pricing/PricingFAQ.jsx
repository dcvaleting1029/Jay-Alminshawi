import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { PRICING_FAQ } from "../../data/pricing";

const FAQItem = ({ item, i, isOpen, onToggle }) => {
  return (
    <motion.div
      data-testid={`faq-item-${i}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: 0.05 * i,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`border-b border-white/[0.08] transition-colors duration-300 ${
        isOpen ? "bg-white/[0.02]" : ""
      }`}
    >
      <button
        data-testid={`faq-trigger-${i}`}
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-6 py-6 sm:py-7 text-left group"
      >
        <span
          className={`font-heading text-lg sm:text-xl lg:text-2xl tracking-tight transition-colors duration-300 ${
            isOpen ? "text-white" : "text-white/80 group-hover:text-white"
          }`}
        >
          {item.q}
        </span>
        <span
          aria-hidden
          className={`grid place-items-center h-10 w-10 rounded-full border shrink-0 transition-all duration-500 ${
            isOpen
              ? "bg-white text-black border-white rotate-45"
              : "border-white/15 text-white/70 group-hover:border-white/40 group-hover:text-white"
          }`}
        >
          <Plus size={16} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-7 pr-14 text-[15px] sm:text-base text-white/60 leading-relaxed max-w-3xl">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const PricingFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      data-testid="pricing-faq-section"
      className="relative py-16 sm:py-24 lg:py-28 bg-[#050505]"
    >
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Heading */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } },
            }}
            className="lg:col-span-4"
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
              FAQ
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
              Questions,<br />answered.
            </motion.h2>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
              }}
              className="mt-6 text-[15px] text-white/55 leading-relaxed max-w-sm"
            >
              Everything you need to know before booking a discovery call.
              Anything else — just ask.
            </motion.p>
          </motion.div>

          {/* Accordion */}
          <div className="lg:col-span-8">
            <div className="border-t border-white/[0.08]">
              {PRICING_FAQ.map((item, i) => (
                <FAQItem
                  key={i}
                  item={item}
                  i={i}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingFAQ;
