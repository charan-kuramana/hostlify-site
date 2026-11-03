import { m } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/cn";

export type Audience = "owners" | "residents";
type Tab = { id: Audience; label: string };

type AudienceTabsProps = { tabs: readonly Tab[]; value: Audience; onChange: (v: Audience) => void; idPrefix: string; label: string };

/** Segmented tab switcher with a sliding pill. Arrow keys / Home / End move between tabs (WAI-ARIA tabs). */
export function AudienceTabs({ tabs, value, onChange, idPrefix, label }: AudienceTabsProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    const n = tabs.length;
    const next = e.key === "Home" ? 0 : e.key === "End" ? n - 1 : (i + (e.key === "ArrowRight" ? 1 : -1) + n) % n;
    const tab = tabs[next];
    if (!tab) return;
    onChange(tab.id);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      className="inline-flex rounded-full border border-gray-200 bg-gray-100/80 p-1 shadow-[inset_0_1px_2px_rgb(15_45_74/0.06)]"
    >
      {tabs.map((tab, i) => {
        const selected = tab.id === value;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${tab.id}`}
            aria-selected={selected}
            aria-controls={`${idPrefix}-panel-${tab.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              "relative isolate min-h-11 rounded-full px-4 text-sm font-semibold whitespace-nowrap transition-colors sm:px-6",
              selected ? "text-white" : "text-gray-600 hover:text-brand-900",
            )}
          >
            {selected && (
              <m.span
                layoutId={`${idPrefix}-pill`}
                className={cn(
                  "absolute inset-0 -z-10 rounded-full shadow-card",
                  tab.id === "residents" ? "bg-accent-600" : "bg-gradient-primary",
                )}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
