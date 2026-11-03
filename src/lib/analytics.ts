type EventName =
  | "cta_click"
  | "demo_form_start"
  | "demo_form_submit"
  | "audience_toggle"
  | "pricing_toggle"
  | "plan_cta_click"
  | "occupancy_demo_interact"
  | "video_play"
  | "whatsapp_click"
  | "app_signup_click"
  | "login_click";

type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

/** Fires an analytics event if an analytics script has been loaded (after consent). No-op otherwise. */
export function track(name: EventName, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", name, params);
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export function readUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const v = params.get(key);
    if (v) out[key] = v;
  }
  return out;
}
