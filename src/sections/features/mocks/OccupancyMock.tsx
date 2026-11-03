import { m } from "motion/react";
import { demoFloors, type BedStatus } from "@/content/demo-data";
import { featureMocks } from "@/content/features";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { MockShell, MockToast } from "./MockShell";

const copy = featureMocks.occupancy;
const floor = demoFloors[2] ?? demoFloors[0];
const tone: Record<BedStatus, string> = {
  occupied: "bg-brand-500",
  available: "bg-success-100 ring-1 ring-inset ring-success-500",
  reserved: "bg-warning-500",
};

export function OccupancyMock() {
  const beds = floor?.rooms.flatMap((r) => r.beds) ?? [];
  const free = beds.filter((b) => b.status === "available").length;
  let n = 0;
  return (
    <div className="relative">
      <MockShell
        url={copy.url}
        title={copy.title}
        icon="LayoutGrid"
        aside={
          <span className="hidden rounded-full bg-success-100 px-2 py-0.5 text-[11px] font-semibold text-success-600 sm:inline">{`${free} ${copy.freeLabel}`}</span>
        }
      >
        <div className="mb-3 flex gap-1.5">
          {demoFloors.map((f) => (
            <span
              key={f.id}
              className={cn(
                "rounded-md px-2.5 py-1 text-[11px] font-semibold",
                f.id === floor?.id ? "bg-brand-900 text-white" : "bg-gray-100 text-gray-600",
              )}
            >
              {f.label}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {floor?.rooms.map((room) => (
            <div key={room.id} className="rounded-lg border border-gray-100 bg-gray-50/80 p-2">
              <p className="font-mono text-[10px] text-gray-500">
                {copy.room} {room.number}
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {room.beds.map((bed) => {
                  const i = n++;
                  return (
                    <m.span
                      key={bed.id}
                      initial={{ opacity: 0, scale: 0.4 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: 0.2 + i * 0.025, ease: ease.outExpo }}
                      className={cn("relative size-5 rounded", tone[bed.status])}
                    >
                      {bed.status === "reserved" && (
                        <span className="absolute inset-0 rounded bg-warning-500 motion-safe:animate-pulse-ring" />
                      )}
                    </m.span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-600">
          {(Object.keys(copy.legend) as BedStatus[]).map((s) => (
            <span key={s} className="inline-flex items-center gap-1.5">
              <span className={cn("size-2.5 rounded-sm", tone[s])} />
              {copy.legend[s]}
            </span>
          ))}
        </div>
      </MockShell>
      <MockToast title={copy.toastTitle} body={copy.toastBody} icon="CircleCheck" className="-bottom-6 -left-2 sm:-left-8" />
    </div>
  );
}
