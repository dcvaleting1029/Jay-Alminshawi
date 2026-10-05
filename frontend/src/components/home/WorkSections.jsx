import React from "react";
import { WORK, TRADE_PARTNERS } from "@/data/portfolio";
import { Reveal, Stagger, Item, Line } from "./HomeHero";

const SectionHead = ({ eyebrow, title, link }) => (
  <Stagger className="flex items-end justify-between gap-6 mb-12 sm:mb-16" stagger={0.12}>
    <div>
      <Item as="p" className="font-title text-xs uppercase tracking-widest text-neutral-500 mb-4">{eyebrow}</Item>
      <Item as="h2" className="font-title text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-tight text-white text-balance max-w-2xl">{title}</Item>
    </div>
    {link}
  </Stagger>
);

const WorkCard = ({ p, index }) => {
  const Tag = p.url ? "a" : "div";
  const linkProps = p.url ? { href: p.url, target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Tag {...linkProps} data-testid={`project-card-${index + 1}`} className="group block h-full transition-transform duration-500 ease-out hover:-translate-y-1">
      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#121215] border border-white/[0.06] transition-[border-color,box-shadow] duration-500 group-hover:border-white/[0.14] group-hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
        <img src={p.mockup} alt={`${p.name} website shown on a laptop`} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
      </div>
      <div className="mt-5">
        <div className="flex items-start justify-between gap-4">
          <p className="font-title text-[17px] font-semibold tracking-tight text-white">{p.name}</p>
          {p.url && <span className="mt-0.5 shrink-0 grid place-items-center h-7 w-7 rounded-full border border-white/15 text-[11px] text-neutral-400 transition-colors group-hover:border-white/40 group-hover:text-white">↗</span>}
        </div>
        <p className="mt-1 text-[14px] leading-relaxed text-neutral-500">{p.description}</p>
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {[p.type, ...p.tags.filter((t) => t !== p.type)].map((t) => (
            <span key={t} data-testid={`project-tag-${index + 1}`} className={`rounded-full px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wider ${t === "Concept" || t === "Client work" ? "bg-white text-black" : "bg-white/[0.07] text-neutral-300"}`}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </Tag>
  );
};

export const WorkGrid = () => (
  <section id="work" data-testid="projects-grid" className="pb-24 sm:pb-32 lg:pb-40">
    <div className="mx-auto w-full px-[5vw]">
      <Line className="mb-24 sm:mb-32 lg:mb-40" />
      <SectionHead eyebrow="Selected work" title="Websites built for building firms, designed to win better jobs." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 lg:gap-x-10 lg:gap-y-16">
        {WORK.map((p, i) => (
          <Reveal key={p.name} delay={(i % 3) * 0.12}>
            <WorkCard p={p} index={i} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export const LogoWall = () => (
  <section data-testid="trusted-by-section" className="pb-24 sm:pb-32">
    <div className="mx-auto w-full px-[5vw]">
      <Line className="mb-24 sm:mb-32" />
      <Reveal className="text-center mb-14 sm:mb-20">
        <h2 className="font-title text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-tight text-neutral-400 text-balance max-w-3xl mx-auto">
          Trusted by <span className="text-white">builders, renovators and trades</span> across the UK, including:
        </h2>
      </Reveal>
      <Stagger data-testid="trusted-logos" stagger={0.07} delay={0.1} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-10 gap-y-14 mx-auto">
        {TRADE_PARTNERS.map((p) => (
          <Item key={p.name} title={p.name} className="h-12 grid place-items-center opacity-75 hover:opacity-100 transition-opacity duration-300">
            <img src={p.src} alt={p.name} loading="lazy" draggable={false} className="max-h-full max-w-[150px] object-contain" />
          </Item>
        ))}
      </Stagger>
    </div>
  </section>
);
