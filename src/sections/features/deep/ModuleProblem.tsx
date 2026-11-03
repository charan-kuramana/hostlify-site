import { m } from "motion/react";
import { X } from "lucide-react";
import { featureDeepCopy, type FeatureModule } from "@/content/features";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** "The problem" — the old way, as a list of pains. */
export function ModuleProblem({ problem }: { problem: FeatureModule["problem"] }) {
  return (
    <Section theme="gray">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
        <SectionHeader align="left" eyebrow={featureDeepCopy.problemEyebrow} title={problem.title} className="mb-0 md:mb-0" />
        <m.ul variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport} className="space-y-3">
          {problem.points.map((point) => (
            <m.li
              key={point}
              variants={fadeUp}
              className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-card"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-danger-100 text-danger-600">
                <X className="size-4" strokeWidth={2.5} aria-hidden="true" />
              </span>
              <span className="pt-1 text-[17px] text-gray-700">{point}</span>
            </m.li>
          ))}
        </m.ul>
      </div>
    </Section>
  );
}
