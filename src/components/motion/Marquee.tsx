import { cn } from "@/lib/cn";

type MarqueeProps = { children: React.ReactNode; reverse?: boolean; className?: string; speed?: number };

/** CSS marquee: duplicates content for a seamless loop, pauses on hover/focus, edge-faded. */
export function Marquee({ children, reverse = false, className, speed = 40 }: MarqueeProps) {
  return (
    <div className={cn("group flex overflow-hidden mask-fade-x", className)}>
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1 || undefined}
          className="flex shrink-0 items-center gap-10 pr-10 group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] motion-safe:animate-marquee"
          style={{ animationDuration: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
