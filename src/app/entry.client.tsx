import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <HydratedRouter />
      </StrictMode>,
    );
  });
}

/**
 * Every page is pre-rendered, so the HTML is already complete and visible. Let the browser paint it first,
 * then hydrate — otherwise ~1s of hydration work can run before the first paint and delay FCP/LCP.
 * (rAF fires just before the next paint; the timeout queued from it runs right after that paint.)
 */
if (document.visibilityState === "hidden") {
  hydrate();
} else {
  requestAnimationFrame(() => setTimeout(hydrate, 0));
}
