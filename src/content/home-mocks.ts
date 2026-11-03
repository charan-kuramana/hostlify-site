/**
 * Labels for the live-coded product mockups on the homepage (rent flow, resident app, roles).
 * All names, hostels and amounts are fictional sample data — no real resident PII.
 */

export const rentFlowMocks = {
  ownerView: "Owner view",
  residentView: "Resident view",
  sampleData: "Sample data",
  /** Which view each step's mock shows, by step id (rentFlow.steps in home.ts). */
  viewFor: { generate: "owner", remind: "resident", pay: "resident", receipt: "resident", dashboard: "owner" } as Record<
    string,
    "owner" | "resident"
  >,
  generate: {
    title: "Rent dues",
    period: "October 2026 · Sai Residency",
    button: "Generate dues",
    generated: (n: number) => `${n} dues generated`,
    status: { paid: "Paid", pending: "Pending", overdue: "Overdue" },
  },
  remind: {
    time: "9:41",
    date: "Thursday, 15 October",
    app: "Hostlify",
    when: "now",
    title: "Rent reminder",
    body: "Your October rent of ₹6,500 is due. Tap to pay in one step.",
    secondary: { title: "Weekly menu updated", body: "Paneer curry is back on Friday 🎉", when: "1h ago" },
  },
  pay: {
    title: "My Dues",
    hostel: "Sai Residency · Room 204",
    item: "October rent",
    due: "Due",
    amount: 6500,
    payNow: "Pay now",
    sheetTitle: "Choose a payment method",
    methods: [
      { id: "upi", label: "UPI", hint: "Any UPI app" },
      { id: "card", label: "Cards", hint: "Debit or credit" },
      { id: "nb", label: "Net banking", hint: "All major banks" },
    ],
    secured: "Secured by Razorpay",
    payCta: (amount: string) => `Pay ${amount}`,
  },
  receipt: {
    title: "Payment successful",
    verified: "Verified",
    rows: [
      { id: "no", label: "Receipt no.", value: "HL-10421" },
      { id: "via", label: "Paid via", value: "UPI" },
      { id: "date", label: "Date", value: "15 Oct 2026" },
      { id: "room", label: "Room", value: "204 · Bed B-2" },
    ],
    download: "Download receipt",
    amount: 6500,
  },
  dashboard: {
    title: "This month",
    stats: [
      { id: "collected", label: "Collected", value: 362000, tone: "success" },
      { id: "pending", label: "Pending", value: 48500, tone: "warning" },
      { id: "overdue", label: "Overdue", value: 4500, tone: "danger" },
    ],
    progressLabel: "Collection progress",
    progress: 0.88,
    liveLabel: "Live",
    recentTitle: "Just paid",
  },
} as const;

export const residentMocks = {
  sampleData: "Sample data",
  carouselLabel: "Resident app screens",
  pause: "Pause screen rotation",
  play: "Play screen rotation",
  showScreen: (name: string) => `Show screen: ${name}`,
  /** Centre phone (desktop) / carousel (mobile) screens, in order. */
  screens: [
    { id: "discover", name: "Find hostels near me" },
    { id: "bed", name: "Pick your exact bed" },
    { id: "dues", name: "Pay rent & download receipts" },
    { id: "menu", name: "See this week's menu" },
  ],
  discover: {
    title: "Hostels near you",
    location: "Benz Circle, Vijayawada",
    searchPlaceholder: "Search by area or college",
    filters: ["Boys", "Girls", "Co-ed"],
    hostels: [
      { id: "h1", name: "Sai Residency", distance: "0.8 km", from: 5500, type: "Co-ed", beds: 4 },
      { id: "h2", name: "Sri Lakshmi PG", distance: "1.2 km", from: 6000, type: "Girls", beds: 2 },
      { id: "h3", name: "Green Nest Hostel", distance: "2.1 km", from: 4500, type: "Boys", beds: 7 },
    ],
    from: "from",
    perMonth: "/mo",
    bedsFree: (n: number) => `${n} beds free`,
  },
  bed: {
    title: "Pick a bed",
    step: "Step 2 of 3 · Floor 2",
    legend: { available: "Free", occupied: "Taken", selected: "Yours" },
    rooms: [
      { id: "r201", number: "201", beds: ["o", "o", "a"] },
      { id: "r202", number: "202", beds: ["o", "s"] },
      { id: "r203", number: "203", beds: ["a", "o", "o", "a"] },
      { id: "r204", number: "204", beds: ["o", "a"] },
    ],
    selected: "Bed 202-B · Double sharing",
    cta: "Confirm bed",
  },
  dues: {
    title: "My Dues",
    current: { label: "October rent", amount: 6500, due: "Due 5 Nov" },
    pay: "Pay now",
    historyTitle: "Receipts",
    history: [
      { id: "sep", label: "September rent", amount: 6500 },
      { id: "aug", label: "August rent", amount: 6500 },
    ],
    paid: "Paid",
  },
  menu: {
    title: "This week's menu",
    today: "Today",
  },
  complaint: {
    title: "Raise a complaint",
    category: "Plumbing",
    categoryLabel: "Category",
    text: "Geyser not heating in Room 204 bathroom",
    photo: "Photo attached",
    submit: "Submit",
    statusTitle: "Your tickets",
    tickets: [
      { id: "t1", label: "#1042 · Geyser", status: "In progress" },
      { id: "t2", label: "#1031 · Wi-Fi", status: "Resolved" },
    ],
  },
  refer: {
    title: "Refer & earn",
    emoji: "🎁",
    body: "Invite a friend. When they move in, you both get a rent discount.",
    code: "PRIYA204",
    codeLabel: "Your code",
    share: "Share invite",
    invited: "Friends invited",
    invitedCount: 2,
  },
} as const;
