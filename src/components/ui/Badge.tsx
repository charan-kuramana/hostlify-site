import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const badgeVariants = cva("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide", {
  variants: {
    tone: {
      brand: "bg-brand-100 text-brand-700",
      accent: "bg-accent-100 text-accent-600",
      success: "bg-success-100 text-success-600",
      warning: "bg-warning-100 text-warning-600",
      danger: "bg-danger-100 text-danger-600",
      neutral: "bg-gray-100 text-gray-700",
      outline: "border border-gray-200 bg-white text-gray-700",
      dark: "border border-white/15 bg-white/10 text-brand-200",
      gradient: "bg-gradient-logo text-white shadow-card",
    },
  },
  defaultVariants: { tone: "brand" },
});

type BadgeProps = React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

export function Badge({ tone, className, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
