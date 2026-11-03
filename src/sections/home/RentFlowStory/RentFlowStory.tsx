import { AnimatePresence, m, useInView, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { rentFlow } from "@/content/home";
import { rentFlowMocks } from "@/content/home-mocks";
import { cn } from "@/lib/cn";
import { ease, fadeUp, viewport } from "@/lib/motion";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/icons/Icon";
import { PhoneFrame } from "@/components/mockups/PhoneFrame";
import { rentScreens } from "./RentScreens";

const steps = rentFlow.steps;
const pad = (i: number) => String(i + 1).padStart(2, "0");

function ViewChip({ stepId, className }: { stepId: string; className?: string }) {
  const view = rentFlowMocks.viewFor[stepId] ?? "owner";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-brand-700 shadow-card",
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", view === "owner" ? "bg-brand-500" : "bg-accent-500")} aria-hidden="true" />
      {view === "owner" ? rentFlowMocks.ownerView : rentFlowMocks.residentView}
    </span>
  );
}

function CashNote({ className }: { className?: string }) {
  return (
    <m.p
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={cn(
        "flex items-start gap-3 rounded-xl border border-dashed border-brand-200 bg-brand-50 p-4 text-sm text-brand-800",
        className,
      )}
    >
      <Icon name="Wallet" className="mt-0.5 size-5 shrink-0 text-brand-600" />
      <span>{rentFlow.cash}</span>
    </m.p>
  );
}

/* ---------- Desktop: sticky scrollytelling ---------- */
function DesktopStory() {
  const target = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const { scrollYProgress } = useScroll({ target, offset: ["start center", "end center"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)));
    if (i !== activeRef.current) {
      activeRef.current = i;
      setActive(i);
    }
  });

  const step = steps[active] ?? steps[0];
  const Screen = rentScreens[step.id];

  return (
    <div className="hidden lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 xl:gap-24">
      <div>
        <div ref={target} className="relative">
          {/* progress rail */}
          <span className="absolute top-0 bottom-0 left-[11px] w-0.5 rounded-full bg-gray-200" aria-hidden="true" />
          <m.span
            className="absolute top-0 bottom-0 left-[11px] w-0.5 origin-top rounded-full bg-linear-to-b from-brand-600 to-brand-400"
            style={{ scaleY: scrollYProgress }}
            aria-hidden="true"
          />
          <ol>
            {steps.map((s, i) => {
              const isActive = i === active;
              const reached = i <= active;
              return (
                <li key={s.id} className="relative flex min-h-[58svh] items-center pl-14" aria-current={isActive ? "step" : undefined}>
                  <span
                    className={cn(
                      "absolute top-1/2 left-0 grid size-6 -translate-y-1/2 place-items-center rounded-full border-2 bg-white transition-colors duration-300",
                      reached ? "border-brand-600" : "border-gray-300",
                    )}
                    aria-hidden="true"
                  >
                    <span
                      className={cn(
                        "size-2 rounded-full transition-all duration-300",
                        reached ? "scale-100 bg-brand-600" : "scale-50 bg-gray-300",
                      )}
                    />
                  </span>
                  <div
                    className={cn(
                      "border-l-2 py-2 pl-6 transition-[opacity,border-color] duration-500 ease-out",
                      isActive ? "border-brand-600 opacity-100" : "border-transparent opacity-40",
                    )}
                  >
                    <span className="font-mono text-sm font-medium text-brand-600">{pad(i)}</span>
                    <h3 className="mt-2 text-h3 font-bold">{s.title}</h3>
                    <p className="mt-3 max-w-[42ch] text-lead text-gray-600">{s.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
        <CashNote className="mt-6 ml-14" />
      </div>

      {/* pinned mockup — no overflow-hidden on ancestors so sticky works */}
      <div className="relative">
        <div className="sticky top-0 flex h-svh flex-col items-center justify-center gap-5 py-20" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-200/40 blur-3xl" />
          <div className="relative h-8">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={rentFlowMocks.viewFor[step.id]}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <ViewChip stepId={step.id} />
              </m.div>
            </AnimatePresence>
          </div>
          <PhoneFrame className="relative h-[min(600px,calc(100svh_-_12rem))] w-auto">
            <div className="relative h-full w-full">
              <AnimatePresence initial={false}>
                <m.div
                  key={step.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: ease.outExpo }}
                >
                  {Screen && <Screen active />}
                </m.div>
              </AnimatePresence>
            </div>
          </PhoneFrame>
          <div className="flex gap-1.5">
            {steps.map((s, i) => (
              <span
                key={s.id}
                className={cn("h-1.5 rounded-full transition-all duration-300", i === active ? "w-6 bg-brand-600" : "w-1.5 bg-gray-300")}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Mobile / tablet: stacked cards, no pinning ---------- */
function MobileStepCard({ step, index }: { step: (typeof steps)[number]; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const Screen = rentScreens[step.id];
  return (
    <m.li
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-card"
    >
      <div className="relative flex h-[380px] justify-center overflow-hidden bg-brand-50 px-6 pt-12" aria-hidden="true">
        <ViewChip stepId={step.id} className="absolute top-3 left-3 z-10 px-2.5 py-0.5 text-[11px]" />
        <div className="relative h-full w-full max-w-[280px] rounded-t-[2.2rem] bg-gray-900 p-2 pb-0 shadow-float">
          <div className="relative h-full overflow-hidden rounded-t-[1.8rem] bg-white">
            <span className="absolute top-2 left-1/2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-gray-900" />
            {Screen && <Screen active={inView} />}
          </div>
        </div>
      </div>
      <div className="p-6">
        <span className="font-mono text-sm font-medium text-brand-600">{pad(index)}</span>
        <h3 className="mt-1.5 text-h3 font-bold">{step.title}</h3>
        <p className="mt-2">{step.body}</p>
      </div>
    </m.li>
  );
}

function MobileStory() {
  return (
    <div className="lg:hidden">
      <ol className="mx-auto grid max-w-xl gap-6 md:max-w-none md:grid-cols-2">
        {steps.map((s, i) => (
          <MobileStepCard key={s.id} step={s} index={i} />
        ))}
      </ol>
      <CashNote className="mx-auto mt-6 max-w-xl md:max-w-none" />
    </div>
  );
}

/** §9.7 — Rent collection flow, sticky scroll storytelling on desktop. */
export function RentFlowStory() {
  return (
    <Section id="rent-collection" theme="white" aria-labelledby="rent-flow-title">
      <SectionHeader eyebrow={rentFlow.eyebrow} title={<span id="rent-flow-title">{rentFlow.title}</span>} lead={rentFlow.lead} />
      <DesktopStory />
      <MobileStory />
    </Section>
  );
}
