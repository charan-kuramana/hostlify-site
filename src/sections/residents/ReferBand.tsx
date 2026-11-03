import { m } from "motion/react";
import { forResidents } from "@/content/pages";
import { site } from "@/content/site";
import { track } from "@/lib/analytics";
import { fadeUp, viewport } from "@/lib/motion";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

/** Refer & earn — no amounts (rewards are set per hostel and not confirmed). */
export function ReferBand() {
  const { refer } = forResidents;
  return (
    <Section>
      <m.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="relative isolate overflow-hidden rounded-[2rem] bg-accent-600 px-6 py-12 text-center sm:px-12 md:py-16"
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-dot-grid-dark" />
        <div aria-hidden="true" className="absolute -top-16 -left-16 -z-10 size-64 rounded-full bg-white/15 blur-2xl" />
        <div aria-hidden="true" className="absolute -right-10 -bottom-20 -z-10 size-72 rounded-full bg-brand-500/30 blur-3xl" />
        <span
          aria-hidden="true"
          className="inline-grid size-20 place-items-center rounded-3xl bg-white/15 text-5xl ring-1 ring-white/25 motion-safe:animate-float"
        >
          {refer.emoji}
        </span>
        <h2 className="mx-auto mt-6 max-w-2xl text-h2 font-bold text-white">{refer.title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-lead text-white">{refer.body}</p>
        <Button
          href={site.links.residentSignup}
          variant="white"
          size="lg"
          className="mt-8 text-accent-600"
          arrow
          onClick={() => track("app_signup_click", { location: "residents_refer" })}
        >
          {forResidents.referCta}
        </Button>
        <p className="mt-4 text-sm text-white">{refer.note}</p>
      </m.div>
    </Section>
  );
}
