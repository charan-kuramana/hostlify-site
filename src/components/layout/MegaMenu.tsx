import { AnimatePresence, m } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useId } from "react";
import { Link } from "react-router";
import { headerCopy, megaMenu, megaPromo } from "@/content/nav";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { iconNameOf } from "@/components/icons/Icon";
import { toneFor } from "@/lib/iconTones";
import { useDisclosure } from "./useDisclosure";

export function MegaMenu({ active }: { active: boolean }) {
  const { open, setOpen, rootProps, toggle } = useDisclosure();
  const panelId = useId();

  return (
    <div className="relative" {...rootProps}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
        className={cn(
          "relative flex h-10 items-center gap-1 rounded-md px-2 text-sm font-medium whitespace-nowrap transition-colors hover:text-brand-600 xl:px-3 xl:text-[15px]",
          active || open ? "text-brand-600" : "text-gray-700",
        )}
      >
        {headerCopy.features}
        <ChevronDown className={cn("size-4 transition-transform duration-200", open && "rotate-180")} aria-hidden="true" />
        {active && (
          <m.span layoutId="nav-underline" className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-brand-600 xl:inset-x-3" />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <m.div
            id={panelId}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-1/2 z-50 w-[760px] -translate-x-1/2 pt-3"
          >
            <div className="grid grid-cols-[1fr_240px] gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-float">
              <ul className="grid grid-cols-2 gap-1 p-2">
                {megaMenu.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "group flex gap-3 rounded-lg p-3 transition-colors hover:bg-tone-soft/50 focus-visible:bg-tone-soft/50",
                        toneFor(iconNameOf(item.icon)),
                      )}
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-lg tile-gloss transition-transform duration-300 ease-out group-hover:scale-106 group-hover:-rotate-4">
                        <item.icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-brand-900 transition-colors group-hover:text-tone-deep">
                          {item.label}
                        </span>
                        <span className="mt-0.5 block text-[13px] leading-snug text-gray-500">{item.description}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="grain relative flex flex-col justify-between overflow-hidden rounded-xl bg-gradient-night p-5 text-white">
                <div className="absolute -top-10 -right-10 size-40 rounded-full bg-brand-400/30 blur-3xl" aria-hidden="true" />
                <div className="relative">
                  <p className="font-display text-lg font-bold text-white">{megaPromo.title}</p>
                  <p className="mt-2 text-sm text-brand-100/75">{megaPromo.body}</p>
                </div>
                <Button
                  href={megaPromo.cta.href}
                  variant="white"
                  size="sm"
                  className="relative mt-6 self-start"
                  rightIcon={<ArrowRight />}
                  onClick={() => setOpen(false)}
                >
                  {megaPromo.cta.label}
                </Button>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
