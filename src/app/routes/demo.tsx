import { Check } from "lucide-react";
import type { Route } from "./+types/demo";
import { buildMeta } from "@/components/seo/meta";
import { demoPage, seo } from "@/content/pages";
import { DemoExpect } from "@/sections/demo/DemoExpect";
import { DemoFormCard } from "@/sections/demo/DemoFormCard";
import { Scheduler } from "@/sections/demo/Scheduler";
import { PageHero } from "@/sections/shared/PageHero";
import { useClientSearchParam } from "@/sections/shared/useClientSearchParam";

export const meta: Route.MetaFunction = () => buildMeta({ ...seo.demo, path: "/demo" });

export default function DemoPage() {
  const booked = useClientSearchParam("booked") === "1";

  return (
    <>
      <PageHero eyebrow={demoPage.eyebrow} title={demoPage.title} lead={demoPage.lead} visual={<DemoFormCard booked={booked} />}>
        <ul className="mt-8 space-y-3">
          {demoPage.bullets.map((b) => (
            <li key={b} className="flex items-center gap-3 text-[17px] font-medium text-brand-900">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-success-100 text-success-600">
                <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
              </span>
              {b}
            </li>
          ))}
        </ul>
      </PageHero>
      <Scheduler />
      <DemoExpect />
    </>
  );
}
