import { m } from "motion/react";
import { featureDeepCopy, type FeatureModule } from "@/content/features";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/IconTile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";
import { toneFor } from "@/lib/iconTones";

/** 3–4 capability blocks in a 2-column grid. */
export function ModuleCapabilities({ capabilities }: { capabilities: FeatureModule["capabilities"] }) {
  return (
    <Section className="deco-blobs">
      <SectionHeader eyebrow={featureDeepCopy.capabilitiesEyebrow} title={featureDeepCopy.capabilitiesTitle} />
      <m.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ ...viewport, amount: 0.15 }}
        className="grid gap-5 md:grid-cols-2"
      >
        {capabilities.map((cap) => (
          <m.div key={cap.title} variants={fadeUp} className="h-full">
            <Card variant="interactive" className={cn("h-full p-7 lg:p-8", toneFor(cap.icon))}>
              <IconTile name={cap.icon} variant="solid" size="lg" animated />
              <h3 className="mt-6 text-h3 font-bold">{cap.title}</h3>
              <p className="mt-2 max-w-[48ch]">{cap.body}</p>
            </Card>
          </m.div>
        ))}
      </m.div>
    </Section>
  );
}
