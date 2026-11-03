import { m, useInView, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router";
import { cn } from "@/lib/cn";
import { fadeUp } from "@/lib/motion";
import { usePageVisible } from "@/hooks/usePageVisible";
import { useSpotlight } from "@/hooks/useSpotlight";
import { IconTile } from "@/components/ui/IconTile";
import { AnimatedIconHover, useIconHover } from "@/components/icons/AnimatedIcon";
import { toneFor } from "@/lib/iconTones";

type BentoTileProps = {
  title: string;
  body: string;
  href: string;
  icon: string;
  learnMore: string;
  className?: string;
  visualClassName?: string;
  /** Receives `active` — true only while the tile is on screen, the tab is visible and motion is allowed. */
  children: (active: boolean) => React.ReactNode;
};

/** Bento card: spotlight hover, lift, stretched link, and a live mini-UI that only runs while visible. */
export function BentoTile({ title, body, href, icon, learnMore, className, visualClassName, children }: BentoTileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const pageVisible = usePageVisible();
  const reduce = useReducedMotion();
  const spotlight = useSpotlight<HTMLDivElement>();
  const active = inView && pageVisible && !reduce;
  const [hover, hoverHandlers] = useIconHover();

  return (
    <m.div
      ref={ref}
      variants={fadeUp}
      {...spotlight}
      {...hoverHandlers}
      className={cn(
        "group group/tile card-glow spotlight flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-card transition-[translate,box-shadow,border-color] duration-300 ease-out focus-within:border-tone/25 hover:-translate-y-1 hover:border-tone/25 hover:shadow-lift sm:p-6",
        toneFor(icon),
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn("relative flex flex-1 flex-col overflow-hidden rounded-xl border border-gray-100 bg-gray-50/80 p-4", visualClassName)}
      >
        {children(active)}
      </div>
      <div className="mt-5 flex items-start gap-3">
        <AnimatedIconHover.Provider value={hover}>
          <IconTile name={icon} animated className="size-10" />
        </AnimatedIconHover.Provider>
        <div className="min-w-0">
          <h3 className="text-h4 font-bold">
            <Link to={href} className="rounded-sm outline-offset-4 after:absolute after:inset-0 after:rounded-2xl after:content-['']">
              {title}
            </Link>
          </h3>
          <p className="mt-1 text-[15px] leading-relaxed text-gray-600">{body}</p>
          <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-tone-deep" aria-hidden="true">
            {learnMore}
            <ArrowRight className="size-4 transition-transform duration-200 group-hover/tile:translate-x-1" />
          </span>
        </div>
      </div>
    </m.div>
  );
}
