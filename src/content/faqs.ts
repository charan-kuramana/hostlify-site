export type Faq = { id: string; q: string; a: string };

export const homeFaqs = [
  {
    id: "no-download",
    q: "Do my residents need to download an app?",
    a: "No. Hostlify works in any phone browser — residents just open a link and sign in. No Play Store or App Store download needed.",
  },
  {
    id: "upi",
    q: "Can residents pay rent with UPI?",
    a: "Yes. Online payments go through Razorpay, so residents can pay with UPI, cards or net banking. Every payment is verified and gets a digital receipt.",
  },
  {
    id: "cash",
    q: "What if some residents still pay in cash?",
    a: "Record cash or offline payments in a few seconds. Online and cash payments stay in one ledger, so your dues are always accurate.",
  },
  {
    id: "multi",
    q: "Can I manage more than one hostel?",
    a: "Professional covers up to 3 hostels and Enterprise up to 10. Multi-hostel management is rolling out now — we set it up with you during onboarding.",
  },
  {
    id: "free",
    q: "Is there a free plan?",
    a: "Yes. The Free plan covers 1 hostel with up to 30 beds, including bookings, dues, complaints and the weekly menu.",
  },
  {
    id: "setup",
    q: "How long does setup take?",
    a: "Most hostels can go live within a day. We add your floors, rooms, beds and pricing with you, and help you bring your residents in.",
  },
  {
    id: "staff",
    q: "Can my staff use it without seeing finances?",
    a: "Yes. Give someone the Supervisor role and they can run bookings, complaints and the menu with no access to payments, expenses, revenue or staff.",
  },
  {
    id: "safe",
    q: "Is my data safe?",
    a: "Payments are processed by Razorpay and cryptographically verified. ID proofs and invoices are stored encrypted on Microsoft Azure behind links that expire in 15 minutes. Staff access is role-based and important actions are logged.",
  },
  { id: "export", q: "Can I export my data?", a: "Yes. Revenue reports — income, expenses and net profit — export to CSV in one click." },
  {
    id: "types",
    q: "Do you support Boys, Girls and Co-ed hostels?",
    a: "Yes. Set your hostel type and residents can filter by Boys, Girls or Co-ed when they search nearby.",
  },
] as const satisfies readonly Faq[];

export const pricingFaqs = [
  {
    id: "billing",
    q: "How does billing work?",
    a: "Plans are billed monthly or yearly. During onboarding we confirm your plan and send the payment details — there's no card needed to start on Free.",
  },
  {
    id: "upgrade",
    q: "Can I upgrade or downgrade later?",
    a: "Yes. When your hostel grows past your plan's bed limit, we move you to the next plan. Your data stays exactly where it is.",
  },
  {
    id: "refund",
    q: "What is your refund policy?",
    a: "See our Refund & Cancellation Policy for subscription refunds. Rent refunds to residents are handled by each hostel owner.",
  },
  {
    id: "gst",
    q: "Do prices include GST?",
    a: "No — all prices are shown excluding GST. Applicable GST is added to your subscription invoice.",
  },
  {
    id: "free-limits",
    q: "What happens if I exceed 30 beds on Free?",
    a: "We'll get in touch to move you to Starter. Nothing is switched off while we talk.",
  },
] as const satisfies readonly Faq[];

export const faqCopy = {
  eyebrow: "FAQ",
  title: "Questions owners ask us",
  lead: "Still have questions?",
  chat: "Chat with us",
  contact: "Contact us",
} as const;
