import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const VIDEO_SRC = "/intro.mp4";
const POSTER_SRC = "/intro-poster.jpg";

export const IntroVideo = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  // Restart from beginning every time the video enters the viewport
  useEffect(() => {
    const v = videoRef.current;
    const el = containerRef.current;
    if (!v || !el) return;

    v.muted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.currentTime = 0;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
    if (!v.muted) {
      // some browsers pause when toggling; ensure playing
      v.play().catch(() => {});
    }
  };

  return (
    <section
      id="intro-video"
      data-testid="intro-video-section"
      className="relative bg-[#050505]"
    >
      {/* Top fade — seamless transition from Hero */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#050505] to-transparent z-10" />
      {/* Bottom fade — seamless transition into TrustedBy */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050505] to-transparent z-10" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full"
      >
        <div ref={containerRef} className="relative w-full h-[92vh] min-h-[600px] max-h-[1100px] overflow-hidden">
          <video
            ref={videoRef}
            data-testid="intro-video-player"
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            playsInline
            muted
            loop
            autoPlay
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Cinematic vignette / gradient overlays */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(0,0,0,0.55)_100%)]" />
          <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.12] bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.6%22/></svg>')]" />

          {/* Eyebrow caption — bottom left */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-5 sm:left-8 lg:left-12 bottom-8 sm:bottom-10 lg:bottom-14 z-20"
          >
            <p className="font-heading text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-white/55 mb-3 flex items-center">
              <span className="inline-block h-px w-8 align-middle mr-3 bg-white/40" />
              Introduction
            </p>
            <h2 className="font-display uppercase text-white leading-[0.9] tracking-tight text-4xl sm:text-5xl lg:text-6xl">
              In Motion
            </h2>
          </motion.div>

          {/* Sound toggle — bottom right */}
          <button
            data-testid="intro-video-mute-btn"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className="absolute right-5 sm:right-8 lg:right-12 bottom-8 sm:bottom-10 lg:bottom-14 z-20 inline-flex items-center gap-2 h-10 sm:h-11 px-4 sm:px-5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white text-[10px] sm:text-[11px] tracking-[0.22em] uppercase hover:bg-white hover:text-black transition-all duration-300"
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            {isMuted ? "Sound Off" : "Sound On"}
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default IntroVideo;
