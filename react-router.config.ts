import type { Config } from "@react-router/dev/config";
import { featureModules } from "./src/content/features";
import { legalPages } from "./src/content/legal";

export default {
  appDirectory: "src/app",
  ssr: false,
  async prerender() {
    return [
      "/",
      "/features",
      ...featureModules.map((m) => `/features/${m.slug}`),
      "/for-owners",
      "/for-residents",
      "/pricing",
      "/how-it-works",
      "/about",
      "/contact",
      ...legalPages.map((p) => `/legal/${p.slug}`),
      "/404",
    ];
  },
} satisfies Config;
