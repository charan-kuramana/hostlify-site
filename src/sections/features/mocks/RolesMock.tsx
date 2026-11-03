import { m } from "motion/react";
import { Check, Lock } from "lucide-react";
import { featureMocks } from "@/content/features";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { MockShell, MockToast } from "./MockShell";

const copy = featureMocks.roles;

export function RolesMock() {
  return (
    <div className="relative">
      <MockShell url={copy.url} title={copy.title} icon="ShieldCheck">
        <div className="overflow-hidden rounded-lg border border-gray-100">
          <div className="grid grid-cols-[5.5rem_repeat(5,minmax(0,1fr))] items-center bg-gray-50 px-2 py-2 text-center text-[10px] font-semibold text-gray-500">
            <span />
            {copy.permissions.map((p) => (
              <span key={p} className="truncate px-0.5">
                {p}
              </span>
            ))}
          </div>
          {copy.rows.map((row, ri) => (
            <div
              key={row.id}
              className={cn(
                "grid grid-cols-[5.5rem_repeat(5,minmax(0,1fr))] items-center border-t border-gray-100 px-2 py-2.5",
                row.id === "supervisor" && "bg-brand-50/60",
              )}
            >
              <span className="truncate text-xs font-semibold text-brand-900">{row.role}</span>
              {row.access.map((ok, ci) => (
                <m.span
                  key={copy.permissions[ci]}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.25 + ri * 0.15 + ci * 0.04, ease: ease.outExpo }}
                  className="flex justify-center"
                >
                  <span
                    className={cn(
                      "grid size-6 place-items-center rounded-full",
                      ok ? "bg-success-100 text-success-600" : "bg-gray-100 text-gray-400",
                    )}
                  >
                    {ok ? <Check className="size-3.5" strokeWidth={3} /> : <Lock className="size-3" />}
                  </span>
                </m.span>
              ))}
            </div>
          ))}
        </div>
        <p className="mt-4 mb-2 text-[11px] font-semibold text-gray-500">{copy.allRolesLabel}</p>
        <div className="flex flex-wrap gap-1.5">
          {copy.allRoles.map((r) => (
            <span key={r} className="rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-medium text-gray-700">
              {r}
            </span>
          ))}
        </div>
      </MockShell>
      <MockToast title={copy.logTitle} body={copy.log} icon="ScrollText" tone="brand" className="-right-2 -bottom-6 sm:-right-6" />
    </div>
  );
}
