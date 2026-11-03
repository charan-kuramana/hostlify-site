import { data } from "react-router";
import type { Route } from "./+types/features.$module";
import { buildMeta } from "@/components/seo/meta";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/components/seo/schemas";
import { Button } from "@/components/ui/Button";
import { featureDeepCopy, getFeatureModule, type FeatureModule } from "@/content/features";
import { common, seo } from "@/content/pages";
import { track } from "@/lib/analytics";
import { ModuleCapabilities } from "@/sections/features/deep/ModuleCapabilities";
import { ModuleProblem } from "@/sections/features/deep/ModuleProblem";
import { ModuleWorkflow } from "@/sections/features/deep/ModuleWorkflow";
import { RelatedModules } from "@/sections/features/deep/RelatedModules";
import { ModuleMock } from "@/sections/features/mocks/ModuleMock";
import { Breadcrumbs } from "@/sections/shared/Breadcrumbs";
import { FaqSection } from "@/sections/shared/FaqSection";
import { FinalCta } from "@/sections/shared/FinalCta";
import { PageHero } from "@/sections/shared/PageHero";

/** Runs at build time for each pre-rendered /features/:module path. Unknown slugs → 404. */
export function loader({ params }: Route.LoaderArgs) {
  const mod: FeatureModule | undefined = getFeatureModule(params.module);
  if (!mod) throw data(null, { status: 404 });
  return { module: mod };
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
  if (!loaderData) return [{ title: seo.notFound.title }];
  const mod = loaderData.module;
  return buildMeta({ title: mod.seoTitle, description: mod.seoDescription, path: `/features/${mod.slug}` });
};

export default function FeatureModulePage({ loaderData }: Route.ComponentProps) {
  const mod = loaderData.module;
  const crumbs = [
    { name: common.crumbs.home, path: "/" },
    { name: common.crumbs.features, path: "/features" },
    { name: mod.name, path: `/features/${mod.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        before={<Breadcrumbs items={crumbs} />}
        eyebrow={mod.eyebrow}
        title={mod.title}
        lead={mod.lead}
        visual={<ModuleMock kind={mod.mock} />}
        actions={
          <>
            <Button
              href={featureDeepCopy.primaryCta.href}
              size="lg"
              arrow
              onClick={() => track("cta_click", { location: `feature_${mod.slug}_hero` })}
            >
              {featureDeepCopy.primaryCta.label}
            </Button>
            <Button href={featureDeepCopy.secondaryCta.href} variant="outline" size="lg">
              {featureDeepCopy.secondaryCta.label}
            </Button>
          </>
        }
      />
      <ModuleProblem problem={mod.problem} />
      <ModuleCapabilities capabilities={mod.capabilities} />
      <ModuleWorkflow workflow={mod.workflow} />
      <RelatedModules slugs={mod.related} />
      <FaqSection title={featureDeepCopy.faqTitle} items={mod.faqs} />
      <FinalCta title={featureDeepCopy.ctaTitle(mod.name)} />
    </>
  );
}
