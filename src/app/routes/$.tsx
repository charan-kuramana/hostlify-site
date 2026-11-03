import { NotFound } from "@/sections/NotFound";
import { buildMeta } from "@/components/seo/meta";
import { seo } from "@/content/pages";

export const meta = () => [...buildMeta({ ...seo.notFound, path: "/404" }), { name: "robots", content: "noindex" }];

export default function CatchAll() {
  return <NotFound />;
}
