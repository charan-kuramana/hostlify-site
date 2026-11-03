const inr = new Intl.NumberFormat("en-IN");

/** 362000 → "3,62,000" (Indian digit grouping) */
export function formatIN(value: number) {
  return inr.format(Math.round(value));
}

/** 362000 → "₹3,62,000" */
export function formatINR(value: number) {
  return `₹${formatIN(value)}`;
}
