import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export const Label = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="block font-mono-grotesk text-[10.5px] tracking-[0.28em] uppercase text-white/40 mb-2">
    {children}
  </label>
);

export const TextInput = ({ id, testId, error, ...props }) => (
  <input
    id={id}
    data-testid={testId}
    aria-invalid={!!error}
    className={`w-full bg-transparent border-b py-3 text-[16px] sm:text-[17px] text-white placeholder:text-white/25 outline-none transition-colors duration-300 ${
      error ? "border-rose-300/60" : "border-white/15 focus:border-white"
    }`}
    {...props}
  />
);

export const FieldError = ({ children, testId }) =>
  children ? (
    <p data-testid={testId} className="mt-2 text-[12px] text-rose-200/80">{children}</p>
  ) : null;

export const OptionCard = ({ label, selected, multi, onClick, testId, compact }) => (
  <button
    type="button"
    data-testid={testId}
    aria-pressed={selected}
    onClick={onClick}
    className={`group w-full flex items-center justify-between gap-4 rounded-2xl border text-left transition-all duration-300 ${
      compact ? "px-4 py-3.5 sm:px-5 sm:py-4" : "px-5 py-4 sm:px-6 sm:py-5"
    } ${
      selected
        ? "border-white bg-white text-black"
        : "border-white/[0.08] bg-white/[0.02] text-white/85 hover:border-white/30 hover:bg-white/[0.04]"
    }`}
  >
    <span className={`font-heading tracking-[-0.01em] ${compact ? "text-[14px] sm:text-[15px]" : "text-[15px] sm:text-base"}`}>
      {label}
    </span>
    <span
      className={`grid place-items-center shrink-0 h-5 w-5 border transition-all duration-300 ${
        multi ? "rounded-[6px]" : "rounded-full"
      } ${selected ? "border-black bg-black text-white" : "border-white/20 text-transparent group-hover:border-white/40"}`}
    >
      <Check size={11} strokeWidth={3} />
    </span>
  </button>
);

export const OptionGrid = ({ options, value, multi, onChange, field, compact }) => {
  const isSelected = (opt) => (multi ? value.includes(opt) : value === opt);
  const toggle = (opt) => {
    if (!multi) return onChange(opt);
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]);
  };
  return (
    <div
      data-testid={`${field}-options`}
      className={`grid gap-2.5 sm:gap-3 ${compact ? "grid-cols-2 sm:grid-cols-3" : "sm:grid-cols-2"}`}
    >
      {options.map((opt) => (
        <OptionCard
          key={opt}
          label={opt}
          multi={multi}
          compact={compact}
          selected={isSelected(opt)}
          onClick={() => toggle(opt)}
          testId={`${field}-option-${opt.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
        />
      ))}
    </div>
  );
};

export const Reveal = ({ show, children }) => (
  <AnimatePresence initial={false}>
    {show && (
      <motion.div
        initial={{ opacity: 0, height: 0, y: -6 }}
        animate={{ opacity: 1, height: "auto", y: 0 }}
        exit={{ opacity: 0, height: 0, y: -6 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="pt-6">{children}</div>
      </motion.div>
    )}
  </AnimatePresence>
);
