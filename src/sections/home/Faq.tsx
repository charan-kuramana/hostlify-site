import { m } from "motion/react";
import { MessageCircle } from "lucide-react";
import { faqCopy, homeFaqs } from "@/content/faqs";
import { whatsappHref } from "@/content/site";
import { fadeUp, viewport } from "@/lib/motion";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/components/seo/schemas";

/** §9.15 — FAQ: title + chat CTA on the left, accordion on the right. Emits FAQPage JSON-LD. */
export function Faq() {
  const wa = whatsappHref();
  return (
    <Section id="faq" theme="white">
      <JsonLd data={faqSchema(homeFaqs)} />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader eyebrow={faqCopy.eyebrow} title={faqCopy.title} align="left" className="mb-0 md:mb-0" />
          <m.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5"
          >
            <p className="font-semibold text-brand-900">{faqCopy.lead}</p>
            <Button
              href={wa || "/contact"}
              variant={wa ? "primary" : "outline"}
              className="mt-4"
              leftIcon={<MessageCircle aria-hidden="true" />}
              {...(wa ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              arrow
            >
              {wa ? faqCopy.chat : faqCopy.contact}
            </Button>
          </m.div>
        </div>
        <m.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ ...viewport, amount: 0.1 }}>
          <FaqAccordion items={homeFaqs} />
        </m.div>
      </div>
    </Section>
  );
}
