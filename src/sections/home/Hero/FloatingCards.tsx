import { AnimatePresence, m, useSpring, useTransform, type MotionValue } from "motion/react";
import { hero } from "@/content/home";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";
import { formatINR } from "@/lib/format";
import { Icon } from "@/components/icons/Icon";
import type { LatestPayment } from "./DashboardMock";

type Pointer = { x: MotionValue<number>; y: MotionValue<number> };
type FloatingCardsProps = { pointer: Pointer; payment: NonNullable<LatestPayment> };

const PARALLAX = 12;
const parallaxSpring = { stiffness: 150, damping: 20 };

type FloatProps = { pointer: Pointer; depth: number; delay: number; floatDelay: string; className: string; children: React.ReactNode };

/** Positions a card, applies opposite-direction mouse parallax, pops it in, then lets it drift. */
function Floating({ pointer, depth, delay, floatDelay, className, children }: FloatProps) {
  const tx = useTransform(pointer.x, (v) => -v * PARALLAX * depth);
  const ty = useTransform(pointer.y, (v) => -v * PARALLAX * depth);
  const x = useSpring(tx, parallaxSpring);
  const y = useSpring(ty, parallaxSpring);
  return (
    <m.div className={cn("absolute z-10", className)} style={{ x, y }}>
      <m.div initial={{ opacity: 0, scale: 0.8, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ ...spring.bouncy, delay }}>
        <div className="motion-safe:animate-float" style={{ animationDelay: floatDelay }}>
          {children}
        </div>
      </m.div>
    </m.div>
  );
}

const cardBase = "flex items-center gap-2.5 rounded-xl border border-gray-200/80 bg-white/95 p-2.5 shadow-float  sm:gap-3 sm:p-3";

function CardIcon({ name, tone }: { name: string; tone: "success" | "brand" | "warning" }) {
  return (
    <span
      className={cn(
        "grid size-8 shrink-0 place-items-center rounded-lg sm:size-9",
        tone === "success" && "bg-success-100 text-success-600",
        tone === "brand" && "bg-brand-100 text-brand-600",
        tone === "warning" && "bg-warning-100 text-warning-600",
      )}
    >
      <Icon name={name} className="size-4" />
    </span>
  );
}

/** The 3 floating cards orbiting the dashboard (only 2 below lg). Decorative — parent is role="img". */
export function FloatingCards({ pointer, payment }: FloatingCardsProps) {
  const c = hero.cards;
  return (
    <>
      {/* 1 · Rent received (bottom-left) — replaced every few seconds */}
      <Floating
        pointer={pointer}
        depth={1}
        delay={1.1}
        floatDelay="0s"
        className="bottom-3 left-1 sm:bottom-8 sm:left-3 lg:bottom-14 lg:-left-10"
      >
        <div className="relative w-[200px] sm:w-[220px]">
          <AnimatePresence mode="popLayout" initial={false}>
            <m.div
              key={payment.key}
              className={cardBase}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.95 }}
              transition={spring.bouncy}
            >
              <CardIcon name="IndianRupee" tone="success" />
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-brand-900">
                  <span className="size-1.5 rounded-full bg-success-500" />
                  {c.rent.title}
                </p>
                <p className="truncate text-[11px] text-gray-500">
                  <span className="font-semibold text-gray-800">{formatINR(payment.amount)}</span> · {payment.room} · {c.rent.via}
                </p>
              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </Floating>

      {/* 2 · New booking request (top-right) */}
      <Floating
        pointer={pointer}
        depth={0.7}
        delay={1.4}
        floatDelay="-2s"
        className="top-[46%] right-1 sm:top-[40%] sm:right-3 lg:top-10 lg:-right-8"
      >
        <div className={cn(cardBase, "w-[200px] flex-col items-stretch sm:w-[216px]")}>
          <div className="flex items-center gap-2.5">
            <CardIcon name="BedDouble" tone="brand" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-brand-900">{c.booking.title}</p>
              <p className="truncate text-[11px] text-gray-500">{c.booking.subtitle}</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            <span className="flex-1 rounded-md bg-success-600 py-1 text-center text-[11px] font-semibold text-white">
              {c.booking.approve}
            </span>
            <span className="flex-1 rounded-md bg-gray-100 py-1 text-center text-[11px] font-semibold text-gray-600">
              {c.booking.reject}
            </span>
          </div>
        </div>
      </Floating>

      {/* 3 · Complaint resolved (bottom-right) — desktop only */}
      <Floating pointer={pointer} depth={1.3} delay={1.7} floatDelay="-4s" className="hidden lg:-right-6 lg:-bottom-6 lg:block">
        <div className={cn(cardBase, "w-[210px]")}>
          <CardIcon name="CircleCheck" tone="success" />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-brand-900">{c.complaint.title}</p>
            <p className="truncate text-[11px] text-gray-500">{c.complaint.subtitle}</p>
          </div>
        </div>
      </Floating>
    </>
  );
}
