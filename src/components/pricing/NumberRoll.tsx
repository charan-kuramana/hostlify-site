import { AnimatePresence, m } from "motion/react";
import { formatIN } from "@/lib/format";

/** Digits slide vertically when the value changes (pricing toggle). */
export function NumberRoll({ value, className }: { value: number; className?: string }) {
  const chars = formatIN(value).split("");
  return (
    <span className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      <span className="sr-only">{formatIN(value)}</span>
      <span aria-hidden="true" className="inline-flex overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          {chars.map((c, i) => (
            <m.span
              key={`${i}-${c}-${chars.length}`}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.35, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              {c}
            </m.span>
          ))}
        </AnimatePresence>
      </span>
    </span>
  );
}
