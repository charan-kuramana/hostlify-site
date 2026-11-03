import { site } from "@/content/site";

type MetaInput = { title: string; description: string; path: string; image?: string };

/** Builds the React Router `meta` array: title, description, canonical, Open Graph and Twitter. */
export function buildMeta({ title, description, path, image = "/og-image.jpg" }: MetaInput) {
  const url = `${site.url}${path === "/" ? "" : path}`;
  const img = image.startsWith("http") ? image : `${site.url}${image}`;
  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: site.name },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: img },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "Hostlify — hostel & PG management software" },
    { property: "og:locale", content: "en_IN" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: img },
  ];
}
