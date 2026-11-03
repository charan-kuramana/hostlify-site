import { lazy } from "react";
import { buildMeta } from "@/components/seo/meta";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, softwareSchema, websiteSchema } from "@/components/seo/schemas";
import { seo } from "@/content/seo";
import { WhenVisible } from "@/components/layout/WhenVisible";
import { Hero } from "@/sections/home/Hero/Hero";
import { TrustStrip } from "@/sections/home/TrustStrip";
import { HowItWorks } from "@/sections/home/HowItWorks";
import { FactTiles } from "@/sections/home/FactTiles";
import { PricingPreview } from "@/sections/home/PricingPreview";
import { SecurityTrust } from "@/sections/home/SecurityTrust";
import { Faq } from "@/sections/home/Faq";
import { FinalCta } from "@/sections/shared/FinalCta";

// Heavy interactive demos load as separate chunks when they approach the viewport.
const BeforeAfter = lazy(() => import("@/sections/home/BeforeAfter").then((m) => ({ default: m.BeforeAfter })));
const FeatureBento = lazy(() => import("@/sections/home/FeatureBento/FeatureBento").then((m) => ({ default: m.FeatureBento })));
const OccupancyMapDemo = lazy(() =>
  import("@/sections/home/OccupancyMapDemo/OccupancyMapDemo").then((m) => ({ default: m.OccupancyMapDemo })),
);
const RentFlowStory = lazy(() => import("@/sections/home/RentFlowStory/RentFlowStory").then((m) => ({ default: m.RentFlowStory })));
const ResidentShowcase = lazy(() => import("@/sections/home/ResidentShowcase").then((m) => ({ default: m.ResidentShowcase })));
const RolesPermissions = lazy(() => import("@/sections/home/RolesPermissions").then((m) => ({ default: m.RolesPermissions })));

export const meta = () => buildMeta({ ...seo.home, path: "/" });

/** Section order and background rhythm follow spec §6.5. Testimonials (§9.13) are omitted until verified. */
export default function Home() {
  return (
    <>
      <JsonLd data={[organizationSchema, websiteSchema, softwareSchema]} />
      <Hero />
      <TrustStrip />
      <WhenVisible placeholderClassName="min-h-[1500px] bg-gray-50 lg:min-h-[1100px]">
        <BeforeAfter />
      </WhenVisible>
      <WhenVisible placeholderClassName="min-h-[2200px] lg:min-h-[1400px]">
        <FeatureBento />
      </WhenVisible>
      <WhenVisible placeholderClassName="min-h-[1400px] bg-brand-900 lg:min-h-[1250px]">
        <OccupancyMapDemo />
      </WhenVisible>
      <WhenVisible placeholderClassName="min-h-[2600px]">
        <RentFlowStory />
      </WhenVisible>
      <WhenVisible placeholderClassName="min-h-[1200px] bg-brand-50">
        <ResidentShowcase />
      </WhenVisible>
      <WhenVisible placeholderClassName="min-h-[1000px] lg:min-h-[900px]">
        <RolesPermissions />
      </WhenVisible>
      <HowItWorks />
      <FactTiles />
      <PricingPreview />
      <SecurityTrust />
      <Faq />
      <FinalCta />
    </>
  );
}
