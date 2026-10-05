import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { INITIAL_ANSWERS, STEPS } from "@/data/audit";
import { BusinessStep, OptionStep, TextareaStep, ContactStep } from "./AuditSteps";
import { AuditSuccess } from "./AuditSuccess";
import { validateStep, readUtm, buildPayload, TOTAL_STEPS } from "./funnelLogic";

const API = process.env.REACT_APP_BACKEND_URL;
const pad = (n) => String(n).padStart(2, "0");
const ease = [0.22, 1, 0.36, 1];

const slide = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 32 : -32, filter: "blur(6px)" }),
  center: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.5, ease } },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -32 : 32, filter: "blur(6px)", transition: { duration: 0.3, ease } }),
};

const StepBody = ({ step, answers, set, errors }) => {
  if (step.id === "business") return <BusinessStep answers={answers} set={set} errors={errors} />;
  if (step.id === "contact") return <ContactStep answers={answers} set={set} errors={errors} />;
  if (step.textarea) return <TextareaStep step={step} answers={answers} set={set} />;
  return <OptionStep step={step} answers={answers} set={set} errors={errors} />;
};

export const AuditFunnel = React.forwardRef(function AuditFunnel({ onSuccess }, ref) {
  const location = useLocation();
  const topRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState(INITIAL_ANSWERS);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const step = STEPS[index];
  const isLast = index === TOTAL_STEPS - 1;

  const set = (field, value) => {
    setAnswers((a) => ({ ...a, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const scrollTop = () => {
    const el = topRef.current;
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const go = (next) => {
    setDir(next > index ? 1 : -1);
    setIndex(next);
    setErrors({});
    scrollTop();
  };

  const submit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`${API}/api/audit-leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload(answers, readUtm(location.search))),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data = await res.json();
      setResult(data);
      onSuccess?.(data);
      scrollTop();
    } catch (err) {
      toast.error("Something went wrong sending your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const onContinue = (e) => {
    e.preventDefault();
    const errs = validateStep(step, answers);
    if (Object.keys(errs).length) return setErrors(errs);
    if (isLast) return submit();
    go(index + 1);
  };

  return (
    <section
      id="audit-form"
      ref={(node) => { topRef.current = node; if (ref) ref.current = node; }}
      data-testid="audit-funnel"
      className="relative scroll-mt-6 border-t border-white/[0.06] bg-[#09090b] py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[760px] px-5 sm:px-8">
        {result ? (
          <AuditSuccess result={result} />
        ) : (
          <>
            <div className="flex items-end justify-between gap-6 mb-3">
              <p className="font-heading text-[11px] tracking-widest uppercase text-white/45">
                Personalised Website Audit
              </p>
              <p data-testid="audit-progress-label" className="font-mono-grotesk text-[11px] tracking-[0.3em] text-white/45 tabular-nums">
                {pad(index + 1)} — {pad(TOTAL_STEPS)}
              </p>
            </div>
            <div className="h-px w-full bg-white/[0.08] mb-12 sm:mb-16 overflow-hidden">
              <motion.div
                data-testid="audit-progress-bar"
                className="h-full bg-white origin-left"
                animate={{ scaleX: (index + 1) / TOTAL_STEPS }}
                initial={false}
                transition={{ duration: 0.6, ease }}
              />
            </div>

            <form onSubmit={onContinue} noValidate>
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.div key={step.id} custom={dir} variants={slide} initial="enter" animate="center" exit="exit"
                  data-testid={`audit-step-${step.id}`}>
                  <h2 className="font-title font-medium text-white tracking-tight leading-[1.1] text-3xl sm:text-4xl lg:text-5xl text-balance">
                    {step.heading}
                  </h2>
                  {step.supporting && (
                    <p className="mt-5 text-[15px] sm:text-base text-white/55 leading-relaxed max-w-xl">{step.supporting}</p>
                  )}
                  <div className="mt-10 sm:mt-12">
                    <StepBody step={step} answers={answers} set={set} errors={errors} />
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-12 sm:mt-14 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-6">
                {index > 0 ? (
                  <button type="button" data-testid="audit-back-btn" onClick={() => go(index - 1)}
                    className="group inline-flex items-center gap-2 self-start font-mono-grotesk text-[11px] tracking-wider uppercase text-white/40 hover:text-white transition-colors">
                    <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" /> Back
                  </button>
                ) : <span />}

                <div className="flex flex-col items-stretch sm:items-end gap-3">
                  <button type="submit" data-testid={isLast ? "audit-submit-btn" : "audit-continue-btn"} disabled={submitting}
                    className="group relative inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white text-black px-7 h-12 text-[13.5px] font-medium hover:bg-transparent hover:text-white transition-all duration-300 disabled:opacity-60 disabled:pointer-events-none">
                    {submitting ? <Loader2 size={15} className="animate-spin" /> : null}
                    {isLast ? "Request My Free Audit" : "Continue"}
                    {!submitting && <span className="inline-block w-4 h-px bg-current group-hover:w-6 transition-all" />}
                  </button>
                  {isLast && (
                    <p className="text-[12px] text-white/40 leading-relaxed sm:text-right max-w-sm">
                      No obligation. Your website will be personally reviewed before any recommendations are made.
                    </p>
                  )}
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
});

export default AuditFunnel;
