import { Suspense, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type WhenVisibleProps = {
  children: React.ReactNode;
  /** Reserved space while the section isn't mounted (avoids scroll jumps) */
  placeholderClassName?: string;
  /** How far ahead of the viewport to start loading */
  rootMargin?: string;
};

/**
 * Mounts heavy below-the-fold sections (and downloads their lazy chunks) only when they approach the viewport
 * (spec §18). Pre-rendered HTML contains a sized placeholder, which keeps first paint and hydration light.
 */
export function WhenVisible({ children, placeholderClassName, rootMargin = "1200px 0px" }: WhenVisibleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Deep links / anchors below this point need the real layout immediately: observe with an unbounded margin.
    const margin = window.location.hash ? "100000px 0px" : rootMargin;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  const placeholder = <div ref={ref} aria-hidden="true" className={cn("w-full", placeholderClassName)} />;
  if (!show) return placeholder;
  return <Suspense fallback={<div aria-hidden="true" className={cn("w-full", placeholderClassName)} />}>{children}</Suspense>;
}
