import { m } from "motion/react";
import { bento } from "@/content/home";
import { bentoExtra } from "@/content/home-extra";
import { profitBars } from "@/content/demo-data";
import { ease } from "@/lib/motion";
import { CountUp } from "@/components/motion/CountUp";
import { BentoTile } from "./BentoTile";

const max = Math.max(...profitBars.map((b) => b.income));

function Bar({ value, className, delay }: { value: number; className: string; delay: number }) {
  return (
    <m.span
      className={`block w-full origin-bottom rounded-t-[3px] ${className}`}
      style={{ height: `${(value / max) * 100}%` }}
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: false, amount: 0.6 }}
      transition={{ duration: 0.9, delay, ease: ease.outExpo }}
    />
  );
}

function ProfitVisual() {
  const t = bento.tiles.profit;
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium text-gray-500">{t.net}</p>
          <p className="font-display text-xl font-bold text-success-600">
            <CountUp value={t.netValue} prefix="₹" />
          </p>
        </div>
        <div className="flex flex-col gap-1 text-[10px] text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-sm bg-brand-500" />
            {t.income}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-sm bg-accent-500/70" />
            {t.expenses}
          </span>
        </div>
      </div>
      <div className="mt-3 flex min-h-24 flex-1 gap-3">
        {profitBars.map((b, i) => (
          <div key={b.id} className="flex flex-1 flex-col justify-end gap-1">
            <div className="flex min-h-0 flex-1 items-end gap-1">
              <Bar value={b.income} className="bg-brand-500" delay={i * 0.08} />
              <Bar value={b.expense} className="bg-accent-500/70" delay={0.05 + i * 0.08} />
            </div>
            <span className="text-center text-[10px] text-gray-400">{b.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProfitTile({ className }: { className?: string }) {
  const t = bento.tiles.profit;
  return (
    <BentoTile
      title={t.title}
      body={t.body}
      href={t.href}
      icon="TrendingUp"
      learnMore={bentoExtra.learnMore}
      className={className}
      visualClassName="min-h-[170px]"
    >
      {() => <ProfitVisual />}
    </BentoTile>
  );
}
