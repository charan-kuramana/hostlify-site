import { pricingCopy } from "@/content/plans";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PricingCards } from "@/components/pricing/PricingCards";

/** §9.12 — Pricing preview on the homepage (full table lives at /pricing). */
export function PricingPreview() {
  return (
    <Section id="pricing" theme="white" lazy={false}>
      <SectionHeader eyebrow={pricingCopy.eyebrow} title={pricingCopy.title} lead={pricingCopy.lead} className="md:mb-10" />
      <PricingCards showCompareLink />
    </Section>
  );
}
