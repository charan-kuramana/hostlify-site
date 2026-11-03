import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { useSpotlight } from "@/hooks/useSpotlight";
import { AnimatedIconHover, useIconHover } from "@/components/icons/AnimatedIcon";

const cardVariants = cva("relative rounded-xl", {
  variants: {
    variant: {
      default: "border border-gray-200 bg-white shadow-card",
      elevated: "border border-gray-200 bg-white shadow-float",
      glass: "text-white glass-dark",
      // spotlight + hue gradient ring (both follow the nearest `tone-*` class) + lift
      interactive:
        "group card-glow spotlight border border-gray-200 bg-white shadow-card transition-[translate,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-tone/25 hover:shadow-lift",
    },
  },
  defaultVariants: { variant: "default" },
});

type CardProps = React.ComponentProps<"div"> & VariantProps<typeof cardVariants>;

export function Card({ variant, className, children, ...props }: CardProps) {
  const spotlight = useSpotlight<HTMLDivElement>();
  const [hover, hoverHandlers] = useIconHover();
  if (variant !== "interactive")
    return (
      <div className={cn(cardVariants({ variant }), className)} {...props}>
        {children}
      </div>
    );
  // Interactive cards play any animated IconTile inside them on hover/focus (§13.2).
  return (
    <div {...spotlight} {...hoverHandlers} className={cn(cardVariants({ variant }), className)} {...props}>
      <AnimatedIconHover.Provider value={hover}>{children}</AnimatedIconHover.Provider>
    </div>
  );
}
