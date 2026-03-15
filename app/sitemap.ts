import { PROFILE_URL } from "@lib";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: PROFILE_URL,
    lastModified: new Date("2026-03-16"),
    changeFrequency: "monthly",
    priority: 1,
  },
];

export default sitemap;
