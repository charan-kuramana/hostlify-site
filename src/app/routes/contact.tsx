import type { Route } from "./+types/contact";
import { buildMeta } from "@/components/seo/meta";
import { contactPage, seo } from "@/content/pages";
import { ContactSection } from "@/sections/contact/ContactSection";
import { PageHero } from "@/sections/shared/PageHero";

export const meta: Route.MetaFunction = () => buildMeta({ ...seo.contact, path: "/contact" });

export default function ContactPage() {
  return (
    <>
      <PageHero compact eyebrow={contactPage.eyebrow} title={contactPage.title} lead={contactPage.lead} />
      <ContactSection />
    </>
  );
}
