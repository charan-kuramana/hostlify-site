import { m, type Variants } from "motion/react";
import type { DemoRoom } from "@/content/demo-data";
import { occupancyExtra } from "@/content/home-extra";
import { formatINR } from "@/lib/format";
import { ease } from "@/lib/motion";
import { BedButton } from "./BedButton";

export const roomVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: ease.outExpo } },
};

type RoomCardProps = {
  room: DemoRoom;
  pendingBed: string | null;
  focusedBed: string | null;
  registerRef: (id: string, el: HTMLButtonElement | null) => void;
  onInspect: (id: string, el: HTMLElement) => void;
  onHide: () => void;
  onFocusBed: (id: string) => void;
};

export function bedLabel(room: DemoRoom, bed: DemoRoom["beds"][number]) {
  return occupancyExtra.tooltip({
    id: bed.id,
    type: room.type,
    rent: formatINR(room.rent),
    resident: bed.resident,
    since: bed.since,
    status: bed.status,
  });
}

/** One room on the map: number, sharing type and its beds. */
export function RoomCard({ room, pendingBed, focusedBed, registerRef, onInspect, onHide, onFocusBed }: RoomCardProps) {
  const occupied = room.beds.filter((b) => b.status === "occupied").length;
  return (
    <m.li variants={roomVariants} className="rounded-xl p-3 glass-dark sm:p-3.5">
      <div className="flex items-baseline justify-between gap-2">
        <p className="font-display text-sm font-bold text-white">
          <span className="sr-only">{occupancyExtra.room} </span>
          {room.number}
        </p>
        <p className="font-mono text-[11px] text-brand-200/70">
          {occupied}/{room.beds.length}
        </p>
      </div>
      <p className="text-[11px] text-brand-200/70">
        {room.type} · {formatINR(room.rent)}
        {occupancyExtra.perMonth}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {room.beds.map((bed) => (
          <BedButton
            key={bed.id}
            id={bed.id}
            status={bed.status}
            label={bedLabel(room, bed)}
            pending={pendingBed === bed.id}
            focusable={focusedBed === bed.id}
            registerRef={registerRef}
            onInspect={onInspect}
            onHide={onHide}
            onFocusBed={onFocusBed}
          />
        ))}
      </div>
    </m.li>
  );
}
