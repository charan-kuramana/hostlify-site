import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { cn } from "@/lib/cn";

type Crumb = { name: string; path: string };

/** Visible breadcrumb trail; the last item is the current page. Pair with breadcrumbSchema JSON-LD. */
export function Breadcrumbs({ items, className }: { items: readonly Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn("flex flex-wrap items-center gap-1 text-sm text-gray-500", className)}>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1">
              {last ? (
                <span aria-current="page" className="font-medium text-brand-900">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link to={item.path} className="inline-flex min-h-8 items-center rounded-sm hover:text-brand-600">
                    {item.name}
                  </Link>
                  <ChevronRight className="size-3.5 text-gray-400" aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
