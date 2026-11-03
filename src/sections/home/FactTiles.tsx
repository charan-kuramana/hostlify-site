import { m } from "motion/react";
import { facts } from "@/content/home";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { Section } from "@/components/layout/Section";
import { CountUp } from "@/components/motion/CountUp";
import { IconTile } from "@/components/ui/IconTile";
import { cn } from "@/lib/cn";
import { toneFor } from "@/lib/iconTones";

/** Each fact borrows the icon (and so the hue) of the module it describes. */
const factIcon: Record<string, string> = {
  booking: "BedDouble",
  roles: "UserCog",
  categories: "MessageSquareWarning",
  start: "IndianRupee",
};

type FactTilesProps = { theme?: "white" | "gray" | "tint" };

/** §9.11 fallback — "Built for the way hostels work" product facts (no invented usage stats). */
export function FactTiles({ theme = "white" }: FactTilesProps) {
  return (
    <Section id="facts" theme={theme} aria-labelledby="facts-title">
      <h2 id="facts-title" className="mx-auto mb-10 max-w-2xl text-center text-h3 font-bold md:mb-12">
        {facts.eyebrow}
      </h2>
      <m.ul
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
      >
        {facts.items.map((f) => {
          const icon = factIcon[f.id] ?? "CircleCheck";
          return (
            <m.li
              key={f.id}
              variants={fadeUp}
              className={cn(
                "group card-glow relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-card transition-[translate,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lift sm:p-6",
                toneFor(icon),
              )}
            >
              <span className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-tone to-tone-light" aria-hidden="true" />
              <span
                className="pointer-events-none absolute -top-10 -right-10 size-32 rounded-full bg-radial from-tone-soft to-transparent to-70%"
                aria-hidden="true"
              />
              <IconTile name={icon} size="sm" className="absolute top-5 right-5 hidden sm:grid" />
              <p className="relative font-display text-h1 font-bold text-brand-900">
                <CountUp value={f.value} prefix={f.prefix} suffix={f.suffix} className="text-gradient" />
              </p>
              <p className="relative mt-2 text-sm leading-snug text-gray-600 sm:text-base">{f.label}</p>
            </m.li>
          );
        })}
      </m.ul>
    </Section>
  );
}
