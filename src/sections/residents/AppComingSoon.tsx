import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { forResidents } from "@/content/pages";
import { Badge } from "@/components/ui/Badge";

/** Shown in place of the hostel search while the resident app isn't live (site.features.residentApp = false). */
export function AppComingSoon() {
  const c = forResidents.appSoon;
  return (
    <div className="mt-8 max-w-xl rounded-2xl border border-accent-100 bg-white/90 p-5 shadow-card">
      <Badge tone="accent">{c.badge}</Badge>
      <p className="mt-3 text-gray-700">{c.text}</p>
      <Link
        to={c.cta.href}
        className="group mt-3 inline-flex min-h-11 items-center gap-1.5 font-semibold text-accent-600 underline-offset-4 hover:underline"
      >
        {c.cta.label}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </div>
  );
}
