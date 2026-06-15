import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../../data/portfolio";

const BOLD = new Set(["CREATION", "PERSONAL BRAND", "MODERN AESTHETIC", "DYNAMIC", "LOOK", "PROFESSIONALISM"]);

// The paragraph rendered with selective bolded keywords
const paragraph = [
  { t: "Web design is about ", strong: false },
  { t: "creation", strong: true },
  { t: ". I started off by creating my own ", strong: false },
  { t: "personal brand", strong: true },
  { t: ". Here is where my creativity lies. ", strong: false },
  { t: "Modern aesthetic", strong: true },
  { t: " websites instead of old dated ones. Creating websites is something that changes the whole ", strong: false },
  { t: "dynamic", strong: true },
  { t: " and ", strong: false },
  { t: "look", strong: true },
  { t: " of a company — websites bring ", strong: false },
  { t: "professionalism", strong: true },
  { t: ".", strong: false },
];

export const About = () => {
  const previews = PROJECTS.slice(0, 5);
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative py-20 sm:py-28 lg:py-32 bg-[#070707] border-t border-white/[0.05]"
    >
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left text */}
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] px-4 h-8 text-[11px] tracking-[0.28em] uppercase text-white/70"
            >
              2025
            </motion.span>

            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.012 } },
              }}
              className="mt-7 sm:mt-8 text-xl sm:text-3xl lg:text-[34px] leading-[1.3] sm:leading-[1.25] tracking-tight text-white/55 max-w-3xl"
              style={{ fontFamily: "Montserrat, system-ui, sans-serif", fontWeight: 300 }}
            >
              {paragraph.map((seg, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 8, filter: "blur(6px)" },
                    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5 } },
                  }}
                  className={seg.strong ? "text-white font-semibold uppercase" : ""}
                >
                  {seg.t}
                </motion.span>
              ))}
            </motion.p>
          </div>

          {/* Right strip + CTA */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative gradient-fade-x -mx-5 sm:mx-0 px-5 sm:px-0"
            >
              <div className="flex gap-3 overflow-x-auto sm:overflow-hidden scrollbar-hide snap-x snap-mandatory">
                {previews.map((p) => (
                  <div
                    key={p.name}
                    className="relative shrink-0 w-36 sm:w-44 lg:w-48 aspect-[16/11] rounded-lg overflow-hidden border border-white/[0.08] bg-[#0a0a0a] snap-start"
                    data-testid={`about-preview-${p.name.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    <img src={p.image} alt={p.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-3 font-mono-grotesk text-[10px] tracking-[0.2em] uppercase text-white/80">
                      {p.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="mt-10 flex">
              <button
                data-testid="about-view-all"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] px-6 h-12 text-[12px] tracking-[0.22em] uppercase text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                View All Projects
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
