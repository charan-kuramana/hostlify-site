import { AnimatePresence, m } from "motion/react";
import { hero } from "@/content/home";
import { heroExtra } from "@/content/home-extra";
import { collections, recentActivity } from "@/content/demo-data";
import { cn } from "@/lib/cn";
import { ease, spring } from "@/lib/motion";
import { formatINR } from "@/lib/format";
import { BrowserFrame } from "@/components/mockups/BrowserFrame";
import { CountUp } from "@/components/motion/CountUp";
import { Icon } from "@/components/icons/Icon";
import { LogoMark } from "@/components/icons/Logo";

type ActivityItem = { id: string; tone: "success" | "warning" | "brand"; text: string; meta: string };
export type LatestPayment = { key: string; amount: number; room: string } | null;

type DashboardMockProps = { collected: number; latest: LatestPayment; className?: string };

const toneDot = { success: "bg-success-500", warning: "bg-warning-500", brand: "bg-brand-500" } as const;
const maxBar = Math.max(...collections.map((c) => c.value));

/** Live-coded admin dashboard (sample data). Purely presentational — the parent labels it as an image. */
export function DashboardMock({ collected, latest, className }: DashboardMockProps) {
  const d = hero.dashboard;
  const activity: ActivityItem[] = [
    ...(latest
      ? [
          {
            id: latest.key,
            tone: "success" as const,
            text: heroExtra.paidActivity(formatINR(latest.amount)),
            meta: `${latest.room} · ${heroExtra.justNow}`,
          },
        ]
      : []),
    ...recentActivity,
  ].slice(0, 4);

  return (
    <BrowserFrame url={d.url} className={className}>
      <div className="flex bg-white">
        {/* Sidebar */}
        <div className="hidden w-40 shrink-0 flex-col gap-1 border-r border-gray-100 bg-gray-50/70 p-3 md:flex">
          <div className="mb-3 flex items-center gap-2 px-1.5 pt-1">
            <LogoMark size={22} />
            <span className="font-display text-sm font-bold text-brand-900">Hostlify</span>
          </div>
          {heroExtra.nav.map((item, i) => (
            <div
              key={item.id}
              className={cn(
                "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium",
                i === 0 ? "bg-white text-brand-700 shadow-card" : "text-gray-500",
              )}
            >
              <Icon name={item.icon} className="size-3.5" />
              {item.label}
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="min-w-0 flex-1 p-3.5 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-bold text-brand-900 sm:text-base">{d.greeting}</p>
              <p className="truncate text-[11px] text-gray-500 sm:text-xs">{d.hostel}</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-success-100 px-2 py-0.5 text-[10px] font-semibold text-success-600">
              <span className="relative flex size-1.5">
                <span className="absolute inset-0 rounded-full bg-success-500 motion-safe:animate-pulse-ring" />
                <span className="relative size-1.5 rounded-full bg-success-500" />
              </span>
              {heroExtra.live}
            </span>
          </div>

          {/* Stat cards */}
          <div className="mt-3.5 grid grid-cols-2 gap-2 sm:mt-4 sm:gap-3">
            {d.stats.map((s) => {
              const isCollected = s.id === "collected";
              const value = isCollected ? collected : s.value;
              const currency = "currency" in s && s.currency;
              return (
                <div
                  key={s.id}
                  className={cn(
                    "min-w-0 rounded-lg border p-2.5 sm:p-3",
                    isCollected ? "border-transparent bg-gradient-primary text-white shadow-card" : "border-gray-100 bg-white",
                  )}
                >
                  <p className={cn("truncate text-[10px] font-medium sm:text-[11px]", isCollected ? "text-brand-100" : "text-gray-500")}>
                    {s.label}
                  </p>
                  <p
                    className={cn(
                      "mt-1 truncate font-display text-base font-bold sm:text-lg",
                      isCollected ? "text-white" : "text-brand-900",
                    )}
                  >
                    <CountUp value={value} prefix={currency ? "₹" : ""} duration={isCollected && collected !== s.value ? 0.9 : 1.6} />
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-3 grid gap-3 sm:mt-4 sm:grid-cols-5">
            {/* Chart */}
            <div className="rounded-lg border border-gray-100 p-3 sm:col-span-3">
              <p className="text-[11px] font-semibold text-brand-900">{d.chartTitle}</p>
              <div className="mt-3 flex h-24 items-end gap-2 sm:h-28">
                {collections.map((c, i) => {
                  const last = i === collections.length - 1;
                  return (
                    <div key={c.id} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                      <m.div
                        className={cn("w-full origin-bottom rounded-t-[4px]", last ? "bg-gradient-logo" : "bg-brand-100")}
                        style={{ height: `${(c.value / maxBar) * 100}%` }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.8, delay: 0.9 + i * 0.06, ease: ease.outExpo }}
                      />
                      <span className="text-[9px] text-gray-400">{c.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Activity */}
            <div className="rounded-lg border border-gray-100 p-3 sm:col-span-2">
              <p className="text-[11px] font-semibold text-brand-900">{d.activityTitle}</p>
              <ul className="mt-2 space-y-2">
                <AnimatePresence initial={false} mode="popLayout">
                  {activity.map((a) => (
                    <m.li
                      key={a.id}
                      layout
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={spring.snappy}
                      className="flex items-start gap-2"
                    >
                      <span className={cn("mt-1 size-1.5 shrink-0 rounded-full", toneDot[a.tone])} />
                      <span className="min-w-0">
                        <span className="block truncate text-[11px] font-medium text-gray-800">{a.text}</span>
                        <span className="block truncate text-[10px] text-gray-400">{a.meta}</span>
                      </span>
                    </m.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}
