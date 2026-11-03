import { useLocation } from "react-router";
import { homeLink, pageNames } from "@/content/nav";
import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { WordReveal } from "@/components/motion/WordReveal";
import { HeroBackdrop } from "@/components/backgrounds/HeroBackdrop";
import { Breadcrumbs } from "./Breadcrumbs";

/** CSS entrance delay (see .enter in globals.css) */
const d = (seconds: number) => ({ "--d": `${seconds}s` }) as React.CSSProperties;

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  /** Rendered after the title with the animated gradient highlight */
  highlight?: string;
  lead?: string;
  /** Buttons / links under the lead */
  actions?: React.ReactNode;
  /** Optional right-hand visual (switches to a split layout on lg) */
  visual?: React.ReactNode;
  /** Extra content under the actions (e.g. a search form) */
  children?: React.ReactNode;
  /** Rendered above the eyebrow. Defaults to a Home › Page breadcrumb. */
  before?: React.ReactNode;
  /** brand (default) or accent (playful resident pages) */
  tone?: "brand" | "accent";
  /** Backdrop colour mix; defaults to accent for accent tone, otherwise aurora */
  palette?: "brand" | "aurora" | "accent";
  /** Shorter hero (contact, legal) */
  compact?: boolean;
  id?: string;
  className?: string;
};

/**
 * Reusable inner-page hero with the premium animated backdrop.
 * Extends under the transparent sticky header (-mt matches the header height, with matching extra top padding).
 */
export function PageHero({
  eyebrow,
  title,
  highlight,
  lead,
  actions,
  visual,
  children,
  before,
  tone = "brand",
  palette,
  compact = false,
  id,
  className,
}: PageHeroProps) {
  const { pathname } = useLocation();
  const split = Boolean(visual);
  const accent = tone === "accent";
  const parts = highlight ? [{ text: title }, { text: highlight, highlight: true }] : [{ text: title }];
  const pageName = pageNames[pathname.replace(/\/$/, "")];
  const crumbs =
    before ??
    (pageName ? (
      <Breadcrumbs
        items={[
          { name: homeLink.label, path: homeLink.href },
          { name: pageName, path: pathname },
        ]}
        className={cn(!split && "justify-center")}
      />
    ) : null);

  return (
    <section id={id} className={cn("relative isolate -mt-16 overflow-x-clip lg:-mt-[72px]", className)}>
      <HeroBackdrop palette={palette ?? (accent ? "accent" : "aurora")} intensity={compact ? "subtle" : "full"} />

      <div
        className={cn(
          "relative z-[1] container-page",
          compact
            ? "pt-[calc(4rem+3rem)] pb-12 md:pb-16 lg:pt-[calc(72px+4.5rem)]"
            : "pt-[calc(4rem+3.5rem)] pb-16 md:pb-24 lg:pt-[calc(72px+6rem)]",
          split && "grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16",
        )}
      >
        <div className={cn("min-w-0", split ? "text-left" : "mx-auto max-w-3xl text-center")}>
          {crumbs && <div className="enter mb-5">{crumbs}</div>}
          {eyebrow && (
            <div className="enter" style={d(0.05)}>
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border bg-white/90 px-3 py-1 shadow-card",
                  accent ? "border-accent-100" : "border-brand-100",
                )}
              >
                <span className="relative flex size-2" aria-hidden="true">
                  <span
                    className={cn(
                      "absolute inset-0 rounded-full motion-safe:animate-pulse-ring",
                      accent ? "bg-accent-500" : "bg-brand-400",
                    )}
                  />
                  <span className={cn("relative size-2 rounded-full", accent ? "bg-accent-500" : "bg-brand-500")} />
                </span>
                <Eyebrow className={cn(accent && "text-accent-600")}>{eyebrow}</Eyebrow>
              </span>
            </div>
          )}
          <WordReveal
            as="h1"
            onMount
            delay={0.05}
            parts={parts}
            highlightClassName={accent ? "text-gradient-warm" : "text-gradient-animated"}
            className={cn("mt-5 font-bold", compact || split ? "text-h1" : "text-display")}
          />
          {lead && (
            <p style={d(0.3)} className={cn("enter mt-6 max-w-[60ch] text-lead text-gray-600", !split && "mx-auto")}>
              {lead}
            </p>
          )}
          {actions && (
            <div style={d(0.4)} className={cn("enter mt-8 flex flex-col gap-3 sm:flex-row", !split && "sm:justify-center")}>
              {actions}
            </div>
          )}
          {children && (
            <div className="enter" style={d(0.5)}>
              {children}
            </div>
          )}
        </div>
        {visual && (
          <div className="enter-visual relative min-w-0" style={d(0.25)}>
            {visual}
          </div>
        )}
      </div>
    </section>
  );
}
