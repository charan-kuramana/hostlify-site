import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { contactPage } from "@/content/pages";
import { site, whatsappHref } from "@/content/site";
import { track } from "@/lib/analytics";

type Detail = { id: string; label: string; value: string; href?: string; icon: React.ReactNode; external?: boolean; onClick?: () => void };

/** Contact details card — phone, WhatsApp and address only appear when they're configured. */
export function ContactDetails() {
  const { contact } = site;
  const wa = whatsappHref();
  const d = contactPage.details;
  const items: Detail[] = [
    {
      id: "email",
      label: d.email,
      value: contact.email,
      href: `mailto:${contact.email}`,
      icon: <Mail className="size-5" aria-hidden="true" />,
    },
  ];
  if (contact.phone)
    items.push({
      id: "phone",
      label: d.phone,
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, "")}`,
      icon: <Phone className="size-5" aria-hidden="true" />,
    });
  if (wa)
    items.push({
      id: "whatsapp",
      label: d.whatsapp,
      value: contactPage.whatsappCta,
      href: wa,
      external: true,
      icon: <MessageCircle className="size-5" aria-hidden="true" />,
      onClick: () => track("whatsapp_click", { location: "contact_details" }),
    });
  if (contact.address)
    items.push({ id: "address", label: d.address, value: contact.address, icon: <MapPin className="size-5" aria-hidden="true" /> });
  items.push({ id: "hours", label: d.hours, value: contact.hours, icon: <Clock className="size-5" aria-hidden="true" /> });

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-card sm:p-7">
      <h2 className="text-h3 font-bold">{contactPage.detailsTitle}</h2>
      <dl className="mt-6 space-y-5">
        {items.map((it) => (
          // A <dl> group may only contain <dt>/<dd>, so the icon lives inside the <dt> (positioned in the left gutter).
          <div key={it.id} className="relative min-h-11 min-w-0 pl-15">
            <dt className="text-sm text-gray-600">
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 grid size-11 place-items-center rounded-xl bg-brand-100 text-brand-600"
              >
                {it.icon}
              </span>
              {it.label}
            </dt>
            <dd className="mt-0.5 font-medium break-words text-brand-900">
              {it.href ? (
                <a
                  href={it.href}
                  onClick={it.onClick}
                  {...(it.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="underline-offset-4 hover:text-brand-600 hover:underline"
                >
                  {it.value}
                </a>
              ) : (
                it.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
