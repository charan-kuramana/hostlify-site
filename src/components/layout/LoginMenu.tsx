import { AnimatePresence, m } from "motion/react";
import { Building2, ChevronDown, UserRound } from "lucide-react";
import { useId } from "react";
import { headerCopy } from "@/content/nav";
import { site } from "@/content/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { buttonVariants } from "@/components/ui/Button";
import { useDisclosure } from "./useDisclosure";

const items = [
  { kind: "staff", href: site.links.staffLogin, icon: Building2, ...headerCopy.loginOwner },
  { kind: "resident", href: site.links.residentLogin, icon: UserRound, ...headerCopy.loginResident },
] as const;

export function LoginMenu() {
  const { open, rootProps, toggle } = useDisclosure(80);
  const id = useId();
  return (
    <div className="relative" {...rootProps}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={toggle}
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "h-10")}
      >
        {headerCopy.login}
        <ChevronDown className={cn("transition-transform duration-200", open && "rotate-180")} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <m.div
            id={id}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 z-50 w-64 pt-2"
          >
            <ul className="rounded-xl border border-gray-200 bg-white p-1.5 shadow-float">
              {items.map((it) => (
                <li key={it.kind}>
                  <a
                    href={it.href}
                    onClick={() => track("login_click", { kind: it.kind })}
                    className="flex items-center gap-3 rounded-lg p-2.5 hover:bg-brand-50"
                  >
                    <span className="grid size-9 place-items-center rounded-lg bg-brand-100 text-brand-600">
                      <it.icon className="size-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-brand-900">{it.title}</span>
                      <span className="block text-xs text-gray-500">{it.subtitle}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
