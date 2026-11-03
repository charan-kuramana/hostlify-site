import { LocateFixed, MapPin } from "lucide-react";
import { useId, useState } from "react";
import { forResidents } from "@/content/pages";
import { site } from "@/content/site";
import { track } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";

type GeoStatus = "idle" | "locating" | "error" | "unsupported";

const discoverUrl = (params?: Record<string, string>) => {
  const qs = params ? new URLSearchParams(params).toString() : "";
  return qs ? `${site.links.discover}?${qs}` : site.links.discover;
};

/**
 * Location search that deep-links into the app's discovery page.
 * Works without JS as a plain GET form; with JS it also offers "Use my location".
 */
export function LocationSearch() {
  const id = useId();
  const [query, setQuery] = useState("");
  const [geo, setGeo] = useState<GeoStatus>("idle");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = query.trim();
    track("cta_click", { location: "residents_search" });
    window.location.assign(discoverUrl(q ? { q } : undefined));
  };

  const useMyLocation = () => {
    if (!("geolocation" in navigator)) {
      setGeo("unsupported");
      return;
    }
    setGeo("locating");
    track("cta_click", { location: "residents_geolocate" });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        window.location.assign(discoverUrl({ lat: pos.coords.latitude.toFixed(5), lng: pos.coords.longitude.toFixed(5) }));
      },
      () => setGeo("error"),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    );
  };

  const message =
    geo === "locating"
      ? forResidents.locating
      : geo === "error"
        ? forResidents.locationError
        : geo === "unsupported"
          ? forResidents.locationUnsupported
          : "";

  return (
    <div className="mt-8 max-w-xl">
      <form role="search" action={site.links.discover} method="get" onSubmit={onSubmit}>
        <label htmlFor={id} className="mb-2 block text-sm font-semibold text-brand-900">
          {forResidents.searchLabel}
        </label>
        <div className="flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-float focus-within:border-accent-500 focus-within:ring-3 focus-within:ring-accent-100 sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-1 items-center gap-2 px-2">
            <MapPin className="size-5 shrink-0 text-accent-600" aria-hidden="true" />
            <input
              id={id}
              name="q"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={forResidents.searchPlaceholder}
              autoComplete="address-level2"
              enterKeyHint="search"
              className="h-12 w-full min-w-0 bg-transparent text-base text-brand-900 placeholder:text-gray-400 focus:outline-none"
            />
          </div>
          <Button type="submit" variant="accent" size="lg" className="rounded-xl" arrow>
            {forResidents.searchCta}
          </Button>
        </div>
      </form>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <button
          type="button"
          onClick={useMyLocation}
          disabled={geo === "locating"}
          className="inline-flex min-h-11 items-center gap-2 rounded-md px-1 text-sm font-semibold text-accent-600 transition-colors hover:text-accent-500 disabled:opacity-60"
        >
          <LocateFixed className={geo === "locating" ? "size-4 motion-safe:animate-spin" : "size-4"} aria-hidden="true" />
          {forResidents.useLocation}
        </button>
        <span className="text-xs text-gray-500">{forResidents.heroNote}</span>
      </div>
      <p aria-live="polite" className="min-h-5 text-sm text-gray-600">
        {message}
      </p>
    </div>
  );
}
