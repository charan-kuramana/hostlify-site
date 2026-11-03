import { m } from "motion/react";
import { featureMocks } from "@/content/features";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { MockShell, MockToast } from "./MockShell";

const copy = featureMocks.complaints;
const priorityTone = {
  high: "bg-danger-100 text-danger-600",
  medium: "bg-warning-100 text-warning-600",
  low: "bg-gray-100 text-gray-600",
} as const;
const columnDot = { open: "bg-danger-500", progress: "bg-warning-500", resolved: "bg-success-500" } as const;

export function ComplaintsMock() {
  let n = 0;
  return (
    <div className="relative">
      <MockShell url={copy.url} title={copy.title} icon="MessageSquareWarning">
        <div className="grid gap-2 sm:grid-cols-3">
          {copy.columns.map((col) => (
            <div key={col.id} className="rounded-lg bg-gray-50 p-2">
              <p className="mb-2 flex items-center gap-1.5 px-1 text-[11px] font-semibold text-gray-600">
                <span className={cn("size-1.5 rounded-full", columnDot[col.id])} />
                {col.label}
                <span className="ml-auto font-mono text-gray-400">{col.items.length}</span>
              </p>
              <div className="space-y-2">
                {col.items.map((item) => {
                  const i = n++;
                  return (
                    <m.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.25 + i * 0.1, ease: ease.outExpo }}
                      className="rounded-md border border-gray-200 bg-white p-2.5 shadow-card"
                    >
                      <p className="text-[13px] leading-snug font-medium text-brand-900">{item.title}</p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] text-gray-500">{item.room}</span>
                        <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-semibold", priorityTone[item.priority])}>
                          {copy.priority[item.priority]}
                        </span>
                      </div>
                    </m.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </MockShell>
      <MockToast
        title={copy.columns[1]?.items[0]?.title ?? ""}
        body={copy.assigned}
        icon="Wrench"
        tone="brand"
        className="-bottom-6 -left-2 sm:-left-8"
      />
    </div>
  );
}
