import { m } from "motion/react";
import { forResidents } from "@/content/pages";
import { ease, fadeUp, stagger, viewport } from "@/lib/motion";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** Find → Pick bed → Get approved → Move in, joined by a dashed path. */
export function ResidentSteps() {
  return (
    <Section>
      <SectionHeader eyebrow={forResidents.stepsEyebrow} title={forResidents.stepsTitle} className="[&_p:first-child]:text-accent-600" />
      <m.ol
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        <span
          aria-hidden="true"
          className="absolute top-12 right-[12.5%] left-[12.5%] hidden border-t-2 border-dashed border-accent-500/30 lg:block"
        />
        {forResidents.steps.map((step, i) => (
          <m.li
            key={step.id}
            variants={fadeUp}
            className="relative flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-card"
          >
            <m.span
              variants={{
                hidden: { scale: 0.5, rotate: -12 },
                show: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 15 } },
              }}
              className="relative grid size-14 place-items-center rounded-2xl bg-accent-100 text-3xl ring-4 ring-white"
              aria-hidden="true"
            >
              {step.emoji}
            </m.span>
            <span className="mt-4 font-mono text-xs font-medium text-accent-600">
              {forResidents.stepLabel} {i + 1}
            </span>
            <h3 className="mt-1 text-h3 font-bold">{step.title}</h3>
            <p className="mt-2 text-[15px]">{step.body}</p>
          </m.li>
        ))}
      </m.ol>
      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewport}
        transition={{ duration: 0.6, delay: 0.5, ease: ease.outExpo }}
        className="mt-10 text-center text-sm font-medium text-gray-500"
      >
        📱 {forResidents.noDownload}
      </m.p>
    </Section>
  );
}
