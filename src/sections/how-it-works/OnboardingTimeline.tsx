import { m, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { howItWorksPage } from "@/content/pages";
import { ease } from "@/lib/motion";
import { Section } from "@/components/layout/Section";
import { Icon } from "@/components/icons/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** Vertical onboarding timeline; the connecting line draws as you scroll. */
export function OnboardingTimeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  return (
    <Section>
      <SectionHeader reveal={false} eyebrow={howItWorksPage.timelineEyebrow} title={howItWorksPage.timelineTitle} />
      <ol ref={listRef} className="relative mx-auto max-w-3xl space-y-6 md:space-y-8">
        <span aria-hidden="true" className="absolute top-7 bottom-7 left-7 w-0.5 -translate-x-1/2 rounded-full bg-gray-200" />
        <m.span
          aria-hidden="true"
          style={{ scaleY }}
          className="absolute top-7 bottom-7 left-7 w-0.5 origin-top -translate-x-1/2 rounded-full bg-linear-to-b from-brand-500 via-brand-400 to-accent-500"
        />
        {howItWorksPage.timeline.map((step, i) => (
          <m.li
            key={step.id}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="relative flex gap-5 sm:gap-7"
          >
            <m.span
              variants={{
                hidden: { scale: 0.7, opacity: 0.4 },
                show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 320, damping: 20 } },
              }}
              className="relative z-[1] grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-primary text-white shadow-lift ring-4 ring-white"
            >
              <Icon name={step.icon} className="size-6" />
            </m.span>
            <m.div
              variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: ease.outExpo } } }}
              className="min-w-0 flex-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-card transition-shadow hover:shadow-lift"
            >
              <p className="font-mono text-xs font-medium text-brand-600">
                {howItWorksPage.stepLabel} {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1 text-h3 font-bold">{step.title}</h3>
              <p className="mt-2">{step.body}</p>
            </m.div>
          </m.li>
        ))}
      </ol>
    </Section>
  );
}
