import { m, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { headerCopy, homeLink, mainNav } from "@/content/nav";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/icons/Logo";
import { MegaMenu } from "./MegaMenu";
import { LoginMenu } from "./LoginMenu";
import { MobileNav } from "./MobileNav";
import { useFirstVisit } from "./useFirstVisit";

export function Header() {
  const { pathname } = useLocation();
  const minimal = pathname.startsWith("/for-owners");
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const animateLogo = useFirstVisit();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    // hide on scroll down, reveal on scroll up (ignore tiny jitters)
    if (y > 160 && y - prev > 4) setHidden(true);
    else if (prev - y > 4 || y < 160) setHidden(false);
  });

  return (
    <m.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300",
        scrolled ? "border-b border-gray-200/60 bg-white/80 shadow-card backdrop-blur-xl" : "border-b border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          "container-page flex items-center justify-between gap-4 transition-[height] duration-300",
          scrolled ? "h-16" : "h-16 lg:h-[72px]",
        )}
      >
        <Link to="/" aria-label="Hostlify home" className="shrink-0 rounded-md">
          <Logo animated={animateLogo} />
        </Link>

        {!minimal && (
          <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex xl:gap-1">
            {[homeLink, null, ...mainNav].map((link) =>
              link === null ? (
                <MegaMenu key="features" active={pathname.startsWith("/features")} />
              ) : (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end={link.href === "/"}
                  className={({ isActive }) =>
                    cn(
                      "relative flex h-10 items-center rounded-md px-2 text-sm font-medium whitespace-nowrap transition-colors hover:text-brand-600 xl:px-3 xl:text-[15px]",
                      isActive ? "text-brand-600" : "text-gray-700",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <m.span
                          layoutId="nav-underline"
                          className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-brand-600 xl:inset-x-3"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ),
            )}
          </nav>
        )}

        <div className="flex items-center gap-2">
          {/* Log in is hidden until the app is live — flip site.features.login */}
          {!minimal && site.features.login && (
            <div className="hidden lg:block">
              <LoginMenu />
            </div>
          )}
          <Button
            href="/demo"
            size="sm"
            className={cn("h-10", !minimal && "hidden sm:inline-flex")}
            onClick={() => track("cta_click", { location: "header" })}
          >
            {headerCopy.cta}
          </Button>
          {!minimal && <MobileNav />}
        </div>
      </div>
    </m.header>
  );
}
