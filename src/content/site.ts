import { env } from "@/lib/env";

export const site = {
  name: "Hostlify",
  tagline: "Smart Hostel Management",
  oneLiner: "Hostel & PG management software built for how Indian hostels actually run.",
  url: env.siteUrl,
  appUrl: env.appUrl,
  links: {
    staffLogin: `${env.appUrl}/auth/staff/login`,
    residentLogin: `${env.appUrl}/auth/login`,
    residentSignup: `${env.appUrl}/auth/signup`,
    discover: `${env.appUrl}/discover`,
  },
  contact: {
    // TODO(business): add phone / address when ready to publish them
    email: "hostlify.official@gmail.com",
    /** Intentionally empty: no phone number is published on the site for now (WhatsApp chat only). */
    phone: "" as string,
    whatsapp: env.whatsappNumber,
    address: "" as string,
    hours: "Mon–Sat, 9:30 AM – 7:00 PM IST",
  },
  /**
   * Launch switches (the apps are still in development):
   *  - `login`: every "Log in" entry point is hidden.
   *  - `residentApp`: resident sign-up, "Find a hostel near me" and the hostel search are hidden.
   * Set to true once app.hostlify.in is live.
   */
  features: { login: false as boolean, residentApp: false as boolean },
  socials: [] as readonly { label: string; href: string }[],
  copyright: `© ${new Date().getFullYear()} Hostlify. All rights reserved.`,
  madeIn: "Made with ❤️ in India",
} as const;

export function whatsappHref(text = "Hi Hostlify, I'd like to know more about hostel management software.") {
  if (!site.contact.whatsapp) return "";
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}`;
}
