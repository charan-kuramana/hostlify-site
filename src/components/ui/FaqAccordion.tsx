import * as Accordion from "@radix-ui/react-accordion";
import { AnimatePresence, m } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

type FaqItem = { id: string; q: string; a: string };

/** Radix accordion (one open at a time) with Motion height animation. */
export function FaqAccordion({ items, defaultOpen, className }: { items: readonly FaqItem[]; defaultOpen?: string; className?: string }) {
  const [value, setValue] = useState(defaultOpen ?? "");
  return (
    <Accordion.Root
      type="single"
      collapsible
      value={value}
      onValueChange={setValue}
      className={cn("divide-y divide-gray-200 border-y border-gray-200", className)}
    >
      {items.map((item) => {
        const open = value === item.id;
        return (
          <Accordion.Item key={item.id} value={item.id}>
            <Accordion.Header asChild>
              <h3>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 py-5 text-left font-display text-h4 font-semibold text-brand-900 transition-colors hover:text-brand-600">
                  {item.q}
                  <span
                    className={cn(
                      "grid size-8 shrink-0 place-items-center rounded-full border border-gray-200 transition-all duration-300",
                      open && "rotate-180 border-brand-200 bg-brand-50 text-brand-600",
                    )}
                  >
                    <ChevronDown className="size-4" aria-hidden="true" />
                  </span>
                </Accordion.Trigger>
              </h3>
            </Accordion.Header>
            <AnimatePresence initial={false}>
              {open && (
                <Accordion.Content forceMount asChild>
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-[65ch] pr-12 pb-5">{item.a}</p>
                  </m.div>
                </Accordion.Content>
              )}
            </AnimatePresence>
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
}
