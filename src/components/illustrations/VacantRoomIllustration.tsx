import { colors, neutral } from "@/lib/tokens";
import { IlSvg, line, P, Plant, Shadow, useIlIds, type IllustrationProps } from "./shared";

const b = colors.brand;
const a = colors.accent;

/** An empty, tidy room — made bed, lamp on, a "vacant" tag swinging on the door. */
export function VacantRoomIllustration({ className, title }: IllustrationProps) {
  const { urls, ids, titleId } = useIlIds("wall", "floor", "night", "blanket", "lamp", "door");
  return (
    <IlSvg
      viewBox="0 0 480 320"
      className={className}
      title={title}
      titleId={titleId}
      defs={
        <>
          <linearGradient id={ids.wall} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={b[50]} />
            <stop offset="1" stopColor={b[100]} />
          </linearGradient>
          <linearGradient id={ids.floor} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={P.wood.light} />
            <stop offset="1" stopColor={P.wood.base} />
          </linearGradient>
          <linearGradient id={ids.night} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={b[800]} />
            <stop offset="1" stopColor={b[600]} />
          </linearGradient>
          <linearGradient id={ids.blanket} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={b[400]} />
            <stop offset="1" stopColor={b[700]} />
          </linearGradient>
          <radialGradient id={ids.lamp} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor={P.marigold} stopOpacity={0.6} />
            <stop offset="1" stopColor={P.marigold} stopOpacity={0} />
          </radialGradient>
          <linearGradient id={ids.door} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={P.wood.base} />
            <stop offset="1" stopColor={P.wood.dark} />
          </linearGradient>
        </>
      }
    >
      <rect x={20} y={16} width={440} height={288} rx={28} fill={urls.wall} />
      <path d="M20 240 H460 V276 C460 291 448 304 432 304 H48 C32 304 20 291 20 276Z" fill={urls.floor} />

      {/* Night window */}
      <rect x={52} y={52} width={96} height={86} rx={10} fill={urls.night} {...line} />
      <path d="M118 74 A12 12 0 1 0 128 90 A9 9 0 1 1 118 74Z" fill={colors.warning[100]} />
      <circle className="il-glow" cx={72} cy={72} r={2} fill={P.white} />
      <circle className="il-glow" style={{ animationDelay: "1.2s" }} cx={90} cy={110} r={1.6} fill={P.white} />
      <circle className="il-glow" style={{ animationDelay: "2.4s" }} cx={136} cy={120} r={1.8} fill={P.white} />
      <path d="M100 52 V138 M52 95 H148" stroke={P.white} strokeWidth={3} opacity={0.8} />

      {/* Rug */}
      <ellipse cx={200} cy={278} rx={96} ry={14} fill={a[500]} opacity={0.18} />
      <ellipse cx={200} cy={278} rx={78} ry={9} fill={a[500]} opacity={0.22} />

      {/* Made bed */}
      <Shadow cx={170} cy={262} rx={120} ry={7} o={0.14} />
      <rect x={52} y={170} width={14} height={92} rx={5} fill={P.wood.base} {...line} />
      <rect x={66} y={214} width={220} height={22} rx={6} fill={P.white} {...line} />
      <path d="M118 214 C150 204 250 204 286 214 V236 H118Z" fill={urls.blanket} {...line} />
      <path d="M118 214 V236" stroke={P.white} strokeWidth={4} />
      <rect x={72} y={196} width={42} height={20} rx={9} fill={P.white} {...line} />
      <rect x={200} y={196} width={50} height={12} rx={4} fill={P.cream} {...line} />
      <rect x={66} y={236} width={220} height={12} rx={4} fill={P.wood.dark} {...line} />
      <path d="M78 248 V262 M276 248 V262" {...line} strokeWidth={4} />

      {/* Bedside table + lamp */}
      <circle className="il-glow" cx={326} cy={176} r={42} fill={urls.lamp} />
      <rect x={302} y={212} width={48} height={50} rx={6} fill={P.wood.light} {...line} />
      <path d="M302 236 H350" {...line} />
      <circle cx={326} cy={224} r={2} fill={P.ink} />
      <path d="M326 212 V192" {...line} />
      <path d="M312 192 L318 170 H334 L340 192Z" fill={P.marigold} {...line} />
      <Plant x={386} y={64} s={0.5} pot={b[600]} />
      <rect x={362} y={64} width={48} height={6} rx={3} fill={P.wood.base} {...line} />

      {/* Door with vacant tag */}
      <rect x={370} y={104} width={72} height={158} rx={6} fill={urls.door} {...line} />
      <rect x={380} y={116} width={52} height={56} rx={4} fill={P.white} opacity={0.12} />
      <rect x={380} y={184} width={52} height={64} rx={4} fill={P.white} opacity={0.12} />
      <circle cx={384} cy={186} r={4} fill={P.marigold} {...line} />
      <g className="il-sway" style={{ animationDuration: "3.5s", transformOrigin: "50% 0%" }}>
        <path d="M384 186 L376 196 M384 186 L392 196" stroke={P.ink} strokeWidth={1.5} />
        <rect x={366} y={196} width={36} height={44} rx={6} fill={P.white} {...line} />
        <circle cx={384} cy={210} r={7} fill={colors.success[100]} />
        <path d="M380 210 l3 3 l5 -6" stroke={colors.success[600]} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <rect x={372} y={224} width={24} height={4} rx={2} fill={a[500]} />
        <rect x={376} y={231} width={16} height={3} rx={1.5} fill={neutral[300]} />
      </g>
      <rect x={444} y={248} width={12} height={14} rx={3} fill={neutral[300]} />
    </IlSvg>
  );
}
