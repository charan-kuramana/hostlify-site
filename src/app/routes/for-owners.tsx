import type { Route } from "./+types/for-owners";
import { buildMeta } from "@/components/seo/meta";
import { homeFaqs } from "@/content/faqs";
import { forOwners, seo } from "@/content/pages";
import { OWNERS_FORM_ID, OWNERS_HERO_ID, OwnersHero } from "@/sections/owners/OwnersHero";
import { OwnersPains } from "@/sections/owners/OwnersPains";
import { OwnersPillars } from "@/sections/owners/OwnersPillars";
import { OwnersPricing } from "@/sections/owners/OwnersPricing";
import { FaqSection } from "@/sections/shared/FaqSection";
import { FinalCta } from "@/sections/shared/FinalCta";
import { StickyMobileCta } from "@/sections/shared/StickyMobileCta";

export const meta: Route.MetaFunction = () => buildMeta({ ...seo.forOwners, path: "/for-owners" });

const faqIds: readonly string[] = forOwners.faqIds;
const faqs = homeFaqs.filter((f) => faqIds.includes(f.id));

export default function ForOwnersPage() {
  return (
    <>
      <OwnersHero />
      <OwnersPains />
      <OwnersPillars />
      <OwnersPricing />
      <FaqSection eyebrow={forOwners.faqEyebrow} title={forOwners.faqTitle} items={faqs} />
      <FinalCta title={forOwners.ctaTitle} />
      <StickyMobileCta
        watchId={OWNERS_HERO_ID}
        href={`#${OWNERS_FORM_ID}`}
        label={forOwners.stickyCta}
        whatsappLabel={forOwners.stickyWhatsapp}
        location="for_owners_sticky"
      />
    </>
  );
}
