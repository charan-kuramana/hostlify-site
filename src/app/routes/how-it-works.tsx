import type { Route } from "./+types/how-it-works";
import { buildMeta } from "@/components/seo/meta";
import { Button } from "@/components/ui/Button";
import { howItWorksPage, seo } from "@/content/pages";
import { track } from "@/lib/analytics";
import { OnboardingTimeline } from "@/sections/how-it-works/OnboardingTimeline";
import { SetupChecklist } from "@/sections/how-it-works/SetupChecklist";
import { VideoTour } from "@/sections/how-it-works/VideoTour";
import { FinalCta } from "@/sections/shared/FinalCta";
import { PageHero } from "@/sections/shared/PageHero";

export const meta: Route.MetaFunction = () => buildMeta({ ...seo.howItWorks, path: "/how-it-works" });

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow={howItWorksPage.eyebrow}
        title={howItWorksPage.title}
        lead={howItWorksPage.lead}
        actions={
          <>
            <Button href={howItWorksPage.cta.href} size="lg" arrow onClick={() => track("cta_click", { location: "how_it_works_hero" })}>
              {howItWorksPage.cta.label}
            </Button>
            <Button href={howItWorksPage.secondaryCta.href} variant="outline" size="lg">
              {howItWorksPage.secondaryCta.label}
            </Button>
          </>
        }
      />
      <OnboardingTimeline />
      <SetupChecklist />
      <VideoTour />
      <FinalCta />
    </>
  );
}
