import { useEffect, useRef } from "react";

/** setInterval that only runs while `active` is true. */
export function useInterval(callback: () => void, delay: number, active = true) {
  const saved = useRef(callback);
  useEffect(() => {
    saved.current = callback;
  }, [callback]);
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => saved.current(), delay);
    return () => window.clearInterval(id);
  }, [delay, active]);
}
