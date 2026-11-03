import { ChevronDown, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { footerNav } from "@/content/nav";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/icons/Logo";

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const cls = "inline-flex min-h-9 items-center text-sm text-gray-400 transition-colors hover:text-white";
  return href.startsWith("http") ? (
    <a href={href} className={cls}>
      {children}
    </a>
  ) : (
    <Link to={href} className={cls}>
      {children}
    </Link>
  );
}

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  const id = `footer-${title.toLowerCase()}`;
  return (
    <div className="border-b border-white/10 md:border-0">
      <h2 className="text-sm font-semibold text-white">
        <button
          type="button"
          className="flex min-h-12 w-full items-center justify-between md:pointer-events-none md:min-h-0"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
        >
          {title}
          <ChevronDown className={cn("size-4 text-gray-500 transition-transform md:hidden", open && "rotate-180")} aria-hidden="true" />
        </button>
      </h2>
      <ul id={id} className={cn("pb-3 md:mt-4 md:block md:pb-0", open ? "block" : "hidden")}>
        {links.map((l) => (
          <li key={l.label}>
            <FooterLink href={l.href}>{l.label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="cv-auto bg-gray-950 text-gray-400">
      <div className="container-page py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)] md:gap-8">
          <div>
            <Link to="/" aria-label="Hostlify home" className="inline-block rounded-md">
              <Logo theme="dark" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">{site.oneLiner}</p>
            <ul className="mt-6 space-y-1 text-sm">
              <li>
                <a href={`mailto:${site.contact.email}`} className="inline-flex min-h-9 items-center gap-2 hover:text-white">
                  <Mail className="size-4" aria-hidden="true" />
                  {site.contact.email}
                </a>
              </li>
              {site.contact.phone && (
                <li>
                  <a href={`tel:${site.contact.phone}`} className="inline-flex min-h-9 items-center gap-2 hover:text-white">
                    <Phone className="size-4" aria-hidden="true" />
                    {site.contact.phone}
                  </a>
                </li>
              )}
            </ul>
          </div>
          <nav aria-label="Footer" className="contents">
            {footerNav.map((col) => (
              <FooterColumn key={col.title} title={col.title} links={col.links} />
            ))}
          </nav>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>{site.copyright}</p>
          <p>{site.madeIn}</p>
        </div>
      </div>
    </footer>
  );
}
