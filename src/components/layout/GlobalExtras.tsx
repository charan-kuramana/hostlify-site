import { AnimatePresence, m, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router";
import { whatsappHref } from "@/content/site";
import { track } from "@/lib/analytics";

/** Back-to-top (after 2 screens, with progress ring) + WhatsApp sales button. */
export function FloatingActions() {
  const { scrollY, scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > window.innerHeight * 2));
  const wa = whatsappHref();
  // sticky mobile CTA bars on these pages already carry WhatsApp
  const raised = pathname.startsWith("/for-owners") || pathname.startsWith("/pricing");

  return (
    <div className={`fixed right-4 z-[45] flex flex-col items-end gap-3 ${raised ? "bottom-24 lg:bottom-6" : "bottom-6"}`}>
      <AnimatePresence>
        {show && (
          <m.button
            type="button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative grid size-12 place-items-center rounded-full bg-white text-brand-700 shadow-lift ring-1 ring-gray-200 hover:text-brand-600"
          >
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
              <m.circle
                cx="24"
                cy="24"
                r="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ pathLength: progress }}
                className="text-brand-500"
              />
            </svg>
            <ArrowUp className="size-5" aria-hidden="true" />
          </m.button>
        )}
      </AnimatePresence>
      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click", { location: "floating" })}
          aria-label="Chat with Hostlify sales on WhatsApp"
          className="relative grid size-14 place-items-center rounded-full bg-success-600 text-white shadow-lift transition-transform hover:-translate-y-0.5"
        >
          <span className="absolute inset-0 rounded-full bg-success-500 motion-safe:animate-pulse-ring" aria-hidden="true" />
          <MessageCircle className="relative size-6" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

/** 2px reading progress bar (legal & blog pages). */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return <m.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[80] h-0.5 origin-left bg-gradient-primary" style={{ scaleX }} />;
}
