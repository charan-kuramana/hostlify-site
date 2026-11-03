import { AnimatePresence, m } from "motion/react";
import { useState } from "react";
import { bento, occupancy } from "@/content/home";
import { bentoExtra } from "@/content/home-extra";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";
import { useInterval } from "@/hooks/useInterval";
import { Icon } from "@/components/icons/Icon";
import { BentoTile } from "./BentoTile";

const TOTAL = 12;
/** Beds that start free and get booked one by one, in this order (deterministic). */
const fillOrder = [5, 2, 10, 7] as const;
const roomOf = (i: number) => `2${String.fromCharCode(65 + Math.floor(i / 3))}-${(i % 3) + 1}`;

function BedsVisual({ active }: { active: boolean }) {
  // step = how many of the free beds have been booked; one extra step holds the "all full" state.
  const [step, setStep] = useState(0);
  useInterval(() => setStep((s) => (s >= fillOrder.length + 1 ? 0 : s + 1)), 1500, active);
  const booked = Math.min(step, fillOrder.length);
  const isOccupied = (i: number) => {
    const order = fillOrder.indexOf(i as (typeof fillOrder)[number]);
    return order === -1 || order < booked;
  };
  const occupiedCount = Array.from({ length: TOTAL }, (_, i) => i).filter(isOccupied).length;
  const justBooked = booked > 0 && step <= fillOrder.length ? fillOrder[booked - 1] : undefined;

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold text-brand-900">{bentoExtra.bedsPreview}</p>
        <div className="flex gap-3 text-[11px] text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-success-500" />
            {TOTAL - occupiedCount} {bentoExtra.available}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-brand-500" />
            {occupiedCount} {bentoExtra.occupied}
          </span>
        </div>
      </div>

      <div className="mt-4 grid flex-1 grid-cols-4 content-center gap-2.5 sm:grid-cols-6 sm:gap-3">
        {Array.from({ length: TOTAL }, (_, i) => {
          const occ = isOccupied(i);
          return (
            <m.div
              key={roomOf(i)}
              animate={{ scale: justBooked === i ? [1, 1.18, 1] : 1 }}
              transition={{ duration: 0.45 }}
              className={cn(
                "relative flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border transition-colors duration-500",
                occ ? "border-brand-500/30 bg-brand-500 text-white" : "border-success-500/50 bg-success-100 text-success-600",
              )}
            >
              <Icon name="BedDouble" className="size-4 sm:size-5" />
              <span className={cn("font-mono text-[9px]", occ ? "text-brand-100" : "text-success-600")}>{roomOf(i)}</span>
            </m.div>
          );
        })}
      </div>

      <div className="mt-4 h-11">
        <AnimatePresence mode="popLayout">
          {justBooked !== undefined && (
            <m.div
              key={justBooked}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={spring.bouncy}
              className="flex h-11 items-center gap-2.5 rounded-lg border border-gray-200 bg-white px-3 shadow-card"
            >
              <span className="grid size-6 place-items-center rounded-full bg-success-100 text-success-600">
                <Icon name="CircleCheck" className="size-3.5" />
              </span>
              <span className="truncate text-xs font-medium text-gray-700">{occupancy.approved(roomOf(justBooked))}</span>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function BedsTile({ className }: { className?: string }) {
  const t = bento.tiles.beds;
  return (
    <BentoTile
      title={t.title}
      body={t.body}
      href={t.href}
      icon="BedDouble"
      learnMore={bentoExtra.learnMore}
      className={className}
      visualClassName="min-h-[300px] lg:min-h-0"
    >
      {(active) => <BedsVisual active={active} />}
    </BentoTile>
  );
}
