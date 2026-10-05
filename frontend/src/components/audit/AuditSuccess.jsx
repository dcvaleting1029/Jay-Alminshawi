import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { CalendlyInline } from "@/components/portfolio/CalendlyInline";

const NEXT = [
  "I'll personally review your website the way a homeowner would — first impression, project galleries, trust signals and the quote journey.",
  "You'll receive a personalised video audit by email within 48 hours.",
  "No obligation — the recommendations are yours to keep.",
];

const ease = [0.22, 1, 0.36, 1];
const item = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease } },
};

export const AuditSuccess = ({ result }) => {
  return (
    <motion.div
      data-testid="audit-success"
      initial="hidden" animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
    >
      <motion.div variants={item} className="inline-flex items-center gap-3 mb-8">
        <span className="grid place-items-center h-9 w-9 rounded-full bg-white text-black">
          <Check size={15} strokeWidth={3} />
        </span>
        <p className="font-heading text-[11px] tracking-widest uppercase text-white/55">Request Received</p>
      </motion.div>

      <motion.h2 variants={item} data-testid="audit-success-heading"
        className="font-title font-medium text-white tracking-tight leading-[1.1] text-4xl sm:text-5xl lg:text-6xl text-balance">
        Thanks, {result.first_name}.<br />I&apos;ll take it from here.
      </motion.h2>

      <motion.p variants={item} className="mt-7 text-[15px] sm:text-base text-white/55 leading-relaxed max-w-xl">
        I&apos;ll personally review <span className="text-white">{result.website}</span> for{" "}
        <span className="text-white">{result.company}</span> and send your personalised audit within 48 hours.
      </motion.p>

      <motion.ul variants={item} data-testid="audit-success-next" className="mt-10 space-y-3.5 border-t border-white/[0.08] pt-8">
        {NEXT.map((t, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-[7px] h-px w-5 bg-white/30 shrink-0" />
            <span className="text-[14.5px] sm:text-[15px] text-white/70 leading-relaxed">{t}</span>
          </li>
        ))}
      </motion.ul>

      <motion.div variants={item} className="mt-14 sm:mt-16 border-t border-white/[0.08] pt-10">
        <p className="font-mono-grotesk text-[10.5px] tracking-widest uppercase text-white/40 mb-3">Optional</p>
        <h3 className="font-title font-medium text-white tracking-tight text-2xl sm:text-3xl leading-[1.1]">
          Prefer to talk it through?
        </h3>
        <p className="mt-4 text-[14.5px] sm:text-[15px] text-white/55 leading-relaxed max-w-lg">
          If you&apos;d rather discuss your website on a 30-minute strategy call, pick a time below. Entirely optional — your audit is on its way either way.
        </p>

        <div className="mt-8">
          <CalendlyInline
            height={760}
            testId="audit-calendly"
            onScheduled={(payload) =>
              fetch(`${process.env.REACT_APP_BACKEND_URL}/api/audit-leads/${result.id}/call-booked`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              }).catch(() => {})
            }
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AuditSuccess;
