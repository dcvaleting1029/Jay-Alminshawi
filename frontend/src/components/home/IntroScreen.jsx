import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ease } from "./HomeNav";

export const INTRO_DURATION = 2400;

export const IntroScreen = ({ onDone }) => {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => onDone?.(), INTRO_DURATION);
    return () => { clearTimeout(t); document.body.style.overflow = prev; };
  }, [onDone]);

  return (
    <motion.div
      data-testid="loading-screen"
      exit={{ y: "-100%", transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[100] bg-[#09090b] text-white font-jakarta antialiased"
    >
      <motion.div exit={{ opacity: 0, y: -24, transition: { duration: 0.5, ease } }} className="absolute inset-0">
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <div className="overflow-hidden pb-2">
            <motion.h1
              data-testid="intro-wordmark"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease, delay: 0.15 }}
              className="font-title text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-none"
            >
              Jay Alminshawi
            </motion.h1>
          </div>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.3, ease, delay: 0.55 }}
            className="mt-7 h-px w-20 bg-white/35"
          />
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.85 }}
            className="mt-7 text-[13px] sm:text-[13.5px] text-neutral-500"
          >
            Web design for building firms
          </motion.p>
        </div>

        <div className="absolute inset-x-0 bottom-0 mx-auto w-full px-[5vw] pb-7 sm:pb-9 flex items-center justify-between text-[12px] text-neutral-600">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.1 }}>Edinburgh, UK</motion.span>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.2 }}>Portfolio — 2025</motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default IntroScreen;
