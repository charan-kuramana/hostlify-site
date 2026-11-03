import { CalendarDays, Mail, TriangleAlert } from "lucide-react";
import { Link } from "react-router";
import { legalNotice, legalPages, type LegalPage } from "@/content/legal";
import { legalCopy } from "@/content/pages";
import { site } from "@/content/site";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Readable legal article with a desktop table of contents. */
export function LegalArticle({ page }: { page: LegalPage }) {
  const sections = page.sections.map((s) => ({ ...s, id: slugify(s.heading) }));
  const others = legalPages.filter((p) => p.slug !== page.slug);

  return (
    <section className="relative pb-16 md:pb-24">
      <div className="container-page grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
        <aside className="hidden lg:block">
          <nav aria-label={legalCopy.onThisPage} className="sticky top-28">
            <p className="mb-3 text-eyebrow font-semibold text-gray-500 uppercase">{legalCopy.onThisPage}</p>
            <ul className="space-y-1 border-l border-gray-200">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-gray-600 transition-colors hover:border-brand-500 hover:text-brand-700"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className="max-w-[65ch] min-w-0">
          <div role="note" className="flex gap-3 rounded-xl border border-warning-500/30 bg-warning-100/60 p-4 text-sm text-warning-600">
            <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <p>{legalNotice}</p>
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-gray-500">
            <CalendarDays className="size-4" aria-hidden="true" />
            {legalCopy.updated}: <time>{page.updated}</time>
          </p>

          <div className="mt-4">
            {sections.map((s) => (
              <section
                key={s.id}
                id={s.id}
                aria-labelledby={`${s.id}-h`}
                className="mt-8 scroll-mt-28 border-t border-gray-100 pt-8 first:mt-6 first:border-0 first:pt-0"
              >
                <h2 id={`${s.id}-h`} className="text-h3 font-bold">
                  {s.heading}
                </h2>
                <div className="mt-3 space-y-4 text-[17px] leading-relaxed text-gray-700">
                  {s.body.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-h4 font-bold">{legalCopy.questionsTitle}</h2>
            <p className="mt-1 text-[15px]">{legalCopy.questionsBody}</p>
            <a
              href={`mailto:${site.contact.email}`}
              className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-brand-600 hover:text-brand-700"
            >
              <Mail className="size-4" aria-hidden="true" />
              {site.contact.email}
            </a>
          </div>

          <nav aria-label={legalCopy.otherPolicies} className="mt-10">
            <h2 className="text-eyebrow font-semibold text-gray-500 uppercase">{legalCopy.otherPolicies}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/legal/${p.slug}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-gray-200 bg-white px-4 text-sm font-medium text-brand-900 hover:border-brand-300 hover:bg-brand-50"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </article>
      </div>
    </section>
  );
}
