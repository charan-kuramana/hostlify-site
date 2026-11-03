import { AnimatePresence, m } from "motion/react";
import { Check, Clock } from "lucide-react";
import { useState } from "react";
import { bento } from "@/content/home";
import { bentoExtra } from "@/content/home-extra";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";
import { formatINR } from "@/lib/format";
import { useInterval } from "@/hooks/useInterval";
import { Icon } from "@/components/icons/Icon";
import { BentoTile } from "./BentoTile";

const particleColors = ["bg-brand-400", "bg-accent-500", "bg-success-500", "bg-warning-500"] as const;
// 12 particles on a circle, alternating distances (deterministic).
const particles = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2;
  const dist = i % 2 === 0 ? 38 : 26;
  return {
    id: `p${i}`,
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    color: particleColors[i % particleColors.length],
    round: i % 3 === 0,
  };
});

/** 12 small particles bursting out of the status chip. */
function Confetti({ burst }: { burst: number }) {
  return (
    <span className="pointer-events-none absolute top-1/2 left-1/2" aria-hidden="true">
      {particles.map((p) => (
        <m.span
          key={`${burst}-${p.id}`}
          className={cn("absolute -mt-0.75 -ml-0.75 size-1.5", p.color, p.round ? "rounded-full" : "rounded-[1px]")}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
          animate={{ x: p.x, y: p.y, scale: [0, 1.2, 0.8], opacity: [1, 1, 0], rotate: 180 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </span>
  );
}

function RentVisual({ active }: { active: boolean }) {
  const t = bento.tiles.rent;
  // even step = pending, odd step = paid (bursts confetti)
  const [step, setStep] = useState(1);
  useInterval(() => setStep((s) => s + 1), 2200, active);
  const paid = step % 2 === 1;

  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-card">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-gray-500">{bentoExtra.rentDue}</p>
            <p className="truncate text-sm font-semibold text-brand-900">{t.resident}</p>
          </div>
          <p className="font-display text-xl font-bold text-brand-900">{formatINR(t.amount)}</p>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="relative">
            <AnimatePresence mode="popLayout" initial={false}>
              <m.span
                key={paid ? "paid" : "pending"}
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.9 }}
                transition={spring.bouncy}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
                  paid ? "bg-success-100 text-success-600" : "bg-warning-100 text-warning-600",
                )}
              >
                {paid ? <Check className="size-3.5" strokeWidth={3} /> : <Clock className="size-3.5" />}
                {paid ? t.paid : t.pending}
              </m.span>
            </AnimatePresence>
            {paid && active && <Confetti burst={step} />}
          </div>
          <span
            className={cn(
              "flex items-center gap-1 text-[11px] font-medium transition-opacity duration-300",
              paid ? "text-gray-500 opacity-100" : "opacity-0",
            )}
          >
            <Icon name="ReceiptText" className="size-3.5" />
            {bentoExtra.autoReceipt}
          </span>
        </div>
      </div>
    </div>
  );
}

export function RentTile({ className }: { className?: string }) {
  const t = bento.tiles.rent;
  return (
    <BentoTile
      title={t.title}
      body={t.body}
      href={t.href}
      icon="IndianRupee"
      learnMore={bentoExtra.learnMore}
      className={className}
      visualClassName="min-h-[150px]"
    >
      {(active) => <RentVisual active={active} />}
    </BentoTile>
  );
}
