import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, m } from "motion/react";
import { PlayCircle, X } from "lucide-react";
import { hero } from "@/content/home";
import { heroExtra } from "@/content/home-extra";
import { ease, spring } from "@/lib/motion";
import { track } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";

type VideoModalProps = { open: boolean; onOpenChange: (open: boolean) => void };

/** Product-tour dialog. No video exists yet, so it explains that and offers a live demo instead. */
export function VideoModal({ open, onOpenChange }: VideoModalProps) {
  const v = hero.video;
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <m.div
                className="fixed inset-0 z-[60] bg-brand-950/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>
            <div className="pointer-events-none fixed inset-0 z-[70] grid place-items-center p-4">
              <Dialog.Content asChild forceMount>
                <m.div
                  className="pointer-events-auto relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-float"
                  initial={{ opacity: 0, y: 16, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1, transition: spring.snappy }}
                  exit={{ opacity: 0, y: 8, scale: 0.98, transition: { duration: 0.15, ease: ease.outQuart } }}
                >
                  <div className="grain relative grid aspect-video place-items-center overflow-hidden bg-gradient-night">
                    <div className="absolute inset-0 bg-dot-grid-dark" aria-hidden="true" />
                    <div
                      className="absolute -top-16 left-1/4 size-56 rounded-full bg-brand-400/30 blur-3xl motion-safe:animate-blob"
                      aria-hidden="true"
                    />
                    <span
                      className="relative grid size-16 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 sm:size-20"
                      aria-hidden="true"
                    >
                      <PlayCircle className="size-8 sm:size-10" strokeWidth={1.5} />
                    </span>
                  </div>
                  <div className="p-5 sm:p-7">
                    <Dialog.Title className="font-display text-h4 font-bold text-brand-900">{v.title}</Dialog.Title>
                    <Dialog.Description className="mt-2 max-w-[60ch] text-gray-600">{v.comingSoon}</Dialog.Description>
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                      <Button href="/contact" arrow onClick={() => track("cta_click", { location: "hero_video_modal" })}>
                        {v.cta}
                      </Button>
                    </div>
                  </div>
                  <Dialog.Close
                    className="absolute top-3 right-3 grid size-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:outline-white"
                    aria-label={heroExtra.videoClose}
                  >
                    <X className="size-5" aria-hidden="true" />
                  </Dialog.Close>
                </m.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
