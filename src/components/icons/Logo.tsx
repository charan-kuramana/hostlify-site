import { m, useReducedMotion } from "motion/react";
import { useId } from "react";
import { cn } from "@/lib/cn";
import { colors } from "@/lib/tokens";
import { spring } from "@/lib/motion";

type LogoMarkProps = { size?: number; animated?: boolean; className?: string; title?: string };

/** The "H drawn as a bed" mark. With `animated`, plays the §12.6 intro (~600ms). */
export function LogoMark({ size = 32, animated = false, className, title }: LogoMarkProps) {
  const id = useId();
  const reduce = useReducedMotion();
  const play = animated && !reduce;
  const grow = (axis: "x" | "y", delay: number) =>
    play
      ? {
          initial: { [axis === "x" ? "scaleX" : "scaleY"]: 0 },
          animate: { [axis === "x" ? "scaleX" : "scaleY"]: 1 },
          transition: { duration: 0.2, delay, ease: [0.16, 1, 0.3, 1] as const },
        }
      : {};
  const knob = (delay: number) => (play ? { initial: { scale: 0 }, animate: { scale: 1 }, transition: { ...spring.bouncy, delay } } : {});

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor={colors.brand[600]} />
          <stop offset="1" stopColor={colors.brand[400]} />
        </linearGradient>
      </defs>
      <m.rect
        width="64"
        height="64"
        rx="16"
        fill={`url(#${id}-g)`}
        style={{ transformOrigin: "32px 32px" }}
        {...(play ? { initial: { scale: 0.8, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { duration: 0.3 } } : {})}
      />
      <m.rect x="16" y="16" width="6" height="32" rx="3" fill="#fff" style={{ transformOrigin: "19px 48px" }} {...grow("y", 0.2)} />
      <m.rect x="42" y="16" width="6" height="32" rx="3" fill="#fff" style={{ transformOrigin: "45px 48px" }} {...grow("y", 0.28)} />
      <m.rect x="16" y="29" width="32" height="6" rx="3" fill="#fff" style={{ transformOrigin: "16px 32px" }} {...grow("x", 0.42)} />
      <m.circle cx="19" cy="14" r="2.4" fill="#fff" opacity="0.9" style={{ transformOrigin: "19px 14px" }} {...knob(0.55)} />
      <m.circle cx="45" cy="14" r="2.4" fill="#fff" opacity="0.9" style={{ transformOrigin: "45px 14px" }} {...knob(0.6)} />
    </svg>
  );
}

type LogoProps = { theme?: "light" | "dark"; animated?: boolean; className?: string; size?: number };

export function Logo({ theme = "light", animated = false, className, size = 32 }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark size={size} animated={animated} />
      <span className={cn("font-sans text-[1.35rem] font-bold tracking-[-0.02em]", theme === "dark" ? "text-white" : "text-brand-900")}>
        Hostlify
      </span>
    </span>
  );
}
