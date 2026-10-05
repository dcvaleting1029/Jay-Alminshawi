import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { PARTNERS, GOOGLE_REVIEWS_URL, TESTIMONIALS } from "@/data/portfolio";

export const AuditSocialProof = () => {
  const items = [...PARTNERS, ...PARTNERS];
  return (
    <section
      data-testid="audit-social-proof"
      className="relative border-y border-white/[0.06] bg-[#070707] overflow-hidden"
    >
      <div className="mx-auto w-full px-[5vw] py-8 sm:py-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="audit-google-rating"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group lg:col-span-4 flex items-center gap-4 sm:gap-5"
          >
            <span className="font-title font-semibold text-4xl sm:text-5xl text-white leading-none tracking-tight">5.0</span>
            <span className="flex flex-col gap-1.5">
              <span className="flex gap-0.5 text-white">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                ))}
              </span>
              <span className="font-mono-grotesk text-[10px] sm:text-[10.5px] tracking-[0.26em] uppercase text-white/45 group-hover:text-white/70 transition-colors">
                Rated on Google · {TESTIMONIALS.length} Reviews
              </span>
            </span>
          </motion.a>

          <div className="lg:col-span-8 relative gradient-fade-x">
            <p className="sr-only">Trusted by building firms</p>
            <div
              data-testid="audit-trusted-logos"
              className="flex w-max items-center gap-12 sm:gap-16 animate-logo-marquee whitespace-nowrap"
            >
              {items.map((p, i) => (
                <div
                  key={`${p.name}-${i}`}
                  className="shrink-0 h-9 sm:h-11 w-28 sm:w-36 grid place-items-center opacity-70 hover:opacity-100 transition-opacity duration-300"
                  title={p.name}
                >
                  <img src={p.src} alt={p.name} loading="lazy" draggable={false} className="max-h-full max-w-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuditSocialProof;
