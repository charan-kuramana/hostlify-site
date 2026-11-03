import { m } from "motion/react";
import { hero, type Audience } from "@/content/home";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";

type AudienceToggleProps = { value: Audience; onChange: (value: Audience) => void; className?: string };

const options: readonly Audience[] = ["owner", "resident"];

/** Pill toggle (owner | resident) with a shared-layout sliding indicator. */
export function AudienceToggle({ value, onChange, className }: AudienceToggleProps) {
  return (
    <div
      role="group"
      aria-label={hero.toggle.label}
      className={cn(
        "relative flex w-full rounded-full border border-gray-200 bg-white/95 p-1 shadow-card sm:inline-flex sm:w-auto",
        className,
      )}
    >
      {options.map((option) => {
        const active = value === option;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option)}
            className={cn(
              "relative flex min-h-11 flex-1 items-center justify-center rounded-full px-2.5 text-center text-[13px] leading-tight font-semibold transition-colors duration-200 sm:flex-none sm:px-4 sm:text-sm sm:whitespace-nowrap",
              active ? "text-white" : "text-gray-600 hover:text-brand-700",
            )}
          >
            {active && (
              <m.span
                layoutId="hero-audience-pill"
                className="absolute inset-0 rounded-full bg-gradient-primary shadow-card"
                transition={spring.snappy}
                aria-hidden="true"
              />
            )}
            <span className="relative">{hero.toggle[option]}</span>
          </button>
        );
      })}
    </div>
  );
}
