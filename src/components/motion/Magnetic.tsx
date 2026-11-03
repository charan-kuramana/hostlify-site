import { m, useMotionValue, useSpring } from "motion/react";
import { useFinePointer } from "@/hooks/useMediaQuery";

/** Pulls its child up to `strength` px toward the pointer. Fine pointers only. */
export function Magnetic({ children, strength = 6, className }: { children: React.ReactNode; strength?: number; className?: string }) {
  const fine = useFinePointer();
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });

  if (!fine) return <span className={className}>{children}</span>;

  return (
    <m.span
      className={className ?? "inline-block"}
      style={{ x, y }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(((e.clientX - r.left) / r.width - 0.5) * 2 * strength);
        y.set(((e.clientY - r.top) / r.height - 0.5) * 2 * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </m.span>
  );
}
