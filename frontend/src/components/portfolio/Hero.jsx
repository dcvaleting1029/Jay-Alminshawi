import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { LaptopMockup } from "./LaptopMockup";
import { HERO_LAPTOP_SCREEN } from "../../data/portfolio";

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.2 + i * 0.08, duration: 0.95, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const Hero = () => {
  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#050505] flex items-center justify-center pt-24 pb-20"
    >
      {/* ───────── Laptop Background ───────── */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[120%] sm:w-[105%] lg:w-[88%] xl:w-[82%] max-w-[1600px] opacity-[0.95]">
          <LaptopMockup
            screen={HERO_LAPTOP_SCREEN}
            tilt={-6}
            shine
            floating
            testId="hero-laptop"
            className="w-full"
          />
        </div>
      </motion.div>

      {/* ───────── Overlays ───────── */}
      {/* Vertical panel grid */}
      <div className="absolute inset-0 vertical-panels opacity-50 pointer-events-none" />
      {/* Radial vignette so center stays readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(5,5,5,0.18) 0%, rgba(5,5,5,0.42) 50%, rgba(5,5,5,0.78) 90%)",
        }}
      />
      {/* Top + bottom dark fades */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      {/* Soft top light */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[520px] w-[1200px] rounded-full bg-white/[0.04] blur-[180px] pointer-events-none" />
      {/* Noise */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* ───────── Foreground content (centered) ───────── */}
      <div className="relative mx-auto max-w-[1280px] w-full px-5 sm:px-8 lg:px-12 flex flex-col items-center text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="font-heading text-[11px] sm:text-[12px] tracking-[0.32em] uppercase text-white/65 mb-8"
        >
          <span className="inline-block h-px w-8 align-middle mr-3 bg-white/40" />
          Web Designer &amp; Developer
          <span className="inline-block h-px w-8 align-middle ml-3 bg-white/40" />
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="font-display uppercase text-white leading-[0.82] tracking-[-0.04em] text-[13vw] sm:text-[12vw] lg:text-[9.6vw] xl:text-[9.2vw]"
          style={{ textShadow: "0 6px 60px rgba(0,0,0,0.65)" }}
        >
          <span className="block">Jay</span>
          <span className="block text-white">Alminshawi</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-10 max-w-2xl text-[15px] sm:text-base lg:text-[17px] text-white/70 leading-relaxed"
        >
          I&apos;m a one-man creative and developer building high-performing,
          fast and modern websites that elevate brands, convert visitors and
          drive real results — bringing companies&apos; online presence to life
          with brand development and strategy.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-7"
        >
          <button
            data-testid="hero-cta-build"
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="group relative inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white text-black px-7 h-12 text-[12px] tracking-[0.22em] uppercase font-medium hover:bg-transparent hover:text-white transition-all duration-300"
          >
            Build Your Website
            <span className="inline-block w-4 h-px bg-current group-hover:w-6 transition-all" />
          </button>
          <button
            data-testid="hero-cta-projects"
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-3 text-[12px] tracking-[0.22em] uppercase text-white/70 hover:text-white transition-colors"
          >
            View Projects
            <span className="inline-block w-8 h-px bg-white/40" />
          </button>
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-16 font-mono-grotesk text-[10.5px] sm:text-[11px] tracking-[0.32em] uppercase text-white/40"
        >
          Designed by Jay Alminshawi
          <span className="text-white/20"> / </span>
          Powered by Webflow
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/45 text-[10px] tracking-[0.3em] uppercase"
      >
        <span>Scroll Down To Explore</span>
        <span className="animate-scroll-bounce inline-flex"><ChevronDown size={14} /></span>
      </motion.div>
    </section>
  );
};

export default Hero;
