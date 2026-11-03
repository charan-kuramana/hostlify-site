import { m } from "motion/react";
import { Check } from "lucide-react";
import { forResidents } from "@/content/pages";
import { cn } from "@/lib/cn";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { MoveInIllustration } from "@/components/illustrations/MoveInIllustration";

const tints = ["from-accent-100 to-white", "from-brand-100 to-white", "from-success-100 to-white"] as const;

/** Pay rent · Raise complaints · Everything else. */
export function ResidentBlocks() {
  return (
    <Section theme="gray">
      <div className="mb-12 grid items-center gap-8 md:mb-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
        <SectionHeader
          eyebrow={forResidents.blocksEyebrow}
          title={forResidents.blocksTitle}
          className="mb-0 md:mb-0 lg:mx-0 lg:text-left [&_p:first-child]:text-accent-600"
        />
        <Reveal className="mx-auto w-full max-w-[460px]">
          <MoveInIllustration title={forResidents.blocksIllustration} />
        </Reveal>
      </div>
      <m.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ ...viewport, amount: 0.15 }}
        className="grid gap-5 lg:grid-cols-3"
      >
        {forResidents.blocks.map((block, i) => (
          <m.article
            key={block.id}
            variants={fadeUp}
            className={cn(
              "group flex flex-col rounded-2xl border border-gray-200 bg-linear-to-b p-7 shadow-card transition-transform duration-300 hover:-translate-y-1",
              tints[i % tints.length],
            )}
          >
            <span
              aria-hidden="true"
              className="grid size-16 place-items-center rounded-2xl bg-white text-4xl shadow-card transition-transform duration-300 group-hover:-rotate-6"
            >
              {block.emoji}
            </span>
            <h3 className="mt-6 text-h3 font-bold">{block.title}</h3>
            <p className="mt-2">{block.body}</p>
            <ul className="mt-5 space-y-2 border-t border-gray-200/70 pt-5">
              {block.points.map((pt) => (
                <li key={pt} className="flex gap-2.5 text-[15px] text-gray-700">
                  <Check className="mt-1 size-4 shrink-0 text-accent-600" strokeWidth={2.5} aria-hidden="true" />
                  {pt}
                </li>
              ))}
            </ul>
          </m.article>
        ))}
      </m.div>
    </Section>
  );
}
