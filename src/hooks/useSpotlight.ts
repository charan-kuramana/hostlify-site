import { useCallback } from "react";

/** Sets --x/--y CSS vars on pointer move for the `spotlight` utility. Hover-only devices. */
export function useSpotlight<T extends HTMLElement>() {
  const onPointerMove = useCallback((e: React.PointerEvent<T>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }, []);
  return { onPointerMove };
}
