/** Feature inventory — every module here is built (spec §1.1). Icons are lucide-react names. */

export type ModuleSummary = {
  id: string;
  icon: string;
  title: string;
  body: string;
  bullets: readonly string[];
  href?: string;
  comingSoon?: boolean;
};

export const ownerModules = [
  {
    id: "dashboard",
    icon: "LayoutDashboard",
    title: "Dashboard",
    body: "Your hostel at a glance the moment you open the app.",
    bullets: ["Total members and pending requests", "Pending dues and collected this month", "Quick actions for daily tasks"],
  },
  {
    id: "setup",
    icon: "Building2",
    title: "Hostel setup",
    body: "Set amenities and pricing once — everything else follows.",
    bullets: [
      "Wi-Fi, AC, food, parking, gym, laundry",
      "Single, double, triple and dormitory pricing",
      "Base rent, deposit months and late fee",
    ],
    href: "/features/bookings",
  },
  {
    id: "occupancy",
    icon: "LayoutGrid",
    title: "Floors, rooms & occupancy map",
    body: "Build your floor → room → bed structure in bulk and see it live.",
    bullets: ["Bulk-create floors, rooms and beds", "Occupied, available and reserved at a glance", "No more walking the corridors"],
    href: "/features/bookings",
  },
  {
    id: "bookings",
    icon: "BedDouble",
    title: "Bookings & allocations",
    body: "Online booking requests you approve in one tap.",
    bullets: ["Approve, reject or reassign to another bed", "Check-in with advance, and check-out", "Stale requests expire automatically"],
    href: "/features/bookings",
  },
  {
    id: "members",
    icon: "Users",
    title: "Members",
    body: "Every resident's details in one profile.",
    bullets: ["Payment history and activity", "ID proofs and emergency contacts", "Searchable resident list"],
  },
  {
    id: "rent",
    icon: "IndianRupee",
    title: "Rent & dues",
    body: "Monthly dues without the spreadsheet.",
    bullets: ["Generate monthly dues for everyone", "Record cash and offline payments", "Discounts, late fees and overdue tracking"],
    href: "/features/payments",
  },
  {
    id: "payments",
    icon: "Wallet",
    title: "Online payments",
    body: "Residents pay through Razorpay; you get the money and the record.",
    bullets: ["UPI, cards and net banking", "Signature-verified payment confirmation", "Digital receipts for every payment"],
    href: "/features/payments",
  },
  {
    id: "reminders",
    icon: "BellRing",
    title: "Automated reminders",
    body: "Hostlify does the chasing for you.",
    bullets: ["Due reminders on the 15th at 9 AM", "Pending bookings expire daily", "SMS & email notifications coming soon"],
    href: "/features/payments",
  },
  {
    id: "expenses",
    icon: "ReceiptIndianRupee",
    title: "Expenses",
    body: "Every bill in one place, with the invoice attached.",
    bullets: ["Gas, electricity, rent, vegetables, meat & eggs", "Vendor and invoice number", "Upload invoice photos"],
    href: "/features/finance",
  },
  {
    id: "payroll",
    icon: "BadgeIndianRupee",
    title: "Payroll",
    body: "Staff salaries calculated, not guessed.",
    bullets: ["Base salary and HRA", "Deductions", "Net pay per employee"],
    href: "/features/finance",
  },
  {
    id: "revenue",
    icon: "ChartNoAxesCombined",
    title: "Revenue report",
    body: "Know whether this month made money.",
    bullets: ["Income vs expenses", "Net surplus or deficit", "Export to CSV"],
    href: "/features/finance",
  },
  {
    id: "complaints",
    icon: "MessageSquareWarning",
    title: "Complaints",
    body: "Every complaint has a status and an owner.",
    bullets: ["Open → In Progress → Resolved → Closed", "Assign to staff", "Resolve with notes"],
    href: "/features/operations",
  },
  {
    id: "maintenance",
    icon: "Wrench",
    title: "Maintenance",
    body: "Repairs tracked from request to bill.",
    bullets: ["Plumbing, electrical, carpentry, AC, painting", "Estimated vs actual cost", "Vendor and photos"],
    href: "/features/operations",
  },
  {
    id: "menu",
    icon: "UtensilsCrossed",
    title: "Food menu",
    body: "The mess menu residents can actually see.",
    bullets: ["Weekly breakfast, lunch and dinner", "Today highlighted for residents", "Update in seconds"],
    href: "/features/operations",
  },
  {
    id: "cleaning",
    icon: "Sparkles",
    title: "Cleaning",
    body: "Room-cleaning requests in one queue.",
    bullets: ["Residents pick a time slot", "Staff see a clear queue", "Mark done when finished"],
    href: "/features/operations",
  },
  {
    id: "parking",
    icon: "Car",
    title: "Parking",
    body: "Know whose vehicle is where.",
    bullets: ["Car, bike and scooter registration", "Slot assignment", "Resident self-registration"],
    href: "/features/operations",
  },
  {
    id: "leave",
    icon: "Plane",
    title: "Leave",
    body: "Leave requests with an occupancy planner.",
    bullets: ["Approve leave in one tap", "Plan occupancy from approved leaves", "Casual, sick, going home, vacate"],
  },
  {
    id: "announcements",
    icon: "Megaphone",
    title: "Announcements",
    body: "Notices residents actually read.",
    bullets: ["General, maintenance, event, fee, emergency", "Priority levels", "Validity window"],
  },
  {
    id: "reviews",
    icon: "Star",
    title: "Reviews",
    body: "Collect and moderate resident reviews.",
    bullets: ["Residents rate their hostel", "Moderate before they show", "Better reviews, more bookings"],
  },
  {
    id: "staff",
    icon: "ShieldCheck",
    title: "Staff & roles",
    body: "Eight roles so everyone sees only what they need.",
    bullets: ["Owner, Admin, Manager, Supervisor and more", "Supervisors never see finance", "Only Owners and Admins manage staff"],
    href: "/features/staff",
  },
  {
    id: "security",
    icon: "LockKeyhole",
    title: "Security",
    body: "Built to protect your residents' data.",
    bullets: ["Account lockout after failed logins", "OTP password reset", "Encrypted files with expiring links, audit logs"],
    href: "/features/staff",
  },
] as const satisfies readonly ModuleSummary[];

