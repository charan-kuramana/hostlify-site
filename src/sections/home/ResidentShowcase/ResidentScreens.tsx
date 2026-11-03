import { Camera, Check, Copy, MapPin, Search, Share2 } from "lucide-react";
import { bento } from "@/content/home";
import { residentMocks } from "@/content/home-mocks";
import { cn } from "@/lib/cn";
import { formatINR } from "@/lib/format";

/** Static, live-coded resident-app screens (§9.8). Decorative — parents mark them aria-hidden. */

function Shell({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex h-full flex-col bg-gray-50 px-4 pt-10 pb-4 text-[12px] leading-snug text-gray-600", className)}>
      <p className="font-display text-[15px] font-bold text-brand-900">{title}</p>
      {children}
    </div>
  );
}

export function DiscoverScreen() {
  const c = residentMocks.discover;
  return (
    <Shell title={c.title}>
      <p className="mt-0.5 flex items-center gap-1 text-[10px] text-gray-500">
        <MapPin className="size-3 text-accent-500" aria-hidden="true" />
        {c.location}
      </p>
      <div className="mt-3 flex h-8 items-center gap-2 rounded-lg border border-gray-200 bg-white px-2.5 text-[11px] text-gray-400">
        <Search className="size-3.5" aria-hidden="true" />
        {c.searchPlaceholder}
      </div>
      <div className="mt-2 flex gap-1.5">
        {c.filters.map((f, i) => (
          <span
            key={f}
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-semibold",
              i === 2 ? "bg-brand-600 text-white" : "bg-white text-gray-600 ring-1 ring-gray-200",
            )}
          >
            {f}
          </span>
        ))}
      </div>
      <ul className="mt-3 space-y-2">
        {c.hostels.map((h, i) => (
          <li key={h.id} className="overflow-hidden rounded-xl bg-white shadow-card">
            <div className={cn("h-12", i === 0 ? "bg-gradient-primary" : i === 1 ? "bg-gradient-logo opacity-80" : "bg-brand-200")} />
            <div className="p-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-brand-900">{h.name}</span>
                <span className="text-[10px] text-gray-500">{h.distance}</span>
              </div>
              <div className="mt-0.5 flex items-center justify-between text-[10px]">
                <span>
                  {c.from} <span className="font-mono font-medium text-brand-900">{formatINR(h.from)}</span>
                  {c.perMonth}
                </span>
                <span className="rounded-full bg-success-100 px-1.5 py-0.5 font-semibold text-success-600">{c.bedsFree(h.beds)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

const bedTone = {
  o: "bg-gray-200 text-gray-400",
  a: "bg-success-100 text-success-600 ring-1 ring-success-500/40",
  s: "bg-brand-600 text-white shadow-card",
} as const;

export function BedScreen() {
  const c = residentMocks.bed;
  return (
    <Shell title={c.title}>
      <p className="text-[10px] text-gray-500">{c.step}</p>
      <div className="mt-2 flex gap-3 text-[10px]">
        {(["available", "occupied", "selected"] as const).map((k) => (
          <span key={k} className="flex items-center gap-1">
            <span className={cn("size-2.5 rounded-sm", k === "available" ? bedTone.a : k === "occupied" ? bedTone.o : bedTone.s)} />
            {c.legend[k]}
          </span>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {c.rooms.map((r) => (
          <div key={r.id} className="rounded-xl bg-white p-2 shadow-card">
            <p className="text-[10px] font-semibold text-brand-900">{r.number}</p>
            <div className="mt-1.5 grid grid-cols-2 gap-1">
              {r.beds.map((b, bi) => (
                <span
                  key={`${r.id}-${bi}`}
                  className={cn("grid h-6 place-items-center rounded-md text-[9px] font-semibold", bedTone[b as keyof typeof bedTone])}
                >
                  {String.fromCharCode(65 + bi)}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto rounded-xl bg-white p-3 shadow-card">
        <p className="text-[11px] font-semibold text-brand-900">{c.selected}</p>
        <div className="mt-2 grid h-8 place-items-center rounded-lg bg-gradient-primary text-[11px] font-semibold text-white">{c.cta}</div>
      </div>
    </Shell>
  );
}

export function DuesScreen() {
  const c = residentMocks.dues;
  return (
    <Shell title={c.title}>
      <div className="mt-3 rounded-xl bg-gradient-primary p-3 text-white shadow-card">
        <p className="text-[11px] text-brand-100">{c.current.label}</p>
        <p className="mt-0.5 font-mono text-2xl font-medium">{formatINR(c.current.amount)}</p>
        <p className="text-[10px] text-brand-100">{c.current.due}</p>
        <div className="mt-2.5 grid h-8 place-items-center rounded-lg bg-white text-[11px] font-semibold text-brand-700">{c.pay}</div>
      </div>
      <p className="mt-4 text-[11px] font-semibold text-gray-500">{c.historyTitle}</p>
      <ul className="mt-1.5 space-y-1.5">
        {c.history.map((h) => (
          <li key={h.id} className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-2 shadow-card">
            <span className="grid size-6 place-items-center rounded-full bg-success-100 text-success-600">
              <Check className="size-3" strokeWidth={2.5} aria-hidden="true" />
            </span>
            <span className="flex-1">
              <span className="block text-[11px] font-semibold text-brand-900">{h.label}</span>
              <span className="block text-[10px] text-success-600">{c.paid}</span>
            </span>
            <span className="font-mono text-[11px] text-brand-900">{formatINR(h.amount)}</span>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

export function MenuScreen() {
  const c = residentMocks.menu;
  const { days, today } = bento.tiles.menu;
  return (
    <Shell title={c.title}>
      <div className="mt-3 flex justify-between">
        {days.map((d, i) => (
          <span
            key={d}
            className={cn(
              "grid size-7 place-items-center rounded-full text-[9px] font-semibold",
              i === 2 ? "bg-brand-600 text-white" : "bg-white text-gray-500 ring-1 ring-gray-200",
            )}
          >
            {d.slice(0, 2)}
          </span>
        ))}
      </div>
      <p className="mt-3 text-[11px] font-semibold text-gray-500">{c.today}</p>
      <ul className="mt-1.5 space-y-2">
        {today.map((t) => (
          <li key={t.meal} className="rounded-xl bg-white p-3 shadow-card">
            <p className="text-[10px] font-semibold tracking-wide text-accent-600 uppercase">{t.meal}</p>
            <p className="mt-0.5 text-xs font-medium text-brand-900">{t.dish}</p>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

export function ComplaintScreen() {
  const c = residentMocks.complaint;
  return (
    <Shell title={c.title}>
      <p className="mt-3 text-[10px] font-semibold text-gray-500">{c.categoryLabel}</p>
      <span className="mt-1 inline-flex w-fit rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
        {c.category}
      </span>
      <p className="mt-2 rounded-lg border border-gray-200 bg-white p-2.5 text-[11px] text-gray-700">{c.text}</p>
      <div className="mt-2 flex items-center gap-2 rounded-lg border border-dashed border-brand-300 bg-brand-50 p-2.5 text-[10px] font-medium text-brand-700">
        <Camera className="size-3.5" aria-hidden="true" />
        {c.photo}
      </div>
      <div className="mt-2 grid h-8 place-items-center rounded-lg bg-gradient-primary text-[11px] font-semibold text-white">{c.submit}</div>
      <p className="mt-4 text-[11px] font-semibold text-gray-500">{c.statusTitle}</p>
      <ul className="mt-1.5 space-y-1.5">
        {c.tickets.map((tk, i) => (
          <li key={tk.id} className="flex items-center justify-between rounded-lg bg-white px-2.5 py-2 text-[11px] shadow-card">
            <span className="font-medium text-brand-900">{tk.label}</span>
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[9px] font-semibold",
                i === 0 ? "bg-warning-100 text-warning-600" : "bg-success-100 text-success-600",
              )}
            >
              {tk.status}
            </span>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

export function ReferScreen() {
  const c = residentMocks.refer;
  return (
    <Shell title={c.title}>
      <div className="mt-3 grid h-24 place-items-center rounded-xl bg-accent-100 text-4xl">{c.emoji}</div>
      <p className="mt-3 text-[11px]">{c.body}</p>
      <p className="mt-3 text-[10px] font-semibold text-gray-500">{c.codeLabel}</p>
      <div className="mt-1 flex items-center justify-between rounded-lg border border-dashed border-accent-500/50 bg-white px-3 py-2">
        <span className="font-mono text-sm font-medium tracking-wider text-brand-900">{c.code}</span>
        <Copy className="size-3.5 text-gray-400" aria-hidden="true" />
      </div>
      <div className="mt-2 flex h-8 items-center justify-center gap-1.5 rounded-lg bg-accent-600 text-[11px] font-semibold text-white">
        <Share2 className="size-3.5" aria-hidden="true" />
        {c.share}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-lg bg-white px-3 py-2 text-[11px] shadow-card">
        <span>{c.invited}</span>
        <span className="font-mono font-medium text-brand-900">{c.invitedCount}</span>
      </div>
    </Shell>
  );
}

/** Centre-phone / carousel screens by id (residentMocks.screens order). */
export const residentScreens: Record<string, () => React.ReactElement> = {
  discover: DiscoverScreen,
  bed: BedScreen,
  dues: DuesScreen,
  menu: MenuScreen,
};
