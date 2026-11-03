import { data } from "react-router";
import type { Route } from "./+types/legal.$page";
import { buildMeta } from "@/components/seo/meta";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/components/seo/schemas";
import { legalPages, type LegalPage } from "@/content/legal";
import { common, legalCopy, seo } from "@/content/pages";
import { site } from "@/content/site";
import { LegalArticle } from "@/sections/legal/LegalArticle";
import { Breadcrumbs } from "@/sections/shared/Breadcrumbs";
import { PageHero } from "@/sections/shared/PageHero";

/** Runs at build time for each pre-rendered /legal/:page path. Unknown slugs → 404. */
export function loader({ params }: Route.LoaderArgs) {
  const page: LegalPage | undefined = legalPages.find((p) => p.slug === params.page);
  if (!page) throw data(null, { status: 404 });
  return { page };
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
  if (!loaderData) return [{ title: seo.notFound.title }];
  const { page } = loaderData;
  return buildMeta({ title: `${page.title} — ${site.name}`, description: page.description, path: `/legal/${page.slug}` });
};

export default function LegalRoute({ loaderData }: Route.ComponentProps) {
  const { page } = loaderData;
  const crumbs = [
    { name: common.crumbs.home, path: "/" },
    { name: page.title, path: `/legal/${page.slug}` },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        compact
        before={<Breadcrumbs items={crumbs} className="justify-center" />}
        eyebrow={legalCopy.eyebrow}
        title={page.title}
        lead={page.description}
      />
      <LegalArticle page={page} />
    </>
  );
}
