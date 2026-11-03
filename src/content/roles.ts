export const permissions = ["Bookings", "Residents", "Payments", "Expenses", "Revenue", "Staff", "Complaints", "Menu"] as const;
export type Permission = (typeof permissions)[number];

export type Role = { id: string; name: string; summary: string; denied: readonly Permission[] };

/** Source: HostelAccess.java (SUPERVISOR finance block) + StaffController.java (OWNER/ADMIN manage staff). */
export const roles = [
  { id: "owner", name: "Owner", summary: "Full access. The only role that can create Admins.", denied: [] },
  { id: "admin", name: "Admin", summary: "Runs the hostel day to day and manages staff accounts.", denied: [] },
  { id: "manager", name: "Manager", summary: "Handles operations and money, but can't manage staff accounts.", denied: ["Staff"] },
  {
    id: "supervisor",
    name: "Supervisor",
    summary: "Runs the floor. No access to money or staff.",
    denied: ["Payments", "Expenses", "Revenue", "Staff"],
  },
  { id: "receptionist", name: "Receptionist", summary: "Front desk: bookings, check-ins and residents.", denied: ["Staff"] },
  { id: "security", name: "Security", summary: "Gate and building staff with a hostel login.", denied: ["Staff"] },
  { id: "cleaner", name: "Cleaner", summary: "Housekeeping staff with a hostel login.", denied: ["Staff"] },
] as const satisfies readonly Role[];

export const rolesCopy = {
  eyebrow: "Staff & roles",
  title: "The right access for every member of your team.",
  lead: "Give each person a login that fits their job. Supervisors never see the money.",
  allowed: "Allowed",
  denied: "No access",
  microcopy: "Every important action is logged, so you always know who did what.",
} as const;
