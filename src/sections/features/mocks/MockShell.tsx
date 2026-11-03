import { m } from "motion/react";
import { featureDeepCopy } from "@/content/features";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { BrowserFrame } from "@/components/mockups/BrowserFrame";
import { Icon } from "@/components/icons/Icon";

type MockShellProps = { url: string; title: string; icon: string; aside?: React.ReactNode; children: React.ReactNode; className?: string };

/** Browser chrome + header row shared by the module mocks. The whole mock is decorative. */
export function MockShell({ url, title, icon, aside, children, className }: MockShellProps) {
  return (
    <figure className={cn("relative", className)} aria-label={`${title} — ${featureDeepCopy.demoNote}`}>
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-linear-to-br from-brand-200/50 via-brand-100/30 to-accent-100/40 blur-2xl"
      />
      <div aria-hidden="true">
        <BrowserFrame url={url}>
          <div className="p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-gradient-primary text-white">
                  <Icon name={icon} className="size-4" />
                </span>
                <span className="truncate font-display text-sm font-semibold text-brand-900">{title}</span>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {aside}
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-gray-600 uppercase">
                  {featureDeepCopy.demoNote}
                </span>
              </div>
            </div>
            {children}
          </div>
        </BrowserFrame>
      </div>
    </figure>
  );
}

type ToastProps = { title: string; body: string; icon: string; tone?: "success" | "brand"; delay?: number; className?: string };

/** Floating notification card that pops in once the mock is visible. */
export function MockToast({ title, body, icon, tone = "success", delay = 0.9, className }: ToastProps) {
  return (
    <m.div
      aria-hidden="true"
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, delay, ease: ease.outExpo }}
      className={cn(
        "absolute z-10 flex max-w-[15rem] items-center gap-3 rounded-xl border border-gray-200 bg-white/95 p-3 shadow-lift backdrop-blur",
        className,
      )}
    >
      <span
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded-full",
          tone === "success" ? "bg-success-100 text-success-600" : "bg-brand-100 text-brand-600",
        )}
      >
        <Icon name={icon} className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-brand-900">{title}</span>
        <span className="block truncate text-xs text-gray-500">{body}</span>
      </span>
    </m.div>
  );
}
