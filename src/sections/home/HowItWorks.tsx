import { m, useInView } from "motion/react";
import { useId, useRef } from "react";
import { howItWorks } from "@/content/home";
import { ease, fadeUp, stagger, viewport } from "@/lib/motion";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimatedIcon, type AnimatedIconName } from "@/components/icons/AnimatedIcon";
import { CountUp } from "@/components/motion/CountUp";
import { cn } from "@/lib/cn";
import { toneClass, type Hue } from "@/lib/iconTones";

/** One hue per step so the journey reads as a progression: book → set up → launch. */
const stepHue: readonly Hue[] = ["brand", "violet", "orange"];

/** Content icon names → animated icon names. */
const iconMap: Record<string, AnimatedIconName> = {
  "calendar-check": "calendar-check",
  building: "building",
  rocket: "rocket",
};

/** Desktop: dashed connector that draws itself (pathLength via a mask, so the dashes stay crisp). */
function DesktopConnector({ drawn }: { drawn: boolean }) {
  const maskId = `hiw-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg
      className="pointer-events-none absolute top-8 right-[16.66%] left-[16.66%] hidden h-2 -translate-y-1/2 overflow-visible md:block"
      viewBox="0 0 100 2"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="-1" y="-4" width="102" height="10">
          <m.path
            d="M0 1 H100"
            stroke="white"
            strokeWidth="8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: drawn ? 1 : 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: ease.inOutQuart }}
          />
        </mask>
      </defs>
      <path
        d="M0 1 H100"
        className="stroke-brand-300"
        strokeWidth="2"
        strokeDasharray="6 8"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}

/** §9.10 — How it works: 3 steps, live in a day. */
export function HowItWorks() {
  const listRef = useRef<HTMLDivElement>(null);
  const drawn = useInView(listRef, { once: true, amount: 0.4 });

  return (
    <Section id="how-it-works" theme="gray" className="deco-blobs">
      <SectionHeader eyebrow={howItWorks.eyebrow} title={howItWorks.title} lead={howItWorks.lead} />
      <div ref={listRef} className="relative mx-auto max-w-xl md:max-w-none">
        <DesktopConnector drawn={drawn} />
        {/* Mobile: vertical timeline line */}
        <m.span
          className="absolute top-8 bottom-8 left-8 w-0 -translate-x-1/2 border-l-2 border-dashed border-brand-300 md:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: drawn ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
          transition={{ duration: 1.2, delay: 0.2, ease: ease.inOutQuart }}
          aria-hidden="true"
        />
        <m.ol
          variants={stagger(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="relative grid gap-10 md:grid-cols-3 md:gap-8"
        >
          {howItWorks.steps.map((step, i) => (
            <m.li
              key={step.id}
              variants={fadeUp}
              className={cn(
                "group relative grid grid-cols-[4rem_minmax(0,1fr)] gap-5 md:block md:text-center",
                toneClass[stepHue[i] ?? "brand"],
              )}
            >
              <div className="relative z-[1] mx-auto size-16 md:mb-6">
                <span className="grid size-16 place-items-center rounded-2xl tile-gloss transition-transform duration-300 ease-out group-hover:scale-106 group-hover:-rotate-4">
                  <AnimatedIcon name={iconMap[step.icon] ?? "check-circle"} trigger="inView" size={28} />
                </span>
                <span className="absolute -top-2 -right-2 grid h-6 min-w-6 place-items-center rounded-full bg-tone-deep px-1.5 font-mono text-[11px] font-medium text-white shadow-card ring-2 ring-white">
                  <CountUp value={i + 1} prefix="0" duration={0.8} />
                </span>
              </div>
              <div className="pt-1 md:pt-0">
                <h3 className="text-h3 font-bold">{step.title}</h3>
                <p className="mt-2 max-w-[38ch] md:mx-auto">{step.body}</p>
              </div>
            </m.li>
          ))}
        </m.ol>
      </div>
      <m.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className="mt-12 flex justify-center">
        <Button href={howItWorks.cta.href} variant="outline" arrow>
          {howItWorks.cta.label}
        </Button>
      </m.div>
    </Section>
  );
}
