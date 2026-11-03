import * as Tabs from "@radix-ui/react-tabs";
import { m } from "motion/react";
import { ScrollText } from "lucide-react";
import { useState } from "react";
import { permissions, roles, rolesCopy, type Permission } from "@/content/roles";
import { cn } from "@/lib/cn";
import { ease, fadeUp, spring, viewport } from "@/lib/motion";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

type RoleId = (typeof roles)[number]["id"];

const isAllowed = (roleId: RoleId, p: Permission) => {
  const role = roles.find((r) => r.id === roleId);
  return role ? !(role.denied as readonly Permission[]).includes(p) : false;
};

/*
 * Check ↔ cross morph: both glyphs are two straight strokes with identical path structure,
 * so Motion can interpolate `d` directly.
 */
const glyph = {
  allowed: ["M5.5 12.5 L10 17", "M10 17 L18.5 7.5"],
  denied: ["M7 7 L17 17", "M17 7 L7 17"],
} as const;

function MorphIcon({ allowed, from, delay }: { allowed: boolean; from: boolean; delay: number }) {
  const target = allowed ? glyph.allowed : glyph.denied;
  const start = from ? glyph.allowed : glyph.denied;
  const transition = { duration: 0.35, delay, ease: ease.outQuart };
  return (
    <m.span
      className={cn(
        "grid size-7 shrink-0 place-items-center rounded-full transition-colors duration-300",
        allowed ? "bg-success-100 text-success-600" : "bg-danger-100 text-danger-600",
      )}
      initial={{ scale: from === allowed ? 1 : 0.85 }}
      animate={{ scale: 1 }}
      transition={{ ...spring.bouncy, delay }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {target.map((d, i) => (
          <m.path key={i === 0 ? "a" : "b"} initial={{ d: start[i] ?? d }} animate={{ d }} transition={transition} />
        ))}
      </svg>
    </m.span>
  );
}

function PermissionCard({ roleId, prevId }: { roleId: RoleId; prevId: RoleId }) {
  const role = roles.find((r) => r.id === roleId) ?? roles[0];
  const allowedCount = permissions.filter((p) => isAllowed(roleId, p)).length;
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-float">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-gray-100 p-6 sm:p-7">
        <div className="min-w-0">
          <h3 className="text-h3 font-bold">{role.name}</h3>
          <p className="mt-1 max-w-[46ch] text-gray-600">{role.summary}</p>
        </div>
        <span className="rounded-full bg-brand-100 px-3 py-1 font-mono text-xs font-medium text-brand-700 tabular-nums">
          {allowedCount}/{permissions.length}
        </span>
      </div>
      <ul className="grid gap-x-6 p-3 sm:grid-cols-2 sm:p-4">
        {permissions.map((p, i) => {
          const allowed = isAllowed(roleId, p);
          const was = isAllowed(prevId, p);
          return (
            <m.li
              key={p}
              className="flex min-h-12 items-center gap-3 rounded-lg px-3 py-2"
              initial={{ opacity: 0.4, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04, ease: ease.outQuart }}
            >
              <MorphIcon allowed={allowed} from={was} delay={i * 0.04} />
              <span className={cn("flex-1 font-medium", allowed ? "text-brand-900" : "text-gray-400")}>{p}</span>
              <span className={cn("text-xs font-semibold", allowed ? "text-success-600" : "text-gray-500")}>
                {allowed ? rolesCopy.allowed : rolesCopy.denied}
              </span>
            </m.li>
          );
        })}
      </ul>
    </div>
  );
}

/** §9.9 — Roles & permissions: Radix tabs + animated permission matrix. */
export function RolesPermissions() {
  const isDesktop = useIsDesktop();
  const [state, setState] = useState<{ value: RoleId; prev: RoleId }>({ value: "owner", prev: "owner" });

  const onValueChange = (v: string) => {
    const next = roles.find((r) => r.id === v)?.id;
    if (next) setState((s) => ({ value: next, prev: s.value }));
  };

  return (
    <Section id="roles" theme="white">
      <SectionHeader eyebrow={rolesCopy.eyebrow} title={rolesCopy.title} lead={rolesCopy.lead} />
      <m.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
        <Tabs.Root
          value={state.value}
          onValueChange={onValueChange}
          orientation={isDesktop ? "vertical" : "horizontal"}
          className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10"
        >
          <Tabs.List
            aria-label={rolesCopy.eyebrow}
            className="-mx-4 flex [scrollbar-width:none] gap-1 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0 lg:flex-col lg:flex-nowrap lg:justify-start lg:self-start lg:rounded-2xl lg:bg-gray-50 lg:p-2 [&::-webkit-scrollbar]:hidden"
          >
            {roles.map((r) => {
              const active = r.id === state.value;
              return (
                <Tabs.Trigger
                  key={r.id}
                  value={r.id}
                  className={cn(
                    "relative flex min-h-11 shrink-0 items-center rounded-lg px-4 text-sm font-semibold transition-colors duration-200 lg:w-full lg:text-[15px]",
                    active ? "text-brand-700" : "text-gray-600 hover:text-brand-900",
                  )}
                >
                  {active && (
                    <m.span
                      layoutId="roles-tab-indicator"
                      className="absolute inset-0 rounded-lg bg-brand-100 lg:bg-white lg:shadow-card"
                      transition={spring.snappy}
                      aria-hidden="true"
                    >
                      <span className="absolute top-2 bottom-2 left-0 hidden w-[3px] rounded-full bg-brand-600 lg:block" />
                    </m.span>
                  )}
                  <span className="relative">{r.name}</span>
                </Tabs.Trigger>
              );
            })}
          </Tabs.List>

          <div className="min-w-0">
            {roles.map((r) => (
              <Tabs.Content key={r.id} value={r.id} className="focus-visible:outline-offset-4">
                <PermissionCard roleId={r.id} prevId={state.prev} />
              </Tabs.Content>
            ))}
            <p className="mt-5 flex items-center gap-2 text-sm text-gray-600">
              <ScrollText className="size-4 shrink-0 text-brand-600" strokeWidth={1.75} aria-hidden="true" />
              {rolesCopy.microcopy}
            </p>
          </div>
        </Tabs.Root>
      </m.div>
    </Section>
  );
}
