import { contactPage } from "@/content/pages";
import { track } from "@/lib/analytics";
import { LeadForm } from "@/components/forms/LeadForm";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { PlanNote } from "@/sections/shared/PlanNote";
import { SupportIllustration } from "@/components/illustrations/SupportIllustration";
import { ContactDetails } from "./ContactDetails";

/** Contact form + details + demo nudge. */
export function ContactSection() {
  return (
    <section className="relative pb-16 md:pb-24 xl:pb-30">
      <div className="container-page grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-8">
        <Reveal>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-float sm:p-8">
            <h2 className="text-h3 font-bold">{contactPage.formTitle}</h2>
            <PlanNote format={contactPage.planNote} className="mt-4" />
            <LeadForm source="contact" variant="contact" className="mt-6" />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="space-y-6">
          <div className="overflow-hidden rounded-2xl border border-brand-100 bg-linear-to-br from-brand-50 via-white to-accent-100/40 px-6 pt-4">
            <SupportIllustration title={contactPage.illustration} className="mx-auto max-w-[360px]" />
          </div>
          <ContactDetails />
          <div className="relative overflow-hidden rounded-2xl bg-gradient-night p-6 sm:p-7">
            <div aria-hidden="true" className="absolute inset-0 bg-dot-grid-dark" />
            <div className="relative">
              <h2 className="text-h4 font-bold text-white">{contactPage.demoTitle}</h2>
              <p className="mt-2 text-[15px] text-brand-100/80">{contactPage.demoBody}</p>
              <Button
                href={contactPage.demoCta.href}
                variant="white"
                className="mt-5"
                arrow
                onClick={() => track("cta_click", { location: "contact_demo_card" })}
              >
                {contactPage.demoCta.label}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
