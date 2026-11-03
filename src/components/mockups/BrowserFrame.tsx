import { cn } from "@/lib/cn";

type BrowserFrameProps = { url?: string; children: React.ReactNode; className?: string; theme?: "light" | "dark" };

/** Pure-CSS browser chrome around live-coded UI. */
export function BrowserFrame({ url = "app.hostlify.in", children, className, theme = "light" }: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border shadow-float",
        theme === "light" ? "border-gray-200 bg-white" : "border-white/10 bg-brand-950",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-9 items-center gap-3 border-b px-4",
          theme === "light" ? "border-gray-200 bg-gray-50" : "border-white/10 bg-white/5",
        )}
      >
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-danger-500/70" />
          <span className="size-2.5 rounded-full bg-warning-500/70" />
          <span className="size-2.5 rounded-full bg-success-500/70" />
        </div>
        <div
          className={cn(
            "mx-auto flex h-6 max-w-xs flex-1 items-center justify-center truncate rounded-md px-3 font-mono text-[11px]",
            theme === "light" ? "bg-white text-gray-500 ring-1 ring-gray-200" : "bg-white/5 text-brand-200/60",
          )}
        >
          {url}
        </div>
        <span className="w-10" aria-hidden="true" />
      </div>
      {children}
    </div>
  );
}
