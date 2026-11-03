import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { formatIN } from "@/lib/format";
import { ease } from "@/lib/motion";

type CountUpProps = {
  value: number;
  /** Start from this value instead of 0 (for live ticking numbers) */
  from?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/** Counts up once in view, with Indian digit grouping. Writes to the DOM directly (no per-frame setState). */
export function CountUp({ value, from = 0, prefix = "", suffix = "", duration = 1.6, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const last = useRef(from);

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduce) {
      el.textContent = `${prefix}${formatIN(value)}${suffix}`;
      last.current = value;
      return;
    }
    const controls = animate(last.current, value, {
      duration,
      ease: ease.outExpo,
      onUpdate: (v) => {
        el.textContent = `${prefix}${formatIN(v)}${suffix}`;
      },
    });
    last.current = value;
    return () => controls.stop();
  }, [inView, value, prefix, suffix, duration, reduce]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {`${prefix}${formatIN(value)}${suffix}`}
    </span>
  );
}
