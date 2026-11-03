import { m, useInView, useReducedMotion, type Transition, type Variants } from "motion/react";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { usePageVisible } from "@/hooks/usePageVisible";

/**
 * Motion-animated Lucide icons (§13.2, the "lucide-animated" pattern).
 * Paths are copied from lucide-react so the static state matches the rest of the site.
 *
 * States: "hidden" (pre-reveal, inView only) → "play" → "rest". Every animation ends on the rest pose
 * and runs ≤ 800ms. Reduced motion renders the static rest pose.
 */

type State = "hidden" | "rest" | "play";
type Shape =
  | { el: "path"; d: string; v?: Variants; origin?: [number, number] }
  | { el: "circle"; cx: number; cy: number; r: number; v?: Variants; origin?: [number, number] }
  | { el: "rect"; x: number; y: number; width: number; height: number; rx: number; v?: Variants; origin?: [number, number] };
type IconDef = { group?: Variants; groupOrigin?: [number, number]; shapes: Shape[]; overflow?: boolean };

/* ---------- transition helpers ---------- */
const t = (loop: boolean, base: Transition): Transition => (loop ? { ...base, repeat: Infinity, repeatDelay: 1.8 } : base);

const draw = (delay = 0, dur = 0.45): Variants => ({
  hidden: { pathLength: 0, opacity: 0 },
  rest: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
  play: (loop: boolean) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: t(loop, { duration: dur, delay, ease: ease.outQuart }),
  }),
});

const fadeScale = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.6 },
  rest: { opacity: 1, scale: 1 },
  play: (loop: boolean) => ({
    opacity: [0, 1],
    scale: [0.6, 1],
    transition: t(loop, { duration: 0.35, delay, ease: ease.outQuart }),
  }),
});

const still: Variants = { hidden: { opacity: 1 }, rest: { opacity: 1 }, play: { opacity: 1 } };

const keyframes = (values: Record<string, number[]>, dur = 0.8, delay = 0): Variants => {
  const rest = Object.fromEntries(Object.entries(values).map(([k, v]) => [k, v[v.length - 1] ?? 0]));
  return {
    hidden: rest,
    rest,
    play: (loop: boolean) => ({ ...values, transition: t(loop, { duration: dur, delay, ease: "easeInOut" }) }),
  };
};

/* ---------- icon definitions ---------- */
const CHECK = "m9 12 2 2 4-4";

