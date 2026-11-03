// Minimal static server for the pre-rendered build: /about → about/index.html, unknown → 404.html (status 404).
// Mirrors a production static host: brotli/gzip compression and immutable caching for hashed assets.
// (`vite preview` falls back to the home page HTML for every route, which breaks hydration of pre-rendered pages.)
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize, sep } from "node:path";
import { brotliCompressSync, gzipSync, constants } from "node:zlib";

const root = join(process.cwd(), "build", "client");
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".data": "text/x-script",
};
const compressible = new Set([".html", ".js", ".css", ".svg", ".json", ".xml", ".txt", ".data"]);
const cache = new Map();

function resolve(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
  const candidates = [join(root, clean), join(root, clean, "index.html"), join(root, `${clean}.html`)];
  return candidates.find((p) => p.startsWith(root) && existsSync(p) && statSync(p).isFile());
}

function encoded(path, encoding) {
  const key = `${path}|${encoding}|${statSync(path).mtimeMs}`;
  if (!cache.has(key)) {
    const raw = readFileSync(path);
    const body =
      encoding === "br"
        ? brotliCompressSync(raw, { params: { [constants.BROTLI_PARAM_QUALITY]: 9 } })
        : encoding === "gzip"
          ? gzipSync(raw, { level: 9 })
          : raw;
    cache.set(key, body);
  }
  return cache.get(key);
}

createServer((req, res) => {
  const file = resolve(req.url ?? "/");
  const status = file ? 200 : 404;
  const path = file ?? join(root, "404.html");
  const ext = extname(path);
  const accept = String(req.headers["accept-encoding"] ?? "");
  const encoding = !compressible.has(ext) ? "" : accept.includes("br") ? "br" : accept.includes("gzip") ? "gzip" : "";
  const headers = {
    "Content-Type": types[ext] ?? "application/octet-stream",
    "Cache-Control": path.includes(`${sep}assets${sep}`) ? "public, max-age=31536000, immutable" : "public, max-age=0, must-revalidate",
    Vary: "Accept-Encoding",
  };
  if (encoding) headers["Content-Encoding"] = encoding;
  res.writeHead(status, headers);
  res.end(encoded(path, encoding));
}).listen(port, () => console.log(`Serving build/client at http://localhost:${port}`));
