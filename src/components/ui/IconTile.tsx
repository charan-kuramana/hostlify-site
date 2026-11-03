import { cn } from "@/lib/cn";
import { animatedFor, toneClass, toneFor, type Hue } from "@/lib/iconTones";
import { Icon } from "@/components/icons/Icon";
import { AnimatedIcon } from "@/components/icons/AnimatedIcon";

type IconTileProps = {
  name: string;
  /**
   * `auto` (default) picks the icon's sitewide hue (lib/iconTones). The legacy single-colour tones still work:
   * soft (brand tint), solid (brand gradient), dark (white/10), accent (orange tint).
   */
  tone?: "auto" | "soft" | "solid" | "dark" | "accent";
  /** For `tone="auto"`: gloss (soft gradient, default) · solid (white icon on hue gradient) · glass (dark sections). */
  variant?: "gloss" | "solid" | "glass";
  /** Override the automatic hue. */
  hue?: Hue;
  /** Swap in the Motion-animated twin (if one exists) — plays on hover of the tile or of an `AnimatedIconHover` parent. */
  animated?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function IconTile({ name, tone = "auto", variant = "gloss", hue, animated = false, size = "md", className }: IconTileProps) {
  const twin = animated ? animatedFor(name) : undefined;
  const iconSize = size === "sm" ? "size-4" : "size-5";
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid shrink-0 place-items-center rounded-xl transition-transform duration-300 ease-out group-hover:scale-106 group-hover:-rotate-4",
        size === "sm" ? "size-9 rounded-lg" : size === "md" ? "size-11" : "size-12",
        tone === "auto" && (hue ? toneClass[hue] : toneFor(name)),
        tone === "auto" && variant === "gloss" && "tile-gloss",
        tone === "auto" && variant === "solid" && "tile-solid",
        tone === "auto" && variant === "glass" && "tile-glass",
        tone === "soft" && "bg-brand-100 text-brand-600",
        tone === "solid" && "bg-gradient-primary text-white shadow-card",
        tone === "dark" && "bg-white/10 text-brand-300",
        tone === "accent" && "bg-accent-100 text-accent-600",
        className,
      )}
    >
      {twin ? <AnimatedIcon name={twin} size={size === "sm" ? 16 : 20} className={iconSize} /> : <Icon name={name} className={iconSize} />}
    </span>
  );
}
