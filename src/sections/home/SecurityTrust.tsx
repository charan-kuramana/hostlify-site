import { m, useInView } from "motion/react";
import { KeyRound, ShieldAlert } from "lucide-react";
import { useId, useRef } from "react";
import { security } from "@/content/home";
import { colors } from "@/lib/tokens";
import { ease, fadeUp, stagger, viewport } from "@/lib/motion";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IconTile } from "@/components/ui/IconTile";
import { AnimatedIconHover, useIconHover } from "@/components/icons/AnimatedIcon";
import { cn } from "@/lib/cn";
import { toneFor } from "@/lib/iconTones";

/**
 * Shield outline split into segments; each one slides in from outside and draws itself,
 * then the check draws in — the shield "assembles" (§9.14).
 */
const segments = [
  { id: "top-r", d: "M60 10 L104 24", dx: 8, dy: -8 },
  { id: "side-r", d: "M104 24 V64", dx: 12, dy: 0 },
  { id: "curve-r", d: "M104 64 C104 98 86 118 60 132", dx: 8, dy: 8 },
  { id: "curve-l", d: "M60 132 C34 118 16 98 16 64", dx: -8, dy: 8 },
  { id: "side-l", d: "M16 64 V24", dx: -12, dy: 0 },
  { id: "top-l", d: "M16 24 L60 10", dx: -8, dy: -8 },
] as const;

function AssemblingShield() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const gid = `shield-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <div className="relative mx-auto grid size-44 place-items-center lg:mx-0 lg:size-52" aria-hidden="true">
      <div className="absolute inset-4 rounded-full bg-brand-400/25 blur-3xl" />
      <svg ref={ref} viewBox="0 0 120 142" fill="none" className="relative h-full w-full overflow-visible">
        <defs>
          <linearGradient id={gid} x1="16" y1="10" x2="104" y2="132" gradientUnits="userSpaceOnUse">
            <stop stopColor={colors.brand[300]} />
            <stop offset="1" stopColor={colors.brand[500]} />
          </linearGradient>
        </defs>
        {/* faint fill that fades in once assembled */}
        <m.path
          d="M60 10 L104 24 V64 C104 98 86 118 60 132 C34 118 16 98 16 64 V24 Z"
          fill="white"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 0.06 : 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        />
        {segments.map((s, i) => (
          <m.path
            key={s.id}
            d={s.d}
            stroke={`url(#${gid})`}
            strokeWidth="5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0, x: s.dx, y: s.dy }}
            animate={inView ? { pathLength: 1, opacity: 1, x: 0, y: 0 } : { pathLength: 0, opacity: 0, x: s.dx, y: s.dy }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: ease.outExpo }}
          />
        ))}
        <m.path
          d="M42 72 L55 85 L80 58"
          stroke={colors.success[500]}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? 1 : 0 }}
          transition={{ duration: 0.45, delay: 0.85, ease: ease.outQuart }}
        />
        <m.circle
          cx="60"
          cy="71"
          r="44"
          stroke={colors.brand[300]}
          strokeOpacity="0.4"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={inView ? { scale: [0.6, 1.25], opacity: [0.8, 0] } : { scale: 0.6, opacity: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: ease.outQuart }}
          style={{ originX: "60px", originY: "71px", transformBox: "view-box" }}
        />
      </svg>
    </div>
  );
}

const extraIcons = [ShieldAlert, KeyRound] as const;

type Tile = (typeof security.tiles)[number];

/** Glass tile with a hue-tinted icon; hovering the tile plays the animated icon (where one exists). */
function SecurityTile({ tile }: { tile: Tile }) {
  const [hover, handlers] = useIconHover();
  return (
    <m.li
      variants={fadeUp}
      {...handlers}
      className={cn(
        "group card-glow relative rounded-xl p-6 glass-dark transition-[background-color,translate] duration-300 ease-out hover:-translate-y-1 hover:bg-white/[0.08]",
        toneFor(tile.icon),
      )}
    >
      <AnimatedIconHover.Provider value={hover}>
        <IconTile name={tile.icon} variant="glass" animated />
      </AnimatedIconHover.Provider>
      <h3 className="mt-5 text-h4 font-bold text-white">{tile.title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-brand-100/75">{tile.body}</p>
    </m.li>
  );
}

/** §9.14 — Security & trust (dark). */
export function SecurityTrust() {
  return (
    <Section id="security" theme="dark">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid-dark" aria-hidden="true" />
      <div className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="text-center lg:text-left">
          <AssemblingShield />
          <SectionHeader
            eyebrow={security.eyebrow}
            title={security.title}
            lead={security.lead}
            theme="dark"
            align="left"
            className="mx-auto mt-8 mb-0 text-center md:mb-0 lg:mx-0 lg:text-left [&_p]:mx-auto lg:[&_p]:mx-0"
          />
          <m.ul
            variants={stagger(0.08, 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="mt-6 flex flex-col items-center gap-2 text-sm text-brand-100/80 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
          >
            {security.extra.map((line, i) => {
              const XIcon = extraIcons[i] ?? KeyRound;
              return (
                <m.li
                  key={line}
                  variants={fadeUp}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5"
                >
                  <XIcon className="size-4 text-brand-300" strokeWidth={1.75} aria-hidden="true" />
                  {line}
                </m.li>
              );
            })}
          </m.ul>
        </div>

        <m.ul variants={stagger(0.1, 0.15)} initial="hidden" whileInView="show" viewport={viewport} className="grid gap-4 sm:grid-cols-2">
          {security.tiles.map((tile) => (
            <SecurityTile key={tile.id} tile={tile} />
          ))}
        </m.ul>
      </div>
    </Section>
  );
}
