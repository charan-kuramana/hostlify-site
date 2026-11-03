import { m } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { bento } from "@/content/home";
import { bentoExtra } from "@/content/home-extra";
import { fadeUp, stagger } from "@/lib/motion";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/icons/Icon";
import { cn } from "@/lib/cn";
import { toneFor } from "@/lib/iconTones";
import { BedsTile } from "./BedsTile";
import { RentTile } from "./RentTile";
import { ComplaintsTile } from "./ComplaintsTile";
import { MenuTile } from "./MenuTile";
import { ProfitTile } from "./ProfitTile";
import { StaffTile } from "./StaffTile";

/** §9.5 — 12-column asymmetric bento with live mini-UIs. */
export function FeatureBento() {
  return (
    <Section theme="white" aria-labelledby="bento-title" className="deco-blobs">
      <SectionHeader eyebrow={bento.eyebrow} title={<span id="bento-title">{bento.title}</span>} lead={bento.lead} />

      <m.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5"
      >
        <BedsTile className="md:col-span-2 lg:col-span-7 lg:row-span-2" />
        <RentTile className="lg:col-span-5" />
        <ComplaintsTile className="lg:col-span-5" />
        <MenuTile className="lg:col-span-4" />
        <ProfitTile className="lg:col-span-4" />
        <StaffTile className="md:col-span-2 lg:col-span-4" />
      </m.div>

      <m.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} className="mt-10 text-center">
        <p className="text-sm font-semibold text-gray-500">{bentoExtra.chipsLabel}</p>
        <ul className="mt-4 flex flex-wrap justify-center gap-2">
          {bento.chips.map((chip) => (
            <li key={chip.label}>
              <Link
                to={bentoExtra.allFeatures.href}
                className={cn(
                  "group inline-flex min-h-11 items-center gap-2 rounded-full border border-gray-200 bg-white py-1 pr-4 pl-1.5 text-sm font-medium text-gray-700 shadow-card transition-[translate,box-shadow,border-color,color] duration-200 hover:-translate-y-0.5 hover:border-tone/30 hover:text-tone-deep hover:shadow-lift",
                  toneFor(chip.icon),
                )}
              >
                <span
                  className="grid size-7 place-items-center rounded-full tile-gloss transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6"
                  aria-hidden="true"
                >
                  <Icon name={chip.icon} className="size-3.5" />
                </span>
                {chip.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to={bentoExtra.allFeatures.href}
          className="group mt-6 inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 font-semibold text-brand-600 hover:text-brand-700"
        >
          {bentoExtra.allFeatures.label}
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </m.div>
    </Section>
  );
}
