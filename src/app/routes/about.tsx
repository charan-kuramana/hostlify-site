import type { Route } from "./+types/about";
import { buildMeta } from "@/components/seo/meta";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema } from "@/components/seo/schemas";
import { about, seo } from "@/content/pages";
import { OriginStory } from "@/sections/about/OriginStory";
import { Team } from "@/sections/about/Team";
import { Values } from "@/sections/about/Values";
import { FinalCta } from "@/sections/shared/FinalCta";
import { PageHero } from "@/sections/shared/PageHero";
import { HostelBuildingIllustration } from "@/components/illustrations/HostelBuildingIllustration";

export const meta: Route.MetaFunction = () => buildMeta({ ...seo.about, path: "/about" });

export default function AboutPage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <PageHero
        eyebrow={about.eyebrow}
        title={about.title}
        lead={about.lead}
        visual={<HostelBuildingIllustration title={about.heroIllustration} className="mx-auto max-w-[560px]" />}
      />
      <OriginStory />
      <Values />
      <Team />
      <FinalCta />
    </>
  );
}
