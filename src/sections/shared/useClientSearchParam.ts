import { useSearchParams } from "react-router";
import { useHydrated } from "@/hooks/useHydrated";

/**
 * Reads a query param only after hydration. Pre-rendered HTML never has query params,
 * so reading them on the first client render would cause a hydration mismatch.
 */
export function useClientSearchParam(key: string) {
  const [params] = useSearchParams();
  const hydrated = useHydrated();
  return hydrated ? params.get(key) : null;
}
