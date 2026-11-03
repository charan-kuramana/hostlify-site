import { m } from "motion/react";
import { BellRing, Clock, CreditCard, Download, Landmark, LockKeyhole, Smartphone, TriangleAlert, Wallet } from "lucide-react";
import { duesList } from "@/content/demo-data";
import { rentFlowMocks } from "@/content/home-mocks";
import { cn } from "@/lib/cn";
import { formatINR } from "@/lib/format";
import { ease, spring } from "@/lib/motion";
import { AnimatedIcon } from "@/components/icons/AnimatedIcon";
import { CountUp } from "@/components/motion/CountUp";
import { PathCheck } from "@/components/motion/PathCheck";

/**
 * Live-coded phone screens for the rent-collection story (§9.7).
 * Each screen fills its parent (h-full) and plays its micro-animation when `active` is true.
 * Purely illustrative — the parent marks the mock aria-hidden; the step text carries the meaning.
 */
export type ScreenProps = { active: boolean };

const statusTone = {
  paid: "bg-success-100 text-success-600",
  pending: "bg-warning-100 text-warning-600",
  overdue: "bg-danger-100 text-danger-600",
} as const;

function ScreenShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative flex h-full flex-col px-4 pt-10 pb-4 text-[13px] leading-snug text-gray-600", className)}>{children}</div>
  );
}

/* 1 · Owner generates dues → list populates */
export function GenerateScreen({ active }: ScreenProps) {
  const c = rentFlowMocks.generate;
  return (
    <ScreenShell className="bg-gray-50">
      <p className="font-display text-base font-bold text-brand-900">{c.title}</p>
      <p className="text-[11px] text-gray-500">{c.period}</p>
      <div className="relative mt-3 h-9">
        <m.div
          className="absolute inset-0 grid place-items-center rounded-lg bg-gradient-primary text-xs font-semibold text-white shadow-card"
          initial={false}
          animate={active ? { opacity: [1, 1, 0], scale: [1, 0.96, 1] } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, times: [0, 0.4, 1] }}
        >
          {c.button}
        </m.div>
        <m.div
          className="absolute inset-0 flex items-center justify-center gap-1.5 rounded-lg bg-success-100 text-xs font-semibold text-success-600"
          initial={false}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.3, delay: active ? 0.55 : 0 }}
        >
          <PathCheck drawn={active} delay={0.6} className="size-4" />
          {c.generated(duesList.length)}
        </m.div>
      </div>
      <m.ul
        className="mt-3 space-y-2"
        initial={false}
        animate={active ? "show" : "hidden"}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.7 } } }}
      >
        {duesList.map((d) => (
          <m.li
            key={d.id}
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: ease.outExpo } } }}
            className="flex items-center gap-2.5 rounded-lg bg-white px-2.5 py-2 shadow-card"
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-100 text-[10px] font-bold text-brand-700">
              {d.name.slice(0, 1)}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-semibold text-brand-900">{d.name}</span>
              <span className="block text-[10px] text-gray-500">#{d.room}</span>
            </span>
            <span className="font-mono text-xs text-brand-900">{formatINR(d.amount)}</span>
            <span className={cn("rounded-full px-1.5 py-0.5 text-[9px] font-semibold", statusTone[d.status])}>{c.status[d.status]}</span>
          </m.li>
        ))}
      </m.ul>
    </ScreenShell>
  );
}

/* 2 · Reminder lands on the resident's lock screen */
export function ReminderScreen({ active }: ScreenProps) {
  const c = rentFlowMocks.remind;
  return (
    <ScreenShell className="bg-gradient-night text-white">
      <div className="mt-4 text-center">
        <p className="font-display text-5xl font-semibold tracking-tight text-white tabular-nums">{c.time}</p>
        <p className="mt-1 text-xs text-brand-100/70">{c.date}</p>
      </div>
      <div className="mt-8 space-y-2">
        <m.div
          className="rounded-2xl bg-white/95 p-3 text-gray-700 shadow-float"
          initial={false}
          animate={active ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -24, scale: 0.95 }}
          transition={{ ...spring.bouncy, delay: active ? 0.25 : 0 }}
        >
          <div className="flex items-center gap-2 text-[10px] text-gray-500">
            <span className="grid size-5 place-items-center rounded-md bg-gradient-primary text-white">
              <AnimatedIcon name="bell-ring" size={12} strokeWidth={2.25} playing={active} />
            </span>
            <span className="font-semibold tracking-wide uppercase">{c.app}</span>
            <span className="ml-auto">{c.when}</span>
          </div>
          <p className="mt-1.5 text-xs font-semibold text-brand-900">{c.title}</p>
          <p className="text-[11px] text-gray-600">{c.body}</p>
        </m.div>
        <div className="scale-[0.96] rounded-2xl bg-white/60 p-3 text-gray-700 opacity-80">
          <div className="flex items-center gap-2 text-[10px] text-gray-500">
            <BellRing className="size-3" aria-hidden="true" />
            <span className="font-semibold tracking-wide uppercase">{c.app}</span>
            <span className="ml-auto">{c.secondary.when}</span>
          </div>
          <p className="mt-1 text-xs font-semibold text-brand-900">{c.secondary.title}</p>
          <p className="text-[11px] text-gray-600">{c.secondary.body}</p>
        </div>
      </div>
    </ScreenShell>
  );
}

