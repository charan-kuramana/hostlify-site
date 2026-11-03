import { animate, useReducedMotion } from "motion/react";
import { BedSingle } from "lucide-react";
import { useEffect, useRef } from "react";
import type { BedStatus } from "@/content/demo-data";
import { cn } from "@/lib/cn";

const statusClass: Record<BedStatus, string> = {
  available: "border-success-500/60 bg-success-500/20 text-success-100 hover:bg-success-500/35",
  occupied: "border-brand-400/50 bg-brand-500 text-white hover:bg-brand-400",
  reserved: "border-warning-500/70 bg-warning-500/80 text-brand-950 hover:bg-warning-500",
};

type BedButtonProps = {
  id: string;
  status: BedStatus;
  label: string;
  pending: boolean;
  focusable: boolean;
  registerRef: (id: string, el: HTMLButtonElement | null) => void;
  onInspect: (id: string, el: HTMLElement) => void;
  onHide: () => void;
  onFocusBed: (id: string) => void;
};

/** A single bed: a real <button> with a full aria-label. Pops (1 → 1.25 → 1) whenever its status changes. */
export function BedButton({ id, status, label, pending, focusable, registerRef, onInspect, onHide, onFocusBed }: BedButtonProps) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const prev = useRef(status);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (prev.current === status) return;
    prev.current = status;
    const el = ref.current;
    if (!el || reduce) return;
    const controls = animate(el, { scale: [1, 1.25, 1] }, { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] });
    return () => controls.stop();
  }, [status, reduce]);

  return (
    <button
      ref={(el) => {
        ref.current = el;
        registerRef(id, el);
      }}
      type="button"
      data-bed={id}
      tabIndex={focusable ? 0 : -1}
      aria-label={label}
      onPointerEnter={(e) => e.pointerType === "mouse" && onInspect(id, e.currentTarget)}
      onPointerLeave={(e) => e.pointerType === "mouse" && onHide()}
      onFocus={(e) => {
        onFocusBed(id);
        onInspect(id, e.currentTarget);
      }}
      onBlur={onHide}
      onClick={(e) => onInspect(id, e.currentTarget)}
      className={cn(
        "relative grid size-11 place-items-center rounded-lg border transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        statusClass[status],
      )}
    >
      {pending && <span className="absolute inset-0 rounded-lg bg-warning-500/60 motion-safe:animate-pulse-ring" aria-hidden="true" />}
      <BedSingle className="relative size-5" strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}
