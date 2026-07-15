import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { PLANS } from "../../data/pricing";

// Each answer awards points to one or more plans (weighted).
const QUESTIONS = [
  {
    id: "stage",
    label: "Where's your business right now?",
    options: [
      { text: "Just starting out", weights: { launch: 3, growth: 1 } },
      { text: "Getting steady enquiries", weights: { growth: 3, launch: 1, pro: 1 } },
      { text: "Established & growing fast", weights: { pro: 3, growth: 1, scale: 1 } },
      { text: "Ready to dominate my market", weights: { scale: 3, pro: 1 } },
    ],
  },
  {
    id: "budget",
    label: "What's your comfortable budget?",
    options: [
      { text: "Under £250", weights: { launch: 3 } },
      { text: "£250 – £750", weights: { growth: 3 } },
      { text: "£750 – £2,000", weights: { pro: 3, growth: 1 } },
      { text: "£2,000+", weights: { scale: 3, pro: 1 } },
    ],
  },
  {
    id: "timeline",
    label: "How soon do you need it live?",
    options: [
      { text: "Within a week", weights: { launch: 2 } },
      { text: "Around 2 weeks", weights: { growth: 2 } },
      { text: "Within a month", weights: { pro: 2 } },
      { text: "I'll take my time to get it perfect", weights: { scale: 2, pro: 1 } },
    ],
  },
];

const computeRecommendation = (answers) => {
  const scores = { launch: 0, growth: 0, pro: 0, scale: 0 };
  answers.forEach((opt) => {
    if (!opt) return;
    Object.entries(opt.weights).forEach(([plan, pts]) => {
      scores[plan] += pts;
    });
  });
  const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  return PLANS.find((p) => p.id === winner);
};

export const PricingQuiz = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0); // 0..2 questions, 3 = result
  const [answers, setAnswers] = useState([null, null, null]);
  const containerRef = useRef(null);

  const recommendation = useMemo(
    () => (step === 3 ? computeRecommendation(answers) : null),
    [answers, step]
  );

  const progress = (step / QUESTIONS.length) * 100;

  const handleAnswer = (option) => {
    const next = [...answers];
    next[step] = option;
    setAnswers(next);
    setTimeout(() => setStep((s) => Math.min(s + 1, QUESTIONS.length)), 260);
  };

  const restart = () => {
    setAnswers([null, null, null]);
    setStep(0);
  };

  const scrollToPlan = () => {
    if (!recommendation) return;
    const el = document.querySelector(
      `[data-testid="plan-card-${recommendation.id}"]`
    );
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section
      ref={containerRef}
      data-testid="pricing-quiz-section"
      className="relative py-16 sm:py-20 lg:py-24 bg-[#050505] overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[600px] h-[400px] rounded-full bg-white/[0.03] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-3xl rounded-[22px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden"
        >
          {/* Header row */}
          <div className="flex items-center justify-between gap-4 px-6 sm:px-8 pt-6 sm:pt-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
              <Sparkles size={12} className="text-white/70" />
              <span className="font-mono-grotesk text-[10px] tracking-[0.28em] uppercase text-white/60">
                Package Finder
              </span>
            </div>
            {open && step < QUESTIONS.length && (
              <span className="font-mono-grotesk text-[10.5px] tracking-[0.24em] uppercase text-white/40 tabular-nums">
                {String(step + 1).padStart(2, "0")} / {String(QUESTIONS.length).padStart(2, "0")}
              </span>
            )}
          </div>

          {/* Progress bar */}
          {open && step < QUESTIONS.length && (
            <div className="mt-5 h-px w-full bg-white/[0.06] overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          )}

          <div className="px-6 sm:px-10 py-8 sm:py-10">
            <AnimatePresence mode="wait">
              {/* Intro */}
              {!open && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center"
                >
                  <h2 className="font-display uppercase text-white leading-[0.95] tracking-tight text-3xl sm:text-4xl lg:text-5xl">
                    Not sure which<br />package fits?
                  </h2>
                  <p className="mt-5 text-[15px] sm:text-base text-white/60 max-w-md mx-auto leading-relaxed">
                    Answer 3 quick questions and I&apos;ll recommend the plan
                    that&apos;s right for where your business is today.
                  </p>
                  <button
                    data-testid="quiz-start"
                    onClick={() => setOpen(true)}
                    className="group mt-8 inline-flex items-center gap-3 rounded-full bg-white text-black h-12 px-6 text-[11.5px] tracking-[0.24em] uppercase font-medium hover:bg-white/90 transition-all duration-300"
                  >
                    Take The 30-Second Quiz
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </button>
                </motion.div>
              )}

              {/* Questions */}
              {open && step < QUESTIONS.length && (
                <motion.div
                  key={`q-${step}`}
                  initial={{ opacity: 0, x: 30, filter: "blur(6px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -30, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3
                    data-testid={`quiz-question-${step}`}
                    className="font-display uppercase text-white leading-[0.95] tracking-tight text-2xl sm:text-3xl lg:text-4xl max-w-lg"
                  >
                    {QUESTIONS[step].label}
                  </h3>
                  <div className="mt-7 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {QUESTIONS[step].options.map((opt, i) => {
                      const selected = answers[step]?.text === opt.text;
                      return (
                        <button
                          key={opt.text}
                          data-testid={`quiz-option-${step}-${i}`}
                          onClick={() => handleAnswer(opt)}
                          className={`group text-left rounded-2xl border px-5 py-4 transition-all duration-300 ${
                            selected
                              ? "border-white bg-white text-black"
                              : "border-white/10 bg-white/[0.02] text-white hover:border-white/30 hover:bg-white/[0.05]"
                          }`}
                        >
                          <span className="font-heading text-[14.5px] sm:text-[15px] leading-snug">
                            {opt.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Result */}
              {open && step === QUESTIONS.length && recommendation && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center"
                  data-testid="quiz-result"
                >
                  <p className="font-mono-grotesk text-[10.5px] tracking-[0.32em] uppercase text-white/45 mb-4">
                    Recommended For You
                  </p>
                  <h3 className="font-display uppercase text-white leading-[0.9] tracking-tight text-5xl sm:text-6xl lg:text-7xl">
                    {recommendation.name}
                  </h3>
                  <p className="mt-5 text-[15px] sm:text-base text-white/55 max-w-md mx-auto leading-relaxed">
                    {recommendation.tagline}
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      data-testid="quiz-scroll-to-plan"
                      onClick={scrollToPlan}
                      className="group inline-flex items-center gap-3 rounded-full bg-white text-black h-12 px-6 text-[11.5px] tracking-[0.24em] uppercase font-medium hover:bg-white/90 transition-all duration-300"
                    >
                      See {recommendation.name} Details
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-0.5 transition-transform"
                      />
                    </button>
                    <button
                      data-testid="quiz-restart"
                      onClick={restart}
                      className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] text-white h-12 px-5 text-[11.5px] tracking-[0.24em] uppercase font-medium hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                    >
                      <RotateCcw
                        size={13}
                        className="group-hover:-rotate-180 transition-transform duration-500"
                      />
                      Start Over
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingQuiz;