/* 3 · "My Dues" → payment sheet (UPI / cards / net banking) */
const methodIcon = { upi: Smartphone, card: CreditCard, nb: Landmark } as const;

export function PayScreen({ active }: ScreenProps) {
  const c = rentFlowMocks.pay;
  const amount = formatINR(c.amount);
  return (
    <ScreenShell className="overflow-hidden bg-gray-50">
      <p className="font-display text-base font-bold text-brand-900">{c.title}</p>
      <p className="text-[11px] text-gray-500">{c.hostel}</p>
      <div className="mt-3 rounded-xl bg-white p-3 shadow-card">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-brand-900">{c.item}</span>
          <span className="rounded-full bg-warning-100 px-1.5 py-0.5 text-[9px] font-semibold text-warning-600">{c.due}</span>
        </div>
        <p className="mt-1 font-mono text-xl font-medium text-brand-900">{amount}</p>
        <div className="mt-2 grid h-8 place-items-center rounded-lg bg-gradient-primary text-xs font-semibold text-white">{c.payNow}</div>
      </div>
      <m.div
        aria-hidden="true"
        className="absolute inset-0 bg-brand-950/40"
        initial={false}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.3, delay: active ? 0.35 : 0 }}
      />
      <m.div
        className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-white px-4 pt-2 pb-4 shadow-float"
        initial={false}
        animate={{ y: active ? "0%" : "105%" }}
        transition={{ ...spring.snappy, delay: active ? 0.4 : 0 }}
      >
        <span className="mx-auto mb-2 block h-1 w-9 rounded-full bg-gray-200" />
        <p className="text-xs font-semibold text-brand-900">{c.sheetTitle}</p>
        <ul className="mt-2 space-y-1.5">
          {c.methods.map((meth, i) => {
            const MIcon = methodIcon[meth.id];
            const selected = i === 0;
            return (
              <li
                key={meth.id}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg border px-2.5 py-2",
                  selected ? "border-brand-500 bg-brand-50" : "border-gray-200",
                )}
              >
                <MIcon className="size-4 text-brand-600" strokeWidth={1.75} aria-hidden="true" />
                <span className="flex-1">
                  <span className="block text-xs font-semibold text-brand-900">{meth.label}</span>
                  <span className="block text-[10px] text-gray-500">{meth.hint}</span>
                </span>
                <span
                  className={cn("grid size-3.5 place-items-center rounded-full border", selected ? "border-brand-600" : "border-gray-300")}
                >
                  {selected && <span className="size-1.5 rounded-full bg-brand-600" />}
                </span>
              </li>
            );
          })}
        </ul>
        <div className="mt-3 grid h-9 place-items-center rounded-lg bg-gradient-primary text-xs font-semibold text-white">
          {c.payCta(amount)}
        </div>
        <p className="mt-2 flex items-center justify-center gap-1 text-[10px] text-gray-500">
          <LockKeyhole className="size-3" aria-hidden="true" />
          {c.secured}
        </p>
      </m.div>
    </ScreenShell>
  );
}

