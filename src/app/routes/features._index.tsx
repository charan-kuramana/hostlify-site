import type { Route } from "./+types/features._index";
import { buildMeta } from "@/components/seo/meta";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/components/seo/schemas";
import { Button } from "@/components/ui/Button";
import { featuresPage } from "@/content/features";
import { common, seo } from "@/content/pages";
import { track } from "@/lib/analytics";
import { FeatureComparison } from "@/sections/features/FeatureComparison";
import { ModuleExplorer } from "@/sections/features/ModuleExplorer";
import { FinalCta } from "@/sections/shared/FinalCta";
import { PageHero } from "@/sections/shared/PageHero";

export const meta: Route.MetaFunction = () => buildMeta({ ...seo.features, path: "/features" });

export default function FeaturesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: common.crumbs.home, path: "/" },
          { name: common.crumbs.features, path: "/features" },
        ])}
      />
      <PageHero
        eyebrow={featuresPage.eyebrow}
        title={featuresPage.title}
        lead={featuresPage.lead}
        actions={
          <>
            <Button href={common.bookDemo.href} size="lg" arrow onClick={() => track("cta_click", { location: "features_hero" })}>
              {common.bookDemo.label}
            </Button>
            <Button href={common.seePricing.href} variant="outline" size="lg">
              {common.seePricing.label}
            </Button>
          </>
        }
      />
      <ModuleExplorer />
      <FeatureComparison />
      <FinalCta />
    </>
  );
}
