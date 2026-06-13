import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LaptopMockup } from "./LaptopMockup";
import { PROJECTS } from "../../data/portfolio";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const ProjectCard = ({ project, index }) => {
  const hasUrl = !!project.url;
  return (
    <motion.a
      data-testid={`project-card-${index}`}
      href={hasUrl ? project.url : undefined}
      target={hasUrl ? "_blank" : undefined}
      rel={hasUrl ? "noopener noreferrer" : undefined}
      onClick={hasUrl ? undefined : (e) => e.preventDefault()}
      aria-label={hasUrl ? `Visit ${project.name}` : project.name}
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className={`group relative flex flex-col rounded-2xl border border-white/[0.07] bg-gradient-to-b from-[#0c0c0c] to-[#070707] p-5 sm:p-6 overflow-hidden glow-hover transition-all duration-500 ${hasUrl ? "cursor-pointer" : "cursor-default"}`}
    >
      {/* top row: category + arrow */}
      <header className="flex items-start justify-between gap-3">
        <span className="font-mono-grotesk text-[10px] sm:text-[10.5px] tracking-[0.28em] uppercase text-white/45">
          {project.category}
        </span>
        <span
          aria-hidden
          className="grid place-items-center h-9 w-9 rounded-full border border-white/15 bg-white/[0.03] text-white/70 group-hover:bg-white group-hover:text-black transition-all duration-300"
        >
          <ArrowUpRight size={14} className="group-hover:rotate-0 -rotate-12 transition-transform duration-300" />
        </span>
      </header>

      {/* Laptop mockup */}
      <div className="relative mt-7 mb-12 sm:mb-14 px-2 sm:px-3 [perspective:1400px]">
        <div className="transform-gpu transition-transform duration-700 group-hover:[transform:rotateX(8deg)_rotateY(-8deg)]">
          <LaptopMockup screen={project.image} tilt={0} className="w-full" testId={`project-laptop-${index}`} />
        </div>
      </div>

      {/* Title */}
      <div className="mt-auto">
        <h3 className="font-heading text-xl sm:text-2xl font-medium tracking-tight text-white">
          {project.name}
        </h3>
      </div>

      {/* hover glow line */}
      <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.a>
  );
};

export const Projects = () => {
  return (
    <section
      id="projects"
      data-testid="projects-section"
      className="relative py-24 sm:py-32 bg-[#050505]"
    >
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
        {/* Heading row */}
        <div className="grid lg:grid-cols-12 gap-6 items-end mb-14 sm:mb-20">
          <div className="lg:col-span-6">
            <p className="font-heading text-[11px] tracking-[0.32em] uppercase text-white/40 mb-5">
              <span className="inline-block h-px w-8 align-middle mr-3 bg-white/30" />
              Selected Work
            </p>
            <h2 className="font-display uppercase text-white leading-[0.9] tracking-tight text-5xl sm:text-6xl lg:text-7xl">
              Projects
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-[15px] sm:text-base text-white/55 max-w-md leading-relaxed">
              A selection of recent websites I&apos;ve designed and developed
              that are built to be modern, responsive and high performing.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div
          data-testid="projects-grid"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6"
        >
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>

        {/* View all */}
        <div className="mt-16 flex justify-center">
          <button
            data-testid="projects-view-all"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] px-6 h-12 text-[12px] tracking-[0.22em] uppercase text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            View All Projects
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
