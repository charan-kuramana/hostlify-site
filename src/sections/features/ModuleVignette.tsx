import { m } from "motion/react";
import { cn } from "@/lib/cn";
import { ease, viewport } from "@/lib/motion";
import { Icon } from "@/components/icons/Icon";
import { IconTile } from "@/components/ui/IconTile";

type ModuleVignetteProps = { icon: string; title: string; index: number; audience: "owners" | "residents" };

const pill = ["bg-success-100", "bg-warning-100", "bg-brand-100", "bg-accent-100"] as const;
const dot = ["bg-success-500", "bg-warning-500", "bg-brand-500", "bg-accent-500"] as const;
const tileTone = [
  "bg-brand-500",
  "bg-brand-500",
  "bg-success-500",
  "bg-brand-200",
  "bg-warning-500",
  "bg-brand-500",
  "bg-success-500",
  "bg-brand-200",
] as const;
const bars = [42, 58, 50, 72, 64, 88] as const;
const widths = ["w-3/4", "w-1/2", "w-2/3"] as const;

const rowAnim = {
  hidden: { opacity: 0, x: 16 },
  show: (i: number) => ({ opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.15 + i * 0.08, ease: ease.outExpo } }),
};

function ListBody() {
  return (
    <ul className="space-y-2.5">
      {widths.map((w, i) => (
        <m.li
          key={w}
          custom={i}
          variants={rowAnim}
          className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50/70 p-2.5"
        >
          <span className="size-7 shrink-0 rounded-full bg-linear-to-br from-tone-light/70 to-tone-soft" />
          <span className="min-w-0 flex-1 space-y-1.5">
            <span className={cn("block h-2 rounded-full bg-gray-300/80", w)} />
            <span className="block h-1.5 w-1/3 rounded-full bg-gray-200" />
          </span>
          <span className={cn("flex h-5 w-12 items-center justify-center rounded-full", pill[i % pill.length])}>
            <span className={cn("size-1.5 rounded-full", dot[i % dot.length])} />
          </span>
        </m.li>
      ))}
    </ul>
  );
}

function TilesBody() {
  return (
    <div className="grid grid-cols-4 gap-2">
      {tileTone.map((tone, i) => (
        <m.span
          key={`tile-${i}`}
          custom={i}
          variants={{
            hidden: { opacity: 0, scale: 0.6 },
            show: (n: number) => ({ opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.1 + n * 0.05, ease: ease.outExpo } }),
          }}
          className={cn("aspect-square rounded-md", tone, tone === "bg-brand-200" ? "" : "opacity-90")}
        />
      ))}
    </div>
  );
}

function ChartBody() {
  return (
    <div>
      <div className="mb-3 flex gap-2">
        <span className="h-6 w-20 rounded-md bg-success-100" />
        <span className="h-6 w-16 rounded-md bg-gray-100" />
      </div>
      <div className="flex h-24 items-end gap-2">
        {bars.map((h, i) => (
          <m.span
            key={h}
            custom={i}
            variants={{
              hidden: { scaleY: 0 },
              show: (n: number) => ({ scaleY: 1, transition: { duration: 0.6, delay: 0.15 + n * 0.06, ease: ease.outExpo } }),
            }}
            style={{ height: `${h}%` }}
            className={cn(
              "flex-1 origin-bottom rounded-t-md",
              i === bars.length - 1 ? "bg-linear-to-t from-tone-deep to-tone" : "bg-tone/20",
            )}
          />
        ))}
      </div>
    </div>
  );
}

/** Decorative, live-coded UI vignette for a module row (no screenshots exist). */
export function ModuleVignette({ icon, title, index, audience }: ModuleVignetteProps) {
  const variant = index % 3;
  const resident = audience === "residents";

  return (
    <m.div
      aria-hidden="true"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={cn(
        "relative isolate overflow-hidden rounded-2xl border p-6 sm:p-10",
        "border-tone/15 bg-linear-to-br from-tone-soft/70 via-white to-tone-soft/60",
      )}
    >
      <div className="absolute inset-0 -z-10 bg-dot-grid" />
      <Icon name={icon} className="absolute -right-6 -bottom-8 -z-10 size-48 text-tone/10" strokeWidth={1.25} />

      <m.div
        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.outExpo } } }}
        className={cn(
          "relative mx-auto rounded-xl border border-gray-200 bg-white p-4 shadow-float",
          resident ? "max-w-[240px] rounded-[1.75rem] pt-6" : "max-w-sm",
        )}
      >
        {resident && <span className="absolute top-2 left-1/2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-gray-200" />}
        <div className="mb-4 flex items-center gap-3">
          <IconTile name={icon} variant="solid" size="sm" />
          <span className="min-w-0 flex-1">
            <span className="block truncate font-display text-sm font-semibold text-brand-900">{title}</span>
            <span className="mt-1 block h-1.5 w-16 rounded-full bg-gray-200" />
          </span>
          <span className="relative flex size-2.5">
            <span className="absolute inset-0 rounded-full bg-success-500 motion-safe:animate-pulse-ring" />
            <span className="relative size-2.5 rounded-full bg-success-500" />
          </span>
        </div>
        {variant === 0 && <ListBody />}
        {variant === 1 && <TilesBody />}
        {variant === 2 && <ChartBody />}
      </m.div>

      <m.span
        variants={{
          hidden: { opacity: 0, scale: 0.6 },
          show: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.45, ease: ease.outExpo } },
        }}
        className="absolute top-4 right-4 sm:top-6 sm:right-6"
      >
        <span className="grid size-11 place-items-center rounded-xl bg-white text-tone-deep shadow-lift ring-1 ring-tone/15 motion-safe:animate-float">
          <Icon name={icon} className="size-5" />
        </span>
      </m.span>
    </m.div>
  );
}
