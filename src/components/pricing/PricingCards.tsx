import { m } from "motion/react";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { plans, priceFor, pricingCopy, type BillingPeriod, type Plan } from "@/content/plans";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { NumberRoll } from "./NumberRoll";
import { PricingToggle } from "./PricingToggle";

function PricingCard({ plan, period }: { plan: Plan; period: BillingPeriod }) {
  const hl = plan.highlighted;
  const price = priceFor(plan, period);
  return (
    <m.article
      variants={fadeUp}
      data-plan={plan.id}
      className={cn(
        "relative flex w-[85%] shrink-0 snap-center flex-col rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 sm:w-auto lg:p-7",
        hl ? "rotating-border shadow-lift lg:-my-4 lg:py-11" : "border border-gray-200 bg-white shadow-card",
      )}
    >
      {hl && (
        <Badge tone="gradient" className="absolute -top-3 left-1/2 -translate-x-1/2">
          {pricingCopy.mostPopular}
        </Badge>
      )}
      <h3 className="text-h3 font-bold">{plan.name}</h3>
      <p className="mt-1 text-sm text-gray-500">{plan.bestFor}</p>
      <p className="mt-6 flex items-baseline gap-1 font-mono text-brand-900">
        <span className="text-xl font-medium">₹</span>
        <NumberRoll value={price} className="text-[2.6rem] leading-none font-medium tracking-tight" />
      </p>
      <p className="mt-1 h-5 text-xs text-gray-500">
        {plan.monthly === 0 ? " " : period === "yearly" ? pricingCopy.billedYearly : pricingCopy.billedMonthly}
      </p>
      <p className="mt-4 rounded-lg bg-brand-50 px-3 py-2 text-sm font-medium text-brand-700">
        {pricingCopy.hostels(plan.hostels)} · {pricingCopy.beds(plan.beds)}
      </p>
      <ul className="mt-6 flex-1 space-y-3 text-sm">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-2.5">
            <Check className="mt-0.5 size-4 shrink-0 text-success-500" aria-hidden="true" />
            <span className="text-gray-700">{f}</span>
          </li>
        ))}
      </ul>
      <Button
        href={plan.cta.href}
        variant={hl ? "primary" : "outline"}
        block
        className="mt-8"
        arrow={hl}
        onClick={() => track("plan_cta_click", { plan: plan.id, period })}
      >
        {plan.cta.label}
      </Button>
    </m.article>
  );
}

/** Toggle + 4 plan cards. Mobile: horizontal snap carousel starting on Professional. */
export function PricingCards({ showCompareLink = false }: { showCompareLink?: boolean }) {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scroller.current;
    const target = el?.querySelector<HTMLElement>('[data-plan="professional"]');
    if (!el || !target || el.scrollWidth <= el.clientWidth) return;
    el.scrollLeft = target.offsetLeft - (el.clientWidth - target.clientWidth) / 2;
  }, []);

  return (
    <div>
      <div className="sticky top-16 z-10 -mx-4 mb-10 flex justify-center px-4 py-2 sm:static sm:mx-0 sm:py-0">
        <PricingToggle value={period} onChange={setPeriod} />
      </div>
      <m.div
        ref={scroller}
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ ...viewport, amount: 0.1 }}
        className="-mx-4 flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto px-4 pt-4 pb-6 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4 lg:items-stretch lg:gap-5"
      >
        {plans.map((p) => (
          <PricingCard key={p.id} plan={p} period={period} />
        ))}
      </m.div>
      <div className="mt-8 space-y-2 text-center text-sm">
        <p>{pricingCopy.allInclude}</p>
        <p>
          {pricingCopy.moreThan}{" "}
          <Link to="/contact?plan=enterprise" className="font-semibold text-brand-600 underline-offset-4 hover:underline">
            {pricingCopy.contactUs}
          </Link>
          .
        </p>
        <p className="text-xs text-gray-600">{pricingCopy.multiHostelNote}</p>
        {showCompareLink && (
          <Button href="/pricing#compare" variant="ghost" className="mt-2" arrow>
            {pricingCopy.seeFull}
          </Button>
        )}
      </div>
    </div>
  );
}
