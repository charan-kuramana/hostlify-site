import { m } from "motion/react";
import { CalendarCheck } from "lucide-react";
import { useState } from "react";
import { demoPage } from "@/content/pages";
import { env } from "@/lib/env";
import { track } from "@/lib/analytics";
import { ease } from "@/lib/motion";
import { Button } from "@/components/ui/Button";

/**
 * Cal.com inline scheduler, injected only after the visitor asks for it (no third-party load on page view).
 * Renders nothing when VITE_CAL_LINK isn't configured.
 */
export function Scheduler() {
  const [open, setOpen] = useState(false);
  if (!env.calLink) return null;
  const src = `https://cal.com/${env.calLink}?embed=true&theme=light`;

  return (
    <section id="scheduler" aria-labelledby="scheduler-title" className="scroll-mt-20 bg-gray-50 py-16 md:py-20">
      <div className="container-page">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-xl bg-brand-100 text-brand-600">
            <CalendarCheck className="size-6" aria-hidden="true" />
          </span>
          <h2 id="scheduler-title" className="mt-4 text-h2 font-bold">
            {demoPage.calendarTitle}
          </h2>
          <p className="mt-2 text-sm text-gray-500">{demoPage.schedulerNote}</p>
          {!open && (
            <Button
              size="lg"
              variant="outline"
              className="mt-6"
              arrow
              onClick={() => {
                setOpen(true);
                track("cta_click", { location: "demo_scheduler" });
              }}
            >
              {demoPage.calendarCta}
            </Button>
          )}
        </div>
        {open && (
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: ease.outExpo }}
            className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-card"
          >
            <iframe
              src={src}
              title={demoPage.schedulerTitle}
              className="block h-[700px] w-full"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </m.div>
        )}
      </div>
    </section>
  );
}
