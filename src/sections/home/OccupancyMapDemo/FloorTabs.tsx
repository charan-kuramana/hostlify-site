import { m } from "motion/react";
import { useRef } from "react";
import type { DemoFloor } from "@/content/demo-data";
import { occupancy } from "@/content/home";
import { occupancyExtra } from "@/content/home-extra";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";

type FloorTabsProps = { floors: readonly DemoFloor[]; value: string; onChange: (id: string) => void; idPrefix: string };

export const tabId = (prefix: string, id: string) => `${prefix}-tab-${id}`;
export const panelId = (prefix: string) => `${prefix}-panel`;

/** Floor tablist: arrow keys move between floors; swipeable with snap points on small screens. */
export function FloorTabs({ floors, value, onChange, idPrefix }: FloorTabsProps) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = floors.findIndex((f) => f.id === value);
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % floors.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + floors.length) % floors.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = floors.length - 1;
    const target = floors[next];
    if (!target) return;
    e.preventDefault();
    onChange(target.id);
    refs.current[target.id]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={occupancy.floorsLabel}
      className="-mx-4 flex snap-x snap-mandatory scroll-px-4 [scrollbar-width:none] gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
    >
      {floors.map((floor) => {
        const active = floor.id === value;
        const free = floor.rooms.reduce((n, r) => n + r.beds.filter((b) => b.status === "available").length, 0);
        return (
          <button
            key={floor.id}
            ref={(el) => {
              refs.current[floor.id] = el;
            }}
            id={tabId(idPrefix, floor.id)}
            type="button"
            role="tab"
            aria-selected={active}
            aria-controls={panelId(idPrefix)}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(floor.id)}
            onKeyDown={onKeyDown}
            className={cn(
              "relative flex min-h-11 shrink-0 snap-start items-center gap-2 rounded-full px-4 text-sm font-semibold whitespace-nowrap transition-colors duration-200 focus-visible:outline-white",
              active ? "text-brand-900" : "text-brand-100/80 ring-1 ring-white/15 hover:bg-white/10 hover:text-white",
            )}
          >
            {active && (
              <m.span
                layoutId="occupancy-floor-pill"
                className="absolute inset-0 rounded-full bg-white shadow-glow"
                transition={spring.snappy}
                aria-hidden="true"
              />
            )}
            <span className="relative">
              {floor.label} {occupancyExtra.floorWord}
            </span>
            <span
              className={cn(
                "relative rounded-full px-1.5 py-0.5 font-mono text-[10px] leading-none",
                active ? "bg-success-100 text-success-600" : "bg-white/10 text-success-100",
              )}
              aria-hidden="true"
            >
              {free}
            </span>
          </button>
        );
      })}
    </div>
  );
}
