export type PlanId = "free" | "starter" | "professional" | "enterprise";

export type Plan = {
  id: PlanId;
  name: string;
  bestFor: string;
  monthly: number;
  hostels: number;
  beds: number;
  features: readonly string[];
  cta: { label: string; href: string };
  highlighted?: boolean;
};

/**
 * Prices, limits, reports and support levels come from the plan seed in hostlify-api (see claims.md).
 * TODO(business): confirm final prices and the yearly discount before launch (spec §25 #1).
 */
export const yearlyDiscountPercent = 20;

export const plans = [
  {
    id: "free",
    name: "Free",
    bestFor: "Small PGs getting started",
    monthly: 0,
    hostels: 1,
    beds: 30,
    features: [
      "Bookings & live occupancy map",
      "Rent dues, cash ledger & receipts",
      "Complaints & announcements",
      "Weekly food menu",
      "Resident app",
    ],
    cta: { label: "Get started free", href: "/contact?plan=free" },
  },
  {
    id: "starter",
    name: "Starter",
    bestFor: "A growing single hostel",
    monthly: 999,
    hostels: 1,
    beds: 75,
    features: ["Everything in Free", "Room for up to 75 beds", "Basic reports", "Email support"],
    cta: { label: "Book a demo", href: "/contact?plan=starter" },
  },
  {
    id: "professional",
    name: "Professional",
    bestFor: "Owners running a few properties",
    monthly: 2999,
    hostels: 3,
    beds: 200,
    features: ["Everything in Starter", "Up to 3 hostels", "Advanced revenue reports", "CSV export", "Priority support"],
    cta: { label: "Book a demo", href: "/contact?plan=professional" },
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    bestFor: "Hostel groups & chains",
    monthly: 7999,
    hostels: 10,
    beds: 1000,
    features: ["Everything in Professional", "Up to 10 hostels", "Full analytics", "Assisted resident import", "Dedicated support"],
    cta: { label: "Talk to sales", href: "/contact?plan=enterprise" },
  },
] as const satisfies readonly Plan[];

export type BillingPeriod = "monthly" | "yearly";

export function priceFor(plan: Plan, period: BillingPeriod) {
  if (period === "monthly") return plan.monthly;
  return Math.round((plan.monthly * (100 - yearlyDiscountPercent)) / 100);
}

export const pricingCopy = {
  eyebrow: "Pricing",
  title: "Simple pricing that grows with your beds.",
  lead: "Start free. Upgrade when your hostel grows. Every plan is set up with our help.",
  monthly: "Monthly",
  yearly: "Yearly",
  save: `Save ${yearlyDiscountPercent}%`,
  perMonth: "/month",
  billedYearly: "per month, billed yearly",
  billedMonthly: "per month",
  mostPopular: "Most popular",
  hostels: (n: number) => `${n} ${n === 1 ? "hostel" : "hostels"}`,
  beds: (n: number) => `Up to ${new Intl.NumberFormat("en-IN").format(n)} beds`,
  allInclude: "All plans include: secure cloud storage, resident app, online booking, complaints, announcements.",
  gstNote: "All prices are in ₹ and exclude GST.",
  moreThan: "Need more than 10 hostels?",
  contactUs: "Contact us",
  multiHostelNote: "Multi-hostel management is rolling out — we'll set it up with you.",
  seeFull: "Compare all features",
} as const;

export type Cell = boolean | string;
export type ComparisonRow = { label: string; values: readonly [Cell, Cell, Cell, Cell] };
export type ComparisonGroup = { group: string; rows: readonly ComparisonRow[] };

export const comparison: readonly ComparisonGroup[] = [
  {
    group: "Limits",
    rows: [
      { label: "Hostels", values: ["1", "1", "3", "10"] },
      { label: "Beds", values: ["30", "75", "200", "1,000"] },
    ],
  },
  {
    group: "Bookings & residents",
    rows: [
      { label: "Floors, rooms & beds setup", values: [true, true, true, true] },
      { label: "Live occupancy map", values: [true, true, true, true] },
      { label: "Online booking requests & approvals", values: [true, true, true, true] },
      { label: "Resident profiles & ID proofs", values: [true, true, true, true] },
      { label: "Leave requests", values: [true, true, true, true] },
    ],
  },
  {
    group: "Rent & money",
    rows: [
      { label: "Monthly dues, discounts & late fees", values: [true, true, true, true] },
      { label: "Cash / offline payment ledger", values: [true, true, true, true] },
      { label: "Online payments (Razorpay)", values: ["Add-on", "Add-on", "Add-on", "Add-on"] },
      { label: "Digital receipts", values: [true, true, true, true] },
      { label: "Revenue reports", values: ["Core", "Basic", "Advanced", "Full analytics"] },
    ],
  },
  {
    group: "Operations",
    rows: [
      { label: "Complaints & maintenance", values: [true, true, true, true] },
      { label: "Announcements", values: [true, true, true, true] },
      { label: "Weekly food menu", values: [true, true, true, true] },
      { label: "Cleaning requests", values: ["Add-on", "Add-on", "Add-on", "Add-on"] },
      { label: "Parking", values: ["Add-on", "Add-on", "Add-on", "Add-on"] },
    ],
  },
  {
    group: "Team & support",
    rows: [
      { label: "Staff roles & permissions", values: [true, true, true, true] },
      { label: "Audit logs", values: [true, true, true, true] },
      { label: "Setup help", values: [true, true, true, true] },
      { label: "Support", values: ["Standard", "Email", "Priority", "Dedicated"] },
    ],
  },
];

export const addOns = {
  title: "Add-ons, switched on per hostel",
  lead: "Turn modules on when you need them. We enable them for you — no extra setup.",
  items: ["Online payments", "Referral program", "Parking", "Cleaning requests", "Weekly menu", "Hostel reviews"],
} as const;
