import type { AnimatedIconName } from "@/components/icons/AnimatedIcon";

/**
 * Icon colour system. Every module keeps the same hue sitewide:
 * bookings/occupancy = brand · money = emerald · reminders/travel = sky · complaints = orange · maintenance/reviews = amber ·
 * food/referrals/discovery = rose · cleaning/support = teal · announcements/reports/people = violet · staff/security = indigo.
 * Hues are CSS classes (`tone-*` utilities in globals.css) that set the --t* variables read by tile-gloss/solid/glass.
 */
export const hues = ["brand", "sky", "violet", "indigo", "emerald", "teal", "rose", "amber", "orange"] as const;
export type Hue = (typeof hues)[number];

/** Full class names (kept literal so Tailwind's scanner emits them). */
export const toneClass: Record<Hue, string> = {
  brand: "tone-brand",
  sky: "tone-sky",
  violet: "tone-violet",
  indigo: "tone-indigo",
  emerald: "tone-emerald",
  teal: "tone-teal",
  rose: "tone-rose",
  amber: "tone-amber",
  orange: "tone-orange",
};

const iconHue: Record<string, Hue> = {
  // bookings, occupancy, product surfaces
  BedDouble: "brand",
  LayoutGrid: "brand",
  LayoutDashboard: "brand",
  Building2: "brand",
  building: "brand",
  CalendarCheck: "brand",
  "calendar-check": "brand",
  Smartphone: "brand",
  Map: "brand",
  CircleCheck: "brand",
  BadgeCheck: "brand",
  // money
  IndianRupee: "emerald",
  Wallet: "emerald",
  ReceiptIndianRupee: "emerald",
  BadgeIndianRupee: "emerald",
  ReceiptText: "emerald",
  CreditCard: "emerald",
  card: "emerald",
  lock: "emerald", // used for "secure payments"
  TrendingUp: "emerald",
  FileSpreadsheet: "emerald",
  // reminders, leave, parking, cloud
  BellRing: "sky",
  Plane: "sky",
  Car: "sky",
  Cloud: "sky",
  cloud: "sky",
  CalendarSync: "sky",
  // complaints, launch
  MessageSquareWarning: "orange",
  Flag: "orange",
  flag: "orange",
  Rocket: "orange",
  rocket: "orange",
  // maintenance, reviews, settings
  Wrench: "amber",
  Star: "amber",
  Settings2: "amber",
  // food, referrals, discovery
  UtensilsCrossed: "rose",
  Gift: "rose",
  MapPin: "rose",
  // cleaning, support, residents
  Sparkles: "teal",
  Headset: "teal",
  UserRound: "teal",
  // announcements, reports, people, audit
  Megaphone: "violet",
  ChartNoAxesCombined: "violet",
  Users: "violet",
  ScrollText: "violet",
  scroll: "violet",
  // staff & security
  ShieldCheck: "indigo",
  shield: "indigo",
  Shield: "indigo",
  UserCog: "indigo",
  LockKeyhole: "indigo",
  Lock: "indigo",
  EyeOff: "indigo",
};

export function hueFor(icon: string): Hue {
  return iconHue[icon] ?? "brand";
}

export function toneFor(icon: string): string {
  return toneClass[hueFor(icon)];
}

/** Static icon names that have a Motion-animated twin (AnimatedIcon, §13.2). */
const animatedTwin: Record<string, AnimatedIconName> = {
  BellRing: "bell-ring",
  Rocket: "rocket",
  rocket: "rocket",
  Wrench: "wrench",
  Sparkles: "sparkles",
  MapPin: "map-pin",
  ShieldCheck: "shield-check",
  shield: "shield-check",
  CircleCheck: "check-circle",
  CalendarCheck: "calendar-check",
  "calendar-check": "calendar-check",
  Building2: "building",
  building: "building",
  Megaphone: "megaphone",
  IndianRupee: "indian-rupee",
};

export function animatedFor(icon: string): AnimatedIconName | undefined {
  return animatedTwin[icon];
}
