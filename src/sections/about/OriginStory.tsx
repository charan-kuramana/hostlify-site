import { m } from "motion/react";
import { about } from "@/content/pages";
import { cn } from "@/lib/cn";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** Why we built Hostlify — sticky heading beside the story on desktop. */
export function OriginStory() {
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div>
          <div className="lg:sticky lg:top-28">
            <Eyebrow>{about.storyEyebrow}</Eyebrow>
            <h2 className="mt-3 text-h2 font-bold">{about.storyTitle}</h2>
            <span aria-hidden="true" className="mt-6 block h-1 w-16 rounded-full bg-gradient-primary" />
          </div>
        </div>
        <m.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={viewport} className="max-w-[65ch] space-y-6">
          {about.story.map((para, i) => (
            <m.p
              key={para}
              variants={fadeUp}
              className={cn(i === 0 ? "font-display text-h3 font-medium text-brand-900" : "text-lead text-gray-600")}
            >
              {para}
            </m.p>
          ))}
        </m.div>
      </div>
    </Section>
  );
}
