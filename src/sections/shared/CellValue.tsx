import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/cn";

type CellValueProps = { value: boolean | string; yesLabel: string; noLabel: string; className?: string; emphasis?: boolean };

/** ✓ / ✗ / text cell for comparison tables. Icons carry an sr-only label. */
export function CellValue({ value, yesLabel, noLabel, className, emphasis = false }: CellValueProps) {
  if (value === true) {
    return (
      <span
        className={cn(
          "inline-grid size-7 place-items-center rounded-full",
          emphasis ? "bg-gradient-primary text-white shadow-card" : "bg-success-100 text-success-600",
          className,
        )}
      >
        <Check className="size-4" strokeWidth={2.5} aria-hidden="true" />
        <span className="sr-only">{yesLabel}</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className={cn("inline-grid size-7 place-items-center rounded-full bg-gray-100 text-gray-400", className)}>
        <Minus className="size-4" aria-hidden="true" />
        <span className="sr-only">{noLabel}</span>
      </span>
    );
  }
  return <span className={cn("text-sm font-medium text-brand-900", className)}>{value}</span>;
}
