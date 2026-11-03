import { m, useReducedMotion } from "motion/react";
import { blurUp, stagger } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Part = { text: string; highlight?: boolean };
type WordRevealProps = {
  parts: readonly Part[];
  as?: "h1" | "h2";
  className?: string;
  highlightClassName?: string;
  /** Animate on mount (hero) instead of when scrolled into view */
  onMount?: boolean;
  delay?: number;
};

/**
 * Word-by-word blur-up headline. Screen readers get the full sentence once (sr-only); the animated words are aria-hidden.
 * `onMount` (hero) uses pure CSS so the headline paints from the pre-rendered HTML without waiting for JS (LCP).
 * Scroll-triggered headlines use Motion's whileInView.
 */
export function WordReveal({
  parts,
  as = "h2",
  className,
  highlightClassName = "text-gradient",
  onMount = false,
  delay = 0,
}: WordRevealProps) {
  const reduce = useReducedMotion();
  const label = parts.map((p) => p.text).join(" ");
  const words = parts.flatMap((p, pi) => p.text.split(" ").map((w, wi) => ({ key: `${pi}-${wi}`, word: w, highlight: p.highlight })));

  if (onMount) {
    const Tag = as;
    return (
      <Tag className={className}>
        <span className="sr-only">{label}</span>
        {words.map(({ key, word, highlight }, i) => (
          <span key={key} aria-hidden="true" className="inline-block whitespace-pre">
            {/* entrance and shimmer are both CSS animations, so they live on separate elements */}
            <span className="enter-word inline-block" style={{ "--d": `${delay + i * 0.035}s` } as React.CSSProperties}>
              <span className={cn(highlight && highlightClassName)}>{word}</span>
            </span>{" "}
          </span>
        ))}
      </Tag>
    );
  }

  const Tag = as === "h1" ? m.h1 : m.h2;
  return (
    <Tag
      className={className}
      variants={stagger(0.06, delay)}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      <span className="sr-only">{label}</span>
      {words.map(({ key, word, highlight }) => (
        <span key={key} aria-hidden="true" className="inline-block whitespace-pre">
          <m.span variants={blurUp} className={cn("inline-block", highlight && highlightClassName)}>
            {word}
          </m.span>{" "}
        </span>
      ))}
    </Tag>
  );
}
