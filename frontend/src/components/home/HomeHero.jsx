import React from "react";
import { motion } from "framer-motion";
import { Pill, ease } from "./HomeNav";
import { SECTORS } from "@/data/portfolio";

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.95, ease } },
};
const viewport = { once: true, margin: "-70px" };

export const Reveal = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={viewport}
    variants={{ hidden: item.hidden, show: { ...item.show, transition: { ...item.show.transition, delay } } }}
    className={className}
  >
    {children}
  </motion.div>
);

export const Stagger = ({ children, className = "", stagger = 0.1, delay = 0, as = "div", ...props }) => {
  const Tag = motion[as];
  return (
    <Tag
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  );
};

export const Item = ({ children, className = "", as = "div", ...props }) => {
  const Tag = motion[as];
  return <Tag variants={item} className={className} {...props}>{children}</Tag>;
};

export const Line = ({ className = "" }) => (
  <motion.div
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={viewport}
    transition={{ duration: 1.4, ease }}
    className={`h-px w-full bg-white/[0.08] origin-left ${className}`}
  />
);

export const HomeHero = ({ delay = 0 }) => (
  <section id="home" data-testid="hero-section" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
    <motion.video
      data-testid="hero-video"
      src="/intro.mp4"
      poster="/intro-poster.jpg"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      initial={{ scale: 1.1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 2.2, ease, delay }}
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/60" />
    <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#09090b] to-transparent" />

    <div className="relative mx-auto max-w-5xl px-6 sm:px-8 text-center pt-24 pb-28">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: delay + 0.2 }}
        className="font-title text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] text-white text-balance"
      >
        Jay Alminshawi is the web design partner for building firms across the UK — renovation, construction, new build, kitchen &amp; bathroom and extensions.
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: delay + 0.45 }}
        className="mt-10 flex items-center justify-center gap-3"
      >
        <Pill primary data-testid="hero-primary-cta" onClick={() => go("work")}>View work</Pill>
        <Pill data-testid="hero-secondary-cta" onClick={() => go("contact")}>Get in touch</Pill>
      </motion.div>
    </div>
  </section>
);

export const Statement = () => (
  <section data-testid="statement-section" className="py-28 sm:py-36 lg:py-44">
    <Stagger className="mx-auto max-w-4xl px-6 sm:px-8 text-center" stagger={0.15}>
      <Item as="p" className="font-title text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.2] text-neutral-400 text-balance">
        I build <span className="text-white">websites that turn homeowners into enquiries</span> — so when someone is planning a renovation, extension or new kitchen, your company is the obvious choice.
      </Item>
      <Item>
        <button data-testid="statement-about-link" onClick={() => go("services")}
          className="mt-10 inline-flex items-center gap-2 text-[13.5px] text-neutral-400 hover:text-white transition-colors">
          About me <span className="grid place-items-center h-6 w-6 rounded-full bg-white text-black text-[11px]">→</span>
        </button>
      </Item>
    </Stagger>
  </section>
);

export const Sectors = () => (
  <section id="sectors" data-testid="sectors-section" className="pb-24 sm:pb-32 lg:pb-40">
    <div className="mx-auto w-full px-[5vw]">
      <Line className="mb-24 sm:mb-32 lg:mb-40" />
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
        <Stagger className="lg:col-span-4" stagger={0.12}>
          <Item as="p" className="font-title text-xs uppercase tracking-widest text-neutral-500 mb-4">Who I work with</Item>
          <Item as="h2" className="font-title text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-tight text-white text-balance">
            Built for building firms.
          </Item>
          <Item as="p" className="mt-6 text-base sm:text-lg text-neutral-400 leading-relaxed max-w-md">
            I only work with building firms. That focus means I already know what homeowners look for before they pick up the phone — and how to make your site show it.
          </Item>
        </Stagger>
        <Stagger className="lg:col-span-8" stagger={0.09} delay={0.15} as="ul" data-testid="sectors-list">
          {SECTORS.map((s, i) => (
            <Item as="li" key={s.name} data-testid={`sector-${i + 1}`} className="group grid sm:grid-cols-12 gap-2 sm:gap-6 py-6 sm:py-7 border-t border-white/[0.08] last:border-b">
              <span className="sm:col-span-1 font-title text-xs text-neutral-600 tabular-nums pt-1.5">0{i + 1}</span>
              <span className="sm:col-span-5 font-title text-xl sm:text-2xl font-medium tracking-tight text-white">{s.name}</span>
              <span className="sm:col-span-6 text-[14.5px] sm:text-[15px] text-neutral-500 leading-relaxed sm:pt-1">{s.blurb}</span>
            </Item>
          ))}
        </Stagger>
      </div>
    </div>
  </section>
);

export default HomeHero;
