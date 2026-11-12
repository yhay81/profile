import type { APIRoute } from "astro";

import { TRUST_CONTROL_PLANE_ARTICLE } from "@/lib/articles";
import { HOME_DATE_MODIFIED, PROFILE_URL } from "@/lib/site";
import { WRITING } from "@/lib/writing";

const latestWritingDate = WRITING.at(0)?.date ?? "2026-07-25";

// Emit this static endpoint at the /sitemap.xml URL referenced by robots.txt.
const PAGES = [
  {
    path: "/",
    lastmod: HOME_DATE_MODIFIED,
    changefreq: "monthly",
    priority: "1.0",
  },
  {
    path: "/work",
    lastmod: "2026-11-12",
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    path: "/writing",
    lastmod: latestWritingDate,
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/trust-control-plane",
    lastmod: TRUST_CONTROL_PLANE_ARTICLE.dateModified.slice(0, 10),
    changefreq: "yearly",
    priority: "0.7",
  },
  {
    path: "/identity",
    lastmod: "2026-11-12",
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
    lastmod: "2026-11-12",
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
