import { Link } from "react-router";
import { notFound } from "@/content/not-found";
import { Button } from "@/components/ui/Button";
import { VacantRoomIllustration } from "@/components/illustrations/VacantRoomIllustration";

export function NotFound() {
  return (
    <section className="relative overflow-x-clip">
      <div className="absolute inset-0 bg-dot-grid" aria-hidden="true" />
      <div className="relative container-page flex min-h-[70svh] flex-col items-center justify-center section-y text-center">
        <VacantRoomIllustration title={notFound.illustration} className="enter-visual w-full max-w-[420px]" />
        <p className="mt-6 font-mono text-sm font-medium text-brand-600">404</p>
        <h1 className="mt-2 text-h1 font-bold">{notFound.title}</h1>
        <p className="mt-4 max-w-md text-lead">{notFound.body}</p>
        <ul className="mt-6 flex flex-wrap justify-center gap-2">
          {notFound.links.map((l) => (
            <li key={l.href}>
              <Link
                to={l.href}
                className="inline-flex min-h-11 items-center rounded-full border border-gray-200 bg-white px-4 text-sm font-medium text-brand-900 hover:border-brand-300 hover:bg-brand-50"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Button href="/" className="mt-8" arrow>
          {notFound.home}
        </Button>
      </div>
    </section>
  );
}
