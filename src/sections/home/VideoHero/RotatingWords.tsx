import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type RotatingWordsProps = {
  words: readonly string[];
  /** stop cycling (paused video, reduced motion, off-screen) */
  paused?: boolean;
  interval?: number;
  className?: string;
};

/**
 * Cycles through words with a slide + fade. Every word sits in the same grid cell, so the line width never changes
 * (no layout shift). Pure CSS transitions on transform/opacity. Screen readers get the full list once.
 */
export function RotatingWords({ words, paused = false, interval = 2200, className }: RotatingWordsProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (paused || words.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [paused, words.length, interval]);

  return (
    <span className={cn("relative inline-grid align-bottom", className)}>
      <span className="sr-only">{words.join(", ")}</span>
      {words.map((word, i) => {
        const active = i === index;
        const past = i === (index - 1 + words.length) % words.length;
        return (
          <span
            key={word}
            aria-hidden="true"
            className={cn(
              "col-start-1 row-start-1 whitespace-nowrap transition-[opacity,transform] duration-500 ease-out-expo motion-reduce:transition-none",
              active ? "translate-y-0 opacity-100" : past ? "-translate-y-[70%] opacity-0" : "translate-y-[70%] opacity-0",
            )}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
}
