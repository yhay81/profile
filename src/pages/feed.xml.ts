import type { APIRoute } from "astro";

import { PROFILE_NAME, PROFILE_URL } from "@/lib/site";
import { WRITING } from "@/lib/writing";

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

export const GET: APIRoute = () => {
  const latestDate = WRITING.at(0)?.date ?? "2026-07-21";
  const lastBuildDate = new Date(`${latestDate}T00:00:00Z`).toUTCString();
  const items = WRITING.map((entry) => {
    const url = entry.external ? entry.url : `${PROFILE_URL}${entry.url}`;

    return `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${new Date(`${entry.date}T00:00:00Z`).toUTCString()}</pubDate>
    </item>`;
  }).join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${PROFILE_NAME} — Writing</title>
    <link>${PROFILE_URL}/writing</link>
    <description>Articles and engineering notes published by ${PROFILE_NAME}.</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
};
