import { Check } from "lucide-react";
import { forOwners } from "@/content/pages";
import { LeadForm } from "@/components/forms/LeadForm";
import { PageHero } from "@/sections/shared/PageHero";

export const OWNERS_HERO_ID = "owners-hero";
export const OWNERS_FORM_ID = "lead-form";

/** Campaign hero: promise on the left, inline compact demo form on the right. */
export function OwnersHero() {
  return (
    <PageHero
      id={OWNERS_HERO_ID}
      eyebrow={forOwners.eyebrow}
      title={forOwners.title}
      highlight={forOwners.titleHighlight}
      lead={forOwners.lead}
      visual={
        <div id={OWNERS_FORM_ID} className="relative scroll-mt-24">
          <div
            aria-hidden="true"
            className="absolute -inset-4 -z-10 rounded-[2rem] bg-linear-to-br from-brand-200/60 via-white/0 to-accent-100/60 blur-2xl"
          />
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-float sm:p-8">
            <h2 className="text-h3 font-bold">{forOwners.formTitle}</h2>
            <p className="mt-1 mb-6 text-sm text-gray-500">{forOwners.formLead}</p>
            <LeadForm source="for-owners" variant="compact" />
          </div>
        </div>
      }
    >
      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
        {forOwners.trust.map((t) => (
          <li key={t} className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <span className="grid size-5 place-items-center rounded-full bg-success-100 text-success-600">
              <Check className="size-3" strokeWidth={3} aria-hidden="true" />
            </span>
            {t}
          </li>
        ))}
      </ul>
    </PageHero>
  );
}
