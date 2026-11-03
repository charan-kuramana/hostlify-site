import { LazyMotion, MotionConfig } from "motion/react";
import { useEffect } from "react";

const loadFeatures = () => import("@/lib/motionFeatures").then((mod) => mod.default);

/**
 * Lenis smooth scrolling (wheel/trackpad only; native touch scrolling untouched).
 * Loaded after the page is idle so it never competes with first paint, and skipped for reduced motion.
 */
function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let destroyed = false;
    let lenis: { raf: (t: number) => void; destroy: () => void } | undefined;
    let frame = 0;
    const start = async () => {
      const { default: Lenis } = await import("lenis");
      if (destroyed) return;
      const instance = new Lenis({ lerp: 0.1, duration: 1.1, smoothWheel: true, anchors: { offset: -80 } });
      lenis = instance;
      const loop = (t: number) => {
        instance.raf(t);
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
    };
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300));
    const handle = idle(() => void start());
    return () => {
      destroyed = true;
      if (typeof handle === "number" && !window.requestIdleCallback) window.clearTimeout(handle);
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);
}

export function Providers({ children }: { children: React.ReactNode }) {
  useSmoothScroll();
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
