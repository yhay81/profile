import { PROFILE_URL } from "@lib";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: PROFILE_URL,
    lastModified: new Date("2026-03-16"),
    changeFrequency: "monthly",
    priority: 1,
  },
  {
    url: `${PROFILE_URL}/keys`,
    lastModified: new Date("2026-07-13"),
    changeFrequency: "yearly",
    priority: 0.5,
  },
  {
    url: `${PROFILE_URL}/siwe`,
    lastModified: new Date("2026-07-14"),
    changeFrequency: "yearly",
    priority: 0.5,
  },
];

export default sitemap;
