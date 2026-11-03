export type Audience = "owner" | "resident";

export const hero = {
  toggle: { owner: "🏢 I own a hostel", resident: "🎒 I'm looking for one", label: "Who are you?" },
  owner: {
    eyebrow: "Hostel & PG management software",
    titleStart: "Run your hostel,",
    titleHighlight: "not spreadsheets.",
    lead: "Bookings, rent collection, complaints, food menu and staff, in one simple app built for Indian hostels and PGs.",
    primary: { label: "Book a free demo", href: "/contact" },
    secondary: { label: "Watch 2-min tour" },
    micro: ["Free plan for up to 30 beds", "Setup help included", "No card required"],
  },
  resident: {
    eyebrow: "For students & working professionals",
    titleStart: "Find your bed.",
    titleHighlight: "Pay rent in one tap.",
    lead: "Discover hostels near you, pick your exact bed, and handle rent, complaints and leave from your phone.",
    primary: { label: "Find a hostel near me" },
    secondary: { label: "How it works", href: "/for-residents" },
    micro: ["Online booking", "Digital receipts"],
  },
  dashboard: {
    url: "app.hostlify.in/admin/dashboard",
    greeting: "Good morning, Suresh",
    hostel: "Sai Residency · Vijayawada",
    stats: [
      { id: "members", label: "Total members", value: 142 },
      { id: "requests", label: "Pending requests", value: 6 },
      { id: "dues", label: "Pending dues", value: 48500, currency: true },
      { id: "collected", label: "Collected this month", value: 362000, currency: true },
    ],
    chartTitle: "Collections · last 6 months",
    activityTitle: "Recent activity",
  },
  cards: {
    rent: { title: "Rent received", via: "via UPI" },
    booking: { title: "New booking request", subtitle: "Bed B-3 · Floor 2", approve: "Approve", reject: "Reject" },
    complaint: { title: "Complaint resolved", subtitle: "Wi-Fi · Room 108" },
  },
  rentTicker: [
    { id: "r1", amount: 6500, room: "Room 204" },
    { id: "r2", amount: 7200, room: "Room 112" },
    { id: "r3", amount: 5800, room: "Room 305" },
    { id: "r4", amount: 6500, room: "Room 018" },
  ],
  phone: { title: "Pick a bed", step: "Step 2 of 3 · Floor 2", toast: "Booking approved 🎉", cta: "Confirm Bed 2B-2" },
  video: {
    title: "Hostlify product tour",
    comingSoon: "The 2-minute tour video is being recorded. Book a live demo and we'll show you around instead.",
    cta: "Book a live demo",
  },
} as const;

export const trust = {
  label: "Built on infrastructure you already trust",
  badges: [
    { id: "razorpay", icon: "lock", text: "Secure payments by Razorpay" },
    { id: "methods", icon: "card", text: "UPI · Cards · Net banking" },
    { id: "azure", icon: "cloud", text: "Data stored on Microsoft Azure" },
    { id: "india", icon: "flag", text: "Built in India, for Indian hostels" },
  ],
} as const;

export const beforeAfter = {
  eyebrow: "The old way vs the Hostlify way",
  title: "Sound familiar?",
  lead: "Most hostels run on notebooks, WhatsApp and memory. Here's what changes.",
  without: "Without Hostlify",
  with: "With Hostlify",
  before: "Before",
  after: "After",
  rows: [
    { id: "rent", before: "📒 Rent tracked in a notebook", after: "💳 Dues auto-generated, paid online, receipt sent" },
    { id: "complaints", before: "📱 Complaints lost in WhatsApp groups", after: "🎫 Every complaint tracked until resolved" },
    { id: "beds", before: "❓ “Which beds are free?” — walk floor by floor", after: "🗺️ Live occupancy map on your phone" },
    { id: "expenses", before: "💸 Expenses scattered across bills", after: "📊 Income vs expenses, net profit, one tap" },
    { id: "access", before: "🔑 Every staff member sees everything", after: "🛡️ Role-based access: supervisors never see finance" },
  ],
} as const;

export const bento = {
  eyebrow: "Everything in one place",
  title: "One app for your entire hostel",
  lead: "From the first booking request to the monthly profit report.",
  tiles: {
    beds: { title: "Bookings & beds", body: "Approve requests, assign beds, check residents in.", href: "/features/bookings" },
    rent: {
      title: "Rent on autopilot",
      body: "Dues, reminders, UPI payments, receipts.",
      href: "/features/payments",
      resident: "Priya S. · Room 204",
      amount: 6500,
      pending: "Pending",
      paid: "Paid",
    },
    complaints: {
      title: "Complaints that get closed",
      body: "Every ticket has an owner and a status.",
      href: "/features/operations",
      ticket: "#1042 · Geyser not working · Room 305",
      states: ["Open", "In Progress", "Resolved"],
    },
    menu: {
      title: "Weekly food menu",
      body: "Plan breakfast, lunch and dinner for the week.",
      href: "/features/operations",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      today: [
        { meal: "Breakfast", dish: "Idli, sambar, chutney" },
        { meal: "Lunch", dish: "Rice, dal, aloo fry, curd" },
        { meal: "Dinner", dish: "Chapati, paneer curry" },
      ],
    },
    profit: {
      title: "Know your profit",
      body: "Income vs expenses, every month.",
      href: "/features/finance",
      income: "Income",
      expenses: "Expenses",
      net: "Net profit",
      netValue: 118400,
    },
    staff: {
      title: "Staff with the right access",
      body: "8 roles. Supervisors never see finance.",
      href: "/features/staff",
      people: [
        { id: "a", initials: "SR", role: "Owner" },
        { id: "b", initials: "AK", role: "Manager" },
        { id: "c", initials: "VM", role: "Security" },
      ],
    },
  },
  chips: [
    { label: "Cleaning", icon: "Sparkles" },
    { label: "Parking", icon: "Car" },
    { label: "Leave", icon: "Plane" },
    { label: "Announcements", icon: "Megaphone" },
    { label: "Reviews", icon: "Star" },
    { label: "Payroll", icon: "BadgeIndianRupee" },
    { label: "Maintenance", icon: "Wrench" },
    { label: "Referrals", icon: "Gift" },
  ],
} as const;

