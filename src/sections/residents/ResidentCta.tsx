import { forResidents } from "@/content/pages";
import { site } from "@/content/site";
import { track } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";

/** Closing resident CTA: Sign up free → app signup. */
export function ResidentCta() {
  return (
    <section className="grain relative overflow-hidden bg-gradient-night">
      <div className="absolute inset-0 bg-dot-grid-dark" aria-hidden="true" />
      <div
        className="absolute -top-24 right-[15%] size-80 rounded-full bg-accent-500/20 blur-3xl motion-safe:animate-blob"
        aria-hidden="true"
      />
      <div className="relative z-[1] container-page section-y text-center">
        <p aria-hidden="true" className="text-5xl">
          🎒
        </p>
        <WordReveal parts={[{ text: forResidents.ctaTitle }]} className="mx-auto mt-5 max-w-3xl text-h2 font-bold text-white" />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-5 max-w-xl text-lead text-brand-100/75">{forResidents.ctaLead}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              href={site.links.residentSignup}
              variant="accent"
              size="lg"
              arrow
              onClick={() => track("app_signup_click", { location: "residents_final_cta" })}
            >
              {forResidents.signup}
            </Button>
            {/* Log in is hidden until the app is live — flip site.features.login */}
            {site.features.login && (
              <Button
                href={site.links.residentLogin}
                variant="outline-white"
                size="lg"
                onClick={() => track("login_click", { location: "residents_final_cta", role: "resident" })}
              >
                {forResidents.login}
              </Button>
            )}
          </div>
          <p className="mt-6 text-sm text-brand-100/70">{forResidents.noDownload}</p>
        </Reveal>
      </div>
    </section>
  );
}
