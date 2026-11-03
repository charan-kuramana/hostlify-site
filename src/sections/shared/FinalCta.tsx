import { finalCta } from "@/content/home";
import { track } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/icons/Logo";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";

type FinalCtaProps = { title?: string; lead?: string };

/** gradient-night closing CTA (§9.16) — reused at the bottom of most pages. */
export function FinalCta({ title = finalCta.title, lead = finalCta.lead }: FinalCtaProps) {
  return (
    <section className="cv-auto grain relative overflow-hidden bg-gradient-night">
      <div className="absolute inset-0 bg-dot-grid-dark" aria-hidden="true" />
      <div
        className="absolute -top-24 left-[10%] size-80 rounded-full bg-brand-400/25 blur-3xl motion-safe:animate-blob"
        aria-hidden="true"
      />
      <div
        className="absolute -right-10 -bottom-32 size-96 rounded-full bg-accent-500/12 blur-3xl [animation-delay:-6s] motion-safe:animate-blob"
        aria-hidden="true"
      />
      <LogoMark size={520} className="absolute top-1/2 -right-32 -translate-y-1/2 opacity-[0.05]" />
      <div className="relative z-[1] container-page section-y text-center">
        <WordReveal parts={[{ text: title }]} className="mx-auto max-w-3xl text-h2 font-bold text-white" />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-5 max-w-xl text-lead text-brand-100/75">{lead}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Magnetic>
              <Button
                href={finalCta.primary.href}
                variant="white"
                size="lg"
                arrow
                onClick={() => track("cta_click", { location: "final_cta" })}
              >
                {finalCta.primary.label}
              </Button>
            </Magnetic>
            <Button href={finalCta.secondary.href} variant="outline-white" size="lg">
              {finalCta.secondary.label}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
