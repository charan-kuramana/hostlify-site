import { about } from "@/content/pages";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { CommunityIllustration } from "@/components/illustrations/CommunityIllustration";

/** The team — an illustration + text until real, approved photos exist. */
export function Team() {
  return (
    <Section>
      <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-brand-100 bg-linear-to-br from-brand-50 via-white to-accent-100/40">
        <div aria-hidden="true" className="absolute inset-0 bg-dot-grid" />
        <div className="relative grid items-center gap-6 px-6 py-10 sm:px-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10 md:py-14">
          <CommunityIllustration title={about.teamIllustration} className="mx-auto max-w-[440px]" />
          <div className="text-center md:text-left">
            <Eyebrow>{about.teamEyebrow}</Eyebrow>
            <h2 className="mt-3 text-h2 font-bold">{about.teamTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lead md:mx-0">{about.teamBody}</p>
            <Button href={about.teamCta.href} variant="outline" size="lg" className="mt-8" arrow>
              {about.teamCta.label}
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
