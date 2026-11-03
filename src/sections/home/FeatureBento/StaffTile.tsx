import { m } from "motion/react";
import { useState } from "react";
import { bento } from "@/content/home";
import { bentoExtra } from "@/content/home-extra";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";
import { useInterval } from "@/hooks/useInterval";
import { Icon } from "@/components/icons/Icon";
import { BentoTile } from "./BentoTile";

const avatarTone = ["bg-gradient-logo text-white", "bg-accent-100 text-accent-600", "bg-success-100 text-success-600"] as const;
const roleIcon = ["ShieldCheck", "UserCog", "Lock"] as const;

function StaffVisual({ active }: { active: boolean }) {
  const people = bento.tiles.staff.people;
  const [focus, setFocus] = useState(0);
  useInterval(() => setFocus((f) => (f + 1) % people.length), 1800, active);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex -space-x-2.5">
        {people.map((p, i) => (
          <m.span
            key={p.id}
            animate={{ y: i === focus && active ? -4 : 0 }}
            transition={spring.snappy}
            className={cn(
              "grid size-9 place-items-center rounded-full font-display text-xs font-bold ring-2 ring-white",
              avatarTone[i % avatarTone.length],
            )}
          >
            {p.initials}
          </m.span>
        ))}
        <span className="grid size-9 place-items-center rounded-full bg-white text-[11px] font-semibold text-gray-500 ring-2 ring-white">
          {bentoExtra.moreRoles}
        </span>
      </div>
      <ul className="mt-3 space-y-1.5">
        {people.map((p, i) => {
          const on = i === focus;
          return (
            <li key={p.id} className="relative flex items-center justify-between gap-2 rounded-md px-2.5 py-1.5">
              {on && (
                <m.span
                  layoutId="staff-focus"
                  className="absolute inset-0 rounded-md bg-white shadow-card ring-1 ring-gray-200"
                  transition={spring.snappy}
                />
              )}
              <span className="relative flex items-center gap-2 text-xs font-semibold text-brand-900">
                <span
                  className={cn(
                    "grid size-6 place-items-center rounded-full font-display text-[9px] font-bold",
                    avatarTone[i % avatarTone.length],
                  )}
                >
                  {p.initials}
                </span>
                <span className="truncate font-medium text-gray-600">{bentoExtra.staffAccess[i]}</span>
              </span>
              <span
                className={cn(
                  "relative inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                  on ? "bg-brand-100 text-brand-700" : "bg-gray-100 text-gray-600",
                )}
              >
                <Icon name={roleIcon[i % roleIcon.length] ?? "ShieldCheck"} className="size-3" />
                {p.role}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function StaffTile({ className }: { className?: string }) {
  const t = bento.tiles.staff;
  return (
    <BentoTile
      title={t.title}
      body={t.body}
      href={t.href}
      icon="UserCog"
      learnMore={bentoExtra.learnMore}
      className={className}
      visualClassName="min-h-[170px]"
    >
      {(active) => <StaffVisual active={active} />}
    </BentoTile>
  );
}
