import { m } from "motion/react";
import { demoPage } from "@/content/pages";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { Section } from "@/components/layout/Section";
import { IconTile } from "@/components/ui/IconTile";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** What happens after you submit the form. */
export function DemoExpect() {
  return (
    <Section>
      <SectionHeader title={demoPage.expectTitle} />
      <m.ol variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport} className="grid gap-5 md:grid-cols-3">
        {demoPage.expect.map((item, i) => (
          <m.li key={item.id} variants={fadeUp} className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-card lg:p-7">
            <span aria-hidden="true" className="absolute top-5 right-6 font-mono text-sm text-gray-400">
              {String(i + 1).padStart(2, "0")}
            </span>
            <IconTile name={item.icon} />
            <h3 className="mt-5 text-h4 font-bold">{item.title}</h3>
            <p className="mt-2 text-[15px]">{item.body}</p>
          </m.li>
        ))}
      </m.ol>
    </Section>
  );
}
