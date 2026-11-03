export const env = {
  appUrl: import.meta.env.VITE_APP_URL ?? "https://app.hostlify.in",
  siteUrl: import.meta.env.VITE_SITE_URL ?? "https://hostlify.in",
  leadEndpoint: import.meta.env.VITE_LEAD_ENDPOINT ?? "",
  /** Web3Forms access key (public by design) — emails each lead to the inbox it was created with. */
  web3formsKey: import.meta.env.VITE_WEB3FORMS_KEY ?? "2201125f-4f72-4ec9-9cd9-48a4e82c9fa6",
  calLink: import.meta.env.VITE_CAL_LINK ?? "",
  /** Sales WhatsApp (country code + number, no +). Used only for wa.me chat links — never displayed as a phone number. */
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER ?? "919908176754",
} as const;
