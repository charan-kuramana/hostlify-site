import { AnimatePresence, m, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { ChevronsLeftRight } from "lucide-react";
import { useRef, useState } from "react";
import { beforeAfter } from "@/content/home";
import { beforeAfterExtra } from "@/content/home-extra";
import { cn } from "@/lib/cn";
import { ease, spring } from "@/lib/motion";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PathCheck } from "@/components/motion/PathCheck";
import { Reveal } from "@/components/motion/Reveal";

const rows = beforeAfter.rows;
// Messy collage: each "before" note sits a little crooked and off-line (deterministic).
const tilt = [
  "-rotate-[1.6deg] translate-x-2",
  "rotate-[1.2deg] -translate-x-1",
  "-rotate-[0.6deg] translate-x-3",
  "rotate-[1.8deg] translate-x-0",
  "-rotate-[1.1deg] translate-x-3",
] as const;

/** Splits a leading emoji from the copy so it can be styled separately. */
function split(text: string) {
  const i = text.indexOf(" ");
  return i > 0 ? { emoji: text.slice(0, i), label: text.slice(i + 1) } : { emoji: "", label: text };
}

function BeforeRow({ text, index }: { text: string; index: number }) {
  const { emoji, label } = split(text);
  return (
    <div
      className={cn(
        "flex min-h-16 items-center gap-3 rounded-lg border border-dashed border-gray-300 bg-white/70 px-4 py-3 text-gray-500 shadow-card grayscale",
        tilt[index % tilt.length],
      )}
    >
      <span className="text-xl opacity-70" aria-hidden="true">
        {emoji}
      </span>
      <span className="text-[15px] font-medium">{label}</span>
    </div>
  );
}

function AfterRow({ text, drawn, delay = 0 }: { text: string; drawn: boolean; delay?: number }) {
  const { emoji, label } = split(text);
  return (
    <div className="flex min-h-16 items-center gap-3 rounded-lg border border-brand-100 bg-white px-4 py-3 shadow-card">
      <PathCheck drawn={drawn} delay={delay} className="size-6 shrink-0 text-success-500" />
      <span className="text-xl" aria-hidden="true">
        {emoji}
      </span>
      <span className="text-[15px] font-semibold text-brand-900">{label}</span>
    </div>
  );
}

function PanelLabel({ children, tone }: { children: React.ReactNode; tone: "before" | "after" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase",
        tone === "before" ? "bg-gray-200 text-gray-600" : "bg-brand-100 text-brand-700",
      )}
    >
      <span className={cn("size-1.5 rounded-full", tone === "before" ? "bg-gray-400" : "bg-success-500")} aria-hidden="true" />
      {children}
    </span>
  );
}

/** Desktop: the "With" layer is revealed over the "Without" layer by scroll (clip-path driven by a motion value). */
function ScrollSlider() {
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start 0.75", "end 0.35"] });
  const clipPath = useTransform(scrollYProgress, (p) => `inset(0 ${(1 - p) * 100}% 0 0)`);
  const dividerX = useTransform(scrollYProgress, (p) => `${p * 100}%`);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Only re-render when the number of drawn checks changes — not every frame.
  const [drawnCount, setDrawnCount] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = rows.filter((_, i) => p >= 0.12 + i * 0.12).length;
    setDrawnCount((prev) => (prev === next ? prev : next));
  });

  return (
    <div
      ref={stageRef}
      className="relative mx-auto hidden max-w-4xl overflow-hidden rounded-2xl border border-gray-200 shadow-float lg:block"
    >
      {/* Before (base layer) */}
      <div className="bg-gray-100 p-8">
        <div className="mb-6 flex justify-end">
          <PanelLabel tone="before">{beforeAfter.without}</PanelLabel>
        </div>
        <ul className="space-y-4">
          {rows.map((row, i) => (
            <li key={row.id}>
              <BeforeRow text={row.before} index={i} />
            </li>
          ))}
        </ul>
      </div>

      {/* After (revealed layer) */}
      <m.div style={{ clipPath }} className="absolute inset-0 bg-linear-to-br from-brand-50 via-white to-brand-50 p-8">
        <div className="pointer-events-none absolute inset-0 bg-dot-grid" aria-hidden="true" />
        <div className="relative mb-6 flex justify-start">
          <PanelLabel tone="after">{beforeAfter.with}</PanelLabel>
        </div>
        <ul className="relative space-y-4">
          {rows.map((row, i) => (
            <li key={row.id}>
              <AfterRow text={row.after} drawn={i < drawnCount} />
            </li>
          ))}
        </ul>
      </m.div>

      {/* Divider */}
      <m.div style={{ x: dividerX }} className="pointer-events-none absolute inset-y-0 left-0 w-full" aria-hidden="true">
        <div className="absolute inset-y-0 left-0 w-0.5 -translate-x-1/2 bg-linear-to-b from-brand-400/0 via-brand-500 to-brand-400/0" />
        <div className="absolute top-1/2 left-0 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-brand-600 shadow-glow">
          <ChevronsLeftRight className="size-5" />
        </div>
      </m.div>

      <m.p
        style={{ opacity: hintOpacity }}
        className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-500"
        aria-hidden="true"
      >
        {beforeAfterExtra.sliderHint}
      </m.p>
    </div>
  );
}

/** Mobile/tablet: a Before / After segmented toggle. */
function ToggleCompare() {
  const [mode, setMode] = useState<"before" | "after">("after");
  const options = [
    { id: "before", label: beforeAfter.before },
    { id: "after", label: beforeAfter.after },
  ] as const;

  return (
    <div className="mx-auto max-w-xl lg:hidden">
      <div
        role="group"
        aria-label={beforeAfterExtra.toggleLabel}
        className="mx-auto flex w-full max-w-xs rounded-full border border-gray-200 bg-white p-1 shadow-card"
      >
        {options.map((o) => {
          const active = mode === o.id;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={active}
              onClick={() => setMode(o.id)}
              className={cn(
                "relative min-h-11 flex-1 rounded-full text-sm font-semibold transition-colors",
                active ? "text-white" : "text-gray-600 hover:text-brand-700",
              )}
            >
              {active && (
                <m.span
                  layoutId="before-after-pill"
                  className={cn("absolute inset-0 rounded-full", o.id === "after" ? "bg-gradient-primary" : "bg-gray-500")}
                  transition={spring.snappy}
                  aria-hidden="true"
                />
              )}
              <span className="relative">{o.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={mode}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: ease.outExpo } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            className={cn(
              "rounded-2xl border p-4 shadow-card sm:p-6",
              mode === "before" ? "border-gray-200 bg-gray-100" : "border-brand-100 bg-white",
            )}
          >
            <div className={cn("mb-4 flex", mode === "before" ? "justify-end" : "justify-start")}>
              <PanelLabel tone={mode}>{mode === "before" ? beforeAfter.without : beforeAfter.with}</PanelLabel>
            </div>
            <ul className="space-y-3">
              {rows.map((row, i) => (
                <li key={row.id}>
                  {mode === "before" ? (
                    <BeforeRow text={row.before} index={i} />
                  ) : (
                    <AfterRow text={row.after} drawn delay={0.15 + i * 0.1} />
                  )}
                </li>
              ))}
            </ul>
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function BeforeAfter() {
  return (
    <Section theme="gray" aria-labelledby="before-after-title">
      <SectionHeader
        eyebrow={beforeAfter.eyebrow}
        title={<span id="before-after-title">{beforeAfter.title}</span>}
        lead={beforeAfter.lead}
      />
      <Reveal>
        <ScrollSlider />
        <ToggleCompare />
      </Reveal>
    </Section>
  );
}