export const residentModules = [
  {
    id: "discover",
    icon: "MapPin",
    title: "Discover",
    body: "Find hostels near you before you visit.",
    bullets: ["“Near me” search by location", "Boys, Girls and Co-ed filters", "Amenities, pricing and reviews"],
  },
  {
    id: "pick-bed",
    icon: "BedDouble",
    title: "Pick your bed",
    body: "Choose your exact bed, like booking a movie seat.",
    bullets: ["Floor → Bed → Confirm", "See which beds are free", "Request in under a minute"],
  },
  {
    id: "status",
    icon: "CircleCheck",
    title: "Booking status",
    body: "Always know where your booking stands.",
    bullets: ["Pending, approved, reassigned or rejected", "Cancel anytime before approval", "Clear updates from the hostel"],
  },
  {
    id: "dues",
    icon: "Wallet",
    title: "My dues",
    body: "Rent without the awkward conversation.",
    bullets: ["Current dues and history", "Pay online with UPI", "Download receipts"],
  },
  {
    id: "profile",
    icon: "UserRound",
    title: "Profile",
    body: "Your details, ready for check-in.",
    bullets: ["Photo and ID proof upload", "Emergency contact", "Profile completion meter"],
  },
  {
    id: "complaints",
    icon: "MessageSquareWarning",
    title: "Complaints",
    body: "Raise it once and track it until it's fixed.",
    bullets: ["Maintenance, cleanliness, food, noise, security", "Add a photo and priority", "Live status updates"],
  },
  {
    id: "leave",
    icon: "Plane",
    title: "Leave",
    body: "Going home? Tell the hostel in two taps.",
    bullets: ["Casual and sick leave", "Going home", "Vacate notice"],
  },
  {
    id: "services",
    icon: "Sparkles",
    title: "Services",
    body: "Everyday requests without calling the warden.",
    bullets: ["Book a cleaning slot", "Request maintenance", "Register your vehicle"],
  },
  {
    id: "menu",
    icon: "UtensilsCrossed",
    title: "Food menu",
    body: "Know what's for dinner.",
    bullets: ["Weekly menu", "Today highlighted", "Always up to date"],
  },
  {
    id: "announcements",
    icon: "Megaphone",
    title: "Announcements",
    body: "Hostel notices in one feed.",
    bullets: ["Never miss a fee or water-cut notice", "Priority notices stand out", "No WhatsApp group noise"],
  },
  {
    id: "refer",
    icon: "Gift",
    title: "Refer & earn",
    body: "Bring a friend and both of you save.",
    bullets: ["Share your referral code", "Friend gets a discount", "You get money off next month"],
  },
  {
    id: "reviews",
    icon: "Star",
    title: "Reviews",
    body: "Rate your stay and help others choose.",
    bullets: ["Rate and review your hostel", "Honest feedback for owners", "Helps the next resident"],
  },
] as const satisfies readonly ModuleSummary[];

