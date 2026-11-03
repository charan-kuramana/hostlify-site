import { m } from "motion/react";
import { demoFloors } from "@/content/demo-data";
import { forResidents } from "@/content/pages";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { PhoneFrame } from "@/components/mockups/PhoneFrame";

const copy = forResidents.phone;
const floor = demoFloors[1] ?? demoFloors[0];
const SELECTED = "1C-2";
const chipPos = ["-left-4 top-16 sm:-left-16", "-right-4 top-1/2 sm:-right-14", "-left-2 bottom-16 sm:-left-12"] as const;

/** Playful phone with a live-coded bed picker and floating emoji chips (decorative). */
export function ResidentPhone() {
  const beds = floor?.rooms.slice(0, 6).flatMap((r) => r.beds.map((b) => ({ ...b, room: r.number }))) ?? [];
  return (
    <div aria-hidden="true" className="relative mx-auto w-fit py-6">
      <div className="absolute inset-6 -z-10 rounded-full bg-accent-500/15 blur-3xl" />
      <PhoneFrame className="w-[250px] sm:w-[270px]">
        <div className="flex h-full flex-col bg-linear-to-b from-accent-100/60 to-white px-4 pt-10 pb-4">
          <p className="text-[11px] font-medium text-gray-500">{copy.greeting}</p>
          <p className="mt-0.5 font-display text-lg font-bold text-brand-900">{copy.title}</p>
          <span className="mt-3 w-fit rounded-full bg-brand-900 px-2.5 py-1 text-[10px] font-semibold text-white">{copy.floor}</span>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {beds.map((bed, i) => {
              const mine = bed.id === SELECTED;
              const free = bed.status === "available";
              return (
                <m.span
                  key={bed.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: 0.5 + i * 0.03, ease: ease.outExpo }}
                  className={cn(
                    "relative grid aspect-square place-items-center rounded-lg text-[11px]",
                    mine ? "bg-accent-600 text-white shadow-lift" : free ? "bg-white ring-1 ring-success-500" : "bg-gray-200/80",
                  )}
                >
                  {mine && "🛏️"}
                  {mine && <span className="absolute inset-0 rounded-lg ring-2 ring-accent-500 motion-safe:animate-pulse-ring" />}
                </m.span>
              );
            })}
          </div>
          <div className="mt-3 flex gap-3 text-[10px] text-gray-500">
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-sm bg-white ring-1 ring-success-500" />
              {copy.free}
            </span>
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-sm bg-gray-200" />
              {copy.taken}
            </span>
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-sm bg-accent-600" />
              {copy.yours}
            </span>
          </div>
          <div className="mt-auto rounded-xl border border-gray-200 bg-white p-3 shadow-card">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-brand-900">{copy.selected}</span>
              <span className="font-mono text-gray-600">{copy.price}</span>
            </div>
            <span className="mt-2.5 flex h-9 items-center justify-center rounded-lg bg-accent-600 text-xs font-semibold text-white">
              {copy.cta}
            </span>
          </div>
        </div>
      </PhoneFrame>
      {forResidents.floatingChips.map((chip, i) => (
        <m.span
          key={chip.id}
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.9 + i * 0.2, ease: ease.outExpo }}
          className={cn("absolute z-10", chipPos[i % chipPos.length])}
        >
          <span
            className="flex items-center gap-2 rounded-full border border-gray-200 bg-white/95 py-1.5 pr-3.5 pl-1.5 text-xs font-semibold whitespace-nowrap text-brand-900 shadow-lift backdrop-blur motion-safe:animate-float"
            style={{ animationDelay: `${i * -2}s` }}
          >
            <span className="grid size-7 place-items-center rounded-full bg-accent-100 text-sm">{chip.emoji}</span>
            {chip.label}
          </span>
        </m.span>
      ))}
    </div>
  );
}
