import { useEffect, useState } from "react";
import { useInView, useMotionValue, useTransform, animate } from "framer-motion";

/**
 * useCountUp — animate a number from 0 to `target` when the referenced
 * element scrolls into view. Respects prefers-reduced-motion.
 */
export const useCountUp = (target, ref, duration = 1.4) => {
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));
  const [value, setValue] = useState(0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (target == null) return;
    if (!inView) return;

    if (prefersReduced) {
      setValue(target);
      return;
    }

    const controls = animate(mv, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    const unsub = rounded.on("change", (v) => setValue(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, target, duration, mv, rounded]);

  return value;
};
