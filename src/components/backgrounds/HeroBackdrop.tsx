import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type HeroBackdropProps = {
  /** brand = calm blues · aurora = blue/indigo/orange mix · accent = warm (resident pages) */
  palette?: "brand" | "aurora" | "accent";
  /** subtle = no grid floor / rings (compact heroes) */
  intensity?: "full" | "subtle";
  className?: string;
};

// Deterministic particle positions so pre-rendered HTML and hydration match.
const particles = [
  { x: 8, y: 22, d: 0 },
  { x: 18, y: 64, d: 1.8 },
  { x: 27, y: 38, d: 3.6 },
  { x: 36, y: 78, d: 0.9 },
  { x: 47, y: 18, d: 2.7 },
  { x: 58, y: 56, d: 4.4 },
  { x: 66, y: 30, d: 1.2 },
  { x: 74, y: 70, d: 3.1 },
  { x: 83, y: 26, d: 0.4 },
  { x: 91, y: 52, d: 2.2 },
  { x: 13, y: 88, d: 5 },
  { x: 52, y: 84, d: 1.5 },
] as const;

/**
 * Premium animated hero background: soft wash, drifting aurora, swaying light beams,
 * perspective grid floor, orbit rings, twinkling particles and a cursor spotlight.
 * Pure CSS animation (cheap), paused off-screen; static under prefers-reduced-motion.
 * Place as the first child of a `relative` hero section.
 */
export function HeroBackdrop({ palette = "brand", intensity = "full", className }: HeroBackdropProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;

    const io = new IntersectionObserver(([entry]) => {
      el.dataset.paused = entry?.isIntersecting ? "false" : "true";
    });
    io.observe(host);

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return () => io.disconnect();

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = host.getBoundingClientRect();
        el.style.setProperty("--hb-x", `${e.clientX - r.left}px`);
        el.style.setProperty("--hb-y", `${e.clientY - r.top}px`);
        el.dataset.spot = "on";
      });
    };
    const onLeave = () => {
      el.dataset.spot = "off";
    };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const full = intensity === "full";

  return (
    <div ref={ref} aria-hidden="true" data-palette={palette} className={cn("hero-backdrop -z-10", className)}>
      <div className="hb-wash" />
      <div className="hb-aurora hb-aurora-1" />
      <div className="hb-aurora hb-aurora-2" />
      <div className="hb-aurora hb-aurora-3" />
      {full && <div className="hb-aurora hb-aurora-4" />}
      <div className="hb-beams" />
      {full && <div className="hb-rings" />}
      {full && <div className="hb-grid" />}
      <div className="absolute inset-0 bg-dot-grid opacity-70" />
      {particles.slice(0, full ? particles.length : 6).map((p) => (
        <span key={`${p.x}-${p.y}`} className="hb-particle" style={{ left: `${p.x}%`, top: `${p.y}%`, animationDelay: `${p.d}s` }} />
      ))}
      <div className="hb-spot" />
      <div className="hb-fade" />
    </div>
  );
}
