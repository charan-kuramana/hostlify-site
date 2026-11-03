import { colors, neutral } from "@/lib/tokens";
import { Bust, IlSvg, line, P, Plant, Shadow, Steam, useIlIds, type IllustrationProps, type PersonLook } from "./shared";

const b = colors.brand;
const a = colors.accent;

/** Festive bunting flags: [x, colour]. */
const flags: [number, string][] = [
  [72, a[500]],
  [112, P.marigold],
  [152, b[500]],
  [192, P.teal],
  [232, a[500]],
  [272, P.marigold],
  [312, b[500]],
  [352, P.teal],
  [392, a[500]],
];

const diners: { x: number; look: PersonLook; arms?: "rest" | "wave" }[] = [
  { x: 120, look: { skin: P.skin.light, hair: P.hair.black, top: a[500], hairStyle: "bun", dupatta: P.marigold } },
  { x: 196, look: { skin: P.skin.deep, hair: P.hair.black, top: b[600], hairStyle: "short", collar: P.white }, arms: "wave" },
  { x: 284, look: { skin: P.skin.medium, hair: P.hair.brown, top: P.teal, hairStyle: "long" } },
  { x: 360, look: { skin: P.skin.medium, hair: P.hair.black, top: P.plum, hairStyle: "wavy" } },
];

/** Residents sharing a meal at the hostel mess — thalis, chai and bunting. */
export function CommunityIllustration({ className, title }: IllustrationProps) {
  const { urls, ids, titleId } = useIlIds("bg", "table", "lamp", "plate");
  return (
    <IlSvg
      viewBox="0 0 480 360"
      className={className}
      title={title}
      titleId={titleId}
      defs={
        <>
          <radialGradient id={ids.bg} cx="0.5" cy="0.4" r="0.62">
            <stop offset="0" stopColor={a[100]} />
            <stop offset="0.6" stopColor={b[100]} />
            <stop offset="1" stopColor={b[50]} stopOpacity={0} />
          </radialGradient>
          <linearGradient id={ids.table} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={P.wood.light} />
            <stop offset="1" stopColor={P.wood.base} />
          </linearGradient>
          <radialGradient id={ids.lamp} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor={P.marigold} stopOpacity={0.55} />
            <stop offset="1" stopColor={P.marigold} stopOpacity={0} />
          </radialGradient>
          <radialGradient id={ids.plate} cx="0.4" cy="0.35" r="0.7">
            <stop offset="0" stopColor={P.white} />
            <stop offset="1" stopColor={neutral[300]} />
          </radialGradient>
        </>
      }
    >
      <ellipse cx={240} cy={186} rx={236} ry={172} fill={urls.bg} />

      {/* Bunting */}
      <path d="M52 52 Q240 92 428 52" stroke={P.ink} strokeWidth={1.5} opacity={0.5} />
      {flags.map(([x, c], i) => {
        const y = 52 + 40 * (1 - ((x - 240) / 188) ** 2) * 0.5;
        return <path key={i} d={`M${x - 9} ${y} L${x + 9} ${y} L${x} ${y + 16}Z`} fill={c} />;
      })}

      {/* Pendant lamps */}
      {[150, 330].map((x, i) => (
        <g key={x}>
          <path d={`M${x} 0 V96`} stroke={P.ink} strokeWidth={1.5} opacity={0.6} />
          <circle className="il-glow" style={{ animationDelay: `${i * 1.8}s` }} cx={x} cy={118} r={44} fill={urls.lamp} />
          <path d={`M${x - 18} 112 C${x - 18} 96 ${x + 18} 96 ${x + 18} 112Z`} fill={b[700]} {...line} />
          <ellipse cx={x} cy={113} rx={8} ry={3} fill={P.marigold} />
        </g>
      ))}

      <Plant x={36} y={300} s={1.1} pot={b[600]} />
      <Plant x={448} y={300} s={0.9} />

      {/* Diners (behind the table) */}
      {diners.map((d) => (
        <Bust key={d.x} x={d.x} y={236} s={0.95} look={d.look} arms={d.arms ?? "rest"} />
      ))}

      {/* Table */}
      <Shadow cx={240} cy={312} rx={190} ry={8} o={0.14} />
      <rect x={66} y={226} width={348} height={20} rx={8} fill={urls.table} {...line} />
      <path d="M90 246 V306 M390 246 V306 M100 246 L120 280 M380 246 L360 280" stroke={P.wood.dark} strokeWidth={8} strokeLinecap="round" />

      {/* Thalis, chai and a water jug */}
      {[120, 196, 284, 360].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy={230} rx={24} ry={7} fill={urls.plate} {...line} />
          <circle cx={x - 10} cy={228} r={4} fill={P.marigold} />
          <circle cx={x} cy={227} r={4} fill={a[500]} />
          <circle cx={x + 10} cy={228} r={4} fill={P.leaf.base} />
        </g>
      ))}
      {[158, 322].map((x, i) => (
        <g key={x}>
          <path d={`M${x - 5} 226 L${x - 4} 212 H${x + 4} L${x + 5} 226Z`} fill={P.white} {...line} />
          <rect x={x - 4} y={216} width={8} height={7} fill={P.wood.base} />
          <Steam x={x} y={206} delay={i * 1.2} />
        </g>
      ))}
      <path d="M232 226 C226 214 228 200 234 196 H246 C252 200 254 214 248 226Z" fill={b[300]} opacity={0.9} {...line} />
      <path d="M246 202 C256 202 256 214 249 216" {...line} />

      {/* Floating heart bubble */}
      <g className="il-float" style={{ animationDelay: "0.8s" }}>
        <rect x={398} y={104} width={50} height={36} rx={12} fill={P.white} {...line} />
        <path d="M410 140 L404 152 L420 140" fill={P.white} {...line} />
        <path
          d="M423 130 C410 121 412 112 418 112 C421 112 423 115 423 115 C423 115 425 112 428 112 C434 112 436 121 423 130Z"
          fill={a[500]}
        />
      </g>
    </IlSvg>
  );
}
