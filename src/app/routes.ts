import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("features", "routes/features._index.tsx"),
  route("features/:module", "routes/features.$module.tsx"),
  route("for-owners", "routes/for-owners.tsx"),
  route("for-residents", "routes/for-residents.tsx"),
  route("pricing", "routes/pricing.tsx"),
  route("how-it-works", "routes/how-it-works.tsx"),
  route("about", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),
  // /demo is retired for now (no scheduler yet) — "Book a demo" CTAs go to /contact and public/_redirects sends /demo there.
  // To restore: uncomment, add "/demo" back to react-router.config.ts prerender, and remove the _redirects rule.
  // route("demo", "routes/demo.tsx"),
  route("legal/:page", "routes/legal.$page.tsx"),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
