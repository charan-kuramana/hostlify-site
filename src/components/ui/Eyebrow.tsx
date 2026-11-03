import { cn } from "@/lib/cn";

type EyebrowProps = React.ComponentProps<"p"> & { theme?: "light" | "dark" };

export function Eyebrow({ theme = "light", className, children, ...props }: EyebrowProps) {
  return (
    <p className={cn("text-eyebrow font-semibold uppercase", theme === "dark" ? "text-brand-300" : "text-brand-600", className)} {...props}>
      {children}
    </p>
  );
}
