import React from "react";
import { motion } from "framer-motion";

const Block = ({ className = "" }) => (
  <div className={`rounded-[3px] bg-white/[0.07] ${className}`} />
);

const Annotation = ({ n, label, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 1.1 + delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className={`absolute flex items-center gap-2 ${className}`}
  >
    <span className="relative grid place-items-center h-5 w-5 rounded-full bg-white text-black font-mono-grotesk text-[8px] font-bold shrink-0">
      {n}
      <span className="absolute inset-0 rounded-full ring-1 ring-white/40 animate-ping [animation-duration:2.6s]" />
    </span>
    <span className="rounded-md border border-white/15 bg-black/80 backdrop-blur-md px-2 py-1 font-mono-grotesk text-[8px] sm:text-[9px] tracking-wider uppercase text-white/85 whitespace-nowrap">
      {label}
    </span>
  </motion.div>
);

const Cursor = () => (
  <motion.div
    aria-hidden
    className="absolute z-20"
    animate={{ left: ["34%", "58%", "46%", "34%"], top: ["38%", "52%", "72%", "38%"] }}
    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
  >
    <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
      <path d="M1 1l12 7.5-5.2 1.2L5 16.5 1 1z" fill="#fff" stroke="#000" strokeWidth="1" />
    </svg>
    <span className="absolute left-3 top-3 rounded-full bg-white px-1.5 py-[2px] font-mono-grotesk text-[7.5px] font-bold tracking-[0.12em] uppercase text-black">
      Jay
    </span>
  </motion.div>
);

const VideoBubble = () => (
  <div className="absolute bottom-[6%] right-[4%] z-20 flex items-center gap-2">
    <span className="rounded-md bg-black/70 backdrop-blur-md border border-white/10 px-2 py-1 font-mono-grotesk text-[8px] tracking-wider text-white/70">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500 mr-1.5 align-middle animate-pulse" />
      02:14
    </span>
    <span className="relative grid place-items-center h-10 w-10 sm:h-14 sm:w-14 rounded-full border border-white/20 bg-gradient-to-b from-[#1c1c1c] to-[#0a0a0a] shadow-[0_10px_30px_-8px_rgba(0,0,0,0.9)]">
      <span className="font-title font-semibold text-[10px] sm:text-[13px] text-white tracking-tight">JA</span>
      <span className="absolute inset-0 rounded-full ring-1 ring-white/10" />
    </span>
  </div>
);

export const AuditMockup = () => (
  <div data-testid="audit-mockup" className="relative mx-auto w-full max-w-[640px] lg:max-w-none">
    <motion.div
      className="relative [perspective:1600px]"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className="relative will-change-transform"
        style={{ transform: "rotateY(-12deg) rotateX(5deg)", transformStyle: "preserve-3d" }}
      >
        <div className="relative rounded-[14px] border border-white/10 bg-[#0a0a0a] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] overflow-hidden">
          <div className="p-[6px] sm:p-[8px] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-[14px]">
            <div className="relative aspect-[16/10] rounded-[8px] overflow-hidden bg-[#0b0b0b]">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-3 h-7 border-b border-white/[0.06] bg-[#0f0f0f]">
                <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                <span className="ml-3 flex-1 max-w-[46%] h-3.5 rounded-full bg-white/[0.05] px-2 flex items-center">
                  <span className="font-mono-grotesk text-[7px] tracking-[0.12em] text-white/35">www.yourwebsite.co.uk</span>
                </span>
              </div>

              {/* Wireframe website being reviewed */}
              <div className="absolute inset-x-0 top-7 bottom-0 p-[5%]">
                <div className="flex items-center justify-between mb-[7%]">
                  <Block className="h-2 w-[14%]" />
                  <div className="flex gap-[3%] w-[40%]">
                    <Block className="h-1.5 flex-1" />
                    <Block className="h-1.5 flex-1" />
                    <Block className="h-1.5 flex-1" />
                    <Block className="h-1.5 flex-1 !bg-white/20" />
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-[4%] mb-[7%]">
                  <div className="col-span-7 space-y-[6%]">
                    <Block className="h-3 w-[80%] !bg-white/[0.14]" />
                    <Block className="h-3 w-[62%] !bg-white/[0.14]" />
                    <Block className="h-1.5 w-[70%]" />
                    <Block className="h-1.5 w-[55%]" />
                    <div className="h-4 w-[34%] rounded-full bg-white/25 !mt-[9%]" />
                  </div>
                  <div className="col-span-5 aspect-[4/3] rounded-md border border-white/[0.08] bg-white/[0.03]" />
                </div>
                <div className="grid grid-cols-3 gap-[3%]">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="rounded-md border border-white/[0.07] p-[6%] space-y-[8%]">
                      <Block className="aspect-[5/3] w-full" />
                      <Block className="h-1.5 w-[70%]" />
                      <Block className="h-1 w-[45%]" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Review overlays */}
              <Annotation n="1" label="Hero clarity" className="left-[7%] top-[23%]" />
              <Annotation n="2" label="Quote request" className="left-[18%] top-[57%]" delay={0.25} />
              <Annotation n="3" label="Project gallery" className="left-[52%] top-[78%]" delay={0.5} />
              <Cursor />
              <VideoBubble />

              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent" />
              <div className="absolute inset-0 pointer-events-none metallic-sheen animate-shine-sweep" />
            </div>
          </div>
        </div>
        <div className="relative mx-auto mt-[2px] h-3 sm:h-4 w-[103%] -translate-x-[1.5%] rounded-b-[14px] bg-gradient-to-b from-[#1a1a1a] via-[#0e0e0e] to-[#050505] border-x border-b border-white/[0.06]" />
        <div className="mx-auto mt-[1px] h-[3px] w-24 rounded-b-md bg-white/[0.04]" />
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-10 bg-black/70 blur-2xl rounded-full opacity-70" />
      </div>
    </motion.div>

    <div className="mt-10 sm:mt-12 flex items-baseline justify-between gap-4 font-mono-grotesk uppercase">
      <p className="text-[10px] sm:text-[10.5px] tracking-widest text-white/45">
        <span className="inline-block h-px w-6 align-middle mr-3 bg-white/30" />
        Personalised Video Audit
      </p>
      <p className="hidden sm:block text-[10px] tracking-wider text-white/30">
        Recorded specifically for your company.
      </p>
    </div>
  </div>
);

export default AuditMockup;
