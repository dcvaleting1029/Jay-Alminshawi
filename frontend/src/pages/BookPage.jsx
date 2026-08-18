import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Volume2, VolumeX, Check } from "lucide-react";

const VSL_SRC = "/vsl.mp4";
const VSL_POSTER = "/vsl-poster.jpg";

const CALENDLY_URL =
  "https://calendly.com/jay_alminshawi/discovery-call?background_color=1a1a1a&text_color=ffffff&primary_color=ffffff";
const CALENDLY_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";

const PAGE_TITLE =
  "Book Your Free Discovery Call | Jay Alminshawi — Web Design for UK Builders";
const PAGE_DESCRIPTION =
  "Free 30-minute discovery call for UK construction & renovation firms. Watch the intro, then pick a time that suits you.";

/* -------------------------------------------------------------- Meta */
const setMeta = (name, content, attr = "name") => {
  let tag = document.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

/* -------------------------------------------------------------- VSL */
const VSLPlayer = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      // On first click, unmute for full VSL experience
      if (!started) {
        v.muted = false;
        setIsMuted(false);
      }
      v.play().catch(() => {});
      setStarted(true);
    } else {
      v.pause();
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
    if (!v.muted && v.paused) v.play().catch(() => {});
  };

  return (
    <div
      data-testid="vsl-frame"
      onClick={togglePlay}
      className="relative mx-auto max-w-[1100px] rounded-[20px] overflow-hidden border border-white/10 bg-black shadow-[0_50px_140px_-40px_rgba(0,0,0,0.9)] cursor-pointer group"
    >
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          data-testid="vsl-video"
          src={VSL_SRC}
          poster={VSL_POSTER}
          playsInline
          muted
          autoPlay
          preload="auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Play overlay when paused */}
        {!isPlaying && (
          <div className="absolute inset-0 grid place-items-center bg-black/50 backdrop-blur-[2px] z-10">
            <button
              data-testid="vsl-play-btn"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              aria-label="Play video"
              className="relative grid place-items-center h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-white text-black hover:scale-105 transition-transform"
            >
              <Play size={32} className="translate-x-[3px]" fill="currentColor" />
              <span className="absolute inset-0 rounded-full ring-1 ring-white/40 animate-ping" />
            </button>
          </div>
        )}

        {/* Sound toggle */}
        {started && (
          <button
            data-testid="vsl-mute-btn"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
            className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 z-20 inline-flex items-center gap-2 h-10 px-4 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-[11px] tracking-[0.22em] uppercase hover:bg-white hover:text-black transition-all"
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            {isMuted ? "Sound Off" : "Sound On"}
          </button>
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------- Calendly */
const CalendlyInline = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const mount = () => {
      const node = containerRef.current;
      if (cancelled || !node || !window.Calendly?.initInlineWidget) return;
      node.innerHTML = "";
      window.Calendly.initInlineWidget({ url: CALENDLY_URL, parentElement: node });
    };

    const existing = document.querySelector(`script[src="${CALENDLY_SCRIPT}"]`);
    if (window.Calendly?.initInlineWidget) {
      mount();
    } else if (existing) {
      existing.addEventListener("load", mount, { once: true });
    } else {
      const s = document.createElement("script");
      s.src = CALENDLY_SCRIPT;
      s.async = true;
      s.addEventListener("load", mount, { once: true });
      document.body.appendChild(s);
    }
    return () => { cancelled = true; };
  }, []);

  return (
    <div
      ref={containerRef}
      data-testid="calendly-inline"
      style={{ minWidth: 320, height: 780 }}
      className="w-full rounded-2xl overflow-hidden border border-white/[0.08] bg-[#1a1a1a]"
    />
  );
};

/* -------------------------------------------------------------- Sections */
const CALL_TOPICS = [
  "Your business, services and long-term goals",
  "Your current website (or lack of one)",
  "What's currently working — and what isn't",
  "Your ideal customer and target audience",
  "Competitor analysis and positioning",
  "Website strategy and user journey",
  "Recommended pages and functionality",
  "Design direction and brand identity",
  "Timeline, investment and next steps",
];

const IDEAL_FOR = [
  "Build a new website",
  "Redesign an existing website",
  "Improve lead generation",
  "Create a stronger online presence",
  "Elevate their brand",
  "Invest in a premium, strategic website",
];

const BEFORE_CALL = [
  "Your current website (if applicable)",
  "Links to websites you like",
  "Your business goals",
  "Any questions you'd like to discuss",
];

const CheckList = ({ items, testId }) => (
  <ul data-testid={testId} className="space-y-3">
    {items.map((it, i) => (
      <li key={i} className="flex items-start gap-3">
        <span className="mt-1 grid place-items-center h-4 w-4 rounded-full bg-white text-black shrink-0">
          <Check size={10} strokeWidth={3} />
        </span>
        <span className="text-[14.5px] sm:text-[15px] text-white/75 leading-relaxed">
          {it}
        </span>
      </li>
    ))}
  </ul>
);

