import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Check, ArrowUpRight, Sparkles } from "lucide-react";
import { PLANS } from "../../data/pricing";
import { useCountUp } from "../../hooks/useCountUp";

const CTA_LINK = "/#contact";

const Price = ({ plan }) => {
  const ref = useRef(null);
  const count = useCountUp(plan.price, ref);

  return (
    <div ref={ref} className="flex items-baseline gap-1.5 justify-center">
      {plan.price === null ? (
        <span className="font-display text-6xl sm:text-7xl lg:text-[112px] text-white leading-none tracking-tight whitespace-nowrap">
          Custom
        </span>
      ) : (
        <>
          <span className="font-display text-4xl sm:text-5xl lg:text-6xl text-white/70 leading-none">
            £
          </span>
          <span
            data-testid={`plan-price-${plan.id}`}
            className="font-display text-6xl sm:text-7xl lg:text-[112px] text-white leading-none tracking-tight tabular-nums whitespace-nowrap"
          >
            {count.toLocaleString()}
          </span>
        </>
      )}
    </div>
  );
};

const FlagshipCard = ({ plan }) => (
  <motion.article
    data-testid={`plan-card-${plan.id}`}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    className="group relative mx-auto max-w-[820px] pt-4"
  >
    {/* Badge */}
    {plan.badge && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
        <span
          data-testid="flagship-badge"
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-black text-[10px] tracking-[0.28em] uppercase font-heading font-medium shadow-[0_8px_24px_-4px_rgba(0,0,0,0.7)] whitespace-nowrap"
        >
          <Sparkles size={12} className="fill-black" />
          {plan.badge}
        </span>
      </div>
    )}

    {/* Soft ambient glow */}
    <div
      aria-hidden
      className="pointer-events-none absolute -inset-6 rounded-[32px] bg-white/[0.03] blur-2xl opacity-70"
    />

    {/* Card */}
    <div className="relative rounded-[26px] border border-white/20 bg-[#0a0a0a] backdrop-blur-xl shadow-[0_50px_140px_-40px_rgba(255,255,255,0.14)] overflow-hidden">
      {/* Decorative top gradient bar */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <div className="p-8 sm:p-12 lg:p-16">
        {/* Plan name */}
        <div className="text-center">
          <p className="font-mono-grotesk text-[11px] tracking-[0.36em] uppercase text-white/45 mb-6">
            {plan.name} Package
          </p>

          {/* Price */}
          <Price plan={plan} />

          {/* Tagline */}
          <p className="mt-7 text-[15px] sm:text-base text-white/55 leading-relaxed max-w-lg mx-auto">
            {plan.tagline}
          </p>
        </div>

        {/* Divider */}
        <div className="my-10 sm:my-12 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        {/* Features — two columns */}
        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
          {plan.features.map((feat, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: 0.04 * idx,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-center gap-3"
            >
              <span className="grid place-items-center h-5 w-5 rounded-full bg-white text-black shrink-0">
                <Check size={11} strokeWidth={3} />
              </span>
              <span className="text-[14px] sm:text-[14.5px] text-white/80 font-heading leading-snug">
                {feat}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-12 sm:mt-14 flex justify-center">
          <a
            href={CTA_LINK}
            data-testid={`plan-cta-${plan.id}`}
            className="group/btn inline-flex items-center gap-3 rounded-full bg-white text-black h-14 px-8 sm:px-10 text-[12px] tracking-[0.24em] uppercase font-medium hover:bg-white/90 transition-all duration-300 hover:scale-[1.02]"
          >
            {plan.cta}
            <ArrowUpRight
              size={16}
              className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
            />
          </a>
        </div>

        {/* Trust line */}
        <p className="mt-6 text-center font-mono-grotesk text-[10.5px] tracking-[0.28em] uppercase text-white/35">
          50% Deposit · 50% On Launch · Payment Plans Available
        </p>
      </div>

      {/* Decorative bottom gradient bar */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </div>
  </motion.article>
);

export const PricingCards = () => {
  const plan = PLANS[0];

  return (
    <section
      data-testid="pricing-cards-section"
      className="relative py-12 sm:py-16 lg:py-20 bg-[#050505]"
    >
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
        <FlagshipCard plan={plan} />
      </div>
    </section>
  );
};

export default PricingCards;
