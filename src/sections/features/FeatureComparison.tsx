import { m } from "motion/react";
import { featuresListCopy, featuresPage } from "@/content/features";
import { cn } from "@/lib/cn";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CellValue } from "@/sections/shared/CellValue";

const { comparison } = featuresPage;

/**
 * Hostlify vs Excel/registers vs generic software.
 * md+: a real table. Mobile: each row becomes a card with three labelled cells (no horizontal scroll).
 */
export function FeatureComparison() {
  return (
    <Section theme="gray" aria-labelledby="compare-title">
      <SectionHeader
        eyebrow={featuresListCopy.comparisonEyebrow}
        title={<span id="compare-title">{comparison.title}</span>}
        lead={comparison.lead}
      />

      {/* Desktop / tablet table */}
      <m.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mx-auto hidden max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-card md:block"
      >
        <table className="w-full table-fixed text-left">
          <caption className="sr-only">{comparison.title}</caption>
          <thead>
            <tr className="border-b border-gray-200">
              <td className="w-[40%] p-5" />
              {comparison.columns.map((col, i) => (
                <th
                  key={col}
                  scope="col"
                  className={cn(
                    "p-5 text-center font-display text-sm font-semibold",
                    i === 0 ? "bg-brand-50 text-brand-700" : "text-gray-600",
                  )}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((row) => (
              <tr key={row.label} className="border-b border-gray-100 last:border-0">
                <th scope="row" className="p-5 text-[15px] font-medium text-brand-900">
                  {row.label}
                </th>
                {row.values.map((v, i) => (
                  <td key={comparison.columns[i]} className={cn("p-5 text-center", i === 0 && "bg-brand-50/60")}>
                    <CellValue value={v} emphasis={i === 0} yesLabel={featuresListCopy.yes} noLabel={featuresListCopy.no} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </m.div>

      {/* Mobile cards */}
      <m.ul
        variants={stagger(0.05)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        className="space-y-3 md:hidden"
      >
        {comparison.rows.map((row) => (
          <m.li key={row.label} variants={fadeUp} className="rounded-xl border border-gray-200 bg-white p-4 shadow-card">
            <p className="font-display font-semibold text-brand-900">{row.label}</p>
            <dl className="mt-3 grid grid-cols-3 gap-2">
              {row.values.map((v, i) => (
                <div
                  key={comparison.columns[i]}
                  className={cn("flex flex-col items-center gap-1.5 rounded-lg p-2 text-center", i === 0 ? "bg-brand-50" : "bg-gray-50")}
                >
                  <dt className={cn("text-[11px] leading-tight font-medium", i === 0 ? "text-brand-700" : "text-gray-500")}>
                    {comparison.columns[i]}
                  </dt>
                  <dd>
                    <CellValue value={v} emphasis={i === 0} yesLabel={featuresListCopy.yes} noLabel={featuresListCopy.no} />
                  </dd>
                </div>
              ))}
            </dl>
          </m.li>
        ))}
      </m.ul>
    </Section>
  );
}
