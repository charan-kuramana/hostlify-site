import { AnimatePresence, m } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { demoPage } from "@/content/pages";
import { env } from "@/lib/env";
import { ease } from "@/lib/motion";
import { LeadForm } from "@/components/forms/LeadForm";
import { PathCheck } from "@/components/motion/PathCheck";
import { PlanNote } from "@/sections/shared/PlanNote";

/** Lead form, or the "request received" state when arriving with ?booked=1. */
export function DemoFormCard({ booked }: { booked: boolean }) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-4 -z-10 rounded-[2rem] bg-linear-to-br from-brand-200/60 via-white/0 to-accent-100/50 blur-2xl"
      />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-float sm:p-8">
        <AnimatePresence mode="wait" initial={false}>
          {booked ? (
            <m.div
              key="booked"
              role="status"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: ease.outExpo }}
              className="py-6 text-center"
            >
              <PathCheck drawn className="mx-auto size-16 text-success-500" />
              <h2 className="mt-5 text-h3 font-bold">{demoPage.bookedTitle}</h2>
              <p className="mx-auto mt-2 max-w-sm">{env.calLink ? demoPage.bookedBody : demoPage.bookedBodyNoCal}</p>
              <ul className="mt-6 flex flex-col items-center gap-1">
                {demoPage.bookedLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className="group inline-flex min-h-11 items-center gap-1.5 font-semibold text-brand-600 hover:text-brand-700"
                    >
                      {l.label}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </m.div>
          ) : (
            <m.div key="form" exit={{ opacity: 0 }}>
              <h2 className="text-h3 font-bold">{demoPage.formTitle}</h2>
              <p className="mt-1 text-sm text-gray-500">{demoPage.formLead}</p>
              <PlanNote format={demoPage.planNote} className="mt-4" />
              <LeadForm source="demo" variant="full" className="mt-6" />
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
