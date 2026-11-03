import { Play } from "lucide-react";
import { howItWorksPage } from "@/content/pages";
import { track } from "@/lib/analytics";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { LogoMark } from "@/components/icons/Logo";
import { SupportIllustration } from "@/components/illustrations/SupportIllustration";

/** Video tour placeholder — no video exists yet, so it points to a live demo instead. */
export function VideoTour() {
  return (
    <Section>
      <Reveal className="mx-auto max-w-5xl">
        <div className="grain relative isolate overflow-hidden rounded-[2rem] bg-gradient-night">
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-dot-grid-dark" />
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/4 -z-10 size-96 rounded-full bg-brand-400/25 blur-3xl motion-safe:animate-blob"
          />
          <LogoMark size={420} className="absolute -right-24 -bottom-32 -z-10 opacity-[0.05]" />
          <div className="grid items-center gap-8 px-6 py-12 sm:px-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] md:py-16">
            <div className="relative mx-auto w-full max-w-[400px]">
              <div aria-hidden="true" className="absolute inset-[8%] rounded-full bg-white/10 ring-1 ring-white/15" />
              <SupportIllustration title={howItWorksPage.videoIllustration} className="relative" />
              <span
                aria-hidden="true"
                className="absolute top-[6%] left-[6%] grid size-12 place-items-center rounded-full bg-white text-brand-700 shadow-glow md:size-14"
              >
                <span className="absolute inset-0 rounded-full bg-white/40 motion-safe:animate-pulse-ring" />
                <Play className="relative size-5 translate-x-0.5 fill-current" />
              </span>
            </div>
            <div className="text-center md:text-left">
              <Badge tone="dark">{howItWorksPage.videoBadge}</Badge>
              <h2 className="mt-4 text-h2 font-bold text-white">{howItWorksPage.videoTitle}</h2>
              <p className="mt-3 max-w-xl text-lead text-brand-100/80 md:mx-0">{howItWorksPage.videoBody}</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
                <Button
                  href={howItWorksPage.cta.href}
                  variant="white"
                  size="lg"
                  arrow
                  onClick={() => track("cta_click", { location: "how_it_works_video" })}
                >
                  {howItWorksPage.cta.label}
                </Button>
                <Button href={howItWorksPage.secondaryCta.href} variant="outline-white" size="lg">
                  {howItWorksPage.secondaryCta.label}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
