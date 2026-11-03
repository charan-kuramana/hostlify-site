import { AnimatePresence, m, useInView, useReducedMotion, type Variants } from "motion/react";
import { Pause, Play } from "lucide-react";
import { useCallback, useId, useRef, useState } from "react";
import { residentShowcase } from "@/content/home";
import { residentMocks } from "@/content/home-mocks";
import { cn } from "@/lib/cn";
import { ease, fadeUp, spring, stagger, viewport } from "@/lib/motion";
import { useInterval } from "@/hooks/useInterval";
import { usePageVisible } from "@/hooks/usePageVisible";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PhoneFrame } from "@/components/mockups/PhoneFrame";
import { ComplaintScreen, ReferScreen, residentScreens } from "./ResidentShowcase/ResidentScreens";

const screens = residentMocks.screens;
const callouts = residentShowcase.callouts;
const leftCallouts = callouts.slice(0, 3);
const rightCallouts = callouts.slice(3);
type Callout = (typeof callouts)[number];

/** Curves from the callout toward the phones (left side; mirrored on the right). */
const connectorPaths = [
  { d: "M2 8 C 40 8, 44 32, 78 32", end: 32 },
  { d: "M2 20 H78", end: 20 },
  { d: "M2 32 C 40 32, 44 8, 78 8", end: 8 },
] as const;

function Connector({ row, side, drawn, delay }: { row: number; side: "left" | "right"; drawn: boolean; delay: number }) {
  const maskId = `rs-mask-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const path = connectorPaths[row] ?? connectorPaths[1];
  return (
    <svg
      viewBox="0 0 80 40"
      fill="none"
      aria-hidden="true"
      className={cn("h-10 w-12 shrink-0 overflow-visible text-brand-400 xl:w-20", side === "right" && "-scale-x-100")}
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="-5" y="-5" width="90" height="50">
          <m.path
            d={path.d}
            stroke="white"
            strokeWidth="6"
            initial={false}
            animate={{ pathLength: drawn ? 1 : 0 }}
            transition={{ duration: 0.8, delay, ease: ease.outQuart }}
          />
        </mask>
      </defs>
      <path d={path.d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="0.5 4.5" mask={`url(#${maskId})`} />
      <m.circle
        cx="78"
        cy={path.end}
        r="3"
        fill="currentColor"
        initial={false}
        animate={{ scale: drawn ? 1 : 0, opacity: drawn ? 1 : 0 }}
        transition={{ ...spring.bouncy, delay: delay + 0.7 }}
      />
    </svg>
  );
}

function CalloutChip({ callout, className }: { callout: Callout; className?: string }) {
  return (
    <span
      className={cn(
        "flex items-center gap-3 rounded-xl border border-brand-100 bg-white px-3.5 py-3 text-sm font-semibold text-brand-900 shadow-card",
        className,
      )}
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-lg" aria-hidden="true">
        {callout.emoji}
      </span>
      <span>{callout.text}</span>
    </span>
  );
}

function CalloutColumn({ items, side, drawn }: { items: readonly Callout[]; side: "left" | "right"; drawn: boolean }) {
  return (
    <ul className={cn("flex flex-col gap-14", side === "left" ? "items-end" : "items-start")}>
      {items.map((c, row) => (
        <m.li
          key={c.id}
          initial={false}
          animate={drawn ? { opacity: 1, x: 0 } : { opacity: 0, x: side === "left" ? -16 : 16 }}
          transition={{ duration: 0.6, delay: 0.45 + row * 0.12, ease: ease.outExpo }}
          className={cn("flex items-center gap-2", side === "right" && "flex-row-reverse")}
        >
          <CalloutChip callout={c} className="max-w-[11rem] xl:max-w-[12rem]" />
          <Connector row={row} side={side} drawn={drawn} delay={0.6 + row * 0.12} />
        </m.li>
      ))}
    </ul>
  );
}

const sidePhone = (dir: 1 | -1): Variants => ({
  hidden: { x: "0%", rotate: 0, scale: 0.84, opacity: 0 },
  show: { x: `${dir * 62}%`, rotate: dir * 8, scale: 0.9, opacity: 1, transition: { ...spring.soft, delay: 0.15 } },
});