export const featuresPage = {
  eyebrow: "Features",
  title: "Every tool your hostel needs",
  lead: "One connected app for owners, staff and residents — from the first booking to the monthly profit report.",
  tabs: { owners: "For owners & staff", residents: "For residents" },
  learnMore: "Learn more",
  onThisPage: "On this page",
  comparison: {
    title: "Hostlify vs the old way",
    lead: "Why owners move from registers and generic software.",
    columns: ["Hostlify", "Excel / registers", "Generic property software"],
    rows: [
      { label: "Built for hostels & PGs (beds, not flats)", values: [true, false, false] },
      { label: "Live bed-level occupancy map", values: [true, false, false] },
      { label: "Residents book a bed online", values: [true, false, false] },
      { label: "Auto-generated monthly dues", values: [true, false, true] },
      { label: "UPI rent collection with receipts", values: [true, false, true] },
      { label: "Complaints, menu, cleaning, parking", values: [true, false, false] },
      { label: "Role-based staff access", values: [true, false, true] },
      { label: "Works on any phone, no download", values: [true, false, false] },
    ],
  },
} as const;

/* ---------------- Deep pages (/features/:module) ---------------- */

export type FeatureModule = {
  slug: string;
  icon: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  mock: "occupancy" | "dues" | "complaints" | "profit" | "roles";
  problem: { title: string; points: readonly string[] };
  capabilities: readonly { title: string; body: string; icon: string }[];
  workflow: { title: string; steps: readonly string[] };
  faqs: readonly { id: string; q: string; a: string }[];
  related: readonly string[];
};

