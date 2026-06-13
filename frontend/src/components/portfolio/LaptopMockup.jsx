import React from "react";
import { motion } from "framer-motion";

/**
 * LaptopMockup — a CSS-only 3D angled laptop showing a website screenshot.
 *
 * Props:
 *  - screen: image src (the website to show inside the laptop)
 *  - tilt: number (deg) — base rotateY tilt
 *  - shine: boolean — enable metallic sweep across the screen
 *  - className: extra classes on wrapper
 *  - hoverTilt: extra hover tilt amount
 *  - floating: bool — gentle float up/down animation
 */
export const LaptopMockup = ({
  screen,
  tilt = -18,
  shine = false,
  floating = false,
  hoverTilt = 0,
  className = "",
  testId,
}) => {
  return (
    <motion.div
      data-testid={testId}
      className={`relative [perspective:1600px] ${className}`}
      whileHover={hoverTilt ? { rotateY: tilt + hoverTilt, rotateX: 4 } : undefined}
      transition={{ type: "spring", stiffness: 140, damping: 18 }}
    >
      <motion.div
        className="relative will-change-transform"
        animate={floating ? { y: [0, -10, 0] } : undefined}
        transition={floating ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : undefined}
        style={{
          transform: `rotateY(${tilt}deg) rotateX(6deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Screen body */}
        <div className="relative rounded-[14px] border border-white/10 bg-[#0a0a0a] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] overflow-hidden">
          {/* Bezel */}
          <div className="p-[6px] sm:p-[8px] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-[14px]">
            <div className="relative aspect-[16/10] rounded-[8px] overflow-hidden bg-black">
              {screen && (
                <img
                  src={screen}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  draggable={false}
                />
              )}
              {/* Subtle screen reflection */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent" />
              {/* Metallic shine sweep */}
              {shine && (
                <div className="absolute inset-0 pointer-events-none metallic-sheen animate-shine-sweep" />
              )}
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[5px] bg-black/80 rounded-b-md" />
            </div>
          </div>
        </div>

        {/* Laptop base / keyboard deck */}
        <div className="relative mx-auto mt-[2px] h-3 sm:h-4 w-[103%] -translate-x-[1.5%] rounded-b-[14px] bg-gradient-to-b from-[#1a1a1a] via-[#0e0e0e] to-[#050505] border-x border-b border-white/[0.06] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]" />
        {/* Notch / trackpad hint */}
        <div className="mx-auto mt-[1px] h-[3px] w-24 rounded-b-md bg-white/[0.04]" />

        {/* Soft floor shadow */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-10 bg-black/70 blur-2xl rounded-full opacity-70" />
      </motion.div>
    </motion.div>
  );
};

export default LaptopMockup;
