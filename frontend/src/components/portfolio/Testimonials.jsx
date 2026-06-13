import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { LaptopMockup } from "./LaptopMockup";
import { TESTIMONIALS, PROJECTS } from "../../data/portfolio";

const cardVariants = {
  hidden: { opacity: 0, x: -40 },
  show: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.08 * i, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
};

const TestimonialCard = ({ t, i }) => (
  <motion.article
    data-testid={`testimonial-card-${i}`}
    variants={cardVariants}
    custom={i}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-60px" }}
    className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-7 sm:p-8 overflow-hidden glow-soft"
  >
    <header className="flex items-center justify-between mb-7">
      <span className="font-heading text-[12px] tracking-[0.26em] uppercase text-white/80">
        {t.brand}
      </span>
      <Quote size={16} className="text-white/20" />
    </header>
    <p className="text-[15px] sm:text-base text-white/75 leading-relaxed">
      &ldquo;{t.quote}&rdquo;
    </p>
    <footer className="mt-8 flex items-center gap-1">
      {Array.from({ length: t.rating }).map((_, idx) => (
        <Star key={idx} size={14} className="fill-white text-white" />
      ))}
      <span className="ml-3 font-mono-grotesk text-[10.5px] tracking-[0.28em] uppercase text-white/40">
        5.0 / 5
      </span>
    </footer>
  </motion.article>
);

export const Testimonials = () => {
  const decoratorScreen = PROJECTS[5]?.image; // DC Valeting
  return (
    <section
      data-testid="testimonials-section"
      className="relative py-24 sm:py-32 bg-[#050505]"
    >
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left: header + cards */}
          <div className="lg:col-span-7">
            <p className="font-heading text-[11px] tracking-[0.32em] uppercase text-white/40 mb-5">
              <span className="inline-block h-px w-8 align-middle mr-3 bg-white/30" />
              Client Words
            </p>
            <h2 className="font-display uppercase text-white leading-[0.9] tracking-tight text-5xl sm:text-6xl lg:text-7xl">
              Testimonials
            </h2>
            <p className="mt-7 text-[15px] sm:text-base text-white/55 max-w-md leading-relaxed">
              What clients say about working with me and the results we&apos;ve
              achieved.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
              {TESTIMONIALS.map((t, i) => (
                <TestimonialCard key={t.brand} t={t} i={i} />
              ))}
            </div>
          </div>

          {/* Right: decorative laptop */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-[520px]">
              <LaptopMockup
                screen={decoratorScreen}
                tilt={14}
                floating
                shine
                testId="testimonials-decor-laptop"
                className="w-full"
              />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[60%] h-14 bg-black blur-2xl rounded-full opacity-80" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