export const featureModules = [
  {
    slug: "bookings",
    icon: "BedDouble",
    name: "Bookings & beds",
    seoTitle: "Hostel Bed Booking Software & Occupancy Map | Hostlify",
    seoDescription:
      "Online bed booking for hostels and PGs. Residents pick a bed, you approve in one tap, and a live occupancy map shows every free bed.",
    eyebrow: "Bookings & occupancy",
    title: "Fill every bed, without the phone calls.",
    lead: "Residents find you nearby, pick their exact bed and send a request. You approve, reassign or reject in one tap — and the occupancy map updates instantly.",
    mock: "occupancy",
    problem: {
      title: "The old way costs you beds",
      points: [
        "You walk floor by floor to check which beds are free.",
        "Enquiries come by phone and WhatsApp and get forgotten.",
        "Two people get promised the same bed.",
      ],
    },
    capabilities: [
      {
        icon: "LayoutGrid",
        title: "Floors, rooms & beds in bulk",
        body: "Create your whole building structure in minutes, with room types and pricing.",
      },
      { icon: "Map", title: "Live occupancy map", body: "Occupied, available and reserved beds on one map, floor by floor." },
      {
        icon: "CircleCheck",
        title: "One-tap approvals",
        body: "Approve, reject or reassign a request to another bed. Check in with the advance.",
      },
      {
        icon: "Settings2",
        title: "Booking rules",
        body: "Self-booking on or off, admin approval, auto-expiry days, max pending per bed and discovery radius.",
      },
    ],
    workflow: {
      title: "From enquiry to check-in",
      steps: ["Resident finds you nearby", "Picks a bed", "You approve", "Check-in with advance"],
    },
    faqs: [
      {
        id: "b1",
        q: "Can I stop residents from booking without my approval?",
        a: "Yes. Turn on “admin approval required” and every request waits for you.",
      },
      {
        id: "b2",
        q: "What happens to requests I don't answer?",
        a: "They expire automatically after the number of days you choose, so beds don't stay blocked.",
      },
      {
        id: "b3",
        q: "Can I move a resident to a different bed?",
        a: "Yes. Reassign a request to another bed, and the resident sees the change in their app.",
      },
    ],
    related: ["payments", "operations"],
  },
  {
    slug: "payments",
    icon: "IndianRupee",
    name: "Rent & payments",
    seoTitle: "PG Rent Collection App with UPI Payments | Hostlify",
    seoDescription:
      "Collect hostel and PG rent on time. Auto-generated dues, monthly reminders, UPI payments via Razorpay and instant digital receipts.",
    eyebrow: "Rent collection",
    title: "Collect rent on time, every month.",
    lead: "Dues generate themselves, reminders go out on the 15th, and residents pay by UPI in one tap. You get a receipt-backed ledger without lifting a finger.",
    mock: "dues",
    problem: {
      title: "Chasing rent shouldn't be a full-time job",
      points: ["UPI screenshots scattered across chats.", "Cash in a diary, with no receipts.", "No clear list of who still owes what."],
    },
    capabilities: [
      {
        icon: "CalendarSync",
        title: "Monthly dues, automatically",
        body: "Rent is created for every resident based on their bed and plan.",
      },
      { icon: "BellRing", title: "Reminders on the 15th", body: "Residents get a due reminder at 9 AM on the 15th of every month." },
      {
        icon: "Wallet",
        title: "UPI, cards & net banking",
        body: "Online payments through Razorpay, verified with a cryptographic signature.",
      },
      {
        icon: "ReceiptText",
        title: "Receipts, cash & late fees",
        body: "Digital receipts for every payment. Record cash in seconds. Add discounts or late fees anytime.",
      },
    ],
    workflow: {
      title: "How rent flows",
      steps: ["Dues generated", "Reminder sent", "Resident pays by UPI", "Receipt issued", "Dashboard updates"],
    },
    faqs: [
      { id: "p1", q: "Do residents pay me directly?", a: "Payments are processed by Razorpay and settled to your Razorpay account." },
      {
        id: "p2",
        q: "Can I still accept cash?",
        a: "Yes. Record cash or offline payments and they appear in the same ledger as online payments.",
      },
      {
        id: "p3",
        q: "Are reminders sent by SMS or WhatsApp?",
        a: "Residents see reminders in the app today. SMS and email notifications are coming soon.",
      },
    ],
    related: ["finance", "bookings"],
  },
  {
    slug: "operations",
    icon: "Wrench",
    name: "Daily operations",
    seoTitle: "Hostel Complaint, Maintenance & Mess Menu Software | Hostlify",
    seoDescription:
      "Run hostel operations calmly: complaints, maintenance, cleaning slots, weekly mess menu, parking and announcements in one app.",
    eyebrow: "Operations",
    title: "Run the hostel calmly.",
    lead: "Complaints, maintenance, cleaning, the mess menu, parking and announcements — all in one place, instead of twelve WhatsApp groups.",
    mock: "complaints",
    problem: {
      title: "Small problems become big ones",
      points: ["Complaints get buried in WhatsApp.", "Nobody knows who's fixing the geyser.", "Residents keep asking what's for dinner."],
    },
    capabilities: [
      {
        icon: "MessageSquareWarning",
        title: "Complaints to closure",
        body: "Open → In Progress → Resolved → Closed, with assignment and notes.",
      },
      {
        icon: "Wrench",
        title: "Maintenance with costs",
        body: "Plumbing, electrical, carpentry, AC and painting, with estimated vs actual cost, vendor and photos.",
      },
      { icon: "UtensilsCrossed", title: "Weekly mess menu", body: "Plan breakfast, lunch and dinner. Residents see today highlighted." },
      {
        icon: "Megaphone",
        title: "Cleaning, parking & notices",
        body: "Cleaning time slots, vehicle registration with slots, and announcements with priority.",
      },
    ],
    workflow: {
      title: "A complaint's journey",
      steps: ["Resident raises it with a photo", "You assign it", "Staff fix it", "Resolved with notes"],
    },
    faqs: [
      { id: "o1", q: "Can residents attach photos to complaints?", a: "Yes, along with a category and priority." },
      { id: "o2", q: "Can I track what repairs cost?", a: "Yes. Maintenance requests record estimated and actual cost and the vendor." },
      { id: "o3", q: "Can I switch modules off?", a: "Yes. Parking, cleaning, the weekly menu and reviews can be enabled per hostel." },
    ],
    related: ["staff", "bookings"],
  },
  {
    slug: "finance",
    icon: "ChartNoAxesCombined",
    name: "Finance & reports",
    seoTitle: "PG Accounting Software: Expenses, Payroll & Profit | Hostlify",
    seoDescription:
      "Track hostel expenses with invoices, run staff payroll and see income vs expenses and net profit. Export revenue reports to CSV.",
    eyebrow: "Finance",
    title: "Know your real profit.",
    lead: "Every expense with its invoice, staff payroll, and an income vs expenses report that tells you if this month made money.",
    mock: "profit",
    problem: {
      title: "A notebook can't tell you your profit",
      points: [
        "Bills are scattered across drawers and phones.",
        "Salaries are worked out by hand.",
        "You only find out about losses at year end.",
      ],
    },
    capabilities: [
      {
        icon: "ReceiptIndianRupee",
        title: "Expenses with invoices",
        body: "Gas, electricity, building rent, vegetables, meat and eggs — with vendor, invoice number and upload.",
      },
      { icon: "BadgeIndianRupee", title: "Payroll", body: "Employees, base salary, HRA, deductions and net pay." },
      { icon: "TrendingUp", title: "Revenue report", body: "Income vs expenses and net surplus or deficit, month by month." },
      { icon: "FileSpreadsheet", title: "CSV export", body: "Send reports to your accountant in one click." },
    ],
    workflow: {
      title: "Month-end in minutes",
      steps: ["Rent collected", "Expenses logged", "Payroll run", "Profit report", "CSV to accountant"],
    },
    faqs: [
      {
        id: "f1",
        q: "Can staff see the revenue report?",
        a: "Only roles with finance access. Supervisors never see payments, expenses or revenue.",
      },
      { id: "f2", q: "Do you generate GST invoices?", a: "Not yet. Hostlify issues digital receipts and exports reports to CSV." },
      { id: "f3", q: "Can I upload bill photos?", a: "Yes. Attach an invoice to every expense." },
    ],
    related: ["payments", "staff"],
  },
  {
    slug: "staff",
    icon: "ShieldCheck",
    name: "Staff & roles",
    seoTitle: "Hostel Staff Roles, Permissions & Security | Hostlify",
    seoDescription:
      "Give hostel staff the right access. 8 roles, supervisors never see finance, audit logs, account lockout and encrypted document storage.",
    eyebrow: "Staff & security",
    title: "Stay in control of who sees what.",
    lead: "Give every staff member a login that fits their job. Supervisors run the floor without ever seeing the money — and every important action is logged.",
    mock: "roles",
    problem: {
      title: "Shared logins are a risk",
      points: ["Everyone uses the owner's phone or password.", "Staff can see every rupee.", "Nobody knows who changed what."],
    },
    capabilities: [
      { icon: "UserCog", title: "8 staff roles", body: "Owner, Admin, Manager, Supervisor, Receptionist, Security, Cleaner and Other." },
      { icon: "EyeOff", title: "Finance stays private", body: "Supervisors have no access to payments, expenses, revenue or staff." },
      { icon: "ScrollText", title: "Audit logs", body: "Every important change is logged with time and user." },
      {
        icon: "LockKeyhole",
        title: "Secure by default",
        body: "Account lockout after failed logins, OTP password reset, and encrypted files behind 15-minute links.",
      },
    ],
    workflow: { title: "Adding a staff member", steps: ["Owner or Admin invites", "Pick a role", "Staff logs in", "Actions are logged"] },
    faqs: [
      { id: "s1", q: "Who can add staff?", a: "Only Owners and Admins. Only the Owner can create Admins." },
      {
        id: "s2",
        q: "Is two-factor login available?",
        a: "Not yet. Accounts are protected with lockout after failed attempts and OTP password reset.",
      },
      {
        id: "s3",
        q: "Where are ID proofs stored?",
        a: "Encrypted on Microsoft Azure, shared only through links that expire after 15 minutes.",
      },
    ],
    related: ["operations", "finance"],
  },
] as const satisfies readonly FeatureModule[];

