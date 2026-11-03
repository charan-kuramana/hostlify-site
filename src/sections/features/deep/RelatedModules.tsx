import { m } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { featureDeepCopy, featureModules, type FeatureModule } from "@/content/features";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { Section } from "@/components/layout/Section";
import { IconTile } from "@/components/ui/IconTile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimatedIconHover, useIconHover } from "@/components/icons/AnimatedIcon";
import { cn } from "@/lib/cn";
import { toneFor } from "@/lib/iconTones";

function RelatedCard({ mod }: { mod: FeatureModule }) {
  const [hover, handlers] = useIconHover();
  return (
    <Link
      to={`/features/${mod.slug}`}
      {...handlers}
      className={cn(
        "group card-glow relative flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-card transition-[translate,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-tone/25 hover:shadow-lift lg:p-7",
        toneFor(mod.icon),
      )}
    >
      <AnimatedIconHover.Provider value={hover}>
        <IconTile name={mod.icon} animated />
      </AnimatedIconHover.Provider>
      <p className="mt-5 text-eyebrow font-semibold text-tone-deep uppercase">{mod.eyebrow}</p>
      <h3 className="mt-1.5 text-h3 font-bold">{mod.name}</h3>
      <p className="mt-2 flex-1">{mod.title}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-tone-deep">
        {featureDeepCopy.relatedCta}
        <span className="sr-only">{mod.name}</span>
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}

/** Cards linking to the other deep feature pages (internal linking for SEO). */
export function RelatedModules({ slugs }: { slugs: readonly string[] }) {
  const items: readonly FeatureModule[] = featureModules.filter((mod) => slugs.includes(mod.slug));
  if (items.length === 0) return null;

  return (
    <Section theme="tint">
      <SectionHeader eyebrow={featureDeepCopy.relatedEyebrow} title={featureDeepCopy.relatedTitle} />
      <m.ul
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2"
      >
        {items.map((mod) => (
          <m.li key={mod.slug} variants={fadeUp}>
            <RelatedCard mod={mod} />
          </m.li>
        ))}
      </m.ul>
    </Section>
  );
}