const defs = {
  "bell-ring": {
    group: keyframes({ rotate: [0, 14, -12, 10, -8, 4, 0] }, 0.8),
    groupOrigin: [12, 3],
    shapes: [
      { el: "path", d: "M10.268 21a2 2 0 0 0 3.464 0" },
      { el: "path", d: "M22 8c0-2.3-.8-4.3-2-6", v: fadeScale(0.1) },
      {
        el: "path",
        d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      },
      { el: "path", d: "M4 2C2.8 3.7 2 5.7 2 8", v: fadeScale(0.1) },
    ],
  },
  "check-circle": {
    shapes: [
      { el: "circle", cx: 12, cy: 12, r: 10, v: draw(0, 0.45) },
      { el: "path", d: CHECK, v: draw(0.35, 0.3) },
    ],
  },
  "shield-check": {
    shapes: [
      {
        el: "path",
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        v: draw(0, 0.5),
      },
      { el: "path", d: CHECK, v: draw(0.4, 0.3) },
    ],
  },
  "calendar-check": {
    shapes: [
      { el: "rect", x: 3, y: 4, width: 18, height: 18, rx: 2 },
      { el: "path", d: "M3 10h18" },
      { el: "path", d: "M8 2v4", v: keyframes({ y: [0, -1.5, 0] }, 0.4) },
      { el: "path", d: "M16 2v4", v: keyframes({ y: [0, -1.5, 0] }, 0.4, 0.08) },
      { el: "path", d: "m9 16 2 2 4-4", v: draw(0.25, 0.4) },
    ],
  },
  rocket: {
    group: keyframes({ x: [0, -1, 3, 0], y: [0, 1, -3, 0] }, 0.8),
    overflow: true,
    shapes: [
      { el: "path", d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" },
      { el: "path", d: "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" },
      { el: "path", d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" },
      { el: "path", d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" },
      // exhaust trail — only visible mid-flight
      {
        el: "path",
        d: "M1 23l2.5-2.5",
        v: {
          hidden: { opacity: 0 },
          rest: { opacity: 0 },
          play: (loop: boolean) => ({ opacity: [0, 1, 0], transition: t(loop, { duration: 0.8 }) }),
        },
      },
    ],
  },
  building: {
    group: keyframes({ y: [3, 0] }, 0.45),
    shapes: [
      { el: "path", d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" },
      { el: "path", d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", v: draw(0.15, 0.3) },
      { el: "path", d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", v: draw(0.15, 0.3) },
      { el: "path", d: "M10 18h4", v: draw(0.25, 0.15) },
      { el: "path", d: "M10 14h4", v: draw(0.35, 0.15) },
      { el: "path", d: "M10 10h4", v: draw(0.45, 0.15) },
      { el: "path", d: "M10 6h4", v: draw(0.55, 0.15) },
    ],
  },
  "map-pin": {
    group: keyframes({ y: [-6, 0, -2, 0] }, 0.7),
    shapes: [
      { el: "path", d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" },
      { el: "circle", cx: 12, cy: 10, r: 3, v: keyframes({ scale: [1, 0.6, 1.15, 1] }, 0.7), origin: [12, 10] },
    ],
  },
  sparkles: {
    shapes: [
      {
        el: "path",
        d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
        v: keyframes({ scale: [1, 0.82, 1.08, 1] }, 0.6),
        origin: [12, 12],
      },
      { el: "path", d: "M20 3v4", v: keyframes({ opacity: [1, 0, 1], scale: [1, 0.4, 1] }, 0.5, 0.15), origin: [20, 5] },
      { el: "path", d: "M22 5h-4", v: keyframes({ opacity: [1, 0, 1], scale: [1, 0.4, 1] }, 0.5, 0.15), origin: [20, 5] },
      { el: "path", d: "M4 17v2", v: keyframes({ opacity: [1, 0, 1], scale: [1, 0.4, 1] }, 0.5, 0.3), origin: [4, 18] },
      { el: "path", d: "M5 18H3", v: keyframes({ opacity: [1, 0, 1], scale: [1, 0.4, 1] }, 0.5, 0.3), origin: [4, 18] },
    ],
  },
  wrench: {
    group: keyframes({ rotate: [0, -20, 20, -10, 0] }, 0.8),
    groupOrigin: [12, 12],
    shapes: [
      {
        el: "path",
        d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
      },
    ],
  },
  megaphone: {
    group: keyframes({ rotate: [0, -8, 8, -6, 4, 0] }, 0.6),
    groupOrigin: [6, 12],
    overflow: true,
    shapes: [
      { el: "path", d: "m3 11 18-5v12L3 14v-3z" },
      { el: "path", d: "M11.6 16.8a3 3 0 1 1-5.8-1.6" },
      {
        el: "path",
        d: "M23.5 9.5a4 4 0 0 1 0 5",
        v: {
          hidden: { opacity: 0 },
          rest: { opacity: 0 },
          play: (loop: boolean) => ({ opacity: [0, 1, 0], transition: t(loop, { duration: 0.6, delay: 0.1 }) }),
        },
      },
    ],
  },
  "indian-rupee": {
    shapes: [
      { el: "path", d: "M6 3h12", v: draw(0, 0.2) },
      { el: "path", d: "M6 8h12", v: draw(0.1, 0.2) },
      { el: "path", d: "M9 13c6.667 0 6.667-10 0-10", v: draw(0.2, 0.3) },
      { el: "path", d: "M6 13h3", v: draw(0.4, 0.1) },
      { el: "path", d: "m6 13 8.5 8", v: draw(0.45, 0.25) },
    ],
  },
} satisfies Record<string, IconDef>;

export type AnimatedIconName = keyof typeof defs;
export type AnimatedIconTrigger = "hover" | "inView" | "loop";

/**
 * Parents (e.g. a feature card) can provide their hover state so hovering the whole card plays the icon.
 * `const [hover, handlers] = useIconHover();` → `<div {...handlers}><AnimatedIconHover.Provider value={hover}>…`
 */
export const AnimatedIconHover = createContext<boolean | null>(null);

export function useIconHover() {
  const [hover, setHover] = useState(false);
  const handlers = useMemo(
    () => ({
      onPointerEnter: () => setHover(true),
      onPointerLeave: () => setHover(false),
      onFocus: () => setHover(true),
      onBlur: () => setHover(false),
    }),
    [],
  );
  return [hover, handlers] as const;
}

type AnimatedIconProps = {
  name: AnimatedIconName | (string & {});
  trigger?: AnimatedIconTrigger;
  size?: number;
  strokeWidth?: number;
  /** Controlled play state (overrides hover/context) */
  playing?: boolean;
  className?: string;
};

export function AnimatedIcon({ name, trigger = "hover", size = 24, strokeWidth = 1.75, playing, className }: AnimatedIconProps) {
  const def: IconDef = (defs as Record<string, IconDef>)[name] ?? defs["check-circle"];
  const ref = useRef<SVGSVGElement>(null);
  const reduce = useReducedMotion();
  const groupHover = useContext(AnimatedIconHover);
  const [selfHover, setSelfHover] = useState(false);
  const inViewOnce = useInView(ref, { once: true, amount: 0.6 });
  const inViewLive = useInView(ref, { amount: 0.1 });
  const pageVisible = usePageVisible();
  const loop = trigger === "loop";

  // Touch "tap" plays once and returns to rest.
  const tapTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(tapTimer.current), []);

  let state: State;
  if (reduce) state = "rest";
  else if (trigger === "inView") state = inViewOnce ? "play" : "hidden";
  else if (loop) state = inViewLive && pageVisible ? "play" : "rest";
  else state = (playing ?? groupHover ?? selfHover) ? "play" : "rest";

  const hoverHandlers =
    trigger === "hover" && playing === undefined && groupHover === null
      ? {
          onPointerEnter: (e: React.PointerEvent) => {
            setSelfHover(true);
            if (e.pointerType !== "mouse") {
              window.clearTimeout(tapTimer.current);
              tapTimer.current = window.setTimeout(() => setSelfHover(false), 900);
            }
          },
          onPointerLeave: (e: React.PointerEvent) => {
            if (e.pointerType === "mouse") setSelfHover(false);
          },
        }
      : {};

  const originStyle = (o?: [number, number]) => (o ? { originX: `${o[0]}px`, originY: `${o[1]}px` } : undefined);

  return (
    <m.svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      overflow={def.overflow ? "visible" : undefined}
      className={cn("shrink-0", className)}
      initial={reduce ? false : trigger === "inView" ? "hidden" : "rest"}
      animate={state}
      custom={loop}
      {...hoverHandlers}
    >
      <m.g variants={def.group ?? still} custom={loop} style={{ transformBox: "view-box", ...originStyle(def.groupOrigin) }}>
        {def.shapes.map((s, i) => {
          const common = {
            variants: s.v ?? still,
            custom: loop,
            style: s.origin ? { transformBox: "view-box" as const, ...originStyle(s.origin) } : undefined,
          };
          const key = `${name}-${i}`;
          if (s.el === "circle") return <m.circle key={key} cx={s.cx} cy={s.cy} r={s.r} {...common} />;
          if (s.el === "rect") return <m.rect key={key} x={s.x} y={s.y} width={s.width} height={s.height} rx={s.rx} {...common} />;
          return <m.path key={key} d={s.d} {...common} />;
        })}
      </m.g>
    </m.svg>
  );
}
