import type { Route } from "./+types/for-residents";
import { buildMeta } from "@/components/seo/meta";
import { forResidents, seo } from "@/content/pages";
import { LocationSearch } from "@/sections/residents/LocationSearch";
import { AppComingSoon } from "@/sections/residents/AppComingSoon";
import { site } from "@/content/site";
import { ReferBand } from "@/sections/residents/ReferBand";
import { ResidentBlocks } from "@/sections/residents/ResidentBlocks";
import { ResidentCta } from "@/sections/residents/ResidentCta";
import { ResidentPhone } from "@/sections/residents/ResidentPhone";
import { ResidentSteps } from "@/sections/residents/ResidentSteps";
import { PageHero } from "@/sections/shared/PageHero";

export const meta: Route.MetaFunction = () => buildMeta({ ...seo.forResidents, path: "/for-residents" });

export default function ForResidentsPage() {
  return (
    <>
      <PageHero
        tone="accent"
        eyebrow={forResidents.eyebrow}
        title={forResidents.title}
        highlight={forResidents.titleHighlight}
        lead={forResidents.lead}
        visual={<ResidentPhone />}
      >
        {/* Hostel search deep-links into the resident app — hidden until it is live (site.features.residentApp) */}
        {site.features.residentApp ? <LocationSearch /> : <AppComingSoon />}
      </PageHero>
      <ResidentSteps />
      <ResidentBlocks />
      <ReferBand />
      <ResidentCta />
    </>
  );
}
