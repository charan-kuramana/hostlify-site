import { AnimatePresence, m } from "motion/react";
import { useState } from "react";
import { comparison, plans as allPlans, pricingCopy, type Plan, type PlanId } from "@/content/plans";
import { pricingPage } from "@/content/pages";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { formatINR } from "@/lib/format";
import { ease, fadeUp, viewport } from "@/lib/motion";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CellValue } from "@/sections/shared/CellValue";

const plans: readonly Plan[] = allPlans;
const priceLabel = (monthly: number) => `${formatINR(monthly)}${pricingCopy.perMonth}`;

/** md+: full table with a sticky header row (sticks under the site header). */
function ComparisonTable() {
  return (
    <m.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ ...viewport, amount: 0.05 }}
      className="hidden overflow-clip rounded-2xl border border-gray-200 bg-white shadow-card md:block"
    >
      <table className="w-full table-fixed border-separate border-spacing-0 text-left">
        <caption className="sr-only">{pricingPage.compareTitle}</caption>
        <colgroup>
          <col className="w-[34%]" />
          {plans.map((p) => (
            <col key={p.id} className={cn(p.highlighted && "bg-brand-50/60")} />
          ))}
        </colgroup>
        <thead>
          <tr>
            <th
              scope="col"
              className="sticky top-16 z-10 border-b border-gray-200 bg-white/95 p-4 align-bottom text-sm font-semibold text-gray-500 backdrop-blur lg:p-5"
            >
              {pricingPage.feature}
            </th>
            {plans.map((p) => (
              <th
                key={p.id}
                scope="col"
                className={cn(
                  "sticky top-16 z-10 border-b border-gray-200 p-4 text-center align-bottom backdrop-blur lg:p-5",
                  p.highlighted ? "bg-brand-50/95" : "bg-white/95",
                )}
              >
                <span className="block font-display text-base font-bold text-brand-900">{p.name}</span>
                <span className="mt-0.5 block font-mono text-xs font-normal text-gray-500">{priceLabel(p.monthly)}</span>
              </th>
            ))}
          </tr>
        </thead>
        {comparison.map((group) => (
          <tbody key={group.group}>
            <tr>
              <th
                scope="colgroup"
                colSpan={plans.length + 1}
                className="border-b border-gray-200 bg-gray-50 px-4 py-2.5 text-eyebrow font-semibold text-brand-700 uppercase lg:px-5"
              >
                {group.group}
              </th>
            </tr>
            {group.rows.map((row) => (
              <tr key={row.label} className="transition-colors hover:bg-gray-50/70">
                <th scope="row" className="border-b border-gray-100 px-4 py-3.5 text-[15px] font-medium text-brand-900 lg:px-5">
                  {row.label}
                </th>
                {row.values.map((v, i) => (
                  <td key={plans[i]?.id ?? i} className="border-b border-gray-100 px-3 py-3.5 text-center">
                    <CellValue
                      value={v}
                      yesLabel={pricingPage.included}
                      noLabel={pricingPage.notIncluded}
                      emphasis={plans[i]?.highlighted === true}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
        <tfoot>
          <tr>
            <td className="p-4 lg:p-5" />
            {plans.map((p) => (
              <td key={p.id} className="p-3 text-center lg:p-4">
                <Button
                  href={p.cta.href}
                  size="sm"
                  variant={p.highlighted ? "primary" : "outline"}
                  block
                  onClick={() => track("plan_cta_click", { plan: p.id, location: "compare_table" })}
                >
                  {p.cta.label}
                </Button>
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </m.div>
  );
}

/** < md: plan selector (segmented buttons) + the feature list for that plan. No horizontal scrolling. */
function ComparisonMobile() {
  const [selected, setSelected] = useState<PlanId>("professional");
  const index = Math.max(
    0,
    plans.findIndex((p) => p.id === selected),
  );
  const plan = plans[index];
  if (!plan) return null;

  return (
    <div className="md:hidden">
      <p id="plan-picker-label" className="mb-3 text-center text-sm font-semibold text-brand-900">
        {pricingPage.choosePlan}
      </p>
      <div
        role="group"
        aria-labelledby="plan-picker-label"
        className="grid grid-cols-2 gap-1 rounded-2xl border border-gray-200 bg-gray-100 p-1 min-[400px]:grid-cols-4"
      >
        {plans.map((p) => {
          const on = p.id === selected;
          return (
            <button
              key={p.id}
              type="button"
              aria-pressed={on}
              onClick={() => setSelected(p.id)}
              className={cn(
                "relative isolate min-h-11 rounded-xl px-1 text-sm font-semibold transition-colors",
                on ? "text-white" : "text-gray-600",
              )}
            >
              {on && (
                <m.span
                  layoutId="plan-pick"
                  className="absolute inset-0 -z-10 rounded-xl bg-gradient-primary shadow-card"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="block truncate">{p.name}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={plan.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: ease.outExpo }}
          className="mt-5 rounded-2xl border border-gray-200 bg-white shadow-card"
          aria-live="polite"
        >
          <div className="flex items-baseline justify-between gap-3 border-b border-gray-200 p-5">
            <h3 className="text-h3 font-bold">{plan.name}</h3>
            <span className="font-mono text-sm text-gray-600">{priceLabel(plan.monthly)}</span>
          </div>
          {comparison.map((group) => (
            <div key={group.group}>
              <h4 className="bg-gray-50 px-5 py-2 text-eyebrow font-semibold text-brand-700 uppercase">{group.group}</h4>
              <ul className="divide-y divide-gray-100">
                {group.rows.map((row) => (
                  <li key={row.label} className="flex items-center justify-between gap-4 px-5 py-3">
                    <span className="text-[15px] text-gray-700">{row.label}</span>
                    <CellValue
                      value={row.values[index] ?? false}
                      yesLabel={pricingPage.included}
                      noLabel={pricingPage.notIncluded}
                      className="shrink-0 text-right"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="p-5">
            <Button
              href={plan.cta.href}
              block
              variant={plan.highlighted ? "primary" : "outline"}
              arrow
              onClick={() => track("plan_cta_click", { plan: plan.id, location: "compare_mobile" })}
            >
              {plan.cta.label}
            </Button>
          </div>
        </m.div>
      </AnimatePresence>
    </div>
  );
}

export function PlanComparison() {
  return (
    <Section id="compare" theme="gray" className="scroll-mt-16">
      <SectionHeader eyebrow={pricingPage.compareEyebrow} title={pricingPage.compareTitle} lead={pricingPage.compareLead} />
      <ComparisonTable />
      <ComparisonMobile />
    </Section>
  );
}
