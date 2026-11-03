import { useHydrated } from "@/hooks/useHydrated";
import { m } from "motion/react";
import { bento } from "@/content/home";
import { bentoExtra } from "@/content/home-extra";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { BentoTile } from "./BentoTile";

function MenuVisual({ active }: { active: boolean }) {
  const t = bento.tiles.menu;
  // Deterministic for pre-render (Wed), then switch to the visitor's real weekday after hydration.
  const hydrated = useHydrated();
  const today = hydrated ? (new Date().getDay() + 6) % 7 : 2;

  return (
    <div className="flex flex-1 flex-col">
      <div className="grid grid-cols-7 gap-1">
        {t.days.map((day, i) => {
          const isToday = i === today;
          return (
            <span
              key={day}
              className={cn(
                "relative grid h-8 place-items-center rounded-md text-[10px] font-semibold sm:text-[11px]",
                isToday ? "bg-gradient-primary text-white shadow-card" : "bg-white text-gray-500 ring-1 ring-gray-200",
              )}
            >
              {isToday && active && <span className="absolute inset-0 rounded-md bg-brand-400/40 motion-safe:animate-pulse-ring" />}
              <span className="relative">{day}</span>
            </span>
          );
        })}
      </div>
      <p className="mt-3 text-[11px] font-semibold tracking-wide text-brand-600 uppercase">{bentoExtra.today}</p>
      <ul className="mt-1.5 space-y-1.5">
        {t.today.map((meal, i) => (
          <m.li
            key={meal.meal}
            initial={false}
            animate={{ opacity: active ? 1 : 0.85, x: active ? 0 : -4 }}
            transition={{ duration: 0.5, delay: active ? 0.1 + i * 0.08 : 0, ease: ease.outExpo }}
            className="flex items-baseline justify-between gap-3 rounded-md bg-white px-2.5 py-1.5 ring-1 ring-gray-100"
          >
            <span className="text-[11px] font-semibold text-gray-500">{meal.meal}</span>
            <span className="truncate text-xs font-medium text-brand-900">{meal.dish}</span>
          </m.li>
        ))}
      </ul>
    </div>
  );
}

export function MenuTile({ className }: { className?: string }) {
  const t = bento.tiles.menu;
  return (
    <BentoTile
      title={t.title}
      body={t.body}
      href={t.href}
      icon="UtensilsCrossed"
      learnMore={bentoExtra.learnMore}
      className={className}
      visualClassName="min-h-[170px]"
    >
      {(active) => <MenuVisual active={active} />}
    </BentoTile>
  );
}
