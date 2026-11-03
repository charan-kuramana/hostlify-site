import { m } from "motion/react";
import { Download } from "lucide-react";
import { collections } from "@/content/demo-data";
import { featureMocks } from "@/content/features";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { CountUp } from "@/components/motion/CountUp";
import { MockShell } from "./MockShell";

const copy = featureMocks.profit;
const max = Math.max(...collections.map((c) => c.value));

export function ProfitMock() {
  const stats = [
    { id: "in", ...copy.income, tone: "text-brand-900" },
    { id: "out", ...copy.expenses, tone: "text-brand-900" },
    { id: "net", ...copy.net, tone: "text-success-600" },
  ];
  return (
    <MockShell
      url={copy.url}
      title={copy.title}
      icon="ChartNoAxesCombined"
      aside={
        <span className="hidden items-center gap-1 rounded-md border border-gray-200 px-2 py-0.5 text-[11px] font-medium text-gray-600 sm:inline-flex">
          <Download className="size-3" />
          {copy.export}
        </span>
      }
    >
      <div className="grid grid-cols-3 gap-2">
        {stats.map((s) => (
          <div key={s.id} className={cn("rounded-lg p-2.5", s.id === "net" ? "bg-success-100/60" : "bg-gray-50")}>
            <p className="truncate text-[11px] text-gray-500">{s.label}</p>
            <p className={cn("mt-0.5 font-mono text-sm font-medium sm:text-base", s.tone)}>
              <CountUp value={s.value} prefix="₹" />
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-lg border border-gray-100 p-3">
        <div className="mb-2 flex justify-between text-[11px] text-gray-500">
          <span>{copy.period}</span>
          <span>{copy.unit}</span>
        </div>
        <div className="flex h-36 items-end gap-2 sm:gap-3">
          {collections.map((c, i) => (
            <div key={c.id} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
              <span className="font-mono text-[10px] text-gray-500">{c.value}</span>
              <m.span
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease: ease.outExpo }}
                style={{ height: `${(c.value / max) * 75}%` }}
                className={cn("w-full origin-bottom rounded-t-md", i === collections.length - 1 ? "bg-gradient-primary" : "bg-brand-200")}
              />
              <span className="text-[10px] text-gray-500">{c.month}</span>
            </div>
          ))}
        </div>
      </div>
    </MockShell>
  );
}
