import { useHydrated } from "@/hooks/useHydrated";
import { AnimatePresence, m } from "motion/react";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { whatsappHref } from "@/content/site";
import { track } from "@/lib/analytics";
import { ease } from "@/lib/motion";
import { Button } from "@/components/ui/Button";

type StickyMobileCtaProps = {
  /** id of the element (usually the hero) that must scroll out before the bar appears */
  watchId: string;
  label: string;
  href: string;
  whatsappLabel: string;
  /** analytics location */
  location: string;
};

/**
 * Bottom CTA bar for mobile/tablet (lg:hidden). Appears once the hero has scrolled out.
 * Portalled to <body> so the animated <main> transform can't affect `position: fixed`.
 */
export function StickyMobileCta({ watchId, label, href, whatsappLabel, location }: StickyMobileCtaProps) {
  const mounted = useHydrated();
  const [show, setShow] = useState(false);
  const wa = whatsappHref();

  useEffect(() => {
    const target = document.getElementById(watchId);
    if (!target) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 },
    );
    io.observe(target);
    return () => io.disconnect();
  }, [watchId]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {show && (
        <m.div
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ duration: 0.35, ease: ease.outExpo }}
          className="fixed inset-x-0 bottom-0 z-[44] border-t border-gray-200 bg-white/90 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-float backdrop-blur-xl lg:hidden"
        >
          <div className="mx-auto flex max-w-xl items-center gap-3">
            <Button href={href} block size="lg" arrow className="flex-1" onClick={() => track("cta_click", { location })}>
              {label}
            </Button>
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={whatsappLabel}
                onClick={() => track("whatsapp_click", { location })}
                className="grid size-13 shrink-0 place-items-center rounded-md bg-success-600 text-white shadow-card transition-transform active:scale-95"
              >
                <MessageCircle className="size-6" aria-hidden="true" />
              </a>
            )}
          </div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
