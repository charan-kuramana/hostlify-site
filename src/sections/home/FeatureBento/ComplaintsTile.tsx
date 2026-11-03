import { m } from "motion/react";
import { useState } from "react";
import { bento } from "@/content/home";
import { bentoExtra } from "@/content/home-extra";
import { cn } from "@/lib/cn";
import { ease, spring } from "@/lib/motion";
import { useInterval } from "@/hooks/useInterval";
import { Icon } from "@/components/icons/Icon";
import { BentoTile } from "./BentoTile";

const stateTone = [
  { pill: "bg-danger-100", text: "text-danger-600", bar: "bg-danger-500" },
  { pill: "bg-warning-100", text: "text-warning-600", bar: "bg-warning-500" },
  { pill: "bg-success-100", text: "text-success-600", bar: "bg-success-500" },
] as const;

function ComplaintsVisual({ active }: { active: boolean }) {
  const t = bento.tiles.complaints;
  const last = t.states.length - 1;
  // Static end state is "Resolved"; while visible it cycles Open → In Progress → Resolved.
  const [index, setIndex] = useState(last);
  useInterval(() => setIndex((i) => (i >= last ? 0 : i + 1)), 1600, active);
  const tone = stateTone[index] ?? stateTone[0];

  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-card">
        <div className="flex items-start gap-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent-100 text-accent-600">
            <Icon name="Wrench" className="size-4" />
          </span>
          <p className="min-w-0 text-[13px] leading-snug font-semibold text-brand-900">{t.ticket}</p>
        </div>
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {t.states.map((s, i) => {
            const on = i === index;
            return (
              <span
                key={s}
                className={cn(
                  "relative rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors duration-300",
                  on ? tone.text : "text-gray-400",
                )}
              >
                {on && (
                  <m.span
                    layoutId="complaint-state"
                    className={cn("absolute inset-0 rounded-full", tone.pill)}
                    transition={spring.snappy}
                  />
                )}
                <span className="relative">{s}</span>
              </span>
            );
          })}
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-100">
          <m.div
            className={cn("h-full origin-left rounded-full", tone.bar)}
            initial={false}
            animate={{ scaleX: (index + 1) / t.states.length }}
            transition={{ duration: 0.6, ease: ease.outExpo }}
          />
        </div>
      </div>
    </div>
  );
}

export function ComplaintsTile({ className }: { className?: string }) {
  const t = bento.tiles.complaints;
  return (
    <BentoTile
      title={t.title}
      body={t.body}
      href={t.href}
      icon="MessageSquareWarning"
      learnMore={bentoExtra.learnMore}
      className={className}
      visualClassName="min-h-[150px]"
    >
      {(active) => <ComplaintsVisual active={active} />}
    </BentoTile>
  );
}
