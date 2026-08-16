import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// The paragraph rendered with selective bolded keywords
const paragraph = [
  { t: "I build websites for one type of business — ", strong: false },
  { t: "construction & renovation", strong: true },
  { t: ". Builders, contractors, joiners, plumbers, electricians, roofers, decorators, groundworks and landscapers. ", strong: false },
  { t: "Modern, mobile-first", strong: true },
  { t: " websites that replace the old, dated ones your competitors are still stuck with. Every site is designed to ", strong: false },
  { t: "win bigger jobs", strong: true },
  { t: ", generate ", strong: false },
  { t: "quote requests", strong: true },
  { t: " and give your business the ", strong: false },
  { t: "professionalism", strong: true },
  { t: " your work deserves.", strong: false },
];

export const About = () => {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative py-20 sm:py-28 lg:py-32 bg-[#070707] border-t border-white/[0.05]"
    >
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left text */}
          <div className="lg:col-span-8 max-w-full">
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
              className="mt-7 sm:mt-8 text-lg sm:text-2xl md:text-3xl lg:text-[34px] leading-[1.45] sm:leading-[1.3] lg:leading-[1.25] tracking-tight text-white/55 max-w-3xl break-words"
              style={{ fontFamily: "Montserrat, system-ui, sans-serif", fontWeight: 300, wordBreak: "normal", overflowWrap: "anywhere" }}
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

          {/* Right column — CTA only */}
          <div className="lg:col-span-4 flex lg:justify-end">
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
    </section>
  );
};

export default About;
