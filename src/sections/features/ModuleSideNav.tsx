import { m } from "motion/react";
import { featuresPage } from "@/content/features";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/icons/Icon";
import { toneFor } from "@/lib/iconTones";

export type SideNavItem = { anchorId: string; title: string; icon: string };

/** Desktop-only sticky list of modules; the active one follows the scroll spy. */
export function ModuleSideNav({ items, active, layoutKey }: { items: readonly SideNavItem[]; active: string | null; layoutKey: string }) {
  return (
    <nav
      aria-label={featuresPage.onThisPage}
      className="sticky top-40 max-h-[calc(100svh-11rem)] [scrollbar-width:thin] overflow-y-auto overscroll-contain pr-2"
    >
      <p className="mb-3 px-3 text-eyebrow font-semibold text-gray-500 uppercase">{featuresPage.onThisPage}</p>
      <ul className="space-y-0.5">
        {items.map((item) => {
          const isActive = item.anchorId === active;
          return (
            <li key={item.anchorId}>
              <a
                href={`#${item.anchorId}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "group relative isolate flex min-h-9 items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors",
                  toneFor(item.icon),
                  isActive ? "font-semibold text-brand-900" : "text-gray-600 hover:bg-gray-50 hover:text-brand-900",
                )}
              >
                {isActive && (
                  <m.span
                    layoutId={`spy-${layoutKey}`}
                    className="absolute inset-0 -z-10 rounded-md bg-tone-soft/60 ring-1 ring-tone/15"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span
                  className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-md transition-[color,background-color,scale] duration-200",
                    isActive ? "scale-105 tile-solid" : "bg-tone-soft text-tone-deep group-hover:scale-105",
                  )}
                >
                  <Icon name={item.icon} className="size-3.5" />
                </span>
                <span className="truncate">{item.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
