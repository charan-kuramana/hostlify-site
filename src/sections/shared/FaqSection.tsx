import { Section } from "@/components/layout/Section";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/components/seo/schemas";

type FaqSectionProps = {
  eyebrow?: string;
  title: string;
  lead?: React.ReactNode;
  items: readonly { id: string; q: string; a: string }[];
  theme?: "white" | "gray" | "tint";
  /** Emit FAQPage JSON-LD (only once per page) */
  schema?: boolean;
  id?: string;
};

/** Section header + accordion, with optional FAQPage structured data. */
export function FaqSection({ eyebrow, title, lead, items, theme = "white", schema = true, id }: FaqSectionProps) {
  return (
    <Section theme={theme} id={id}>
      {schema && <JsonLd data={faqSchema(items)} />}
      <SectionHeader eyebrow={eyebrow} title={title} lead={lead} />
      <div className="mx-auto max-w-3xl">
        <FaqAccordion items={items} defaultOpen={items[0]?.id} />
      </div>
    </Section>
  );
}
