import { AnimatePresence, m } from "motion/react";
import { X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { headerCopy } from "@/content/nav";
import { useHydrated } from "@/hooks/useHydrated";

export const ANNOUNCEMENT_KEY = "hostlify:announcement-dismissed";
const KEY = ANNOUNCEMENT_KEY;

function wasDismissed() {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Rendered in the pre-rendered HTML (so it never pushes the page down after load — no layout shift).
 * Visitors who dismissed it are hidden before first paint by an inline script in root.tsx that adds
 * `html.ann-dismissed` (see globals.css); after hydration React removes it for them too.
 */
export function AnnouncementBar() {
  const hydrated = useHydrated();
  const [dismissed, setDismissed] = useState(false);
  const open = !dismissed && !(hydrated && wasDismissed());

  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* storage unavailable */
    }
  };

  const copy = headerCopy.announcement;
  return (
    <AnimatePresence initial={false}>
      {open && (
        <m.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          transition={{ duration: 0.2 }}
          className="announcement relative overflow-hidden bg-brand-900 text-white"
        >
          <div className="container-page flex min-h-10 items-center justify-center gap-2 py-2 pr-12 text-center text-sm">
            <span>{copy.text}</span>
            <Link to={copy.href} className="hidden font-semibold text-brand-300 underline-offset-4 hover:underline sm:inline">
              {copy.link}
            </Link>
          </div>
          <button
            type="button"
            onClick={dismiss}
            aria-label={copy.dismiss}
            className="absolute top-1/2 right-2 grid size-9 -translate-y-1/2 place-items-center rounded-md text-white/70 hover:bg-white/10 hover:text-white"
          >
            <X className="size-4" />
          </button>
        </m.div>
      )}
    </AnimatePresence>
  );
}
