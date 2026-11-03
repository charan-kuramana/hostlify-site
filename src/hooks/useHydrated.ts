import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * false during pre-render and the hydration pass, true afterwards.
 * React's idiomatic way to render client-only values (storage, query params, dates) without hydration mismatches.
 */
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
