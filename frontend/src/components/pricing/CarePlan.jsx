import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Check, ShieldCheck, ArrowUpRight } from "lucide-react";
import { CARE_PLAN } from "../../data/pricing";
import { useCountUp } from "../../hooks/useCountUp";

const CTA_LINK = "/#contact";

export const CarePlan = () => {
  const ref = useRef(null);
  const count = useCountUp(CARE_PLAN.price, ref);

  return (
    <section
      data-testid="care-plan-section"
      className="relative py-12 sm:py-16 lg:py-20 bg-[#050505]"
    >
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
        <motion.article
          ref={ref}
          data-testid="care-plan-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="group relative overflow-hidden rounded-[22px] border border-white/[0.08] bg-gradient-to-br from-[#0c0c0c] via-[#0a0a0a] to-[#050505] p-7 sm:p-10 lg:p-12 hover:border-white/20 transition-all duration-500"
        >
          {/* Decorative background glow */}
          <div className="pointer-events-none absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full bg-white/[0.04] blur-[120px] opacity-70 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Title + Price */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 mb-6">
                <ShieldCheck size={13} className="text-white/70" />
                <span className="font-mono-grotesk text-[10px] tracking-[0.28em] uppercase text-white/60">
                  Ongoing Care
                </span>
              </div>

              <h3 className="font-display uppercase text-white leading-[0.95] tracking-tight text-4xl sm:text-5xl lg:text-6xl">
                {CARE_PLAN.title}
              </h3>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-2xl sm:text-3xl text-white/70 leading-none">
                  £
                </span>
                <span
                  data-testid="care-plan-price"
                  className="font-display text-5xl sm:text-6xl lg:text-[68px] text-white leading-none tracking-tight tabular-nums"
                >
                  {count.toLocaleString()}
                </span>
                <span className="ml-1 font-mono-grotesk text-[12px] tracking-[0.24em] uppercase text-white/45">
                  {CARE_PLAN.period}
                </span>
              </div>

              <p className="mt-6 text-[15px] sm:text-base text-white/55 leading-relaxed max-w-md">
                {CARE_PLAN.subtitle}
              </p>

              <a
                href={CTA_LINK}
                data-testid="care-plan-cta"
                className="group/btn mt-8 inline-flex items-center gap-3 rounded-full bg-white text-black h-12 px-6 text-[11.5px] tracking-[0.24em] uppercase font-medium hover:bg-white/90 transition-all duration-300"
              >
                {CARE_PLAN.cta}
                <ArrowUpRight
                  size={16}
                  className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                />
              </a>
            </div>

            {/* Right: Features in 2 columns */}
            <div className="lg:col-span-7">
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                {CARE_PLAN.features.map((feat, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      delay: 0.05 * i,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex items-center gap-3 py-2 border-b border-white/[0.06] last:border-b-0 sm:last:border-b sm:[&:nth-last-child(-n+2)]:border-b-0"
                  >
                    <span className="grid place-items-center h-5 w-5 rounded-full bg-white text-black shrink-0">
                      <Check size={11} strokeWidth={3} />
                    </span>
                    <span className="text-[14px] sm:text-[14.5px] text-white/80 font-heading">
                      {feat}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default CarePlan;
