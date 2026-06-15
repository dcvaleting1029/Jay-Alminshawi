import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, PenTool, Code2, Sparkles, ShoppingBag, Search, Wrench } from "lucide-react";
import { SERVICES } from "../../data/portfolio";

const ICONS = { PenTool, Code2, Sparkles, ShoppingBag, Search, Wrench };

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const headRevealParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const headRevealChild = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};

const ServiceCard = ({ service, index }) => {
  const Icon = ICONS[service.icon] || PenTool;
  return (
    <motion.article
      data-testid={`service-card-${index}`}
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="group relative flex flex-col rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#0d0d0d] via-[#0a0a0a] to-[#060606] p-7 sm:p-8 min-h-[280px] glow-hover overflow-hidden transition-all duration-500"
    >
      {/* corner arrow */}
      <span
        aria-hidden
        className="absolute top-5 right-5 grid place-items-center h-8 w-8 rounded-full border border-white/10 text-white/55 group-hover:text-white group-hover:border-white/40 transition-all"
      >
        <ArrowUpRight size={13} />
      </span>

      {/* icon */}
      <div className="grid place-items-center h-12 w-12 rounded-xl border border-white/10 bg-white/[0.02] text-white/85 mb-7">
        <Icon size={20} strokeWidth={1.4} />
      </div>

      {/* title */}
      <h3 className="font-heading text-xl sm:text-2xl font-medium tracking-tight text-white mb-5">
        {service.title}
      </h3>

      <ul className="space-y-2 mt-auto">
        {service.items.map((it) => (
          <li
            key={it}
            className="flex items-center gap-3 text-[13px] sm:text-sm text-white/55"
          >
            <span className="inline-block h-px w-3 bg-white/30" />
            {it}
          </li>
        ))}
      </ul>

      {/* hover bottom line */}
      <div className="pointer-events-none absolute inset-x-7 bottom-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.article>
  );
};

export const Services = () => {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="relative py-20 sm:py-28 lg:py-32 bg-[#070707] border-y border-white/[0.05]"
    >
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
        <motion.div
          variants={headRevealParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid lg:grid-cols-12 gap-6 items-end mb-10 sm:mb-16 lg:mb-20"
        >
          <motion.div variants={headRevealChild} className="lg:col-span-6">
            <p className="font-heading text-[11px] tracking-[0.32em] uppercase text-white/40 mb-5">
              <span className="inline-block h-px w-8 align-middle mr-3 bg-white/30" />
              What I Do
            </p>
            <h2 className="font-display uppercase text-white leading-[0.9] tracking-tight text-5xl sm:text-6xl lg:text-7xl">
              Services
            </h2>
          </motion.div>
          <motion.div variants={headRevealChild} className="lg:col-span-5 lg:col-start-8">
            <p className="text-[15px] sm:text-base text-white/55 max-w-md leading-relaxed">
              End-to-end web design and development services focused on
              results and long-term impact.
            </p>
          </motion.div>
        </motion.div>

        <div
          data-testid="services-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
