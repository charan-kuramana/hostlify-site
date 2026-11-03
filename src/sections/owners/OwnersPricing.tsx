import { forOwners } from "@/content/pages";
import { Section } from "@/components/layout/Section";
import { PricingCards } from "@/components/pricing/PricingCards";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** Short pricing block for the campaign page. */
export function OwnersPricing() {
  return (
    <Section theme="tint" id="pricing">
      <SectionHeader eyebrow={forOwners.pricingEyebrow} title={forOwners.pricingTitle} lead={forOwners.pricingLead} />
      <PricingCards showCompareLink />
    </Section>
  );
}
