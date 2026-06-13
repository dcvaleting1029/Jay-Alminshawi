import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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
  const sectionRef = useRef(null);

  // Track normalized cursor position (-0.5 .. 0.5) relative to the hero section
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 80, damping: 18, mass: 0.6 });

  // Map mouse to gentle parallax / rotation
  const rotateY = useTransform(sx, [-0.5, 0.5], [-26, -6]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [12, 0]);
  const translateX = useTransform(sx, [-0.5, 0.5], [-32, 32]);
  const translateY = useTransform(sy, [-0.5, 0.5], [-18, 18]);

  const handleMouseMove = (e) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x);
    my.set(y);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-testid="hero-section"
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#050505] pt-28 sm:pt-32 lg:pt-36"
    >
      {/* Subtle vertical panel grid */}
      <div className="absolute inset-0 vertical-panels opacity-60 pointer-events-none" />
      {/* Soft top light */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[520px] w-[1200px] rounded-full bg-white/[0.04] blur-[160px] pointer-events-none" />
      {/* Noise */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      <div className="relative mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12 pb-24 sm:pb-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left content */}
          <div className="lg:col-span-6 xl:col-span-6 order-2 lg:order-1">
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
              className="font-display uppercase text-white leading-[0.85] tracking-[-0.035em] text-[15vw] sm:text-[11vw] lg:text-[5.6vw] xl:text-[5.4vw]"
            >
              <span className="block">Jay</span>
              <span className="block text-white/95">Alminshawi</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="mt-8 max-w-xl text-[15px] sm:text-base text-white/55 leading-relaxed"
            >
              I&apos;m a one-man creative and developer building high-performing,
              fast and modern websites that elevate brands, convert visitors
              and drive real results — bringing companies&apos; online presence
              to life with brand development and strategy.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="mt-12 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7"
            >
              <button
                data-testid="hero-cta-build"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="group relative inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white text-black px-6 h-12 text-[12px] tracking-[0.22em] uppercase font-medium hover:bg-transparent hover:text-white transition-all duration-300"
              >
                Build Your Website
                <span className="inline-block w-4 h-px bg-current group-hover:w-6 transition-all" />
              </button>
              <button
                data-testid="hero-cta-projects"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
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
              className="mt-16 font-mono-grotesk text-[10.5px] sm:text-[11px] tracking-[0.32em] uppercase text-white/35"
            >
              Designed by Jay Alminshawi
            </motion.p>
          </div>

          {/* Right: Laptop mockup with cursor parallax */}
          <motion.div
            initial={{ opacity: 0, x: 40, filter: "blur(12px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="lg:col-span-6 xl:col-span-6 order-1 lg:order-2 relative"
          >
            <div className="relative mx-auto w-full max-w-[640px] lg:max-w-none">
              <motion.div
                className="relative pb-10 [perspective:1600px] will-change-transform"
                style={{ x: translateX, y: translateY }}
              >
                <motion.div
                  className="relative"
                  style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <LaptopMockup
                    screen={HERO_LAPTOP_SCREEN}
                    tilt={0}
                    shine
                    floating
                    testId="hero-laptop"
                    className="w-full"
                  />
                </motion.div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[78%] h-2 rounded-[2px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[60%] h-14 bg-black blur-2xl rounded-full opacity-80" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-16 sm:mt-24 flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3 text-white/40 text-[10.5px] sm:text-[11px] tracking-[0.3em] uppercase">
            <span className="animate-scroll-bounce inline-flex"><ChevronDown size={14} /></span>
            Scroll Down To Explore
          </div>
          <div className="hidden sm:block font-mono-grotesk text-[10.5px] tracking-[0.32em] uppercase text-white/30">
            EST. 2025 — Edinburgh, UK
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