/* 4 · Verified receipt with a drawn check */
export function ReceiptScreen({ active }: ScreenProps) {
  const c = rentFlowMocks.receipt;
  return (
    <ScreenShell className="items-center bg-white">
      <m.div
        className="mt-4 grid size-16 place-items-center rounded-full bg-success-100 text-success-600"
        initial={false}
        animate={active ? { scale: [0.6, 1.08, 1] } : { scale: 1 }}
        transition={{ duration: 0.5, ease: ease.outExpo }}
      >
        <PathCheck drawn={active} delay={0.1} className="size-10" />
      </m.div>
      <p className="mt-3 font-display text-base font-bold text-brand-900">{c.title}</p>
      <p className="mt-0.5 font-mono text-2xl font-medium text-brand-900">{formatINR(c.amount)}</p>
      <span className="mt-1.5 rounded-full bg-success-100 px-2 py-0.5 text-[10px] font-semibold text-success-600">{c.verified}</span>
      <dl className="mt-4 w-full divide-y divide-dashed divide-gray-200 rounded-xl border border-gray-200 px-3">
        {c.rows.map((r) => (
          <div key={r.id} className="flex justify-between py-2 text-[11px]">
            <dt className="text-gray-500">{r.label}</dt>
            <dd className="font-medium text-brand-900">{r.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-3 flex h-9 w-full items-center justify-center gap-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-brand-700">
        <Download className="size-3.5" aria-hidden="true" />
        {c.download}
      </div>
    </ScreenShell>
  );
}

/* 5 · Owner dashboard counts up */
const statTone = {
  success: { cls: "bg-success-100 text-success-600", Icon: Wallet },
  warning: { cls: "bg-warning-100 text-warning-600", Icon: Clock },
  danger: { cls: "bg-danger-100 text-danger-600", Icon: TriangleAlert },
} as const;

function StatRow({ stat, active }: { stat: (typeof rentFlowMocks.dashboard.stats)[number]; active: boolean }) {
  const { cls, Icon: SIcon } = statTone[stat.tone];
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-card">
      <span className={cn("grid size-8 place-items-center rounded-lg", cls)}>
        <SIcon className="size-4" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <span className="flex-1 text-[11px] text-gray-500">{stat.label}</span>
      {active ? (
        <CountUp value={stat.value} prefix="₹" className="font-mono text-sm font-medium text-brand-900" />
      ) : (
        <span className="font-mono text-sm font-medium text-brand-900 tabular-nums">{formatINR(stat.value)}</span>
      )}
    </div>
  );
}

export function DashboardScreen({ active }: ScreenProps) {
  const c = rentFlowMocks.dashboard;
  const paid = duesList.filter((d) => d.status === "paid");
  return (
    <ScreenShell className="bg-gray-50">
      <div className="flex items-center justify-between">
        <p className="font-display text-base font-bold text-brand-900">{c.title}</p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-success-100 px-2 py-0.5 text-[10px] font-semibold text-success-600">
          <span className="relative flex size-1.5">
            <span className="absolute inset-0 rounded-full bg-success-500 motion-safe:animate-pulse-ring" />
            <span className="relative size-1.5 rounded-full bg-success-500" />
          </span>
          {c.liveLabel}
        </span>
      </div>
      <div className="mt-3 grid gap-2">
        {c.stats.map((s) => (
          <StatRow key={s.id} stat={s} active={active} />
        ))}
      </div>
      <div className="mt-3 rounded-xl bg-white p-3 shadow-card">
        <div className="flex justify-between text-[11px]">
          <span className="text-gray-500">{c.progressLabel}</span>
          <span className="font-mono text-brand-900">{Math.round(c.progress * 100)}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
          <m.div
            className="h-full origin-left rounded-full bg-gradient-primary"
            initial={false}
            animate={{ scaleX: active ? c.progress : 0.1 }}
            transition={{ duration: 1.6, ease: ease.outExpo }}
          />
        </div>
      </div>
      <p className="mt-3 text-[11px] font-semibold text-gray-500">{c.recentTitle}</p>
      <ul className="mt-1.5 space-y-1.5">
        {paid.map((d) => (
          <li key={d.id} className="flex items-center justify-between rounded-lg bg-white px-2.5 py-1.5 text-[11px] shadow-card">
            <span className="font-medium text-brand-900">{d.name}</span>
            <span className="font-mono text-success-600">+{formatINR(d.amount)}</span>
          </li>
        ))}
      </ul>
    </ScreenShell>
  );
}

/** Step id → screen, in rentFlow.steps order. */
export const rentScreens: Record<string, (p: ScreenProps) => React.ReactElement> = {
  generate: GenerateScreen,
  remind: ReminderScreen,
  pay: PayScreen,
  receipt: ReceiptScreen,
  dashboard: DashboardScreen,
};
