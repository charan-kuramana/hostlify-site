import { m } from "motion/react";
import { featureMocks } from "@/content/features";
import { cn } from "@/lib/cn";
import { formatINR } from "@/lib/format";
import { ease } from "@/lib/motion";
import { CountUp } from "@/components/motion/CountUp";
import { MockShell, MockToast } from "./MockShell";

const copy = featureMocks.dues;
const statusTone = {
  paid: "bg-success-100 text-success-600",
  due: "bg-warning-100 text-warning-600",
  overdue: "bg-danger-100 text-danger-600",
} as const;

export function DuesMock() {
  const total = copy.collected + copy.pending;
  const pct = Math.round((copy.collected / total) * 100);
  return (
    <div className="relative">
      <MockShell
        url={copy.url}
        title={copy.title}
        icon="IndianRupee"
        aside={<span className="hidden text-[11px] text-gray-500 sm:inline">{copy.month}</span>}
      >
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-success-100/60 p-3">
            <p className="text-[11px] font-medium text-success-600">{copy.collectedLabel}</p>
            <p className="mt-0.5 font-mono text-lg font-medium text-brand-900">
              <CountUp value={copy.collected} prefix="₹" />
            </p>
          </div>
          <div className="rounded-lg bg-warning-100/60 p-3">
            <p className="text-[11px] font-medium text-warning-600">{copy.pendingLabel}</p>
            <p className="mt-0.5 font-mono text-lg font-medium text-brand-900">
              <CountUp value={copy.pending} prefix="₹" />
            </p>
          </div>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-100">
          <m.div
            className="h-full origin-left rounded-full bg-gradient-primary"
            style={{ width: `${pct}%` }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: ease.outExpo }}
          />
        </div>
        <ul className="mt-4 divide-y divide-gray-100">
          {copy.rows.map((row, i) => (
            <m.li
              key={row.id}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: ease.outExpo }}
              className="flex items-center gap-3 py-2.5"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-100 text-[11px] font-semibold text-brand-700">
                {row.name.slice(0, 1)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-brand-900">{row.name}</span>
                <span className="block text-[11px] text-gray-500">{row.room}</span>
              </span>
              <span className="font-mono text-sm text-brand-900">{formatINR(row.amount)}</span>
              <span className={cn("w-16 rounded-full py-0.5 text-center text-[11px] font-semibold", statusTone[row.status])}>
                {copy.status[row.status]}
              </span>
            </m.li>
          ))}
        </ul>
      </MockShell>
      <MockToast title={copy.toast} body={copy.toastSub} icon="ReceiptText" className="-right-2 -bottom-6 sm:-right-6" />
    </div>
  );
}
