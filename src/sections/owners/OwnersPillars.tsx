import { m } from "motion/react";
import { forOwners } from "@/content/pages";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/IconTile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";
import { hueFor, toneClass, type Hue } from "@/lib/iconTones";

/** Pillar hues: icon hue, except "Know your numbers" reads as reports (violet) so it does not repeat the rent pillar. */
const pillarHue: Partial<Record<string, Hue>> = { numbers: "violet" };

/** The three value pillars. */
export function OwnersPillars() {
  return (
    <Section className="deco-blobs">
      <SectionHeader eyebrow={forOwners.pillarsEyebrow} title={forOwners.pillarsTitle} />
      <m.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport} className="grid gap-5 md:grid-cols-3">
        {forOwners.pillars.map((p, i) => {
          const hue = pillarHue[p.id] ?? hueFor(p.icon);
          return (
            <m.div key={p.id} variants={fadeUp}>
              <Card variant="interactive" className={cn("h-full overflow-hidden p-7 lg:p-8", toneClass[hue])}>
                <span
                  aria-hidden="true"
                  className="absolute top-4 right-6 font-mono text-6xl font-medium text-tone-soft transition-colors duration-300 group-hover:text-tone-light/50"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <IconTile name={p.icon} hue={hue} variant="solid" size="lg" animated className="relative" />
                <h3 className="relative mt-6 text-h3 font-bold">{p.title}</h3>
                <p className="relative mt-2">{p.body}</p>
              </Card>
            </m.div>
          );
        })}
      </m.div>
    </Section>
  );
}
