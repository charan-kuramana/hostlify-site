import { AnimatePresence, m } from "motion/react";
import { Info, Keyboard, Sparkles } from "lucide-react";
import { useCallback, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { toast, Toaster } from "sonner";
import type { BedStatus } from "@/content/demo-data";
import { occupancy } from "@/content/home";
import { occupancyExtra } from "@/content/home-extra";
import { cn } from "@/lib/cn";
import { stagger } from "@/lib/motion";
import { track } from "@/lib/analytics";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { FloorTabs, panelId, tabId } from "./FloorTabs";
import { RoomCard, bedLabel } from "./RoomCard";
import { useOccupancy } from "./useOccupancy";

type Tip = { bedId: string; left: number; top: number; width: number; arrow: number; placement: "top" | "bottom" };

const TIP_W = 256;
const legendOrder: readonly BedStatus[] = ["occupied", "available", "reserved"];
const dotClass: Record<BedStatus, string> = { available: "bg-success-500", occupied: "bg-brand-400", reserved: "bg-warning-500" };

/** §9.6 — signature interactive occupancy map (dark). Sample data only. */
export function OccupancyMapDemo() {
  const idPrefix = `occ${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const [announcement, setAnnouncement] = useState("");
  const [tip, setTip] = useState<Tip | null>(null);
  const [focusedBed, setFocusedBed] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const bedRefs = useRef(new Map<string, HTMLButtonElement>());
  const trackedInspect = useRef(false);

  const onApproved = useCallback((bedId: string) => {
    const msg = occupancy.approved(bedId);
    toast.success(msg);
    setAnnouncement(msg);
  }, []);

  const { floors, floor, floorId, setFloorId, counts, simulate, pendingBed } = useOccupancy(onApproved);

  const beds = floor?.rooms.flatMap((room) => room.beds.map((bed) => ({ room, bed }))) ?? [];
  const bedIds = beds.map((b) => b.bed.id);
  const rovingId = focusedBed && bedIds.includes(focusedBed) ? focusedBed : bedIds[0];

  const registerRef = useCallback((id: string, el: HTMLButtonElement | null) => {
    if (el) bedRefs.current.set(id, el);
    else bedRefs.current.delete(id);
  }, []);

  const inspect = useCallback((bedId: string, el: HTMLElement) => {
    const container = mapRef.current;
    if (!container) return;
    const c = container.getBoundingClientRect();
    const b = el.getBoundingClientRect();
    const width = Math.min(TIP_W, c.width - 16);
    const center = b.left - c.left + b.width / 2;
    const left = Math.max(8, Math.min(center - width / 2, c.width - width - 8));
    const above = b.top - c.top;
    const placement = above > 96 ? "top" : "bottom";
    setTip({ bedId, left, width, arrow: center - left, placement, top: placement === "top" ? above - 10 : b.bottom - c.top + 10 });
    if (!trackedInspect.current) {
      trackedInspect.current = true;
      track("occupancy_demo_interact", { action: "inspect_bed" });
    }
  }, []);
  const hide = useCallback(() => setTip(null), []);

  const changeFloor = (id: string) => {
    if (id === floorId) return;
    setTip(null);
    setFocusedBed(null);
    setFloorId(id);
    track("occupancy_demo_interact", { action: "change_floor", floor: id });
  };

  const onSimulate = () => {
    const result = simulate();
    track("occupancy_demo_interact", { action: "simulate_booking" });
    if (result.kind === "reserved") setAnnouncement(occupancy.reserved(result.bedId));
    else if (result.kind === "none") {
      toast(occupancy.noneFree);
      setAnnouncement(occupancy.noneFree);
    }
  };

  // Arrow-key navigation between beds (roving tabindex). Left/Right follow reading order; Up/Down go to the nearest bed visually.
  const onMapKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const current = (e.target as HTMLElement).dataset.bed;
    if (!current) return;
    const i = bedIds.indexOf(current);
    let next: string | undefined;
    if (e.key === "ArrowRight") next = bedIds[Math.min(i + 1, bedIds.length - 1)];
    else if (e.key === "ArrowLeft") next = bedIds[Math.max(i - 1, 0)];
    else if (e.key === "Home") next = bedIds[0];
    else if (e.key === "End") next = bedIds[bedIds.length - 1];
    else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      const from = bedRefs.current.get(current)?.getBoundingClientRect();
      if (!from) return;
      const down = e.key === "ArrowDown";
      let best = Infinity;
      for (const id of bedIds) {
        const r = bedRefs.current.get(id)?.getBoundingClientRect();
        if (!r) continue;
        const dy = r.top + r.height / 2 - (from.top + from.height / 2);
        const dx = r.left + r.width / 2 - (from.left + from.width / 2);
        if (down ? dy < 8 : dy > -8) continue;
        const score = dy * dy + 4 * dx * dx;
        if (score < best) {
          best = score;
          next = id;
        }
      }
    } else if (e.key === "Escape") {
      setTip(null);
      return;
    } else return;
    e.preventDefault();
    if (next) bedRefs.current.get(next)?.focus();
  };

  const tipInfo = tip ? beds.find((b) => b.bed.id === tip.bedId) : undefined;
  const tipParts = tipInfo ? bedLabel(tipInfo.room, tipInfo.bed).split(" · ") : [];

  return (
    <Section theme="dark" aria-labelledby={`${idPrefix}-title`}>
      {/* Client-only section (lazy-mounted), so the portal target always exists. Portalled because the section uses content-visibility, which would trap position:fixed. */}
      {createPortal(<Toaster position="bottom-center" richColors closeButton toastOptions={{ className: "font-sans" }} />, document.body)}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-dot-grid-dark" />
      <SectionHeader
        theme="dark"
        eyebrow={occupancy.eyebrow}
        title={
          <span id={`${idPrefix}-title`}>
            {occupancy.titleStart} <span className="text-gradient-dark">{occupancy.titleHighlight}</span>
          </span>
        }
        lead={occupancy.lead}
      />

      <Reveal className="relative mx-auto max-w-5xl">
        {/* brand-400 glow behind the map */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[10%] top-[15%] bottom-[5%] -z-10 rounded-full bg-brand-400/30 blur-3xl"
        />

        <div className="rounded-2xl p-4 shadow-float glass-dark sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <FloorTabs floors={floors} value={floorId} onChange={changeFloor} idPrefix={idPrefix} />
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {legendOrder.map((status) => (
                <li key={status} className="flex items-center gap-2 text-brand-100/80">
                  <span className={cn("size-2.5 rounded-full", dotClass[status])} aria-hidden="true" />
                  <span>{occupancy.legend[status]}</span>
                  <CountUp value={counts[status]} duration={0.8} className="font-display font-bold text-white" />
                </li>
              ))}
            </ul>
          </div>

          {/* Delegated arrow-key navigation between the bed <button>s inside this panel (roving focus) */}
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <div
            ref={mapRef}
            id={panelId(idPrefix)}
            role="tabpanel"
            aria-labelledby={tabId(idPrefix, floorId)}
            onKeyDown={onMapKeyDown}
            onPointerLeave={(e) => e.pointerType === "mouse" && hide()}
            className="relative mt-6"
          >
            <p className="sr-only">{occupancyExtra.mapLabel(floor?.label ?? "")}</p>
            <AnimatePresence mode="wait" initial={false}>
              <m.ul
                key={floorId}
                variants={stagger(0.02)}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="grid grid-cols-2 gap-3 sm:grid-cols-4"
              >
                {floor?.rooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    pendingBed={pendingBed}
                    focusedBed={rovingId ?? null}
                    registerRef={registerRef}
                    onInspect={inspect}
                    onHide={hide}
                    onFocusBed={setFocusedBed}
                  />
                ))}
              </m.ul>
            </AnimatePresence>

            <AnimatePresence>
              {tip && tipInfo && (
                <div
                  key="tip"
                  aria-hidden="true"
                  className="pointer-events-none absolute z-20"
                  style={{
                    left: tip.left,
                    top: tip.top,
                    width: tip.width,
                    transform: tip.placement === "top" ? "translateY(-100%)" : undefined,
                  }}
                >
                  <m.div
                    initial={{ opacity: 0, y: tip.placement === "top" ? 6 : -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    transition={{ duration: 0.18 }}
                    className="relative rounded-xl bg-white p-3 text-[13px] leading-snug text-gray-600 shadow-float"
                  >
                    <p className="flex items-center gap-2 font-display font-bold text-brand-900">
                      <span className={cn("size-2 rounded-full", dotClass[tipInfo.bed.status])} />
                      {tipParts[0]}
                    </p>
                    <p className="mt-1">{tipParts.slice(1).join(" · ")}</p>
                    <span
                      className={cn("absolute size-3 rotate-45 bg-white", tip.placement === "top" ? "-bottom-1.5" : "-top-1.5")}
                      style={{ left: Math.max(12, Math.min(tip.arrow, tip.width - 12)) - 6 }}
                    />
                  </m.div>
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <Button
              variant="white"
              leftIcon={<Sparkles aria-hidden="true" />}
              onClick={onSimulate}
              aria-disabled={pendingBed !== null || undefined}
              className={cn("w-full sm:w-auto", pendingBed && "opacity-70")}
            >
              {occupancy.simulate}
            </Button>
            <div className="flex flex-col gap-1.5 text-xs text-brand-100/70 sm:items-end">
              <p className="hidden items-center gap-1.5 lg:flex">
                <Keyboard className="size-3.5" aria-hidden="true" />
                {occupancyExtra.keyboardHint}
              </p>
              <p className="flex items-center gap-1.5">
                <Info className="size-3.5" aria-hidden="true" />
                {occupancy.demoNote}
              </p>
            </div>
          </div>
        </div>

        <p className="sr-only" aria-live="polite" role="status">
          {announcement}
        </p>
      </Reveal>
    </Section>
  );
}
