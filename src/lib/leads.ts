import { z } from "zod";
import { leadForm } from "@/content/pages";
import { site } from "@/content/site";
import { env } from "./env";
import { readUtm } from "./analytics";

// Our Content-Security-Policy blocks eval; tell zod not to probe for it (avoids a CSP violation, same behaviour).
z.config({ jitless: true });

const e = leadForm.errors;

export const leadSchema = z.object({
  name: z.string().trim().min(2, e.name),
  phone: z
    .string()
    .transform((v) => v.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, ""))
    .pipe(z.string().regex(/^[6-9]\d{9}$/, e.phone)),
  email: z.union([z.literal(""), z.email(e.email)]),
  hostel: z.string().trim().min(2, e.hostel),
  city: z.string().trim().min(2, e.city),
  beds: z.string().min(1, e.beds),
  hostels: z.string().optional(),
  collect: z.string().optional(),
  message: z.string().optional(),
  /** honeypot — must stay empty */
  company: z.string().max(0).optional(),
});

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;

export type LeadSource = "demo" | "contact" | "for-owners";

/** "sent" = delivered to a backend; "mailto" = handed to the visitor's email app (they still need to press Send). */
export type SubmitResult = "sent" | "mailto";

const TIMEOUT_MS = 15_000;

async function postJson(url: string, body: Record<string, unknown>) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Lead submit failed: ${res.status}`);
    return res;
  } finally {
    window.clearTimeout(timer);
  }
}

/**
 * Sends a lead, in order of preference:
 *  1. VITE_LEAD_ENDPOINT — your own API (e.g. hostlify-api /public/leads), JSON POST
 *  2. VITE_WEB3FORMS_KEY — Web3Forms emails the lead to the inbox the key was created for
 *  3. Fallback — opens a pre-filled email to the sales inbox so no enquiry is silently lost
 * Throws on network/server errors or timeout so the form can show its error + retry state.
 */
export async function submitLead(lead: Lead, source: LeadSource): Promise<SubmitResult> {
  if (lead.company) return "sent"; // honeypot filled: pretend success, send nothing
  const payload: Record<string, string> = { ...readUtm(), source, page: window.location.pathname };
  for (const [k, v] of Object.entries(lead)) if (k !== "company" && v) payload[k] = String(v);
  const subject = `Hostlify ${source} request — ${lead.hostel} (${lead.city})`;

  if (env.leadEndpoint) {
    await postJson(env.leadEndpoint, payload);
    return "sent";
  }

  if (env.web3formsKey) {
    const res = await postJson("https://api.web3forms.com/submit", {
      access_key: env.web3formsKey,
      subject,
      from_name: "Hostlify website",
      botcheck: "",
      ...payload,
    });
    const json = (await res.json().catch(() => ({}))) as { success?: boolean };
    if (json.success === false) throw new Error("Lead submit rejected");
    return "sent";
  }

  const body = Object.entries(payload)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return "mailto";
}
