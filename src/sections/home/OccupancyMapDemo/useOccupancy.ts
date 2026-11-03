import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { demoFloors, type BedStatus, type DemoBed, type DemoFloor } from "@/content/demo-data";
import { occupancyExtra } from "@/content/home-extra";

export type Counts = Record<BedStatus, number>;

const RESERVE_MS = 1400;

// Object.entries() puts numeric keys ("1", "2", "3") before "G", so put Ground first explicitly.
const floorRank = (id: string) => (id === "G" ? -1 : Number(id) || 0);
const initialFloors = [...demoFloors].sort((a, b) => floorRank(a.id) - floorRank(b.id));

function countBeds(floor: DemoFloor | undefined): Counts {
  const counts: Counts = { available: 0, occupied: 0, reserved: 0 };
  floor?.rooms.forEach((room) => room.beds.forEach((bed) => counts[bed.status]++));
  return counts;
}

function updateBed(floors: DemoFloor[], bedId: string, patch: Partial<DemoBed>): DemoFloor[] {
  return floors.map((floor) => ({
    ...floor,
    rooms: floor.rooms.map((room) =>
      room.beds.some((b) => b.id === bedId) ? { ...room, beds: room.beds.map((b) => (b.id === bedId ? { ...b, ...patch } : b)) } : room,
    ),
  }));
}

export type SimulateResult = { kind: "reserved"; bedId: string } | { kind: "none" } | { kind: "busy" };

/**
 * State for the occupancy map demo. Starts from deterministic sample data (SSR-safe);
 * randomness only happens inside the "Simulate a booking" event handler.
 */
export function useOccupancy(onApproved: (bedId: string) => void) {
  const [floors, setFloors] = useState<DemoFloor[]>(initialFloors);
  const [floorId, setFloorId] = useState<string>(initialFloors[0]?.id ?? "G");
  const [pendingBed, setPendingBed] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const approvedRef = useRef(onApproved);

  useEffect(() => {
    approvedRef.current = onApproved;
  }, [onApproved]);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const floor = floors.find((f) => f.id === floorId) ?? floors[0];
  const counts = useMemo(() => countBeds(floor), [floor]);

  const simulate = useCallback((): SimulateResult => {
    if (pendingBed) return { kind: "busy" };
    const free = floor?.rooms.flatMap((r) => r.beds.filter((b) => b.status === "available")) ?? [];
    const pick = free[Math.floor(Math.random() * free.length)];
    if (!pick) return { kind: "none" };

    const bedId = pick.id;
    setPendingBed(bedId);
    setFloors((prev) => updateBed(prev, bedId, { status: "reserved" }));

    timer.current = window.setTimeout(() => {
      const since = new Date().toLocaleString("en-IN", { month: "short", year: "numeric" });
      setFloors((prev) => updateBed(prev, bedId, { status: "occupied", resident: occupancyExtra.newResident, since }));
      setPendingBed(null);
      approvedRef.current(bedId);
    }, RESERVE_MS);

    return { kind: "reserved", bedId };
  }, [floor, pendingBed]);

  return { floors, floor, floorId, setFloorId, counts, simulate, pendingBed };
}
