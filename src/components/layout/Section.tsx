import { cn } from "@/lib/cn";

const themes = {
  white: "bg-white",
  gray: "section-edge bg-gray-50",
  tint: "section-edge bg-brand-50",
  dark: "grain bg-brand-900 text-brand-100/80",
  night: "grain bg-gradient-night text-brand-100/80",
} as const;

type SectionProps = React.ComponentProps<"section"> & {
  theme?: keyof typeof themes;
  /** false = always render (opt out of content-visibility: auto) */
  lazy?: boolean;
  /** Skip the inner container (for full-bleed layouts) */
  bleed?: boolean;
  containerClassName?: string;
};

export function Section({ theme = "white", bleed = false, lazy = true, className, containerClassName, children, ...props }: SectionProps) {
  return (
    <section className={cn(lazy && "cv-auto", "relative overflow-x-clip section-y", themes[theme], className)} {...props}>
      {bleed ? children : <div className={cn("relative z-[1] container-page", containerClassName)}>{children}</div>}
    </section>
  );
}
