import { colors, neutral } from "@/lib/tokens";
import { IlSvg, line, P, Person, Plant, Shadow, useIlIds, type IllustrationProps } from "./shared";

const b = colors.brand;
const a = colors.accent;

/** Window grid: [col x, row y, lit?, glow delay or null] — fixed so pre-rendered markup is deterministic. */
const windows: [number, number, boolean, number | null][] = [
  [176, 112, true, null],
  [222, 112, false, null],
  [268, 112, true, 1.2],
  [176, 160, false, null],
  [222, 160, true, 2.4],
  [268, 160, true, null],
  [176, 208, true, 0.6],
  [222, 208, true, null],
  [268, 208, false, null],
];
const wingWindows: [number, number][] = [
  [86, 196],
  [116, 196],
  [86, 236],
  [116, 236],
];

/** Multi-storey hostel / PG at golden hour — lit windows, balcony, scooter and a new resident arriving with a suitcase. */
export function HostelBuildingIllustration({ className, title }: IllustrationProps) {
  const { urls, ids, titleId } = useIlIds("sky", "wall", "wing", "glass", "lit", "tree", "ground");
  return (
    <IlSvg
      viewBox="0 0 480 360"
      className={className}
      title={title}
      titleId={titleId}
      defs={
        <>
          <radialGradient id={ids.sky} cx="0.5" cy="0.45" r="0.6">
            <stop offset="0" stopColor={a[100]} />
            <stop offset="0.55" stopColor={b[100]} />
            <stop offset="1" stopColor={b[50]} stopOpacity={0} />
          </radialGradient>
          <linearGradient id={ids.wall} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={P.white} />
            <stop offset="1" stopColor={b[100]} />
          </linearGradient>
          <linearGradient id={ids.wing} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={b[200]} />
            <stop offset="1" stopColor={b[300]} />
          </linearGradient>
          <linearGradient id={ids.glass} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={b[300]} />
            <stop offset="1" stopColor={b[600]} />
          </linearGradient>
          <linearGradient id={ids.lit} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={colors.warning[100]} />
            <stop offset="1" stopColor={P.marigold} />
          </linearGradient>
          <radialGradient id={ids.tree} cx="0.35" cy="0.3" r="0.8">
            <stop offset="0" stopColor={P.leaf.light} />
            <stop offset="1" stopColor={P.leaf.dark} />
          </radialGradient>
          <linearGradient id={ids.ground} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={neutral[200]} />
            <stop offset="1" stopColor={neutral[100]} />
          </linearGradient>
        </>
      }
    >
      <ellipse cx={240} cy={190} rx={236} ry={170} fill={urls.sky} />
      <circle cx={372} cy={78} r={24} fill={P.marigold} opacity={0.35} />
      <circle cx={372} cy={78} r={15} fill={P.marigold} opacity={0.8} />

      {/* Distant skyline: temple dome, water tank, palms */}
      <g fill={b[200]} opacity={0.75}>
        <path d="M18 300 V232 H54 V300Z M330 300 V200 H366 V300Z M440 300 V222 H470 V300Z" />
        <path d="M58 300 V238 H84 V226 C84 212 106 212 106 226 V238 H112 V300Z" />
        <path d="M95 212 V200" stroke={b[200]} strokeWidth={3} strokeLinecap="round" />
        <rect x={396} y={168} width={34} height={22} rx={4} />
        <path d="M400 190 L394 300 M426 190 L432 300 M413 190 V300" stroke={b[200]} strokeWidth={3} />
      </g>
      <g stroke={b[300]} strokeWidth={3} strokeLinecap="round" fill="none" opacity={0.8}>
        <path d="M30 300 C32 260 36 236 44 214" />
        <path d="M44 214 C34 206 24 208 16 216 M44 214 C52 204 64 204 70 212 M44 214 C40 202 44 194 52 190 M44 214 C36 210 30 196 32 190" />
      </g>

      {/* Side wing */}
      <rect x={70} y={176} width={84} height={124} rx={6} fill={urls.wing} {...line} />
      <rect x={64} y={168} width={96} height={12} rx={4} fill={b[600]} {...line} />
      {wingWindows.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={20} height={26} rx={4} fill={urls.glass} {...line} />
      ))}

      {/* Main block */}
      <Shadow cx={240} cy={302} rx={120} ry={8} o={0.14} />
      <rect x={156} y={94} width={168} height={206} rx={8} fill={urls.wall} {...line} />
      <rect x={146} y={84} width={188} height={16} rx={5} fill={b[700]} {...line} />
      {/* Rooftop sign + water tank */}
      <path d="M200 84 V72 M280 84 V72" {...line} />
      <rect x={186} y={48} width={108} height={28} rx={8} fill={a[500]} {...line} />
      <path d="M200 62 l6 -7 l6 7 M206 55 V68" stroke={P.white} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      <rect x={222} y={58} width={58} height={4} rx={2} fill={P.white} />
      <rect x={222} y={66} width={36} height={3} rx={1.5} fill={P.white} opacity={0.7} />
      <rect x={300} y={60} width={22} height={20} rx={4} fill={neutral[300]} {...line} />

      {windows.map(([x, y, lit, glow]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width={36} height={32} rx={5} fill={lit ? urls.lit : urls.glass} {...line} />
          {glow !== null && (
            <rect
              className="il-glow"
              style={{ animationDelay: `${glow}s` }}
              x={x + 3}
              y={y + 3}
              width={30}
              height={26}
              rx={3}
              fill={P.white}
              opacity={0.6}
            />
          )}
          <path d={`M${x + 18} ${y + 2} V${y + 30}`} stroke={P.ink} strokeWidth={1.5} opacity={0.35} />
        </g>
      ))}

      {/* Balcony with drying clothes and plants */}
      <rect x={168} y={192} width={144} height={6} rx={3} fill={b[600]} />
      <path
        d="M176 196 V186 M212 196 V186 M248 196 V186 M284 196 V186 M304 196 V186 M172 186 H308"
        stroke={b[700]}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path d="M232 176 l6 0 l0 10 l-6 0Z M242 176 h8 v12 h-8Z" fill={a[500]} />
      <path d="M254 176 h7 v9 h-7Z" fill={P.teal} />
      <Plant x={186} y={186} s={0.38} />
      <Plant x={296} y={186} s={0.38} pot={P.wood.base} />

      {/* Entrance */}
      <path d="M212 256 H268 L262 246 H218Z" fill={a[500]} {...line} />
      <path d="M220 300 V266 C220 258 260 258 260 266 V300Z" fill={b[800]} {...line} />
      <circle cx={252} cy={282} r={2} fill={P.marigold} />
      <rect x={210} y={296} width={60} height={6} rx={2} fill={neutral[300]} />

      {/* Trees */}
      <rect x={428} y={248} width={8} height={54} rx={3} fill={P.wood.dark} />
      <circle className="il-sway" cx={432} cy={238} r={30} fill={urls.tree} />
      <rect x={30} y={264} width={6} height={38} rx={3} fill={P.wood.dark} />
      <circle cx={33} cy={256} r={20} fill={urls.tree} />

      {/* Ground */}
      <rect x={4} y={298} width={472} height={16} rx={8} fill={urls.ground} />

      {/* Scooter */}
      <Shadow cx={370} cy={302} rx={30} ry={4} />
      <circle cx={350} cy={292} r={9} fill={P.ink} />
      <circle cx={350} cy={292} r={3.5} fill={neutral[300]} />
      <circle cx={392} cy={292} r={9} fill={P.ink} />
      <circle cx={392} cy={292} r={3.5} fill={neutral[300]} />
      <path d="M342 288 C342 274 356 268 372 270 H382 L390 252 H398 L392 274 C398 278 400 284 400 288Z" fill={b[500]} {...line} />
      <rect x={350} y={262} width={24} height={8} rx={4} fill={P.ink} />
      <path d="M390 252 L386 244 H396" {...line} />

      {/* New resident arriving with a suitcase */}
      <Shadow cx={306} cy={302} rx={22} ry={4} />
      <Person
        x={300}
        y={300}
        s={0.62}
        look={{ skin: P.skin.medium, hair: P.hair.black, top: P.teal, hairStyle: "long", dupatta: P.marigold }}
        bottom={b[800]}
        backpack={b[600]}
        kurta
      />
      <path d="M311 277 V271 H323 V277" {...line} />
      <rect x={305} y={276} width={24} height={20} rx={4} fill={a[500]} {...line} />
      <path d="M311 283 H323" stroke={P.white} strokeWidth={2} strokeLinecap="round" opacity={0.7} />
    </IlSvg>
  );
}
