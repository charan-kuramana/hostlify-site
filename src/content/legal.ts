export type LegalSection = { heading: string; body: readonly string[] };
export type LegalPage = { slug: string; title: string; description: string; updated: string; sections: readonly LegalSection[] };

/**
 * DRAFT legal copy. Must be reviewed by a legal professional before launch (spec §23).
 * TODO(business): legal entity name, registered address, CIN/GSTIN and grievance officer details.
 */
export const legalNotice = "Draft — pending legal review. Contact us if you have any questions about these terms.";

export const legalPages = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    description: "How Hostlify collects, uses, stores and protects personal data, in line with India's DPDP Act 2023.",
    updated: "October 2026",
    sections: [
      {
        heading: "Who we are",
        body: [
          "Hostlify provides software that helps hostel and PG owners manage bookings, rent, residents and daily operations. This policy explains how we handle personal data when you use our website, the admin portal or the resident app.",
        ],
      },
      {
        heading: "Data we collect",
        body: [
          "Account data: name, mobile number, email address and password (stored as a secure hash).",
          "Resident data entered by residents or hostel staff: profile photo, ID proofs (such as Aadhaar or PAN), emergency contacts, room and bed allocation, leave requests and complaints.",
          "Payment data: rent dues, payment status and receipts. Card, UPI and bank details are handled by Razorpay and are never stored by Hostlify.",
          "Website enquiries: details you submit in our demo or contact forms.",
        ],
      },
      {
        heading: "Why we use it",
        body: [
          "To provide the service to hostel owners and residents; to process rent payments and issue receipts; to send service notifications; to keep accounts secure; and to respond to enquiries. We do not sell personal data.",
        ],
      },
      {
        heading: "Where it is stored",
        body: [
          "Data is stored on Microsoft Azure. Documents such as ID proofs and invoices are stored encrypted and are shared only through links that expire after 15 minutes.",
        ],
      },
      {
        heading: "How long we keep it",
        body: [
          "We keep personal data for as long as the account is active, and afterwards only as long as required for legal, tax or dispute-resolution purposes.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "Under the Digital Personal Data Protection Act, 2023 you can request access to, correction of, or erasure of your personal data, withdraw consent, and nominate another person to exercise your rights. Contact us using the details below.",
        ],
      },
      {
        heading: "Grievance officer",
        body: [
          "For any privacy concerns, write to our grievance officer at hostlify.official@gmail.com. We will acknowledge your request within 7 days.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Service",
    description: "The terms that apply when you use Hostlify's website, admin portal and resident app.",
    updated: "October 2026",
    sections: [
      {
        heading: "Using Hostlify",
        body: [
          "By creating an account or using the service you agree to these terms. Owner accounts are created by the Hostlify team after onboarding. Residents create their own accounts in the resident app.",
        ],
      },
      {
        heading: "Your responsibilities",
        body: [
          "Keep your login details safe; make sure the information you enter is accurate; and only upload documents you are authorised to share. Hostel owners are responsible for the rent, deposits and house rules they set for their residents.",
        ],
      },
      {
        heading: "Subscriptions",
        body: [
          "Paid plans are billed monthly or yearly as agreed during onboarding. Plan limits (hostels and beds) are described on our pricing page.",
        ],
      },
      {
        heading: "Payments",
        body: [
          "Online rent payments are processed by Razorpay and are subject to Razorpay's terms. Hostlify is not a party to the rental agreement between a hostel and its residents.",
        ],
      },
      {
        heading: "Availability",
        body: [
          "We work hard to keep Hostlify available and secure, but the service is provided “as is”. We may update features from time to time.",
        ],
      },
      {
        heading: "Termination",
        body: ["You can stop using Hostlify at any time. We may suspend accounts that misuse the service or break the law."],
      },
      { heading: "Governing law", body: ["These terms are governed by the laws of India."] },
    ],
  },
  {
    slug: "refund",
    title: "Refund & Cancellation Policy",
    description: "How cancellations and refunds work for Hostlify subscriptions.",
    updated: "October 2026",
    sections: [
      {
        heading: "Cancelling a subscription",
        body: [
          "You can cancel your subscription at any time by contacting us. Your plan stays active until the end of the current billing period.",
        ],
      },
      {
        heading: "Subscription refunds",
        body: [
          "If you are charged in error, or cancel within 7 days of your first paid invoice, contact us and we will review a full refund. Approved refunds are returned to the original payment method within 5–7 working days.",
        ],
      },
      {
        heading: "Rent refunds",
        body: [
          "Rent, deposits and other amounts paid by residents to a hostel are collected on behalf of that hostel. Refunds of these amounts are handled by the hostel owner, not by Hostlify.",
        ],
      },
    ],
  },
  {
    slug: "shipping",
    title: "Shipping & Delivery Policy",
    description: "Hostlify is a digital service — there is no physical shipping.",
    updated: "October 2026",
    sections: [
      {
        heading: "Digital service — no physical shipping",
        body: ["Hostlify is a software service delivered online. No physical goods are shipped."],
      },
      {
        heading: "Delivery of the service",
        body: [
          "Owner accounts are activated after onboarding, usually within one working day. Residents get access as soon as they sign up in the resident app. Receipts for payments are available digitally in the app.",
        ],
      },
    ],
  },
] as const satisfies readonly LegalPage[];
