import { useInView } from "motion/react";
import { useRef } from "react";
import { howItWorksPage } from "@/content/pages";
import { Section } from "@/components/layout/Section";
import { PathCheck } from "@/components/motion/PathCheck";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** "What we need from you" — check marks draw in one after another. */
export function SetupChecklist() {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <Section theme="gray">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
        <SectionHeader
          align="left"
          eyebrow={howItWorksPage.checklistEyebrow}
          title={howItWorksPage.checklistTitle}
          lead={howItWorksPage.checklistLead}
          className="mb-0 md:mb-0"
        />
        <Reveal>
          <ul ref={ref} className="divide-y divide-gray-100 rounded-2xl border border-gray-200 bg-white p-2 shadow-float">
            {howItWorksPage.checklist.map((item, i) => (
              <li key={item} className="flex items-center gap-4 px-4 py-4">
                <PathCheck drawn={inView} delay={0.2 + i * 0.25} className="size-7 shrink-0 text-success-500" />
                <span className="text-[17px] text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