/* ---------- Desktop: fanned phones + callouts ---------- */
function DesktopFan() {
  const ref = useRef<HTMLDivElement>(null);
  const revealed = useInView(ref, { once: true, amount: 0.3 });
  const onScreen = useInView(ref, { amount: 0.15 });
  const pageVisible = usePageVisible();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const [interacting, setInteracting] = useState(false);
  const paused = userPaused ?? Boolean(reduce); // auto-cycling is off by default under reduced motion
  const running = revealed && onScreen && pageVisible && !paused && !interacting;

  useInterval(() => setIndex((i) => (i + 1) % screens.length), 3000, running);

  const current = screens[index] ?? screens[0];
  const Screen = residentScreens[current.id];

  return (
    <div ref={ref} className="hidden lg:block">
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 xl:gap-4">
        <CalloutColumn items={leftCallouts} side="left" drawn={revealed} />

        <div className="relative flex h-[540px] w-[460px] items-center justify-center xl:h-[600px] xl:w-[600px]" aria-hidden="true">
          <div className="absolute inset-10 rounded-full bg-brand-200/50 blur-3xl" />
          {([-1, 1] as const).map((dir) => (
            <div key={dir} className="absolute inset-0 flex items-center justify-center">
              <m.div variants={sidePhone(dir)} initial="hidden" animate={revealed ? "show" : "hidden"}>
                <PhoneFrame className="w-[210px] shadow-lift xl:w-[240px]">{dir === -1 ? <ComplaintScreen /> : <ReferScreen />}</PhoneFrame>
              </m.div>
            </div>
          ))}
          <m.div
            className="relative z-10"
            initial={{ opacity: 0, y: 24 }}
            animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, ease: ease.outExpo }}
            onPointerEnter={() => setInteracting(true)}
            onPointerLeave={() => setInteracting(false)}
          >
            <PhoneFrame className="w-[230px] xl:w-[260px]">
              <AnimatePresence initial={false}>
                <m.div
                  key={current.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: ease.outExpo }}
                >
                  {Screen && <Screen />}
                </m.div>
              </AnimatePresence>
            </PhoneFrame>
          </m.div>
        </div>

        <CalloutColumn items={rightCallouts} side="right" drawn={revealed} />
      </div>

      {/* Carousel controls (WCAG 2.2.2: pause for auto-updating content) */}
      <div
        className="mt-6 flex items-center justify-center gap-2"
        role="group"
        aria-label={residentMocks.carouselLabel}
        onFocus={() => setInteracting(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setInteracting(false);
        }}
      >
        <button
          type="button"
          onClick={() => setUserPaused(!paused)}
          aria-label={paused ? residentMocks.play : residentMocks.pause}
          className="grid size-11 place-items-center rounded-full border border-brand-200 bg-white text-brand-700 shadow-card transition-colors hover:bg-brand-100"
        >
          {paused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
        </button>
        <ul className="flex items-center">
          {screens.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={residentMocks.showScreen(s.name)}
                aria-current={i === index ? "true" : undefined}
                className="group grid size-11 place-items-center rounded-full"
              >
                <span
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === index ? "w-6 bg-brand-600" : "w-2 bg-brand-200 group-hover:bg-brand-300",
                  )}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Mobile: swipeable single phone + chip grid ---------- */
function MobileCarousel() {
  const scroller = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  const onScroll = useCallback(() => {
    const el = scroller.current;
    if (!el || el.clientWidth === 0) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    setIndex((prev) => (prev === i ? prev : i));
  }, []);

  const goTo = (i: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="lg:hidden">
      <m.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className="flex flex-col items-center">
        <PhoneFrame className="w-[240px] sm:w-[260px]">
          <div
            ref={scroller}
            onScroll={onScroll}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label={residentMocks.carouselLabel}
            className="flex h-full snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto overscroll-x-contain focus-visible:outline-offset-[-4px] [&::-webkit-scrollbar]:hidden"
          >
            {screens.map((s, i) => {
              const Screen = residentScreens[s.id];
              return (
                <div
                  key={s.id}
                  className="h-full w-full shrink-0 snap-center snap-always"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} / ${screens.length}: ${s.name}`}
                >
                  <div aria-hidden="true" className="h-full">
                    {Screen && <Screen />}
                  </div>
                </div>
              );
            })}
          </div>
        </PhoneFrame>
        <ul className="mt-3 flex items-center">
          {screens.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={residentMocks.showScreen(s.name)}
                aria-current={i === index ? "true" : undefined}
                className="grid size-11 place-items-center rounded-full"
              >
                <span
                  className={cn("h-2 rounded-full transition-all duration-300", i === index ? "w-6 bg-brand-600" : "w-2 bg-brand-200")}
                />
              </button>
            </li>
          ))}
        </ul>
      </m.div>
      <m.ul
        variants={stagger(0.06)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mx-auto mt-6 grid max-w-2xl grid-cols-2 gap-2.5 sm:gap-3"
      >
        {callouts.map((c) => (
          <m.li key={c.id} variants={fadeUp} className="flex">
            <CalloutChip callout={c} className="w-full items-start gap-2.5 px-3 text-[13px] leading-snug sm:items-center sm:text-sm" />
          </m.li>
        ))}
      </m.ul>
    </div>
  );
}

/** §9.8 — Resident app showcase (brand-50). */
export function ResidentShowcase() {
  const s = residentShowcase;
  return (
    <Section id="resident-app" theme="tint">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid" aria-hidden="true" />
      <SectionHeader
        eyebrow={s.eyebrow}
        title={
          <>
            {s.titleStart} <span className="text-gradient">{s.titleHighlight}</span> {s.titleEnd}
          </>
        }
        lead={s.lead}
      />
      <DesktopFan />
      <MobileCarousel />
      <div className="mt-10 flex justify-center">
        <Button href={s.cta.href} variant="primary" size="lg" arrow>
          {s.cta.label}
        </Button>
      </div>
    </Section>
  );
}
