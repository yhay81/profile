import type { APIRoute } from "astro";

import { PROFILE_URL } from "@/lib/site";

// robots.txt が /sitemap.xml を参照しているため、この名前で静的生成する
const PAGES = [
  { path: "/", lastmod: "2026-07-14", changefreq: "monthly", priority: "1.0" },
  {
    path: "/identity",
    lastmod: "2026-07-14",
    changefreq: "yearly",
    priority: "0.8",
  },
  {
    path: "/integrity",
    lastmod: "2026-07-14",
    changefreq: "weekly",
    priority: "0.8",
  },
  {
    path: "/keys",
    lastmod: "2026-07-14",
    changefreq: "yearly",
    priority: "0.5",
  },
  {
    path: "/proofs",
    lastmod: "2026-07-14",
    changefreq: "yearly",
    priority: "0.5",
  },
  {
    path: "/siwe",
    lastmod: "2026-07-14",
    changefreq: "yearly",
    priority: "0.5",
  },
] as const;

export const GET: APIRoute = () => {
  const urls = PAGES.map(
    (page) => `  <url>
    <loc>${PROFILE_URL}${page.path === "/" ? "" : page.path}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  ).join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
};
