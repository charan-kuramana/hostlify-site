import { AnimatePresence, m } from "motion/react";
import { X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { headerCopy } from "@/content/nav";
import { useHydrated } from "@/hooks/useHydrated";

const KEY = "hostlify:announcement-dismissed";

function wasDismissed() {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function AnnouncementBar() {
  // Hidden in pre-rendered HTML; shown after hydration unless previously dismissed.
  const hydrated = useHydrated();
  const [dismissed, setDismissed] = useState(false);
  const open = hydrated && !dismissed && !wasDismissed();

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
          className="relative overflow-hidden bg-brand-900 text-white"
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
