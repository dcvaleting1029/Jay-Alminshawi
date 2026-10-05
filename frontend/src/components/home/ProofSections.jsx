import React from "react";
import { SERVICES } from "@/data/portfolio";
import { Stagger, Item, Line } from "./HomeHero";

export const ServicesSplit = () => (
  <section id="services" data-testid="services-section" className="pb-24 sm:pb-32 lg:pb-40">
    <div className="mx-auto w-full px-[5vw]">
      <Line className="mb-24 sm:mb-32 lg:mb-40" />
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
      <Stagger className="lg:col-span-6" stagger={0.14}>
        <Item as="h2" className="font-title text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-tight text-white text-balance">
          I design and build websites that win you better jobs.
        </Item>
        <Item as="p" className="mt-6 text-base sm:text-lg text-neutral-400 leading-relaxed max-w-xl">
          Homeowners choose a builder the same way every time: they look at your work, check your reviews, and contact the firm that looks most capable. I build the whole journey around that — strategy, design, development and the systems behind it. No agency layers, no hand-offs: you work directly with me.
        </Item>
      </Stagger>
      <Stagger className="lg:col-span-6" stagger={0.09} delay={0.15}>
        <Item as="p" className="font-title text-xs uppercase tracking-widest text-neutral-500 mb-6">Services</Item>
        <ul data-testid="services-list" className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {SERVICES.map((s, i) => (
            <Item as="li" key={s.title} data-testid={`service-${i + 1}`} className="group py-5 flex items-baseline justify-between gap-6">
              <span className="text-lg sm:text-xl font-medium text-white">{s.title}</span>
              <span className="hidden sm:block text-right text-[13px] text-neutral-500 max-w-[55%]">{s.items.slice(0, 2).join(" · ")}</span>
            </Item>
          ))}
        </ul>
      </Stagger>
      </div>
    </div>
  </section>
);
