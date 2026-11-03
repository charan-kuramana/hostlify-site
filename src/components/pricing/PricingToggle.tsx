import { m } from "motion/react";
import { pricingCopy, type BillingPeriod } from "@/content/plans";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";

type PricingToggleProps = { value: BillingPeriod; onChange: (v: BillingPeriod) => void; className?: string };

export function PricingToggle({ value, onChange, className }: PricingToggleProps) {
  const options: { id: BillingPeriod; label: string }[] = [
    { id: "monthly", label: pricingCopy.monthly },
    { id: "yearly", label: pricingCopy.yearly },
  ];
  return (
    <div
      role="radiogroup"
      aria-label="Billing period"
      className={cn("inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white p-1 shadow-card", className)}
    >
      {options.map((o) => {
        const active = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => {
              onChange(o.id);
              track("pricing_toggle", { period: o.id });
            }}
            className={cn(
              "relative flex h-10 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors",
              active ? "text-white" : "text-gray-600 hover:text-brand-900",
            )}
          >
            {active && (
              <m.span
                layoutId="pricing-thumb"
                className="absolute inset-0 rounded-full bg-gradient-primary shadow-card"
                transition={spring.snappy}
              />
            )}
            <span className="relative">{o.label}</span>
            {o.id === "yearly" && (
              <span
                className={cn(
                  "relative rounded-full px-2 py-0.5 text-[11px] font-bold",
                  active ? "bg-white/20 text-white" : "bg-success-100 text-success-600",
                )}
              >
                {pricingCopy.save}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
