import { useCallback, useEffect, useRef, useState } from "react";

/** Hover (with delay) + click + Esc + outside-click disclosure for header dropdowns. */
export function useDisclosure(hoverDelay = 150) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);

  const clear = () => window.clearTimeout(timer.current);
  const onEnter = useCallback(() => {
    clear();
    timer.current = window.setTimeout(() => setOpen(true), hoverDelay);
  }, [hoverDelay]);
  const onLeave = useCallback(() => {
    clear();
    timer.current = window.setTimeout(() => setOpen(false), 120);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        ref.current?.querySelector<HTMLButtonElement>("button[aria-expanded]")?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  useEffect(() => clear, []);

  return {
    open,
    setOpen,
    rootProps: {
      ref,
      onPointerEnter: (e: React.PointerEvent) => {
        if (e.pointerType === "mouse") onEnter();
      },
      onPointerLeave: (e: React.PointerEvent) => {
        if (e.pointerType === "mouse") onLeave();
      },
      onBlur: (e: React.FocusEvent) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      },
    },
    toggle: () => {
      clear();
      setOpen((o) => !o);
    },
  };
}
