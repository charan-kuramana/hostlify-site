/** Extra UI strings for the homepage sections (part 1) that are not in home.ts. */

export const heroExtra = {
  visualLabelOwner: "Preview of the Hostlify admin dashboard, showing sample data",
  visualLabelResident: "Preview of the Hostlify resident app: picking a bed on Floor 2",
  sampleData: "Sample data",
  live: "Live",
  nav: [
    { id: "dash", icon: "LayoutDashboard", label: "Dashboard" },
    { id: "beds", icon: "BedDouble", label: "Bookings" },
    { id: "rent", icon: "IndianRupee", label: "Rent" },
    { id: "complaints", icon: "MessageSquareWarning", label: "Complaints" },
    { id: "reports", icon: "ChartNoAxesCombined", label: "Reports" },
  ],
  paidActivity: (amount: string) => `Payment received ${amount}`,
  justNow: "just now",
  videoClose: "Close video dialog",
  phone: {
    hostel: "Sai Residency",
    room: "Room 2B · Double sharing",
    price: "₹6,500/mo",
    legend: { free: "Free", taken: "Taken", selected: "Your pick" },
    corridor: "Corridor",
  },
} as const;

export const beforeAfterExtra = {
  toggleLabel: "Compare before and after Hostlify",
  sliderHint: "Scroll to reveal",
} as const;

export const bentoExtra = {
  chipsLabel: "And much more",
  allFeatures: { label: "Explore all features", href: "/features" },
  learnMore: "Learn more",
  available: "Available",
  occupied: "Occupied",
  today: "Today",
  bedsPreview: "Floor 2 · 12 beds",
  rentDue: "Rent · October",
  autoReceipt: "Receipt sent",
  moreRoles: "+5",
  staffAccess: ["All modules", "Bookings & rent", "No finance access"],
} as const;

export const occupancyExtra = {
  room: "Room",
  bed: "Bed",
  sharing: "sharing",
  perMonth: "/mo",
  occupiedBy: "Occupied by",
  since: "since",
  availableNow: "Available now",
  reservedPending: "Reserved · awaiting approval",
  tooltip: (p: {
    id: string;
    type: string;
    rent: string;
    resident?: string;
    since?: string;
    status: "available" | "occupied" | "reserved";
  }) => {
    const kind = p.type === "Single" ? "Single room" : p.type === "Dormitory" ? "Dormitory" : `${p.type} sharing`;
    const base = `Bed ${p.id} · ${kind} · ${p.rent}/mo`;
    if (p.status === "occupied") return `${base} · Occupied by ${p.resident ?? "a resident"} since ${p.since ?? "2026"}`;
    if (p.status === "reserved") return `${base} · Reserved, awaiting approval`;
    return `${base} · Available now`;
  },
  mapLabel: (floor: string) => `${floor} floor bed map. Use arrow keys to move between beds.`,
  floorWord: "floor",
  newResident: "New resident",
  keyboardHint: "Tip: use arrow keys to move between beds",
} as const;
