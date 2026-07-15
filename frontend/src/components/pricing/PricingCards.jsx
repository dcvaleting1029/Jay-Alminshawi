import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Check, ArrowUpRight, Sparkles } from "lucide-react";
import { PLANS } from "../../data/pricing";
import { useCountUp } from "../../hooks/useCountUp";

const CTA_LINK = "/#contact";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Price = ({ plan }) => {
  const ref = useRef(null);
  const count = useCountUp(plan.price, ref);

  return (
    <div ref={ref} className="flex items-baseline gap-1">
      {plan.price === null ? (
        <span className="font-display text-5xl sm:text-6xl lg:text-5xl xl:text-[56px] text-white leading-none tracking-tight whitespace-nowrap">
          Custom
        </span>
      ) : (
        <>
          <span className="font-display text-2xl sm:text-3xl lg:text-2xl xl:text-3xl text-white/70 leading-none">
            £
          </span>
          <span
            data-testid={`plan-price-${plan.id}`}
            className="font-display text-5xl sm:text-6xl lg:text-5xl xl:text-[60px] text-white leading-none tracking-tight tabular-nums whitespace-nowrap"
          >
            {count.toLocaleString()}
          </span>
        </>
      )}
    </div>
  );
};

const PlanCard = ({ plan, i }) => {
  const isHighlight = plan.highlight;

  return (
    <motion.article
      data-testid={`plan-card-${plan.id}`}
      variants={cardVariants}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="group relative flex flex-col h-full"
    >
      {/* Badge — placed outside overflow so it isn't clipped */}
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-black text-[9.5px] tracking-[0.28em] uppercase font-heading font-medium shadow-[0_8px_24px_-4px_rgba(0,0,0,0.6)] whitespace-nowrap">
            <Sparkles size={11} className="fill-black" />
            {plan.badge}
          </span>
        </div>
      )}

      {/* Animated gradient border for highlight card */}
      {isHighlight && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-[23px] bg-white/20"
        />
      )}

      {/* Inner card — this one clips its own content */}
      <div
        className={`relative flex-1 flex flex-col rounded-[22px] p-7 sm:p-8 backdrop-blur-xl overflow-hidden transition-all duration-500 ${
          isHighlight
            ? "bg-[#0a0a0a] border border-white/20 shadow-[0_40px_120px_-30px_rgba(255,255,255,0.15)]"
            : "bg-white/[0.03] border border-white/[0.08] group-hover:border-white/25 group-hover:shadow-[0_30px_80px_-30px_rgba(255,255,255,0.08)]"
        }`}
      >
        {/* Plan name */}
        <p className="font-mono-grotesk text-[10.5px] tracking-[0.32em] uppercase text-white/45 mb-6">
          {plan.name}
        </p>

        {/* Price */}
        <Price plan={plan} />

        {/* Tagline */}
        <p className="mt-5 text-[13.5px] sm:text-[14px] text-white/55 leading-relaxed min-h-[3.5em]">
          {plan.tagline}
        </p>

        {/* Divider */}
        <div className="my-7 sm:my-8 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        {/* Features */}
        <ul className="space-y-3.5 flex-1">
          {plan.features.map((feat, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span
                className={`mt-0.5 grid place-items-center h-4 w-4 rounded-full shrink-0 ${
                  isHighlight ? "bg-white text-black" : "bg-white/10 text-white"
                }`}
              >
                <Check size={10} strokeWidth={3} />
              </span>
              <span className="text-[13.5px] sm:text-[14px] text-white/75 leading-snug">
                {feat}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA — full width so all buttons align */}
        <a
          href={CTA_LINK}
          data-testid={`plan-cta-${plan.id}`}
          className={`group/btn mt-8 flex items-center justify-center gap-2 rounded-full h-12 px-5 text-[11.5px] tracking-[0.24em] uppercase font-medium transition-all duration-300 whitespace-nowrap ${
            isHighlight
              ? "bg-white text-black hover:bg-white/90"
              : "bg-white/[0.04] border border-white/15 text-white hover:bg-white hover:text-black hover:border-white"
          }`}
        >
          {plan.cta}
          <ArrowUpRight
            size={16}
            className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
          />
        </a>
      </div>
    </motion.article>
  );
};

export const PricingCards = () => {
  return (
    <section
      data-testid="pricing-cards-section"
      className="relative py-12 sm:py-16 lg:py-20 bg-[#050505]"
    >
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
        {/* pt-3 to leave headroom for the "Most Popular" badge sitting at -top-3 on the highlight card */}
        <div
          data-testid="pricing-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch pt-3"
        >
          {PLANS.map((p, i) => (
            <PlanCard key={p.id} plan={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingCards;
