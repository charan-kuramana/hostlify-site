import { HeroBackdrop } from "@/components/backgrounds/HeroBackdrop";
import { AnimatePresence, m, useInView, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Check, Play } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { hero, type Audience } from "@/content/home";
import { heroExtra } from "@/content/home-extra";
import { site } from "@/content/site";
import { track } from "@/lib/analytics";
import { ease } from "@/lib/motion";
import { useFinePointer } from "@/hooks/useMediaQuery";
import { usePageVisible } from "@/hooks/usePageVisible";
import { useInterval } from "@/hooks/useInterval";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Magnetic } from "@/components/motion/Magnetic";
import { WordReveal } from "@/components/motion/WordReveal";
import { AudienceToggle } from "./AudienceToggle";
import { DashboardMock } from "./DashboardMock";
import { FloatingCards } from "./FloatingCards";
import { BedPickerPhone } from "./BedPickerPhone";
import { VideoModal } from "./VideoModal";

const TICK_MS = 4000;
const ticker = hero.rentTicker;
/** Stop the live ticker after two full cycles (WCAG 2.2.2 — no endless auto-updates). */
const MAX_TICKS = ticker.length * 2;
const baseCollected = hero.dashboard.stats.find((s) => s.id === "collected")?.value ?? 0;

/** CSS entrance delay — first paint must not wait for JS (see .enter in globals.css). */
function enterDelay(seconds: number) {
  return { "--d": `${seconds}s` } as React.CSSProperties;
}

function collectedAt(tick: number) {
  let total = baseCollected;
  for (let i = 1; i <= tick; i++) total += ticker[i % ticker.length]?.amount ?? 0;
  return total;
}

