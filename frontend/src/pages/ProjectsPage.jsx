import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import MobileStickyCTA from "@/components/portfolio/MobileStickyCTA";
import Projects from "@/components/portfolio/Projects";
import Testimonials from "@/components/portfolio/Testimonials";

const PAGE_TITLE =
  "Projects & Client Reviews | Jay Alminshawi — Web Designer";
const PAGE_DESCRIPTION =
  "Explore recent websites built by Jay Alminshawi — modern, high-performing designs for ambitious businesses across the UK. Plus 5-star Google reviews from real clients.";
const DEFAULT_TITLE =
  "Modern Web Design & Development for Ambitious Businesses | Jay Alminshawi";
const DEFAULT_DESCRIPTION =
  "Modern, high-performing websites for ambitious businesses. Elevate your brand, generate more enquiries and turn site visitors into loyal customers.";

const setMeta = (name, content, attr = "name") => {
  let tag = document.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const ProjectsHero = () => (
  <section
    data-testid="projects-page-hero"
    className="relative pt-32 sm:pt-40 lg:pt-48 pb-6 sm:pb-10 bg-[#050505] overflow-hidden"
  >
    {/* Ambient background glow */}
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-white/[0.035] blur-[140px]" />
      <div className="absolute top-20 right-0 w-[480px] h-[480px] rounded-full bg-white/[0.025] blur-[120px]" />
    </div>

    <div className="relative mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12 } },
        }}
        className="max-w-4xl"
      >
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.7 },
            },
          }}
          className="font-heading text-[11px] tracking-[0.32em] uppercase text-white/40 mb-6"
        >
          <span className="inline-block h-px w-8 align-middle mr-3 bg-white/30" />
          Selected Work
        </motion.p>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          className="font-display uppercase text-white leading-[0.9] tracking-tight text-5xl sm:text-6xl lg:text-7xl xl:text-[88px]"
        >
          Projects <br className="hidden sm:block" />
          <span className="text-white/60">&amp; Reviews.</span>
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
          }}
          className="mt-8 sm:mt-10 text-[16px] sm:text-lg text-white/60 max-w-2xl leading-relaxed"
        >
          A selection of recent websites I&apos;ve designed and developed for
          ambitious businesses across the UK — followed by the words of the
          clients I&apos;ve been lucky enough to work with.
        </motion.p>
      </motion.div>
    </div>
  </section>
);

const ProjectsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = PAGE_TITLE;
    setMeta("description", PAGE_DESCRIPTION);
    setMeta("og:title", PAGE_TITLE, "property");
    setMeta("og:description", PAGE_DESCRIPTION, "property");
    setMeta("twitter:title", PAGE_TITLE);
    setMeta("twitter:description", PAGE_DESCRIPTION);

    return () => {
      document.title = DEFAULT_TITLE;
      setMeta("description", DEFAULT_DESCRIPTION);
      setMeta("og:title", DEFAULT_TITLE, "property");
      setMeta("og:description", DEFAULT_DESCRIPTION, "property");
      setMeta("twitter:title", DEFAULT_TITLE);
      setMeta("twitter:description", DEFAULT_DESCRIPTION);
    };
  }, []);

  return (
    <main
      data-testid="projects-page"
      className="relative bg-[#050505] text-white"
    >
      <Navbar />
      <ProjectsHero />
      <Projects />
      <Testimonials />
      <Footer />
      <MobileStickyCTA />
    </main>
  );
};

export default ProjectsPage;
