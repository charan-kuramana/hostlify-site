import { m, type Variants } from "motion/react";
import { trust } from "@/content/home";
import { ease, stagger, viewport } from "@/lib/motion";
import { Icon } from "@/components/icons/Icon";
import { toneFor } from "@/lib/iconTones";
import { cn } from "@/lib/cn";

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.outExpo } },
};

/** §9.3 option B — pre-launch trust badges (no customer logos until we have real, permitted ones). */
export function TrustStrip() {
  return (
    <section aria-label={trust.label} className="relative border-y border-gray-100 bg-white py-10 sm:py-12">
      <div className="container-page">
        <p className="text-center text-eyebrow font-semibold text-gray-500 uppercase">{trust.label}</p>
        <m.ul
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap lg:items-center lg:justify-center lg:gap-4"
        >
          {trust.badges.map((badge) => (
            <m.li
              key={badge.id}
              variants={item}
              className={cn(
                "group flex min-h-12 items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50/60 py-2 pr-5 pl-2 text-sm font-medium text-gray-700 transition-colors hover:border-tone/25 hover:bg-tone-soft/40 lg:rounded-full",
                toneFor(badge.icon),
              )}
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full tile-gloss transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6">
                <Icon name={badge.icon} className="size-4" />
              </span>
              {badge.text}
            </m.li>
          ))}
        </m.ul>
      </div>
    </section>
  );
}
