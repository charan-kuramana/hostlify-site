import { colors, neutral } from "@/lib/tokens";
import { IlSvg, line, P, Person, Plant, Shadow, useIlIds, type IllustrationProps } from "./shared";

const b = colors.brand;
const a = colors.accent;

/** Move-in day: a resident with a backpack arrives at a shared room with a bunk bed; the phone confirms the booking. */
export function MoveInIllustration({ className, title }: IllustrationProps) {
  const { urls, ids, titleId } = useIlIds("wall", "floor", "sky", "blanket", "phone", "glow");
  return (
    <IlSvg
      viewBox="0 0 480 360"
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
          <linearGradient id={ids.sky} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={b[300]} />
            <stop offset="1" stopColor={a[100]} />
          </linearGradient>
          <linearGradient id={ids.blanket} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={b[500]} />
            <stop offset="1" stopColor={b[700]} />
          </linearGradient>
          <linearGradient id={ids.phone} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={P.white} />
            <stop offset="1" stopColor={b[50]} />
          </linearGradient>
          <radialGradient id={ids.glow} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor={colors.success[500]} stopOpacity={0.35} />
            <stop offset="1" stopColor={colors.success[500]} stopOpacity={0} />
          </radialGradient>
        </>
      }
    >
      {/* Room shell */}
      <rect x={24} y={24} width={432} height={300} rx={28} fill={urls.wall} />
      <path d="M24 262 H456 V296 C456 311 444 324 428 324 H52 C36 324 24 311 24 296Z" fill={urls.floor} />
      <path d="M24 262 H456" stroke={P.wood.dark} strokeWidth={2} opacity={0.5} />

      {/* Window with curtains */}
      <rect x={196} y={64} width={92} height={80} rx={8} fill={urls.sky} {...line} />
      <circle cx={262} cy={92} r={10} fill={P.marigold} opacity={0.85} />
      <path d="M204 136 C220 118 236 122 248 110 C258 122 272 116 282 136Z" fill={b[300]} opacity={0.7} />
      <path d="M242 64 V144 M196 104 H288" stroke={P.white} strokeWidth={3} />
      <path d="M186 58 H298" {...line} />
      <path d="M190 60 C202 90 196 120 206 150 H186Z" fill={a[500]} />
      <path d="M294 60 C282 90 288 120 278 150 H298Z" fill={a[500]} />

      {/* Bunk bed */}
      <Shadow cx={112} cy={266} rx={88} ry={6} o={0.14} />
      <rect x={34} y={78} width={10} height={188} rx={4} fill={P.wood.base} {...line} />
      <rect x={180} y={78} width={10} height={188} rx={4} fill={P.wood.base} {...line} />
      <rect x={44} y={136} width={136} height={10} rx={3} fill={P.wood.dark} {...line} />
      <rect x={44} y={230} width={136} height={10} rx={3} fill={P.wood.dark} {...line} />
      <rect x={48} y={118} width={128} height={18} rx={6} fill={P.white} {...line} />
      <path d="M90 118 C110 108 150 110 176 118 V136 H90Z" fill={urls.blanket} {...line} />
      <rect x={54} y={106} width={30} height={14} rx={6} fill={a[100]} {...line} />
      <rect x={48} y={212} width={128} height={18} rx={6} fill={P.white} {...line} />
      <path d="M96 212 C116 202 150 204 176 212 V230 H96Z" fill={a[500]} {...line} />
      <rect x={54} y={200} width={30} height={14} rx={6} fill={b[100]} {...line} />
      <path d="M160 146 V230 M176 146 V230 M160 168 H176 M160 190 H176" stroke={P.wood.dark} strokeWidth={3} strokeLinecap="round" />
      <path d="M44 100 H180" {...line} />

      {/* Wall shelf + plant */}
      <rect x={322} y={96} width={92} height={7} rx={3} fill={P.wood.base} {...line} />
      <Plant x={344} y={96} s={0.45} pot={b[600]} />
      <rect x={366} y={76} width={10} height={20} rx={2} fill={a[500]} />
      <rect x={378} y={80} width={10} height={16} rx={2} fill={P.teal} />
      <rect x={390} y={72} width={9} height={24} rx={2} fill={P.marigold} />

      {/* Duffel bag on the floor */}
      <Shadow cx={240} cy={290} rx={34} ry={5} />
      <path d="M210 288 C206 272 214 262 240 262 C266 262 274 272 270 288Z" fill={P.plum} {...line} />
      <path d="M226 264 C228 252 252 252 254 264" {...line} />
      <path d="M216 276 H264" stroke={P.white} strokeWidth={2} strokeLinecap="round" opacity={0.5} />

      {/* Resident */}
      <Shadow cx={330} cy={296} rx={26} ry={5} />
      <Person
        x={330}
        y={294}
        s={0.95}
        look={{ skin: P.skin.deep, hair: P.hair.black, top: b[600], hairStyle: "wavy", collar: P.white }}
        bottom={P.ink}
        backpack={a[500]}
        arm="phone"
        flip
      />

      {/* Phone with booking confirmed */}
      <g className="il-float">
        <circle cx={410} cy={196} r={60} fill={urls.glow} />
        <rect x={376} y={138} width={70} height={118} rx={14} fill={P.ink} />
        <rect x={381} y={146} width={60} height={102} rx={10} fill={urls.phone} />
        <circle cx={411} cy={182} r={17} fill={colors.success[500]} />
        <path d="M403 182 l6 6 l11 -12" stroke={P.white} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
        <rect x={392} y={208} width={38} height={5} rx={2.5} fill={b[800]} />
        <rect x={398} y={218} width={26} height={4} rx={2} fill={neutral[300]} />
        <rect x={390} y={230} width={42} height={11} rx={5.5} fill={b[600]} />
      </g>
      <circle className="il-glow" cx={366} cy={140} r={4} fill={P.marigold} />
      <circle className="il-glow" style={{ animationDelay: "1.5s" }} cx={452} cy={168} r={3} fill={a[500]} />
    </IlSvg>
  );
}