export function Hero() {
  const [audience, setAudience] = useState<Audience>("owner");
  const [switched, setSwitched] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [tick, setTick] = useState(0);
  const [hovering, setHovering] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.2 });
  const pageVisible = usePageVisible();
  const reduce = useReducedMotion();
  const fine = useFinePointer();

  const live = audience === "owner" && inView && pageVisible && !reduce && !hovering && tick < MAX_TICKS;
  const advance = useCallback(() => setTick((t) => t + 1), []);
  useInterval(advance, TICK_MS, live);

  // Scroll-out: mockup recedes as the hero leaves the viewport.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const visualOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  // Mouse parallax (fine pointers only), normalised to -1..1 across the hero.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!fine || reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    pointerX.set(((e.clientX - r.left) / r.width) * 2 - 1);
    pointerY.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onPointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const changeAudience = (next: Audience) => {
    if (next === audience) return;
    setSwitched(true);
    setAudience(next);
    track("audience_toggle", { audience: next });
  };

  const current = ticker[tick % ticker.length] ?? ticker[0];
  const payment = { key: `p${tick}`, amount: current.amount, room: current.room };
  const latest = tick > 0 ? payment : null;

  const c = audience === "owner" ? hero.owner : hero.resident;
  const d0 = 0;

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative isolate -mt-16 overflow-x-clip bg-white pt-[calc(4rem+2rem)] pb-16 sm:pt-[calc(4rem+3.5rem)] md:pb-20 lg:-mt-[72px] lg:pt-[calc(72px+4.5rem)] lg:pb-28"
    >
      {/* Premium animated backdrop — warms up in resident mode */}
      <HeroBackdrop palette={audience === "resident" ? "accent" : "aurora"} />

      <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
        {/* Copy */}
        <div className="min-w-0 lg:col-span-5">
          <AudienceToggle value={audience} onChange={changeAudience} className="mb-7" />
          <AnimatePresence mode="wait">
            <m.div key={audience} initial={false} exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}>
              <div className="enter" style={enterDelay(d0)}>
                <Eyebrow>{c.eyebrow}</Eyebrow>
              </div>
              <WordReveal
                as="h1"
                onMount
                delay={d0}
                parts={[{ text: c.titleStart }, { text: c.titleHighlight, highlight: true }]}
                highlightClassName={audience === "resident" ? "text-gradient-warm" : "text-gradient-animated"}
                className="mt-4 text-[2.25rem] leading-[1.06] font-extrabold tracking-[-0.03em] sm:text-display lg:text-[clamp(2.75rem,3.6vw+0.5rem,3.75rem)]"
              />
              <p style={enterDelay(d0 + 0.3)} className="enter mt-5 max-w-[34rem] text-lead text-gray-600">
                {c.lead}
              </p>
              <div style={enterDelay(d0 + 0.4)} className="enter mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                {audience === "owner" ? (
                  <>
                    <Magnetic className="inline-block w-full sm:w-auto">
                      <Button
                        href={hero.owner.primary.href}
                        size="lg"
                        arrow
                        className="w-full sm:w-auto"
                        onClick={() => track("cta_click", { location: "hero_owner" })}
                      >
                        {hero.owner.primary.label}
                      </Button>
                    </Magnetic>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto"
                      leftIcon={<Play className="fill-current" aria-hidden="true" />}
                      aria-haspopup="dialog"
                      onClick={() => {
                        setVideoOpen(true);
                        track("video_play", { location: "hero" });
                      }}
                    >
                      {hero.owner.secondary.label}
                    </Button>
                  </>
                ) : (
                  <>
                    {/* Resident app links are hidden until the app is live — flip site.features.residentApp */}
                    {site.features.residentApp && (
                      <Magnetic className="inline-block w-full sm:w-auto">
                        <Button
                          href={site.links.discover}
                          size="lg"
                          arrow
                          className="w-full sm:w-auto"
                          onClick={() => track("app_signup_click", { location: "hero_resident" })}
                        >
                          {hero.resident.primary.label}
                        </Button>
                      </Magnetic>
                    )}
                    <Button
                      href={hero.resident.secondary.href}
                      variant={site.features.residentApp ? "outline" : "primary"}
                      arrow={!site.features.residentApp}
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      {hero.resident.secondary.label}
                    </Button>
                  </>
                )}
              </div>
              <ul style={enterDelay(d0 + 0.5)} className="enter mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600">
                {c.micro.map((item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <Check className="size-4 text-success-500" strokeWidth={2.5} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </m.div>
          </AnimatePresence>
        </div>

        {/* Visual */}
        <div className="relative min-w-0 lg:col-span-7">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-6 top-10 bottom-6 -z-10 bg-[radial-gradient(closest-side,var(--color-brand-400),transparent)] opacity-30"
          />
          <m.div style={{ scale: visualScale, opacity: visualOpacity, y: visualY }} className="origin-top">
            <div
              role="img"
              aria-label={audience === "owner" ? heroExtra.visualLabelOwner : heroExtra.visualLabelResident}
              onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
              onPointerLeave={() => setHovering(false)}
              className="relative h-[360px] overflow-hidden [mask-image:linear-gradient(to_bottom,black_72%,transparent)] [perspective:1400px] sm:h-[460px] lg:flex lg:h-auto lg:min-h-[540px] lg:items-center lg:overflow-visible lg:[mask-image:none]"
            >
              <AnimatePresence mode="wait">
                {audience === "owner" ? (
                  <m.div
                    key="owner"
                    className={switched ? "relative w-full" : "enter-visual relative w-full"}
                    initial={switched ? { opacity: 0, y: 40, scale: 0.96, rotateX: 8 } : false}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      rotateX: 0,
                      transition: { duration: 0.9, delay: switched ? 0 : 0.35, ease: ease.outExpo },
                    }}
                    exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
                  >
                    <DashboardMock collected={collectedAt(tick)} latest={latest} />
                    <FloatingCards pointer={{ x: pointerX, y: pointerY }} payment={payment} />
                  </m.div>
                ) : (
                  <m.div
                    key="resident"
                    className="relative w-full pt-2 lg:pt-0"
                    initial={{ opacity: 0, y: 32, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: ease.outExpo } }}
                    exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
                  >
                    <BedPickerPhone />
                  </m.div>
                )}
              </AnimatePresence>
            </div>
            <p className="mt-3 text-center text-xs text-gray-500 lg:mt-5">{heroExtra.sampleData}</p>
          </m.div>
        </div>
      </div>

      <VideoModal open={videoOpen} onOpenChange={setVideoOpen} />
    </section>
  );
}