const Section = ({ eyebrow, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className="border-t border-white/[0.08] pt-8 sm:pt-10"
  >
    {eyebrow && (
      <p className="font-mono-grotesk text-[10.5px] tracking-[0.32em] uppercase text-white/40 mb-3">
        {eyebrow}
      </p>
    )}
    <h3 className="font-display uppercase text-white tracking-tight text-2xl sm:text-3xl leading-[0.95] mb-6">
      {title}
    </h3>
    <div className="text-[14.5px] sm:text-[15px] text-white/60 leading-relaxed space-y-4">
      {children}
    </div>
  </motion.div>
);

/* -------------------------------------------------------------- Page */
const BookPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const prevTitle = document.title;
    document.title = PAGE_TITLE;
    setMeta("description", PAGE_DESCRIPTION);
    setMeta("og:title", PAGE_TITLE, "property");
    setMeta("og:description", PAGE_DESCRIPTION, "property");
    // Discourage search-engine indexing of the ad landing page
    setMeta("robots", "noindex, nofollow");
    return () => {
      document.title = prevTitle;
      const r = document.querySelector('meta[name="robots"]');
      if (r) r.setAttribute("content", "index, follow");
    };
  }, []);

  return (
    <main
      data-testid="book-page"
      className="relative min-h-screen bg-[#050505] text-white overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-white/[0.03] blur-[160px]" />
      </div>

      {/* Minimal top bar — no nav distractions to keep lead focused on booking */}
      <header
        data-testid="book-topbar"
        className="relative z-20 mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12 pt-8 sm:pt-10 flex items-center justify-between"
      >
        <a
          href="/"
          className="font-heading text-[11px] sm:text-[13px] tracking-[0.28em] uppercase text-white/90 hover:text-white transition"
        >
          Jay Alminshawi
        </a>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono-grotesk text-[10px] tracking-[0.28em] uppercase text-white/70">
            Now Booking
          </span>
        </span>
      </header>

      {/* Hero — VSL front and centre */}
      <section
        data-testid="book-hero"
        className="relative mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12 pt-12 sm:pt-16 lg:pt-20 pb-8"
      >
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7 } },
            }}
            className="font-heading text-[11px] tracking-[0.32em] uppercase text-white/40 mb-5"
          >
            <span className="inline-block h-px w-8 align-middle mr-3 bg-white/30" />
            Free Discovery Call — 30 Minutes
          </motion.p>
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="font-display uppercase text-white leading-[0.9] tracking-tight text-4xl sm:text-5xl lg:text-6xl"
          >
            Watch this first,<br />then book below.
          </motion.h1>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
            }}
            className="mt-6 text-[15px] sm:text-base text-white/55 max-w-xl mx-auto leading-relaxed"
          >
            A quick intro to how I help construction &amp; renovation businesses
            win bigger jobs online — then pick a time that suits you.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <VSLPlayer />
        </motion.div>
      </section>

      {/* Description + Calendly */}
      <section
        data-testid="book-body"
        className="relative mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20"
      >
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left column — description */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 xl:col-span-7"
          >
            <p className="text-[15px] sm:text-base text-white/60 leading-relaxed">
              This complimentary discovery call is designed to understand your
              business, your goals and whether we&apos;re the right fit to work
              together.
            </p>
            <p className="mt-5 text-[15px] sm:text-base text-white/60 leading-relaxed">
              We&apos;ll discuss your current online presence, identify
              opportunities for improvement and explore how a modern,
              high-performing website can help you build trust, generate more
              enquiries and position your business as the premium choice within
              your industry.
            </p>

            <div className="mt-10 sm:mt-12 space-y-10 sm:space-y-12">
              <Section
                eyebrow="On The Call"
                title="During our call, we'll cover:"
              >
                <CheckList items={CALL_TOPICS} testId="call-topics" />
              </Section>

              <Section eyebrow="Ideal For" title="Who this call is for">
                <p>
                  This call is ideal for ambitious businesses looking to:
                </p>
                <CheckList items={IDEAL_FOR} testId="ideal-for" />
              </Section>

              <Section eyebrow="Preparation" title="Before the call">
                <p>Please have the following ready where possible:</p>
                <CheckList items={BEFORE_CALL} testId="before-call" />
              </Section>

              <Section eyebrow="Next Steps" title="What happens next?">
                <p>
                  If we&apos;re a good fit, I&apos;ll put together a tailored
                  proposal outlining the recommended strategy, project scope,
                  timeline and investment.
                </p>
                <p>
                  There is absolutely no obligation to proceed — this call is
                  simply an opportunity to explore what&apos;s possible for your
                  business.
                </p>
                <p className="text-white/75 pt-2">
                  I look forward to learning more about your business and
                  helping you create a website that&apos;s built to perform.
                </p>
              </Section>
            </div>
          </motion.div>

          {/* Right column — Calendly (sticky on desktop) */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="lg:sticky lg:top-8">
              <p className="font-heading text-[11px] tracking-[0.32em] uppercase text-white/40 mb-5">
                <span className="inline-block h-px w-8 align-middle mr-3 bg-white/30" />
                Pick a Time
              </p>
              <h2 className="font-display uppercase text-white leading-[0.9] tracking-tight text-3xl sm:text-4xl lg:text-5xl mb-6">
                Book your <br />discovery call.
              </h2>
              <CalendlyInline />
            </div>
          </div>
        </div>
      </section>

      {/* Minimal footer */}
      <footer
        data-testid="book-footer"
        className="relative mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12 py-10 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono-grotesk text-[10.5px] tracking-[0.28em] uppercase text-white/35"
      >
        <p>© 2025 Jay Alminshawi — All Rights Reserved</p>
        <p>Web Design for Construction &amp; Renovation, UK-Wide</p>
      </footer>
    </main>
  );
};

export default BookPage;
