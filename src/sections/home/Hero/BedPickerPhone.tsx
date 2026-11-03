import { m } from "motion/react";
import { ChevronLeft } from "lucide-react";
import { hero } from "@/content/home";
import { heroExtra } from "@/content/home-extra";
import { cn } from "@/lib/cn";
import { ease, spring } from "@/lib/motion";
import { Icon } from "@/components/icons/Icon";
import { PhoneFrame } from "@/components/mockups/PhoneFrame";

type Seat = "free" | "taken" | "selected";
// Sample seat map for Floor 2 (deterministic).
const rooms: readonly { id: string; beds: readonly Seat[] }[] = [
  { id: "2A", beds: ["taken", "taken", "free"] },
  { id: "2B", beds: ["taken", "selected"] },
  { id: "2C", beds: ["free", "taken"] },
  { id: "2D", beds: ["taken", "taken", "taken"] },
];

const seatClass: Record<Seat, string> = {
  free: "border-success-500/60 bg-success-100 text-success-600",
  taken: "border-gray-200 bg-gray-100 text-gray-300",
  selected: "border-brand-600 bg-gradient-primary text-white shadow-glow",
};

function Legend({ tone, label }: { tone: Seat; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className={cn("size-2.5 rounded-[3px] border", seatClass[tone])} />
      {label}
    </span>
  );
}

/** Resident-mode visual: phone with the Pick-a-Bed seat map and a "Booking approved" toast. Decorative. */
export function BedPickerPhone() {
  const p = hero.phone;
  const x = heroExtra.phone;
  return (
    <div className="relative mx-auto w-fit">
      <PhoneFrame className="w-[250px] sm:w-[270px]">
        <div className="flex h-full flex-col bg-gray-50 px-3.5 pt-10 pb-4">
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-full bg-white text-brand-900 shadow-card">
              <ChevronLeft className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="font-display text-sm font-bold text-brand-900">{p.title}</p>
              <p className="text-[10px] text-gray-500">{p.step}</p>
            </div>
          </div>

          <div className="mt-3 rounded-xl bg-white p-2.5 shadow-card">
            <p className="text-[11px] font-semibold text-brand-900">{x.hostel}</p>
            <div className="mt-0.5 flex items-center justify-between text-[10px] text-gray-500">
              <span>{x.room}</span>
              <span className="font-semibold text-brand-700">{x.price}</span>
            </div>
          </div>

          <div className="mt-3 grid flex-1 grid-cols-2 content-start gap-2">
            {rooms.map((room, ri) => (
              <m.div
                key={room.id}
                className="rounded-xl border border-gray-200 bg-white p-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + ri * 0.06, ease: ease.outExpo }}
              >
                <p className="text-[10px] font-semibold text-gray-500">{room.id}</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {room.beds.map((seat, bi) => (
                    <span
                      key={`${room.id}-${bi}`}
                      className={cn("relative grid size-7 place-items-center rounded-md border", seatClass[seat])}
                    >
                      {seat === "selected" && (
                        <span className="absolute inset-0 rounded-md bg-brand-400/50 motion-safe:animate-pulse-ring" />
                      )}
                      <Icon name="BedDouble" className="relative size-3.5" />
                    </span>
                  ))}
                </div>
              </m.div>
            ))}
            <p className="col-span-2 rounded-md border border-dashed border-gray-200 py-1 text-center text-[9px] tracking-widest text-gray-400 uppercase">
              {x.corridor}
            </p>
          </div>

          <div className="mt-2 flex justify-center gap-3 text-[9px] text-gray-500">
            <Legend tone="free" label={x.legend.free} />
            <Legend tone="taken" label={x.legend.taken} />
            <Legend tone="selected" label={x.legend.selected} />
          </div>
          <div className="mt-3 rounded-lg bg-gradient-primary py-2.5 text-center text-xs font-semibold text-white shadow-card">{p.cta}</div>
        </div>
      </PhoneFrame>

      {/* Toast */}
      <m.div
        className="absolute top-24 -right-4 z-10 sm:-right-24"
        initial={{ opacity: 0, y: 16, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ ...spring.bouncy, delay: 1.4 }}
      >
        <div className="motion-safe:animate-float">
          <div className="flex items-center gap-2.5 rounded-xl border border-gray-200/80 bg-white/95 p-3 shadow-float">
            <span className="grid size-8 place-items-center rounded-lg bg-success-100 text-success-600">
              <Icon name="CircleCheck" className="size-4" />
            </span>
            <p className="text-xs font-semibold whitespace-nowrap text-brand-900">{p.toast}</p>
          </div>
        </div>
      </m.div>
    </div>
  );
}
