import { m } from "motion/react";

/** A check mark that draws itself (pathLength 0 → 1) when `drawn` is true. */
export function PathCheck({ drawn, className, delay = 0 }: { drawn: boolean; className?: string; delay?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <m.circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="1.75"
        initial={false}
        animate={{ pathLength: drawn ? 1 : 0, opacity: drawn ? 1 : 0.2 }}
        transition={{ duration: 0.5, delay }}
      />
      <m.path
        d="m8 12.5 2.5 2.5L16 9.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{ pathLength: drawn ? 1 : 0 }}
        transition={{ duration: 0.4, delay: delay + 0.3 }}
      />
    </svg>
  );
}
