import { m } from "motion/react";
import { featureDeepCopy, type FeatureModule } from "@/content/features";
import { ease } from "@/lib/motion";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const LINE_DURATION = 1.4;

/**
 * Animated workflow: numbered steps joined by a line that draws itself.
 * Vertical on mobile, horizontal from lg.
 */
export function ModuleWorkflow({ workflow }: { workflow: FeatureModule["workflow"] }) {
  const n = workflow.steps.length;
  const stepDelay = (i: number) => (n > 1 ? (i / (n - 1)) * LINE_DURATION : 0);

  return (
    <Section theme="night">
      <div className="absolute inset-0 bg-dot-grid-dark" aria-hidden="true" />
      <SectionHeader theme="dark" eyebrow={featureDeepCopy.workflowEyebrow} title={workflow.title} />
      <m.ol
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="relative mx-auto grid max-w-md gap-8 lg:max-w-none lg:grid-cols-[repeat(var(--steps),minmax(0,1fr))] lg:gap-4"
        style={{ "--steps": n } as React.CSSProperties}
      >
        {/* vertical track + line (mobile) */}
        <span aria-hidden="true" className="absolute top-6 bottom-6 left-6 w-0.5 -translate-x-1/2 rounded-full bg-white/10 lg:hidden" />
        <m.span
          aria-hidden="true"
          variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: LINE_DURATION, ease: ease.inOutQuart } } }}
          className="absolute top-6 bottom-6 left-6 w-0.5 origin-top -translate-x-1/2 rounded-full bg-linear-to-b from-brand-300 to-accent-500 lg:hidden"
        />
        {/* horizontal track + line (desktop) */}
        <span
          aria-hidden="true"
          className="absolute top-6 hidden h-0.5 -translate-y-1/2 rounded-full bg-white/10 lg:block"
          style={{ left: `calc(100% / ${n} / 2)`, right: `calc(100% / ${n} / 2)` }}
        />
        <m.span
          aria-hidden="true"
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: LINE_DURATION, ease: ease.inOutQuart } } }}
          className="absolute top-6 hidden h-0.5 origin-left -translate-y-1/2 rounded-full bg-linear-to-r from-brand-300 to-accent-500 lg:block"
          style={{ left: `calc(100% / ${n} / 2)`, right: `calc(100% / ${n} / 2)` }}
        />

        {workflow.steps.map((step, i) => (
          <li key={step} className="relative flex items-center gap-5 lg:flex-col lg:gap-5 lg:text-center">
            <m.span
              variants={{
                hidden: { scale: 0.4, opacity: 0 },
                show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 380, damping: 22, delay: stepDelay(i) } },
              }}
              className="relative z-[1] grid size-12 shrink-0 place-items-center rounded-full bg-white font-mono text-base font-medium text-brand-800 shadow-glow"
            >
              {String(i + 1).padStart(2, "0")}
            </m.span>
            <m.span
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: stepDelay(i) + 0.1, ease: ease.outExpo } },
              }}
              className="font-display text-h4 font-semibold text-white lg:max-w-[14ch]"
            >
              {step}
            </m.span>
          </li>
        ))}
      </m.ol>
    </Section>
  );
}
