# Claims log

Every number, logo and factual claim on the site, with its source (spec §4 rule).
Items marked **CONFIRM** need business sign-off before launch.

| Claim | Where | Source |
|---|---|---|
| Plan prices ₹0 / ₹999 / ₹2,999 / ₹7,999 | Pricing, home | hostlify-api plan seed — **CONFIRM** (spec §25 #1) |
| Plan limits 1/1/3/10 hostels, 30/75/200/1,000 beds | Pricing, FAQ | hostlify-api plan seed — **CONFIRM** |
| Reports: Basic / Advanced / Full analytics; Support: Email / Priority / Dedicated | Pricing | hostlify-api plan seed |
| Yearly discount 20% | Pricing toggle | **PLACEHOLDER — CONFIRM** (`yearlyDiscountPercent` in `plans.ts`) |
| Prices exclude GST | Pricing FAQ | **CONFIRM** |
| Multi-hostel "rolling out" | Pricing, FAQ | Switcher is data-model only (spec §4) |
| 8 staff roles | Home facts, staff page | `StaffController.java` sub-roles + Owner |
| Supervisors have no finance/staff access | Roles, FAQ | `HostelAccess.java` |
| Only Owner/Admin manage staff; only Owner creates Admins | Roles | `StaffController.java` |
| 6 complaint categories | Home facts | `hostlify-web/src/pages/app/Complaints.tsx` |
| 3-step bed booking | Home facts | Resident Pick-a-Bed flow (spec §1.1) |
| Reminders on the 15th at 9 AM | Rent flow, payments page | Scheduler (spec §1.1) |
| Document links expire after 15 minutes | Security | Azure Blob SAS config (spec §9.14) |
| Razorpay signature-verified payments | Security | Razorpay webhook (spec §1.1) |
| Stored on Microsoft Azure | Trust strip, security | `AzureBlobConfig.java` |
| SMS / email notifications | Payments page | **Coming soon** — not live (spec §4) |
| Referral reward amounts | Not shown | **CONFIRM** ₹200 / ₹500 before advertising (spec §25 #4) |
| Demo dashboard numbers (142 members, ₹3,62,000 etc.) | Hero, demos | Labelled sample data, fictional names |
| Testimonials, customer logos, usage stats | Not shown | None verified yet (spec §9.13, §9.11) |
| Contact email hostlify.official@gmail.com | Footer, contact, legal | Confirmed by owner (2026-11) |
| WhatsApp sales chat (91 99081 76754) | Floating button, contact, forms | Confirmed by owner — wa.me link only, number not displayed |
| Phone number / address | Not shown | Owner: do not publish yet |
| Log in links | Hidden (`site.features.login = false`) | Owner: hide until the app is live |
| Legal pages | /legal/* | **DRAFT — legal review required** (spec §23) |
