import type { LucideIcon } from "lucide-react";
import { BedDouble, IndianRupee, Wrench, ChartNoAxesCombined, ShieldCheck, LayoutGrid } from "lucide-react";

import { site } from "./site";
export type NavLink = { label: string; href: string };
export type MegaLink = NavLink & { description: string; icon: LucideIcon };

export const megaMenu: readonly MegaLink[] = [
  {
    label: "Bookings & beds",
    href: "/features/bookings",
    description: "Online requests, approvals and a live occupancy map",
    icon: BedDouble,
  },
  {
    label: "Rent & payments",
    href: "/features/payments",
    description: "Auto dues, reminders, UPI via Razorpay, receipts",
    icon: IndianRupee,
  },
  {
    label: "Daily operations",
    href: "/features/operations",
    description: "Complaints, maintenance, cleaning, menu, parking",
    icon: Wrench,
  },
  {
    label: "Finance & reports",
    href: "/features/finance",
    description: "Expenses, payroll and net profit, with CSV export",
    icon: ChartNoAxesCombined,
  },
  { label: "Staff & roles", href: "/features/staff", description: "8 roles, so every person sees only what they need", icon: ShieldCheck },
  { label: "All features", href: "/features", description: "Everything for owners and residents in one place", icon: LayoutGrid },
];

export const megaPromo = {
  title: "See Hostlify in 15 minutes",
  body: "A quick call to understand your hostel and show you around the app.",
  cta: { label: "Book a demo", href: "/contact" },
} as const;

export const mainNav: readonly NavLink[] = [
  { label: "For Residents", href: "/for-residents" },
  { label: "Pricing", href: "/pricing" },
  { label: "How it works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const headerCopy = {
  features: "Features",
  login: "Log in",
  loginOwner: { title: "Owner & staff", subtitle: "Admin portal" },
  loginResident: { title: "Resident", subtitle: "Resident app" },
  cta: "Book a demo",
  skip: "Skip to content",
  menuOpen: "Open menu",
  menuClose: "Close menu",
  announcement: {
    text: "🎉 UPI rent collection with Razorpay is built in",
    link: "See how it works →",
    href: "/features/payments",
    dismiss: "Dismiss announcement",
  },
} as const;

export const footerNav = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "For Residents", href: "/for-residents" },
      { label: "How it works", href: "/how-it-works" },
      // Log in is hidden until the app is live — flip site.features.login
      ...(site.features.login ? [{ label: "Log in", href: site.links.staffLogin }] : []),
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "/#faq" },
      { label: "Book a demo", href: "/contact" },
      { label: "For hostel owners", href: "/for-owners" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Refund", href: "/legal/refund" },
      { label: "Shipping", href: "/legal/shipping" },
    ],
  },
] as const satisfies readonly { title: string; links: readonly NavLink[] }[];

export const homeLink: NavLink = { label: "Home", href: "/" };

/** Breadcrumb names for inner pages (Home › Page). */
export const pageNames: Record<string, string> = {
  "/features": "Features",
  "/for-residents": "For residents",
  "/pricing": "Pricing",
  "/how-it-works": "How it works",
  "/about": "About",
  "/contact": "Contact",
};
