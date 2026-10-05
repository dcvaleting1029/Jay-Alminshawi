import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { TRADE_TESTIMONIALS, OTHER_TESTIMONIALS, TESTIMONIALS, GOOGLE_REVIEWS_URL } from "@/data/portfolio";
import { Reveal, Stagger, Item, Line } from "./HomeHero";
import { ease } from "./HomeNav";

const INTERVAL = 7000;

const Stars = ({ size = 13 }) => (
  <span className="flex gap-0.5 text-white">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={size} fill="currentColor" strokeWidth={0} />)}</span>
);

const Slide = ({ t }) => (
  <motion.div
    key={t.author + t.company}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.7, ease }}
    className="grid grid-cols-1 lg:grid-cols-12 min-w-0"
  >
    <div className="lg:col-span-5 relative min-w-0 aspect-[4/3] lg:aspect-auto lg:min-h-[420px] overflow-hidden">
      <motion.img initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 7.5, ease: "linear" }} src={t.image} alt={`${t.company} website`} className="absolute inset-0 w-full h-full object-cover object-left-top opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent lg:bg-gradient-to-r" />
    </div>
    <div className="lg:col-span-7 min-w-0 p-8 pb-24 sm:p-12 sm:pb-24 lg:p-16 lg:pb-24 flex flex-col justify-center">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.15 }} className="flex flex-wrap items-center gap-3 mb-8">
        <span data-testid="review-sector-tag" className="rounded-full bg-white text-black px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wider">{t.sector}</span>
        <span className="text-[13px] text-neutral-400">{t.company}</span>
      </motion.div>
      <motion.blockquote initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.25 }} data-testid="featured-quote" className="font-title text-lg sm:text-xl lg:text-2xl font-normal leading-snug text-white text-balance">
        “{t.quote}”
      </motion.blockquote>
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.35 }} className="mt-8 flex items-center gap-3">
        <Stars />
        <p className="text-[13px] text-neutral-400"><span className="text-white font-medium">{t.author}</span> · Google review{t.date ? ` · ${t.date}` : ""}</p>
      </motion.div>
    </div>
  </motion.div>
);

const ReviewsCarousel = () => {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = TRADE_TESTIMONIALS.length;
  const go = (d) => setI((v) => (v + d + n) % n);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % n), INTERVAL);
    return () => clearInterval(id);
  }, [paused, n, i]);

  return (
    <div data-testid="reviews-carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      className="relative rounded-3xl overflow-hidden bg-[#121215] border border-white/[0.06]">
      <AnimatePresence mode="wait">
        <Slide key={i} t={TRADE_TESTIMONIALS[i]} />
      </AnimatePresence>
      <div className="absolute bottom-7 left-8 sm:left-12 lg:left-auto lg:bottom-8 lg:right-16 flex items-center gap-4">
        <div className="flex gap-1.5" data-testid="reviews-dots">
          {TRADE_TESTIMONIALS.map((t, k) => (
            <button key={t.company} aria-label={`Show review ${k + 1}`} data-testid={`reviews-dot-${k + 1}`} onClick={() => setI(k)}
              className={`h-1 rounded-full transition-all duration-500 ${k === i ? "w-6 bg-white" : "w-2 bg-white/25 hover:bg-white/50"}`} />
          ))}
        </div>
        <div className="flex gap-2">
          <button aria-label="Previous review" data-testid="reviews-prev" onClick={() => go(-1)} className="grid place-items-center h-9 w-9 rounded-full border border-white/15 text-neutral-300 hover:border-white/40 hover:text-white transition-colors"><ArrowLeft size={14} /></button>
          <button aria-label="Next review" data-testid="reviews-next" onClick={() => go(1)} className="grid place-items-center h-9 w-9 rounded-full border border-white/15 text-neutral-300 hover:border-white/40 hover:text-white transition-colors"><ArrowRight size={14} /></button>
        </div>
      </div>
    </div>
  );
};

export const Reviews = () => (
  <section id="reviews" data-testid="testimonials-section" className="pb-24 sm:pb-32">
    <div className="mx-auto w-full px-[5vw]">
      <Line className="mb-24 sm:mb-32" />
      <Stagger className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16" stagger={0.12}>
        <div>
          <Item as="p" className="font-title text-xs uppercase tracking-widest text-neutral-500 mb-4">Reviews</Item>
          <Item as="h2" className="font-title text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-tight text-white text-balance max-w-2xl">What building firms and trades say about working with me.</Item>
        </div>
        <Item className="flex items-center gap-3 shrink-0">
          <Stars />
          <span className="text-[13px] text-neutral-400">5.0 on Google · {TESTIMONIALS.length} reviews</span>
        </Item>
      </Stagger>
      <Reveal><ReviewsCarousel /></Reveal>

      <Stagger stagger={0.1} delay={0.1} className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="other-reviews">
        {OTHER_TESTIMONIALS.map((t, k) => (
          <Item key={t.author + k} data-testid={`other-review-${k + 1}`} className="rounded-2xl border border-white/[0.06] bg-[#0e0e11] p-6 sm:p-7 flex flex-col">
            <Stars size={11} />
            <p className="mt-4 text-[14px] leading-relaxed text-neutral-400 flex-1">“{t.quote}”</p>
            <p className="mt-5 text-[12.5px] text-neutral-500"><span className="text-white font-medium">{t.author}</span> · Google review</p>
          </Item>
        ))}
      </Stagger>

      <Reveal className="mt-10">
        <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" data-testid="reviews-link"
          className="inline-flex w-fit items-center rounded-full border border-white/15 h-9 px-4 text-[13px] text-white hover:border-white/35 transition-colors">
          Read all reviews on Google
        </a>
      </Reveal>
    </div>
  </section>
);

export default Reviews;
