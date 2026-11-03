import { m } from "motion/react";
import { Check } from "lucide-react";
import { pricingPage } from "@/content/pages";
import { track } from "@/lib/analytics";
import { fadeUp, viewport } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LogoMark } from "@/components/icons/Logo";

/** Enterprise / hostel-group contact band. */
export function EnterpriseBand() {
  const e = pricingPage.enterprise;
  return (
    <section className="relative overflow-x-clip bg-white section-y">
      <div className="container-page">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grain relative isolate overflow-hidden rounded-[2rem] bg-gradient-night px-6 py-12 sm:px-12 md:py-16"
        >
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-dot-grid-dark" />
          <LogoMark size={360} className="absolute -right-20 -bottom-24 -z-10 opacity-[0.06]" />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center">
            <div>
              <Eyebrow theme="dark">{e.eyebrow}</Eyebrow>
              <h2 className="mt-3 text-h2 font-bold text-white">{e.title}</h2>
              <p className="mt-4 max-w-xl text-lead text-brand-100/80">{e.body}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  href={e.cta.href}
                  variant="white"
                  size="lg"
                  arrow
                  onClick={() => track("cta_click", { location: "pricing_enterprise" })}
                >
                  {e.cta.label}
                </Button>
                <Button href={e.secondary.href} variant="outline-white" size="lg">
                  {e.secondary.label}
                </Button>
              </div>
            </div>
            <ul className="grid gap-3 rounded-2xl p-6 glass-dark sm:grid-cols-2 lg:grid-cols-1">
              {e.points.map((pt) => (
                <li key={pt} className="flex items-center gap-3 text-white">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-400/20 text-brand-300">
                    <Check className="size-4" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </m.div>
      </div>
    </section>
  );
}
