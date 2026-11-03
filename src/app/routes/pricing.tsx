import type { Route } from "./+types/pricing";
import { buildMeta } from "@/components/seo/meta";
import { JsonLd } from "@/components/seo/JsonLd";
import { softwareSchema } from "@/components/seo/schemas";
import { PricingCards } from "@/components/pricing/PricingCards";
import { pricingFaqs } from "@/content/faqs";
import { pricingPage, seo } from "@/content/pages";
import { pricingCopy } from "@/content/plans";
import { AddOns } from "@/sections/pricing/AddOns";
import { EnterpriseBand } from "@/sections/pricing/EnterpriseBand";
import { PlanComparison } from "@/sections/pricing/PlanComparison";
import { FaqSection } from "@/sections/shared/FaqSection";
import { PageHero } from "@/sections/shared/PageHero";
import { StickyMobileCta } from "@/sections/shared/StickyMobileCta";

export const meta: Route.MetaFunction = () => buildMeta({ ...seo.pricing, path: "/pricing" });

const HERO_ID = "pricing-hero";

export default function PricingPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <PageHero id={HERO_ID} compact eyebrow={pricingCopy.eyebrow} title={pricingCopy.title} lead={pricingCopy.lead} />
      <section aria-labelledby="plans-title" className="relative pb-16 md:pb-24">
        <div className="container-page">
          <h2 id="plans-title" className="sr-only">
            {pricingPage.plansHeading}
          </h2>
          <PricingCards />
        </div>
      </section>
      <PlanComparison />
      <AddOns />
      <FaqSection eyebrow={pricingPage.faqEyebrow} title={pricingPage.faqTitle} items={pricingFaqs} theme="gray" />
      <EnterpriseBand />
      <StickyMobileCta
        watchId={HERO_ID}
        href="/demo"
        label={pricingPage.stickyCta}
        whatsappLabel={pricingPage.stickyWhatsapp}
        location="pricing_sticky"
      />
    </>
  );
}
