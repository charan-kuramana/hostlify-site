import { m } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router";
import { featuresPage, type ModuleSummary } from "@/content/features";
import { cn } from "@/lib/cn";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { Badge } from "@/components/ui/Badge";
import { IconTile } from "@/components/ui/IconTile";
import { ModuleVignette } from "./ModuleVignette";
import { WhenVisible } from "@/components/layout/WhenVisible";
import { toneFor } from "@/lib/iconTones";

type ModuleRowProps = { module: ModuleSummary; index: number; anchorId: string; audience: "owners" | "residents"; comingSoonLabel: string };

/** One zig-zag row: vignette on one side, title + 3 bullets + "Learn more" on the other. */
export function ModuleRow({ module, index, anchorId, audience, comingSoonLabel }: ModuleRowProps) {
  const flip = index % 2 === 1;
  const resident = audience === "residents";
  return (
    <article id={anchorId} aria-labelledby={`${anchorId}-title`} className={cn("scroll-mt-28 py-10 md:py-14", toneFor(module.icon))}>
      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12 xl:gap-16">
        <div className={cn("min-w-0", flip && "md:order-2")}>
          {/* Text stays in the pre-rendered HTML (SEO); the decorative mock mounts near the viewport to keep hydration light. */}
          <WhenVisible
            rootMargin="600px 0px"
            placeholderClassName="min-h-[260px] rounded-2xl border border-tone/15 bg-linear-to-br from-tone-soft/70 via-white to-tone-soft/60 sm:min-h-[300px]"
          >
            <ModuleVignette icon={module.icon} title={module.title} index={index} audience={audience} />
          </WhenVisible>
        </div>
        <m.div variants={stagger(0.07)} initial="hidden" whileInView="show" viewport={viewport} className="min-w-0">
          <m.div variants={fadeUp} className="flex items-center gap-3">
            <IconTile name={module.icon} animated />
            {module.comingSoon && <Badge tone="warning">{comingSoonLabel}</Badge>}
          </m.div>
          <m.h3 variants={fadeUp} id={`${anchorId}-title`} className="mt-5 text-h3 font-bold">
            {module.title}
          </m.h3>
          <m.p variants={fadeUp} className="mt-2 text-lead text-gray-600">
            {module.body}
          </m.p>
          <m.ul variants={fadeUp} className="mt-5 space-y-2.5">
            {module.bullets.map((b) => (
              <li key={b} className="flex gap-3">
                <span
                  className={cn(
                    "mt-1 grid size-5 shrink-0 place-items-center rounded-full",
                    resident ? "bg-accent-100 text-accent-600" : "bg-success-100 text-success-600",
                  )}
                >
                  <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="text-gray-700">{b}</span>
              </li>
            ))}
          </m.ul>
          {module.href && (
            <m.div variants={fadeUp}>
              <Link
                to={module.href}
                className="group mt-5 inline-flex min-h-11 items-center gap-1.5 rounded-md font-semibold text-brand-600 transition-colors hover:text-brand-700"
              >
                {featuresPage.learnMore}
                <span className="sr-only">: {module.title}</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </m.div>
          )}
        </m.div>
      </div>
    </article>
  );
}
