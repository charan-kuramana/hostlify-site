import { colors, neutral } from "@/lib/tokens";
import { Bust, IlSvg, line, P, Plant, Shadow, Steam, useIlIds, type IllustrationProps } from "./shared";

const b = colors.brand;
const a = colors.accent;

/** Friendly support teammate with a headset, answering chats. */
export function SupportIllustration({ className, title }: IllustrationProps) {
  const { urls, ids, titleId } = useIlIds("bg", "desk", "laptop", "bubble");
  return (
    <IlSvg
      viewBox="0 0 480 360"
      className={className}
      title={title}
      titleId={titleId}
      defs={
        <>
          <radialGradient id={ids.bg} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor={b[100]} />
            <stop offset="0.7" stopColor={b[200]} stopOpacity={0.6} />
            <stop offset="1" stopColor={b[200]} stopOpacity={0} />
          </radialGradient>
          <linearGradient id={ids.desk} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={P.wood.light} />
            <stop offset="1" stopColor={P.wood.base} />
          </linearGradient>
          <linearGradient id={ids.laptop} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={neutral[200]} />
            <stop offset="1" stopColor={neutral[400]} />
          </linearGradient>
          <linearGradient id={ids.bubble} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={b[500]} />
            <stop offset="1" stopColor={b[700]} />
          </linearGradient>
        </>
      }
    >
      <circle cx={240} cy={196} r={160} fill={urls.bg} />

      {/* Support person with headset */}
      <Bust
        x={220}
        y={262}
        s={1.4}
        look={{ skin: P.skin.light, hair: P.hair.black, top: a[500], hairStyle: "long", dupatta: P.marigold }}
        arms="wave"
      >
        <path d="M-13 -70 C-13 -88 13 -88 13 -70" stroke={P.ink} strokeWidth={3} strokeLinecap="round" />
        <rect x={-16} y={-74} width={6} height={12} rx={3} fill={P.ink} />
        <rect x={10} y={-74} width={6} height={12} rx={3} fill={P.ink} />
        <path d="M-13 -64 C-12 -54 -6 -52 0 -54" stroke={P.ink} strokeWidth={2} strokeLinecap="round" />
        <circle cx={1} cy={-54} r={2.5} fill={b[500]} />
      </Bust>

      {/* Desk, laptop, chai, plant */}
      <Shadow cx={240} cy={318} rx={170} ry={8} o={0.14} />
      <rect x={70} y={258} width={340} height={16} rx={7} fill={urls.desk} {...line} />
      <path d="M96 274 V312 M384 274 V312" stroke={P.wood.dark} strokeWidth={8} strokeLinecap="round" />
      <path d="M170 258 L180 206 H264 L274 258Z" fill={urls.laptop} {...line} />
      <path d="M158 258 H286" stroke={P.ink} strokeWidth={4} strokeLinecap="round" />
      <circle cx={222} cy={232} r={7} fill={P.white} opacity={0.8} />
      <path d="M318 258 V238 H340 V258Z" fill={P.white} {...line} />
      <path d="M340 242 C350 242 350 254 340 254" {...line} />
      <rect x={318} y={242} width={22} height={7} fill={P.wood.base} />
      <Steam x={326} y={232} />
      <Steam x={333} y={230} delay={1.3} />
      <Plant x={108} y={258} s={0.85} pot={b[600]} />

      {/* Chat bubbles */}
      <g className="il-float">
        <rect x={40} y={70} width={124} height={50} rx={16} fill={P.white} {...line} />
        <path d="M134 120 L148 136 L148 120" fill={P.white} {...line} />
        <rect x={56} y={84} width={84} height={7} rx={3.5} fill={b[800]} />
        <rect x={56} y={98} width={56} height={6} rx={3} fill={neutral[300]} />
      </g>
      <g className="il-float" style={{ animationDelay: "1.6s" }}>
        <rect x={300} y={56} width={140} height={54} rx={16} fill={urls.bubble} />
        <path d="M318 110 L310 126 L332 110" fill={b[700]} />
        <rect x={316} y={72} width={96} height={7} rx={3.5} fill={P.white} />
        <rect x={316} y={86} width={64} height={6} rx={3} fill={P.white} opacity={0.6} />
        <circle cx={424} cy={60} r={12} fill={colors.success[500]} stroke={P.white} strokeWidth={2} />
        <path d="M418 60 l4 4 l8 -8" stroke={P.white} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g className="il-float" style={{ animationDelay: "3s" }}>
        <rect x={326} y={140} width={76} height={34} rx={17} fill={P.white} {...line} />
        {[346, 364, 382].map((x, i) => (
          <circle
            key={x}
            className="il-glow"
            style={{ animationDelay: `${i * 0.4}s`, animationDuration: "1.4s" }}
            cx={x}
            cy={157}
            r={4.5}
            fill={b[500]}
          />
        ))}
      </g>
      <g className="il-float" style={{ animationDelay: "2.2s" }}>
        <circle cx={74} cy={172} r={20} fill={a[100]} {...line} />
        <path d="M74 182 C62 174 63 165 68 165 C71 165 74 168 74 168 C74 168 77 165 80 165 C85 165 86 174 74 182Z" fill={a[500]} />
      </g>
    </IlSvg>
  );
}
