import { Sparkles } from "lucide-react";
import { plans } from "@/content/plans";
import { cn } from "@/lib/cn";
import { useClientSearchParam } from "./useClientSearchParam";

/** Shows which plan the visitor picked (from `?plan=`). Renders nothing during pre-render. */
export function PlanNote({ format, className }: { format: (planName: string) => string; className?: string }) {
  const id = useClientSearchParam("plan");
  const plan = plans.find((p) => p.id === id);
  if (!plan) return null;
  return (
    <p
      role="status"
      className={cn(
        "flex items-center gap-2 rounded-lg border border-brand-100 bg-brand-50 px-3.5 py-2.5 text-sm font-medium text-brand-700",
        className,
      )}
    >
      <Sparkles className="size-4 shrink-0 text-brand-500" aria-hidden="true" />
      {format(plan.name)}
    </p>
  );
}
