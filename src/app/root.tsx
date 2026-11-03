import { m } from "motion/react";
import { useEffect } from "react";
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation, useNavigation } from "react-router";
import type { Route } from "./+types/root";
import "@/styles/globals.css";
import { headerCopy } from "@/content/nav";
import { Providers } from "@/providers/Providers";
import { AnnouncementBar, ANNOUNCEMENT_KEY } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions, ScrollProgressBar } from "@/components/layout/GlobalExtras";
import { NotFound } from "@/sections/NotFound";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0f2d4a" />
        {/* Hide the announcement bar before first paint for visitors who dismissed it (avoids a post-load layout shift) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{localStorage.getItem("${ANNOUNCEMENT_KEY}")==="1"&&document.documentElement.classList.add("ann-dismissed")}catch(e){}`,
          }}
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function NavProgress() {
  const navigation = useNavigation();
  const busy = navigation.state !== "idle";
  return (
    <m.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[80] h-0.5 origin-left bg-gradient-primary"
      initial={false}
      animate={{ scaleX: busy ? 0.7 : 0, opacity: busy ? 1 : 0 }}
      transition={{ duration: busy ? 2 : 0.2, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

/**
 * Becomes true after the first client render. The first (pre-rendered) page must paint immediately —
 * hiding it behind an entrance animation delays FCP/LCP until all JS has loaded. Only client-side
 * route changes get the page transition.
 */
let hasNavigated = false;

function Shell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  useEffect(() => {
    hasNavigated = true;
    // Start ambient decorative loops only once the page has loaded and the main thread is idle (see globals.css).
    const root = document.documentElement;
    const start = () => {
      const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
      idle(() => root.classList.add("ready"));
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);
  const reading = pathname.startsWith("/legal");
  return (
    <Providers>
      <a
        href="#main"
        className="sr-only z-[90] rounded-md bg-white px-4 py-2 font-semibold text-brand-700 shadow-lift focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {headerCopy.skip}
      </a>
      <NavProgress />
      {reading && <ScrollProgressBar />}
      <AnnouncementBar />
      <Header />
      <m.main
        id="main"
        key={pathname}
        tabIndex={-1}
        className="outline-none"
        initial={hasNavigated ? { opacity: 0, y: 12 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </m.main>
      <Footer />
      <FloatingActions />
    </Providers>
  );
}

export default function App() {
  return (
    <Shell>
      <Outlet />
    </Shell>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <Shell>
        <NotFound />
      </Shell>
    );
  }
  const message = error instanceof Error ? error.message : "Unknown error";
  return (
    <Shell>
      <div className="container-page section-y text-center">
        <h1 className="text-h1 font-bold">Something went wrong</h1>
        <p className="mt-4">{import.meta.env.DEV ? message : "Please refresh the page or try again later."}</p>
      </div>
    </Shell>
  );
}
