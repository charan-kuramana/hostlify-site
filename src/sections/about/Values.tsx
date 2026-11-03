import { m } from "motion/react";
import { about } from "@/content/pages";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/IconTile";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** What we believe — values grid. */
export function Values() {
  return (
    <Section theme="gray">
      <SectionHeader eyebrow={about.valuesEyebrow} title={about.valuesTitle} />
      <m.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {about.values.map((v) => (
          <m.div key={v.id} variants={fadeUp}>
            <Card variant="interactive" className="h-full p-6 lg:p-7">
              <IconTile name={v.icon} tone="solid" />
              <h3 className="mt-5 text-h4 font-bold">{v.title}</h3>
              <p className="mt-2 text-[15px]">{v.body}</p>
            </Card>
          </m.div>
        ))}
      </m.div>
    </Section>
  );
}
