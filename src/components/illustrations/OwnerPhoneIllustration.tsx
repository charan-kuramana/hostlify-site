import { colors, neutral } from "@/lib/tokens";
import { Bust, IlSvg, line, P, Plant, Shadow, Steam, useIlIds, type IllustrationProps } from "./shared";

const b = colors.brand;
const a = colors.accent;
const s = colors.success;

/** Bar heights for the mini ₹ chart (fixed for deterministic markup). */
const bars = [22, 30, 26, 38, 46, 56];

/** Owner at the reception desk running the hostel from a phone — mini ₹ dashboard, the old register closed on the side. */
export function OwnerPhoneIllustration({ className, title }: IllustrationProps) {
  const { urls, ids, titleId } = useIlIds("bg", "desk", "top", "screen", "bar");
  return (
    <IlSvg
      viewBox="0 0 480 360"
      className={className}
      title={title}
      titleId={titleId}
      defs={
        <>
          <radialGradient id={ids.bg} cx="0.45" cy="0.45" r="0.6">
            <stop offset="0" stopColor={b[100]} />
            <stop offset="1" stopColor={b[50]} stopOpacity={0} />
          </radialGradient>
          <linearGradient id={ids.desk} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={b[600]} />
            <stop offset="1" stopColor={b[800]} />
          </linearGradient>
          <linearGradient id={ids.top} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={P.wood.light} />
            <stop offset="1" stopColor={P.wood.base} />
          </linearGradient>
          <linearGradient id={ids.screen} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={P.white} />
            <stop offset="1" stopColor={b[50]} />
          </linearGradient>
          <linearGradient id={ids.bar} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={b[400]} />
            <stop offset="1" stopColor={b[600]} />
          </linearGradient>
        </>
      }
    >
      <ellipse cx={230} cy={180} rx={226} ry={176} fill={urls.bg} />

      {/* Back wall: key board + clock */}
      <rect x={52} y={70} width={92} height={70} rx={10} fill={P.wood.light} {...line} />
      {[70, 92, 114].map((x) => (
        <g key={x}>
          <circle cx={x + 4} cy={88} r={2.5} fill={P.ink} />
          <path d={`M${x + 4} 90 V104`} stroke={neutral[400]} strokeWidth={2} strokeLinecap="round" />
          <rect x={x} y={104} width={8} height={12} rx={2} fill={x === 92 ? a[500] : b[500]} />
        </g>
      ))}
      <circle cx={200} cy={64} r={22} fill={P.white} {...line} />
      <path d="M200 52 V64 L208 70" {...line} />

      {/* Owner */}
      <Bust
        x={196}
        y={226}
        s={1.15}
        look={{ skin: P.skin.medium, hair: P.hair.black, top: P.teal, hairStyle: "short", collar: P.white }}
        arms="phone"
      />

      {/* Desk */}
      <Shadow cx={230} cy={318} rx={176} ry={8} o={0.14} />
      <rect x={60} y={222} width={340} height={14} rx={6} fill={urls.top} {...line} />
      <path d="M70 236 H390 V306 C390 312 386 316 380 316 H80 C74 316 70 312 70 306Z" fill={urls.desk} {...line} />
      <path d="M100 254 H360" stroke={P.white} strokeWidth={2} opacity={0.15} strokeLinecap="round" />
      <circle cx={230} cy={282} r={12} fill={P.white} opacity={0.12} />

      {/* Register (closed) + chai */}
      <rect x={86} y={204} width={62} height={18} rx={3} fill={a[600]} {...line} />
      <rect x={86} y={210} width={62} height={5} fill={P.marigold} />
      <rect x={92} y={196} width={56} height={9} rx={2} fill={P.white} {...line} />
      <path d="M300 222 V206 H318 V222Z" fill={P.white} opacity={0.85} {...line} />
      <rect x={300} y={210} width={18} height={6} fill={P.wood.base} />
      <Steam x={306} y={200} />
      <Steam x={313} y={198} delay={1.4} />
      <Plant x={262} y={222} s={0.7} />

      {/* Phone dashboard */}
      <g className="il-float">
        <rect x={312} y={36} width={124} height={164} rx={18} fill={P.ink} />
        <rect x={318} y={44} width={112} height={148} rx={13} fill={urls.screen} />
        <rect x={354} y={48} width={40} height={5} rx={2.5} fill={P.ink} />
        <circle cx={336} cy={70} r={10} fill={s[100]} />
        <path
          d="M331 65 H341 M331 69 H341 M331 65 C340 65 340 73 333 73 L340 77"
          stroke={s[600]}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x={352} y={63} width={56} height={6} rx={3} fill={b[800]} />
        <rect x={352} y={73} width={36} height={4} rx={2} fill={neutral[300]} />
        {bars.map((h, i) => (
          <rect key={i} x={330 + i * 15} y={154 - h} width={10} height={h} rx={3} fill={i === bars.length - 1 ? a[500] : urls.bar} />
        ))}
        <path
          d="M335 118 L350 112 L365 116 L380 102 L395 96 L410 84"
          stroke={s[500]}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle className="il-glow" cx={410} cy={84} r={4} fill={s[500]} />
        <rect x={328} y={164} width={92} height={18} rx={9} fill={s[100]} />
        <path d="M338 173 l4 4 l7 -8" stroke={s[600]} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
        <rect x={354} y={170} width={52} height={5} rx={2.5} fill={s[600]} opacity={0.7} />
      </g>
    </IlSvg>
  );
}
