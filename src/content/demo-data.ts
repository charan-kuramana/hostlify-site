/** Sample data for the interactive demos. All names are fictional — no real resident PII. */

export type BedStatus = "available" | "occupied" | "reserved";
export type DemoBed = { id: string; status: BedStatus; resident?: string; since?: string };
export type DemoRoom = { id: string; number: string; type: "Single" | "Double" | "Triple" | "Dormitory"; rent: number; beds: DemoBed[] };
export type DemoFloor = { id: string; label: string; rooms: DemoRoom[] };

const names = [
  "R. Kumar",
  "P. Sharma",
  "A. Reddy",
  "S. Iyer",
  "K. Naidu",
  "M. Rao",
  "V. Menon",
  "D. Patel",
  "N. Gupta",
  "T. Varma",
  "H. Khan",
  "B. Das",
  "L. Pillai",
  "J. Singh",
  "G. Chowdary",
  "Y. Joshi",
];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const roomTypes = { 1: "Single", 2: "Double", 3: "Triple", 4: "Dormitory" } as const;
const rents = { 1: 9500, 2: 6500, 3: 5500, 4: 4500 } as const;

// Deterministic layouts so pre-rendered HTML and the hydrated client always match.
// Each string is one room; chars: o = occupied, a = available, r = reserved.
const layouts: Record<string, readonly string[]> = {
  G: ["oo", "ooo", "o", "oooa", "oo", "oor", "oa", "ooo"],
  "1": ["ooo", "oo", "oooo", "oa", "o", "ooo", "oo", "aor"],
  "2": ["oo", "ooa", "oooo", "oo", "a", "ooo", "or", "oo"],
  "3": ["ooo", "o", "oo", "ooar", "oo", "oao", "oo", "oooo"],
};
const labels: Record<string, string> = { G: "Ground", "1": "1st", "2": "2nd", "3": "3rd" };

let n = 0;
// Explicit order: Object.entries would put integer-like keys ("1","2","3") before "G".
const floorOrder = ["G", "1", "2", "3"] as const;

export const demoFloors: DemoFloor[] = floorOrder
  .map((floorKey) => ({ floorKey, rooms: layouts[floorKey] ?? [] }))
  .map(({ floorKey, rooms }) => ({
    id: floorKey,
    label: labels[floorKey] ?? floorKey,
    rooms: rooms.map((layout, ri) => {
      const size = layout.length as 1 | 2 | 3 | 4;
      const number = `${floorKey === "G" ? "0" : floorKey}${String(ri + 1).padStart(2, "0")}`;
      return {
        id: `${floorKey}-${ri}`,
        number,
        type: roomTypes[size],
        rent: rents[size],
        beds: [...layout].map((c, bi) => {
          const status: BedStatus = c === "o" ? "occupied" : c === "r" ? "reserved" : "available";
          const bed: DemoBed = { id: `${floorKey === "G" ? "G" : floorKey}${String.fromCharCode(65 + ri)}-${bi + 1}`, status };
          if (status === "occupied") {
            bed.resident = names[n % names.length];
            bed.since = `${months[n % months.length]} 2026`;
            n++;
          }
          return bed;
        }),
      };
    }),
  }));

/** Bars for the hero dashboard and profit tile (₹ thousands). */
export const collections = [
  { id: "may", month: "May", value: 298 },
  { id: "jun", month: "Jun", value: 312 },
  { id: "jul", month: "Jul", value: 305 },
  { id: "aug", month: "Aug", value: 331 },
  { id: "sep", month: "Sep", value: 344 },
  { id: "oct", month: "Oct", value: 362 },
] as const;

export const profitBars = [
  { id: "jul", month: "Jul", income: 305, expense: 196 },
  { id: "aug", month: "Aug", income: 331, expense: 214 },
  { id: "sep", month: "Sep", income: 344, expense: 221 },
  { id: "oct", month: "Oct", income: 362, expense: 244 },
] as const;

export const recentActivity = [
  { id: "a1", tone: "success", text: "Priya S. paid ₹6,500", meta: "Room 204 · 2m ago" },
  { id: "a2", tone: "warning", text: "Booking request · Bed B-3", meta: "Floor 2 · 12m ago" },
  { id: "a3", tone: "brand", text: "Complaint #1041 resolved", meta: "Wi-Fi · 1h ago" },
  { id: "a4", tone: "success", text: "Rahul M. paid ₹5,500", meta: "Room 112 · 2h ago" },
] as const;

export const duesList = [
  { id: "d1", name: "Priya S.", room: "204", amount: 6500, status: "paid" },
  { id: "d2", name: "Rahul M.", room: "112", amount: 5500, status: "paid" },
  { id: "d3", name: "Anjali R.", room: "305", amount: 6500, status: "pending" },
  { id: "d4", name: "Kiran T.", room: "018", amount: 4500, status: "overdue" },
  { id: "d5", name: "Sneha P.", room: "210", amount: 9500, status: "pending" },
] as const;
