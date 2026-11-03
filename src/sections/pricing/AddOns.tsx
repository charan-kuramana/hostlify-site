import { m } from "motion/react";
import { Plus } from "lucide-react";
import { addOns } from "@/content/plans";
import { pricingPage } from "@/content/pages";
import { cn } from "@/lib/cn";
import { toneFor } from "@/lib/iconTones";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IconTile } from "@/components/ui/IconTile";
import { AnimatedIconHover, useIconHover } from "@/components/icons/AnimatedIcon";

/** Add-on label → module icon (and so its sitewide hue). Unknown labels fall back to a "+" tile. */
const addOnIcon: Record<string, string> = {
  "Online payments": "IndianRupee",
  "Referral program": "Gift",
  Parking: "Car",
  "Cleaning requests": "Sparkles",
  "Weekly menu": "UtensilsCrossed",
  "Hostel reviews": "Star",
};

function AddOnItem({ item }: { item: string }) {
  const icon = addOnIcon[item];
  const [hover, handlers] = useIconHover();
  return (
    <m.li
      variants={fadeUp}
      {...handlers}
      className={cn(
        "group card-glow relative flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-card transition-[translate,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-tone/25 hover:shadow-lift",
        icon && toneFor(icon),
      )}
    >
      {icon ? (
        <AnimatedIconHover.Provider value={hover}>
          <IconTile name={icon} size="sm" animated />
        </AnimatedIconHover.Provider>
      ) : (
        <span className="grid size-9 shrink-0 place-items-center rounded-lg tile-gloss" aria-hidden="true">
          <Plus className="size-4" strokeWidth={2.5} />
        </span>
      )}
      <span className="font-medium text-brand-900">{item}</span>
      <Plus
        className="ml-auto size-4 text-gray-300 transition-[color,rotate] duration-300 group-hover:rotate-90 group-hover:text-tone-deep"
        strokeWidth={2.25}
        aria-hidden="true"
      />
    </m.li>
  );
}

/** Modules switched on per hostel. */
export function AddOns() {
  return (
    <Section className="deco-blobs">
      <SectionHeader eyebrow={pricingPage.addOnsEyebrow} title={addOns.title} lead={addOns.lead} />
      <m.ul
        variants={stagger(0.06)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {addOns.items.map((item) => (
          <AddOnItem key={item} item={item} />
        ))}
      </m.ul>
    </Section>
  );
}
