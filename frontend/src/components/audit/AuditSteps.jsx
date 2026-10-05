import React from "react";
import { SPECIALISMS } from "@/data/audit";
import { Label, TextInput, FieldError, OptionGrid, Reveal } from "./FormPrimitives";

export const BusinessStep = ({ answers, set, errors }) => (
  <div className="space-y-8 sm:space-y-10">
    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7">
      <div>
        <Label htmlFor="first_name">What&apos;s your name?</Label>
        <TextInput id="first_name" testId="input-first-name" placeholder="First name" autoComplete="given-name"
          value={answers.first_name} onChange={(e) => set("first_name", e.target.value)} error={errors.first_name} autoFocus />
        <FieldError testId="error-first-name">{errors.first_name}</FieldError>
      </div>
      <div>
        <Label htmlFor="company">Company name</Label>
        <TextInput id="company" testId="input-company" placeholder="Company" autoComplete="organization"
          value={answers.company} onChange={(e) => set("company", e.target.value)} error={errors.company} />
        <FieldError testId="error-company">{errors.company}</FieldError>
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="website">Website URL</Label>
        <TextInput id="website" testId="input-website" placeholder="www.company.co.uk" autoComplete="url" inputMode="url"
          value={answers.website} onChange={(e) => set("website", e.target.value)} error={errors.website} />
        <FieldError testId="error-website">{errors.website}</FieldError>
      </div>
    </div>

    <div>
      <Label>What does your company specialise in?</Label>
      <div className="mt-3">
        <OptionGrid field="specialism" options={SPECIALISMS} value={answers.specialism} onChange={(v) => set("specialism", v)} compact />
      </div>
      <FieldError testId="error-specialism">{errors.specialism}</FieldError>
      <Reveal show={answers.specialism === "Other"}>
        <Label htmlFor="specialism_other">Tell me what your business specialises in</Label>
        <TextInput id="specialism_other" testId="input-specialism-other" placeholder="e.g. Roofing and guttering"
          value={answers.specialism_other} onChange={(e) => set("specialism_other", e.target.value)} />
      </Reveal>
    </div>
  </div>
);

export const OptionStep = ({ step, answers, set, errors }) => {
  const value = answers[step.field];
  const otherOpen = step.otherField && (step.multi ? value.includes("Other") : value === (step.otherTrigger || "Other"));
  return (
    <div>
      <OptionGrid field={step.field} options={step.options} value={value} multi={step.multi} compact={step.compact}
        onChange={(v) => set(step.field, v)} />
      <FieldError testId={`error-${step.field}`}>{errors[step.field]}</FieldError>
      {step.otherField && (
        <Reveal show={!!otherOpen}>
          <Label htmlFor={step.otherField}>{step.otherLabel}</Label>
          <TextInput id={step.otherField} testId={`input-${step.otherField.replace(/_/g, "-")}`} placeholder="Type here…"
            value={answers[step.otherField]} onChange={(e) => set(step.otherField, e.target.value)} />
        </Reveal>
      )}
    </div>
  );
};

export const TextareaStep = ({ step, answers, set }) => (
  <div>
    <textarea
      id={step.field}
      data-testid="input-website-issue"
      rows={5}
      autoFocus
      placeholder="e.g. We're getting website traffic but not enough people are getting in touch..."
      value={answers[step.field]}
      onChange={(e) => set(step.field, e.target.value)}
      className="w-full resize-none rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 text-[16px] text-white placeholder:text-white/25 outline-none focus:border-white/40 transition-colors duration-300 leading-relaxed"
    />
    <p className="mt-3 font-mono-grotesk text-[10.5px] tracking-wider uppercase text-white/30">
      Optional — a sentence or two is plenty.
    </p>
  </div>
);

export const ContactStep = ({ answers, set, errors }) => (
  <div className="space-y-7">
    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7">
      <div>
        <Label htmlFor="email">Business email</Label>
        <TextInput id="email" type="email" testId="input-email" placeholder="john@company.co.uk" autoComplete="email" inputMode="email"
          value={answers.email} onChange={(e) => set("email", e.target.value)} error={errors.email} autoFocus />
        <FieldError testId="error-email">{errors.email}</FieldError>
      </div>
      <div>
        <Label htmlFor="phone">Phone number</Label>
        <TextInput id="phone" type="tel" testId="input-phone" placeholder="07xxx xxx xxx" autoComplete="tel" inputMode="tel"
          value={answers.phone} onChange={(e) => set("phone", e.target.value)} error={errors.phone} />
        <FieldError testId="error-phone">{errors.phone}</FieldError>
      </div>
    </div>

    <label
      data-testid="consent-label"
      className={`flex items-start gap-3.5 cursor-pointer rounded-2xl border p-4 sm:p-5 transition-colors duration-300 ${
        errors.consent ? "border-rose-300/50" : answers.consent ? "border-white/30 bg-white/[0.03]" : "border-white/[0.08] hover:border-white/20"
      }`}
    >
      <input
        type="checkbox"
        data-testid="input-consent"
        checked={answers.consent}
        onChange={(e) => set("consent", e.target.checked)}
        className="sr-only"
      />
      <span
        aria-hidden
        className={`mt-0.5 grid place-items-center h-5 w-5 rounded-[6px] border shrink-0 transition-all duration-300 ${
          answers.consent ? "bg-white border-white text-black" : "border-white/25 text-transparent"
        }`}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
      </span>
      <span className="text-[14px] sm:text-[14.5px] text-white/70 leading-relaxed">
        I&apos;m happy for Jay to contact me regarding my website audit.{" "}
        <a
          href="/privacy"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="consent-privacy-link"
          onClick={(e) => e.stopPropagation()}
          className="text-white/45 underline underline-offset-4 decoration-white/20 hover:text-white hover:decoration-white/60 transition-colors"
        >
          Privacy policy
        </a>
      </span>
    </label>
    <FieldError testId="error-consent">{errors.consent}</FieldError>
  </div>
);
