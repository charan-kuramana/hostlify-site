import { useId } from "react";
import { cn } from "@/lib/cn";
import { colors, illo, neutral } from "@/lib/tokens";

export type IllustrationProps = { className?: string; title?: string };

/** Shared palette shortcuts for the illustration set. */
export const P = {
  ink: colors.brand[900],
  white: neutral.white,
  ...illo,
} as const;

/** 2px rounded outline used across the set. */
export const line = { stroke: colors.brand[900], strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Deterministic, CSS-safe ids for gradients (useId output can contain characters that break `url(#…)`). */
export function useIlIds<const K extends string>(...names: K[]) {
  const base = "il" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const ids = {} as Record<K, string>;
  const urls = {} as Record<K, string>;
  for (const n of names) {
    ids[n] = `${base}-${n}`;
    urls[n] = `url(#${base}-${n})`;
  }
  return { ids, urls, titleId: `${base}-title` };
}

/**
 * Ambient loops — transform/opacity only, off for reduced motion and held until the page is ready (html.ready),
 * matching the site's other decorative loops.
 */
const css = `
@media (prefers-reduced-motion: no-preference){
.il-glow{animation:il-glow 4.5s ease-in-out infinite}
.il-float{animation:il-float 5s ease-in-out infinite;transform-box:fill-box}
.il-steam{animation:il-steam 3.2s ease-out infinite;transform-box:fill-box;transform-origin:center bottom}
.il-sway{animation:il-sway 6s ease-in-out infinite;transform-box:fill-box;transform-origin:center bottom}
html:not(.ready) .il-glow,html:not(.ready) .il-float,html:not(.ready) .il-steam,html:not(.ready) .il-sway{animation-play-state:paused}
}
@keyframes il-glow{0%,100%{opacity:.25}50%{opacity:1}}
@keyframes il-float{50%{transform:translateY(-6px)}}
@keyframes il-steam{0%{opacity:0;transform:translateY(4px) scaleY(.8)}40%{opacity:.85}100%{opacity:0;transform:translateY(-14px) scaleY(1.1)}}
@keyframes il-sway{50%{transform:rotate(3deg)}}
`;

type SvgProps = IllustrationProps & { viewBox: string; titleId: string; defs?: React.ReactNode; children: React.ReactNode };

/** Root <svg>: titled image when `title` is given, otherwise hidden from assistive tech. */
export function IlSvg({ className, title, viewBox, titleId, defs, children }: SvgProps) {
  return (
    <svg
      viewBox={viewBox}
      className={cn("h-auto w-full", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...(title ? { role: "img", "aria-labelledby": titleId } : { "aria-hidden": true })}
    >
      {title && <title id={titleId}>{title}</title>}
      <style>{css}</style>
      {defs && <defs>{defs}</defs>}
      {children}
    </svg>
  );
}

/** Soft elliptical contact shadow. */
export function Shadow({ cx, cy, rx, ry = 6, o = 0.12 }: { cx: number; cy: number; rx: number; ry?: number; o?: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={P.ink} opacity={o} />;
}

/** Steam wisp (for chai / coffee). */
export function Steam({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <path
      className="il-steam"
      style={{ animationDelay: `${delay}s` }}
      d={`M${x} ${y} q-4 -6 0 -12 q4 -6 0 -12`}
      stroke={neutral[300]}
      strokeWidth={2}
      strokeLinecap="round"
      opacity={0.7}
    />
  );
}

/** Potted plant (pot base centred on x, sitting on y). */
export function Plant({ x, y, s = 1, pot = colors.accent[500] }: { x: number; y: number; s?: number; pot?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="il-sway">
        <path d="M0 -14 C-4 -30 -18 -34 -22 -44 C-8 -42 -2 -32 0 -14Z" fill={P.leaf.base} />
        <path d="M0 -14 C4 -34 16 -40 20 -52 C6 -50 -2 -34 0 -14Z" fill={P.leaf.light} />
        <path d="M0 -14 C-2 -34 -2 -48 4 -60 C10 -44 4 -30 0 -14Z" fill={P.leaf.dark} />
      </g>
      <path d="M-12 -16 H12 L9 0 H-9Z" fill={pot} {...line} />
      <rect x={-14} y={-19} width={28} height={5} rx={2} fill={pot} {...line} />
    </g>
  );
}

type HairStyle = "short" | "long" | "bun" | "wavy";

/** Minimal faceless head + hair, centred on (0,0), radius 11. */
export function Head({ skin, hair, style = "short" }: { skin: string; hair: string; style?: HairStyle }) {
  return (
    <g>
      {style === "long" && (
        <path d="M-11 -6 C-15 8 -15 20 -11 26 L-4 24 C-7 14 -8 4 -8 -2Z M11 -6 C15 8 15 20 11 26 L4 24 C7 14 8 4 8 -2Z" fill={hair} />
      )}
      {style === "bun" && <circle cx={0} cy={-13} r={6} fill={hair} />}
      <circle r={11} fill={skin} />
      {style === "wavy" ? (
        <path d="M-12 1 C-14 -10 -6 -15 1 -14 C9 -14 14 -8 12 2 C10 -4 6 -7 1 -6 C-4 -8 -9 -5 -12 1Z" fill={hair} />
      ) : (
        <path d="M-11.5 0 C-12 -9 -6 -13 0 -13 C7 -13 12 -9 11.5 -1 C8 -6 3 -8 -2 -7 C-6 -7 -10 -4 -11.5 0Z" fill={hair} />
      )}
    </g>
  );
}

export type PersonLook = { skin: string; hair: string; top: string; hairStyle?: HairStyle; dupatta?: string; collar?: string };

/** Seated / behind-the-counter figure: head + shoulders, origin at the table line. */
export function Bust({
  x,
  y,
  s = 1,
  look,
  arms = "rest",
  children,
}: {
  x: number;
  y: number;
  s?: number;
  look: PersonLook;
  arms?: "rest" | "phone" | "wave";
  children?: React.ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-4} y={-58} width={8} height={10} rx={3} fill={look.skin} />
      <path d="M-24 0 C-26 -30 -20 -48 0 -50 C20 -48 26 -30 24 0Z" fill={look.top} />
      {look.collar && <path d="M-6 -49 L0 -40 L6 -49" stroke={look.collar} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />}
      {look.dupatta && <path d="M-16 -46 C-6 -34 6 -22 22 -12 L24 -2 C8 -12 -8 -26 -20 -40Z" fill={look.dupatta} opacity={0.95} />}
      <g transform="translate(0 -67)">
        <Head skin={look.skin} hair={look.hair} style={look.hairStyle} />
      </g>
      {arms === "rest" && (
        <>
          <path d="M-22 -26 C-26 -10 -18 -2 -6 -2" stroke={look.top} strokeWidth={9} strokeLinecap="round" />
          <path d="M22 -26 C26 -10 18 -2 6 -2" stroke={look.top} strokeWidth={9} strokeLinecap="round" />
          <circle cx={-4} cy={-2} r={4.5} fill={look.skin} />
          <circle cx={4} cy={-2} r={4.5} fill={look.skin} />
        </>
      )}
      {arms === "phone" && (
        <>
          <path d="M-22 -26 C-26 -10 -18 -2 -8 -2" stroke={look.top} strokeWidth={9} strokeLinecap="round" />
          <circle cx={-6} cy={-2} r={4.5} fill={look.skin} />
          <path d="M22 -28 C30 -16 26 -10 16 -18" stroke={look.top} strokeWidth={9} strokeLinecap="round" />
          <rect x={6} y={-36} width={12} height={20} rx={3} fill={P.ink} transform="rotate(-12 12 -26)" />
          <circle cx={14} cy={-19} r={4.5} fill={look.skin} />
        </>
      )}
      {arms === "wave" && (
        <>
          <path d="M-22 -26 C-26 -10 -18 -2 -6 -2" stroke={look.top} strokeWidth={9} strokeLinecap="round" />
          <circle cx={-4} cy={-2} r={4.5} fill={look.skin} />
          <path d="M21 -34 C32 -40 34 -52 30 -62" stroke={look.top} strokeWidth={9} strokeLinecap="round" />
          <circle cx={30} cy={-66} r={5} fill={look.skin} />
        </>
      )}
      {children}
    </g>
  );
}

/** Standing figure, origin at the feet. Faces the viewer; `flip` mirrors props. */
export function Person({
  x,
  y,
  s = 1,
  look,
  bottom,
  backpack,
  kurta,
  arm = "down",
  flip,
}: {
  x: number;
  y: number;
  s?: number;
  look: PersonLook;
  bottom: string;
  backpack?: string;
  kurta?: boolean;
  arm?: "down" | "phone" | "carry";
  flip?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      {backpack && <rect x={6} y={-88} width={22} height={34} rx={8} fill={backpack} {...line} />}
      <rect x={-10} y={-50} width={8} height={48} rx={4} fill={bottom} />
      <rect x={2} y={-50} width={8} height={48} rx={4} fill={bottom} />
      <ellipse cx={-7} cy={-1} rx={7} ry={3.5} fill={P.ink} />
      <ellipse cx={7} cy={-1} rx={7} ry={3.5} fill={P.ink} />
      <rect x={-4} y={-96} width={8} height={10} rx={3} fill={look.skin} />
      <path
        d={kurta ? "M-16 -30 C-18 -60 -18 -86 0 -89 C18 -86 18 -60 16 -30Z" : "M-15 -46 C-17 -66 -16 -86 0 -89 C16 -86 17 -66 15 -46Z"}
        fill={look.top}
      />
      {look.collar && <path d="M-5 -88 L0 -80 L5 -88" stroke={look.collar} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />}
      {look.dupatta && <path d="M-14 -86 C-4 -72 6 -60 16 -48 L15 -38 C2 -52 -8 -66 -16 -78Z" fill={look.dupatta} />}
      {backpack && <path d="M9 -86 V-56" stroke={P.ink} strokeWidth={3} strokeLinecap="round" opacity={0.6} />}
      <path d="M-14 -80 C-20 -66 -20 -56 -18 -46" stroke={look.top} strokeWidth={8} strokeLinecap="round" />
      <circle cx={-18} cy={-43} r={4} fill={look.skin} />
      {arm === "phone" ? (
        <>
          <path d="M14 -80 C22 -68 18 -60 8 -62" stroke={look.top} strokeWidth={8} strokeLinecap="round" />
          <rect x={-2} y={-74} width={11} height={18} rx={3} fill={P.ink} />
          <circle cx={6} cy={-61} r={4} fill={look.skin} />
        </>
      ) : (
        <>
          <path d="M14 -80 C20 -66 20 -56 18 -46" stroke={look.top} strokeWidth={8} strokeLinecap="round" />
          <circle cx={18} cy={-43} r={4} fill={look.skin} />
        </>
      )}
      <g transform="translate(0 -106)">
        <Head skin={look.skin} hair={look.hair} style={look.hairStyle} />
      </g>
    </g>
  );
}
