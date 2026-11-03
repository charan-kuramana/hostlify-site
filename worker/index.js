// Cloudflare Worker in front of the static assets — runs ONLY for /hero/* (see run_worker_first in wrangler.toml).
// Static assets don't answer HTTP Range requests, but Safari (iPhone/iPad/Mac) requires 206 Partial Content to play
// <video>. This adds byte-range support for the hero film; every other path is served directly by the asset server.

export default {
  /** @param {Request} request @param {{ ASSETS: { fetch: (r: Request) => Promise<Response> } }} env */
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const range = request.headers.get("Range");
    if (response.status !== 200) return response;

    const headers = new Headers(response.headers);
    headers.set("Accept-Ranges", "bytes");
    headers.set("Cache-Control", "public, max-age=604800");
    if (!range) return new Response(response.body, { status: 200, headers });

    const match = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
    if (!match || (match[1] === "" && match[2] === "")) return new Response(response.body, { status: 200, headers });

    const body = await response.arrayBuffer();
    const size = body.byteLength;
    const start = match[1] === "" ? Math.max(0, size - Number(match[2])) : Number(match[1]);
    const end = match[1] === "" || match[2] === "" ? size - 1 : Math.min(Number(match[2]), size - 1);
    if (start >= size || start > end) {
      return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}`, "Accept-Ranges": "bytes" } });
    }

    headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
    headers.set("Content-Length", String(end - start + 1));
    headers.delete("Content-Encoding");
    return new Response(body.slice(start, end + 1), { status: 206, headers });
  },
};
