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
    transition: { delay: 0.15 + i * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const Hero = () => {
  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#050505] flex items-center pt-28 pb-32 lg:pt-32 lg:pb-40"
    >
      {/* Subtle vertical panel grid */}
      <div className="absolute inset-0 vertical-panels opacity-60 pointer-events-none" />
      {/* Soft top light */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[520px] w-[1200px] rounded-full bg-white/[0.04] blur-[160px] pointer-events-none" />
      {/* Noise */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      <div className="relative mx-auto max-w-[1480px] w-full px-5 sm:px-8 lg:px-12">
        {/* Centered text content */}
        <div className="max-w-[1100px]">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="font-heading text-[11px] sm:text-[12px] tracking-[0.32em] uppercase text-white/55 mb-7"
          >
            <span className="inline-block h-px w-8 align-middle mr-3 bg-white/30" />
            Web Designer &amp; Developer
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-display uppercase text-white leading-[0.84] tracking-[-0.04em] text-[18vw] sm:text-[15vw] lg:text-[10.6vw] xl:text-[10vw]"
          >
            <span className="block">Jay</span>
            <span className="block text-white/95">Alminshawi</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-9 max-w-2xl text-[15px] sm:text-base lg:text-[17px] text-white/55 leading-relaxed"
          >
            I&apos;m a one-man creative and developer building high-performing,
            fast and modern websites that elevate brands, convert visitors and
            drive real results — bringing companies&apos; online presence to
            life with brand development and strategy.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-11 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7"
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
        </div>

        {/* Bottom row: tag + smaller laptop in bottom right */}
        <div className="relative mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="lg:col-span-5 font-mono-grotesk text-[10.5px] sm:text-[11px] tracking-[0.32em] uppercase text-white/35"
          >
            Designed by Jay Alminshawi
            <span className="text-white/20"> / </span>
            Powered by Webflow
          </motion.p>

          {/* Smaller laptop, bottom right */}
          <motion.div
            initial={{ opacity: 0, y: 30, x: 20, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
            className="lg:col-span-7 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[400px] xl:max-w-[440px]">
              <LaptopMockup
                screen={HERO_LAPTOP_SCREEN}
                tilt={-14}
                shine
                floating
                testId="hero-laptop"
                className="w-full"
              />
              {/* podium plate */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[78%] h-1.5 rounded-[2px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[60%] h-12 bg-black blur-2xl rounded-full opacity-80" />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator pinned to lower-left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="hidden lg:flex absolute bottom-8 left-12 items-center gap-3 text-white/40 text-[10.5px] tracking-[0.3em] uppercase"
        >
          <span className="animate-scroll-bounce inline-flex"><ChevronDown size={14} /></span>
          Scroll Down To Explore
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