export const occupancy = {
  eyebrow: "Occupancy map",
  titleStart: "See every bed.",
  titleHighlight: "Live.",
  lead: "Floors, rooms and beds on one map. Know what's occupied, reserved or free — without walking the corridors.",
  legend: { available: "Available", occupied: "Occupied", reserved: "Reserved" },
  simulate: "Simulate a booking",
  noneFree: "This floor is full — try another floor",
  approved: (bed: string) => `Booking approved for Bed ${bed}`,
  reserved: (bed: string) => `Bed ${bed} reserved — waiting for approval`,
  demoNote: "Interactive demo · sample data",
  floorsLabel: "Floors",
} as const;

export const rentFlow = {
  eyebrow: "Rent collection",
  title: "Rent that collects itself.",
  lead: "Rent is the #1 headache for hostel owners. Here's how Hostlify takes it off your plate.",
  steps: [
    { id: "generate", title: "Dues generate themselves.", body: "Monthly rent is created for every resident based on their bed and plan." },
    { id: "remind", title: "Reminders go out on time.", body: "Residents get a due reminder automatically on the 15th of every month." },
    { id: "pay", title: "Residents pay in one tap.", body: "UPI, cards or net banking via Razorpay — right from their phone." },
    {
      id: "receipt",
      title: "Instant receipt, zero disputes.",
      body: "Every payment is verified and receipted. No more “I paid, check your phone”.",
    },
    { id: "dashboard", title: "Your dashboard updates live.", body: "Collected, pending and overdue — always current." },
  ],
  cash: "Still collecting cash? Record offline payments in seconds. Add discounts or late fees anytime.",
} as const;

export const residentShowcase = {
  eyebrow: "The resident app",
  titleStart: "Your residents will actually",
  titleHighlight: "love",
  titleEnd: "this.",
  lead: "A modern app for hostellers means fewer calls, faster payments and better reviews for you.",
  callouts: [
    { id: "near", emoji: "📍", text: "Find hostels near me" },
    { id: "bed", emoji: "🛏️", text: "Pick your exact bed" },
    { id: "pay", emoji: "💳", text: "Pay rent & download receipts" },
    { id: "complaint", emoji: "🛠️", text: "Raise complaints with photos" },
    { id: "menu", emoji: "🍽️", text: "See this week's menu" },
    { id: "refer", emoji: "🎁", text: "Refer friends, earn discounts" },
  ],
  cta: { label: "See the resident experience", href: "/for-residents" },
} as const;

export const howItWorks = {
  eyebrow: "How it works",
  title: "Live in a day, not a month.",
  lead: "No training manuals. We set it up with you.",
  steps: [
    { id: "demo", title: "Book a demo", body: "A 15-minute call. We understand your hostel and show you around.", icon: "calendar-check" },
    {
      id: "setup",
      title: "We set you up",
      body: "We add your floors, rooms, beds and pricing with you. Import your residents.",
      icon: "building",
    },
    { id: "live", title: "Go live", body: "Share the app with residents and start collecting rent online.", icon: "rocket" },
  ],
  cta: { label: "See the full onboarding journey", href: "/how-it-works" },
} as const;

export const facts = {
  eyebrow: "Built for the way hostels work",
  items: [
    { id: "booking", value: 3, prefix: "", suffix: "-step", label: "bed booking for residents" },
    { id: "roles", value: 8, prefix: "", suffix: "", label: "staff roles with the right access" },
    { id: "categories", value: 6, prefix: "", suffix: "", label: "complaint categories, tracked to closed" },
    { id: "start", value: 0, prefix: "₹", suffix: "", label: "to start — free up to 30 beds" },
  ],
} as const;

export const security = {
  eyebrow: "Security",
  title: "Your data and your money, protected.",
  lead: "Built on proven infrastructure, with access controls you set.",
  tiles: [
    { id: "pay", icon: "lock", title: "Secure payments", body: "Processed by Razorpay; every payment is cryptographically verified." },
    {
      id: "store",
      icon: "cloud",
      title: "Encrypted document storage",
      body: "ID proofs and invoices are stored on Microsoft Azure; links expire after 15 minutes.",
    },
    { id: "roles", icon: "shield", title: "Role-based access", body: "Staff only see what their role allows." },
    { id: "audit", icon: "scroll", title: "Full audit trail", body: "Every important change is logged with time and user." },
  ],
  extra: ["Account lockout protection after failed logins", "Password reset via OTP"],
} as const;

export const finalCta = {
  title: "Ready to run a calmer hostel?",
  lead: "Move from registers and WhatsApp to one app — we'll help you set it up.",
  primary: { label: "Book a free demo", href: "/contact" },
  secondary: { label: "Start free", href: "/contact?plan=free" },
} as const;
