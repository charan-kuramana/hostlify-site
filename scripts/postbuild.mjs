// Writes sitemap.xml (from the pre-rendered HTML files) and a real 404.html after `react-router build`.
import { readdirSync, statSync, writeFileSync, copyFileSync, existsSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const out = "build/client";
const site = (process.env.VITE_SITE_URL || "https://hostlify.in").replace(/\/$/, "");

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const pages = walk(out)
  .filter((f) => f.endsWith("index.html") && !f.includes(`404${sep}`))
  .map((f) => "/" + relative(out, f).split(sep).slice(0, -1).join("/"))
  .sort();

const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${site}${p === "/" ? "/" : p}</loc><lastmod>${today}</lastmod><priority>${p === "/" ? "1.0" : "0.8"}</priority></url>`).join("\n")}
</urlset>
`;
writeFileSync(join(out, "sitemap.xml"), xml);

const robots = join(out, "robots.txt");
if (existsSync(robots)) writeFileSync(robots, readFileSync(robots, "utf8").replace(/Sitemap: .*/, `Sitemap: ${site}/sitemap.xml`));

// Static hosts (Netlify, Cloudflare Pages, Vercel) serve 404.html with a 404 status.
const notFound = join(out, "404", "index.html");
const fallback = existsSync(notFound) ? notFound : join(out, "__spa-fallback.html");
if (existsSync(fallback)) copyFileSync(fallback, join(out, "404.html"));

console.log(`postbuild: sitemap.xml with ${pages.length} URLs, 404.html written`);

// Inline the (single, ~18 KB compressed) stylesheet into every pre-rendered page: removes a render-blocking
// round trip before first paint. Hashed asset URLs inside the CSS are absolute (/assets/...), so they still resolve.
let inlined = 0;
for (const file of walk(out).filter((f) => f.endsWith(".html"))) {
  const html = readFileSync(file, "utf8");
  const next = html.replace(/<link rel="stylesheet" href="(\/assets\/[^"]+\.css)"\s*\/?>/g, (tag, href) => {
    const cssPath = join(out, href);
    if (!existsSync(cssPath)) return tag;
    inlined++;
    // Keep the <link> (React hydrates <head>; extra tags like this <style> are skipped) but make it non-blocking.
    const css = readFileSync(cssPath, "utf8").replace(/<\/style/gi, "<\\/style");
    return `<style data-inline-css>${css}</style><link rel="stylesheet" href="${href}" media="print" onload="this.media='all'"/>`;
  });
  if (next !== html) writeFileSync(file, next);
}
console.log(`postbuild: inlined CSS into ${inlined} page(s)`);

// Start downloading JS *after* the first paint. Every page is pre-rendered and fully visible without JS, so the
// app bundle (React + router + page chunks) shouldn't compete with the HTML/CSS/fonts needed for first paint.
//  - <link rel="modulepreload"> → inert rel="x-modulepreload"; the loader re-issues them as real modulepreloads
//  - the bootstrap <script type="module"> becomes inert; the loader runs it once first paint has happened
// React 19 ignores attribute differences when hydrating and skips the extra loader <script> in <head>.
const loader = `<script>(function(){var d=0;function go(){if(d)return;d=1;document.querySelectorAll('link[rel="x-modulepreload"]').forEach(function(l){var p=document.createElement("link");p.rel="modulepreload";p.href=l.getAttribute("href");document.head.appendChild(p)});var s=document.querySelector('script[type="text/x-deferred-module"]');if(!s)return;var n=document.createElement("script");n.type="module";n.textContent=s.textContent;document.body.appendChild(n)}try{new PerformanceObserver(function(l){if(l.getEntriesByName("first-contentful-paint").length)setTimeout(go,0)}).observe({type:"paint",buffered:true})}catch(e){}addEventListener("pointerdown",go,{once:true,passive:true});addEventListener("keydown",go,{once:true});setTimeout(go,2500)})()</script>`;
let deferred = 0;
for (const file of walk(out).filter((f) => f.endsWith(".html"))) {
  const html = readFileSync(file, "utf8");
  if (!html.includes('<script type="module" async="">')) continue;
  const next = html
    .replace(/<link rel="modulepreload" href="([^"]+)"\/>/g, '<link rel="x-modulepreload" href="$1"/>')
    .replace('<script type="module" async="">', '<script type="text/x-deferred-module">')
    .replace("</head>", `${loader}</head>`);
  writeFileSync(file, next);
  deferred++;
}
console.log(`postbuild: deferred JS bootstrap until first paint on ${deferred} page(s)`);
