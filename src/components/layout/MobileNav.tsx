import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, m } from "motion/react";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { headerCopy, homeLink, mainNav, megaMenu } from "@/content/nav";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/icons/Logo";
import { fadeUp, stagger } from "@/lib/motion";
import { toneFor } from "@/lib/iconTones";
import { iconNameOf } from "@/components/icons/Icon";

/** Morphing hamburger → × */
function Burger({ open }: { open: boolean }) {
  const line = "absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out";
  return (
    <span className="relative block h-3.5 w-5" aria-hidden="true">
      <span className={`${line} ${open ? "top-1.5 rotate-45" : "top-0"}`} />
      <span className={`${line} top-1.5 ${open ? "opacity-0" : ""}`} />
      <span className={`${line} ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
    </span>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  // Close the sheet when the route changes (adjusting state during render — no effect needed)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="grid size-11 place-items-center rounded-md text-brand-900 hover:bg-gray-100 lg:hidden"
        aria-label={open ? headerCopy.menuClose : headerCopy.menuOpen}
      >
        <Burger open={open} />
      </Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <m.div
                className="fixed inset-0 z-[60] bg-brand-950/40 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <m.div
                className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col bg-white shadow-float"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex h-16 items-center justify-between border-b border-gray-100 px-4">
                  <Dialog.Title asChild>
                    <span>
                      <Logo />
                    </span>
                  </Dialog.Title>
                  <Dialog.Close
                    className="grid size-11 place-items-center rounded-md text-brand-900 hover:bg-gray-100"
                    aria-label={headerCopy.menuClose}
                  >
                    <Burger open />
                  </Dialog.Close>
                </div>
                <m.nav
                  aria-label="Mobile"
                  className="flex-1 overflow-y-auto px-4 py-4"
                  variants={stagger(0.04, 0.1)}
                  initial="hidden"
                  animate="show"
                >
                  <ul className="mb-4 border-b border-gray-100 pb-3">
                    {[homeLink, ...mainNav].map((link) => (
                      <m.li key={link.href} variants={fadeUp}>
                        <Link
                          to={link.href}
                          className="flex min-h-12 items-center justify-between rounded-lg px-2 text-lg font-semibold text-brand-900 hover:bg-brand-50"
                        >
                          {link.label}
                          <ChevronRight className="size-5 text-gray-400" aria-hidden="true" />
                        </Link>
                      </m.li>
                    ))}
                  </ul>
                  <m.p variants={fadeUp} className="px-2 pb-2 text-eyebrow font-semibold text-gray-400 uppercase">
                    {headerCopy.features}
                  </m.p>
                  <ul>
                    {megaMenu.map((item) => (
                      <m.li key={item.href} variants={fadeUp}>
                        <Link to={item.href} className="group flex min-h-12 items-center gap-3 rounded-lg px-2 hover:bg-brand-50">
                          <span className={`grid size-9 place-items-center rounded-lg tile-gloss ${toneFor(iconNameOf(item.icon))}`}>
                            <item.icon className="size-4" aria-hidden="true" />
                          </span>
                          <span className="font-medium text-brand-900">{item.label}</span>
                        </Link>
                      </m.li>
                    ))}
                  </ul>
                  {/* Log in is hidden until the app is live — flip site.features.login */}
                  {site.features.login && (
                    <m.div variants={fadeUp} className="mt-4 grid grid-cols-2 gap-2 border-t border-gray-100 pt-4">
                      <Button href={site.links.staffLogin} variant="outline" size="sm" className="h-11">
                        {headerCopy.loginOwner.title}
                      </Button>
                      <Button href={site.links.residentLogin} variant="outline" size="sm" className="h-11">
                        {headerCopy.loginResident.title}
                      </Button>
                    </m.div>
                  )}
                </m.nav>
                <div className="border-t border-gray-100 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                  <Button href="/contact" size="lg" block arrow>
                    {headerCopy.cta}
                  </Button>
                </div>
              </m.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
