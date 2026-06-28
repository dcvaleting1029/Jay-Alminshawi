import React from "react";
import { motion } from "framer-motion";
import { Star, ArrowUpRight } from "lucide-react";
import { TESTIMONIALS, GOOGLE_REVIEWS_URL } from "../../data/portfolio";

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  }),
};

// Multi-coloured Google "G" mark — inline SVG
const GoogleG = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      fill="#FFC107"
      d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.5 6.5 29.5 4.5 24 4.5 12.7 4.5 3.5 13.7 3.5 25S12.7 45.5 24 45.5 44.5 36.3 44.5 25c0-1.5-.2-3-.4-4.5z"
    />
    <path
      fill="#FF3D00"
      d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.5 6.5 29.5 4.5 24 4.5 16.3 4.5 9.7 8.6 6.3 14.7z"
    />
    <path
      fill="#4CAF50"
      d="M24 45.5c5.4 0 10.3-2 14-5.4l-6.5-5.3c-2 1.4-4.5 2.3-7.5 2.3-5.2 0-9.6-3.3-11.2-8L6.3 33.9C9.6 40 16.3 45.5 24 45.5z"
    />
    <path
      fill="#1976D2"
      d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.5 5.3C41.7 35.6 44.5 30.7 44.5 25c0-1.5-.2-3-.4-4.5z"
    />
  </svg>
);

const Avatar = ({ initial, color }) => (
  <div
    aria-hidden
    className="grid place-items-center h-11 w-11 rounded-full text-white font-heading text-[15px] font-medium shrink-0"
    style={{ backgroundColor: color }}
  >
    {initial}
  </div>
);

const ReviewCard = ({ t, i }) => (
  <motion.article
    data-testid={`google-review-card-${i}`}
    variants={cardVariants}
    custom={i}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-60px" }}
    className="relative h-full flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-7 sm:p-8 overflow-hidden glow-soft"
  >
    {/* Top row: avatar + name + google badge */}
    <header className="flex items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3 min-w-0">
        <Avatar initial={t.initial} color={t.color} />
        <div className="min-w-0">
          <p className="font-heading text-[14px] text-white truncate">
            {t.author}
          </p>
          <p className="font-mono-grotesk text-[10px] tracking-[0.22em] uppercase text-white/40 mt-0.5">
            {t.badge ? `${t.badge} · ` : ""}
            {t.date}
          </p>
        </div>
      </div>
      <span
        aria-hidden
        className="grid place-items-center h-9 w-9 rounded-full bg-white/[0.04] border border-white/10 shrink-0"
        title="Review from Google"
      >
        <GoogleG size={16} />
      </span>
    </header>

    {/* Stars */}
    <div className="flex items-center gap-1 mb-4">
      {Array.from({ length: t.rating }).map((_, idx) => (
        <Star
          key={idx}
          size={14}
          className="text-[#FBBC04]"
          fill="#FBBC04"
        />
      ))}
    </div>

    {/* Quote */}
    <p className="text-[14.5px] sm:text-[15px] text-white/75 leading-relaxed">
      &ldquo;{t.quote}&rdquo;
    </p>
  </motion.article>
);

export const Testimonials = () => {
  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      className="relative py-20 sm:py-28 lg:py-32 bg-[#050505]"
    >
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
        {/* Heading row */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid lg:grid-cols-12 gap-6 items-end mb-12 sm:mb-16"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="lg:col-span-7"
          >
            <p className="font-heading text-[11px] tracking-[0.32em] uppercase text-white/40 mb-5">
              <span className="inline-block h-px w-8 align-middle mr-3 bg-white/30" />
              Client Words
            </p>
            <h2 className="font-display uppercase text-white leading-[0.9] tracking-tight text-5xl sm:text-6xl lg:text-7xl">
              Testimonials
            </h2>
          </motion.div>

          {/* Right: Google rating summary */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0, transition: { duration: 0.85 } },
            }}
            className="lg:col-span-5 lg:col-start-8"
          >
            <div className="inline-flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md px-5 py-4">
              <GoogleG size={26} />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading text-2xl text-white leading-none">
                    5.0
                  </span>
                  <div className="flex items-center gap-0.5 ml-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className="text-[#FBBC04]"
                        fill="#FBBC04"
                      />
                    ))}
                  </div>
                </div>
                <p className="font-mono-grotesk text-[10px] tracking-[0.22em] uppercase text-white/55 mt-1">
                  Rated on Google · {TESTIMONIALS.length} Reviews
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Reviews grid */}
        <div
          data-testid="google-reviews-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {TESTIMONIALS.map((t, i) => (
            <ReviewCard key={`${t.author}-${i}`} t={t} i={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="google-reviews-cta"
            className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] pl-3 pr-5 h-12 text-[12px] tracking-[0.22em] uppercase text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            <span className="grid place-items-center h-8 w-8 rounded-full bg-white">
              <GoogleG size={16} />
            </span>
            See All Reviews On Google
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
