import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * LoadingScreen — full-screen cinematic intro.
 * - Shows on initial mount (or until exit prop becomes true)
 * - Reveals "JAY" then "ALMINSHAWI" with character stagger + blur-in
 * - Animated progress bar bottom, then sweeps away revealing the site
 */
export const LoadingScreen = ({ minDuration = 2200, onComplete }) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  // Drive the progress bar from 0 -> 100
  useEffect(() => {
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / minDuration) * 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        // small hold then exit
        setTimeout(() => {
          setVisible(false);
          onComplete && onComplete();
        }, 320);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [minDuration, onComplete]);

  // Lock body scroll while loading
  useEffect(() => {
    if (visible) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [visible]);

  const letters = (text) => text.split("");

  const charVariants = {
    hidden: { y: "110%", opacity: 0, filter: "blur(10px)" },
    show: (i) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { delay: 0.05 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="loader"
          data-testid="loading-screen"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] bg-[#050505] flex flex-col"
        >
          {/* Subtle vertical panel grid */}
          <div className="absolute inset-0 vertical-panels opacity-60 pointer-events-none" />
          {/* Soft top light */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[520px] w-[1200px] rounded-full bg-white/[0.05] blur-[180px] pointer-events-none" />
          {/* Noise */}
          <div className="absolute inset-0 noise-overlay pointer-events-none" />

          {/* Top bar */}
          <div className="relative mx-auto max-w-[1480px] w-full px-5 sm:px-8 lg:px-12 pt-6 sm:pt-8 flex items-center justify-between">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-mono-grotesk text-[10.5px] sm:text-[11px] tracking-[0.32em] uppercase text-white/45"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-white align-middle mr-2 animate-pulse" />
              Now loading
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="font-mono-grotesk text-[10.5px] sm:text-[11px] tracking-[0.32em] uppercase text-white/35"
            >
              Portfolio · MMXXV
            </motion.span>
          </div>

          {/* Centered name */}
          <div className="relative flex-1 flex flex-col items-center justify-center px-5 sm:px-8 lg:px-12">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-heading text-[11px] sm:text-[12px] tracking-[0.42em] uppercase text-white/45 mb-7"
            >
              <span className="inline-block h-px w-8 align-middle mr-3 bg-white/30" />
              Web Designer &amp; Developer
              <span className="inline-block h-px w-8 align-middle ml-3 bg-white/30" />
            </motion.p>

            <h1 className="font-display uppercase text-white leading-[0.84] tracking-[-0.04em] text-center text-[14vw] sm:text-[12vw] lg:text-[9.5vw] xl:text-[9vw]">
              <span className="block overflow-hidden">
                <span className="block">
                  {letters("Jay").map((c, i) => (
                    <motion.span
                      key={`jay-${i}`}
                      custom={i}
                      variants={charVariants}
                      initial="hidden"
                      animate="show"
                      className="inline-block"
                    >
                      {c}
                    </motion.span>
                  ))}
                </span>
              </span>
              <span className="block overflow-hidden mt-1">
                <span className="block">
                  {letters("Alminshawi").map((c, i) => (
                    <motion.span
                      key={`al-${i}`}
                      custom={i + 4}
                      variants={charVariants}
                      initial="hidden"
                      animate="show"
                      className="inline-block"
                    >
                      {c}
                    </motion.span>
                  ))}
                </span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.0 }}
              className="mt-12 font-mono-grotesk text-[10.5px] sm:text-[11px] tracking-[0.32em] uppercase text-white/35"
            >
              Crafting cinematic web experiences
            </motion.p>
          </div>

          {/* Bottom progress + counter */}
          <div className="relative mx-auto max-w-[1480px] w-full px-5 sm:px-8 lg:px-12 pb-8 sm:pb-10">
            <div className="flex items-center justify-between mb-3 font-mono-grotesk text-[10.5px] sm:text-[11px] tracking-[0.32em] uppercase text-white/45">
              <span data-testid="loading-progress-label">Loading experience</span>
              <span data-testid="loading-progress-value" className="tabular-nums text-white/70">
                {String(Math.floor(progress)).padStart(3, "0")}%
              </span>
            </div>
            <div className="relative h-px w-full bg-white/10 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-white"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
