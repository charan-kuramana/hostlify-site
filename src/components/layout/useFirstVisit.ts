import { useHydrated } from "@/hooks/useHydrated";

const KEY = "hostlify:logo-intro";
let firstVisit: boolean | undefined;

/** Reads and marks the session flag once per page load (cached, so re-renders/StrictMode don't flip it). */
function isFirstVisit() {
  if (firstVisit !== undefined) return firstVisit;
  try {
    firstVisit = !sessionStorage.getItem(KEY);
    sessionStorage.setItem(KEY, "1");
  } catch {
    firstVisit = false; // storage unavailable: skip the intro
  }
  return firstVisit;
}

/** True once per browser session, after hydration — drives the logo intro animation. */
export function useFirstVisit() {
  const hydrated = useHydrated();
  return hydrated && isFirstVisit();
}