export function getFeatureModule(slug: string | undefined) {
  return featureModules.find((m) => m.slug === slug);
}

export const featureDeepCopy = {
  problemEyebrow: "The problem",
  capabilitiesEyebrow: "What you get",
  capabilitiesTitle: "Everything you need, nothing you don't",
  relatedTitle: "Related features",
  faqTitle: "Common questions",
  demoNote: "Sample data",
  workflowEyebrow: "How it works",
  relatedEyebrow: "Keep exploring",
  relatedCta: "Explore",
  primaryCta: { label: "Book a demo", href: "/contact" },
  secondaryCta: { label: "See pricing", href: "/pricing" },
  ctaTitle: (name: string) => `See ${name.toLowerCase()} working for your hostel.`,
} as const;

export const featuresListCopy = {
  ownersLead: "Everything an owner, manager or warden needs to run the building.",
  residentsLead: "The app your residents use — no download, works on any phone.",
  tabsLabel: "Show features for",
  comingSoon: "Coming soon",
  comparisonEyebrow: "Compare",
  yes: "Yes",
  no: "No",
} as const;

/* ---------------- Live-coded mock data (fictional, marked “Sample data”) ---------------- */

export const featureMocks = {
  occupancy: {
    url: "app.hostlify.in/occupancy",
    title: "Occupancy map",
    floorLabel: "Floor",
    legend: { occupied: "Occupied", available: "Available", reserved: "Reserved" },
    room: "Room",
    toastTitle: "Booking approved",
    toastBody: "Bed 2B-3 · A. Reddy",
    freeLabel: "free",
  },
  dues: {
    url: "app.hostlify.in/rent",
    title: "Rent & dues",
    month: "October 2026",
    collectedLabel: "Collected",
    collected: 362000,
    pendingLabel: "Pending",
    pending: 48500,
    status: { paid: "Paid", due: "Due", overdue: "Overdue" },
    rows: [
      { id: "r1", name: "R. Kumar", room: "Room 101", amount: 6500, status: "paid" },
      { id: "r2", name: "P. Sharma", room: "Room 104", amount: 5500, status: "paid" },
      { id: "r3", name: "S. Iyer", room: "Room 203", amount: 9500, status: "due" },
      { id: "r4", name: "K. Naidu", room: "Room 207", amount: 6500, status: "overdue" },
    ],
    toast: "₹6,500 received via UPI",
    toastSub: "Receipt sent to R. Kumar",
  },
  complaints: {
    url: "app.hostlify.in/complaints",
    title: "Complaints",
    priority: { high: "High", medium: "Medium", low: "Low" },
    columns: [
      {
        id: "open",
        label: "Open",
        items: [
          { id: "c1", title: "Geyser not heating", room: "Room 204", priority: "high" },
          { id: "c2", title: "Wi-Fi slow on 3rd floor", room: "Floor 3", priority: "medium" },
        ],
      },
      { id: "progress", label: "In progress", items: [{ id: "c3", title: "Tap leaking", room: "Room 112", priority: "medium" }] },
      { id: "resolved", label: "Resolved", items: [{ id: "c4", title: "Fan making noise", room: "Room 008", priority: "low" }] },
    ],
    assigned: "Assigned to Ravi",
  },
  profit: {
    url: "app.hostlify.in/reports",
    title: "Revenue report",
    period: "Last 6 months",
    income: { label: "Income", value: 362000 },
    expenses: { label: "Expenses", value: 214000 },
    net: { label: "Net surplus", value: 148000 },
    export: "Export CSV",
    unit: "₹ thousands",
  },
  roles: {
    url: "app.hostlify.in/staff",
    title: "Staff & roles",
    permissions: ["Bookings", "Complaints", "Payments", "Revenue", "Staff"],
    rows: [
      { id: "owner", role: "Owner", access: [true, true, true, true, true] },
      { id: "admin", role: "Admin", access: [true, true, true, true, true] },
      { id: "supervisor", role: "Supervisor", access: [true, true, false, false, false] },
    ],
    allRolesLabel: "8 roles",
    allRoles: ["Owner", "Admin", "Manager", "Supervisor", "Receptionist", "Security", "Cleaner", "Other"],
    allowed: "Has access",
    denied: "No access",
    logTitle: "Audit log",
    log: "Supervisor viewed bookings · 10:42 AM",
  },
} as const;
