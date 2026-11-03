import { m } from "motion/react";
import { X } from "lucide-react";
import { forOwners } from "@/content/pages";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { OwnerPhoneIllustration } from "@/components/illustrations/OwnerPhoneIllustration";

/** The month-end pains the owner recognises — beside the calmer, phone-first alternative. */
export function OwnersPains() {
  return (
    <Section theme="gray">
      <SectionHeader eyebrow={forOwners.painsEyebrow} title={forOwners.painsTitle} />
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
        <m.ul variants={stagger(0.09)} initial="hidden" whileInView="show" viewport={viewport} className="grid gap-3 md:gap-4">
          {forOwners.pains.map((pain) => (
            <m.li
              key={pain}
              variants={fadeUp}
              className="flex items-start gap-3.5 rounded-xl border border-gray-200 bg-white p-5 shadow-card"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-danger-100 text-danger-600">
                <X className="size-4" strokeWidth={2.5} aria-hidden="true" />
              </span>
              <span className="pt-1 text-gray-700">{pain}</span>
            </m.li>
          ))}
        </m.ul>
        <Reveal delay={0.1} className="mx-auto w-full max-w-[520px]">
          <OwnerPhoneIllustration title={forOwners.painsIllustration} />
        </Reveal>
      </div>
    </Section>
  );
}
