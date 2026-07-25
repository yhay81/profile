/* global AbortSignal, fetch, process */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_PATH = resolve(ROOT, "src/data/zenn-writing.json");
const FEED_URL = "https://zenn.dev/yhay81/feed?all=1";
const ALLOWED_URL =
  /^https:\/\/zenn\.dev\/yhay81\/(?:articles|books)\/[a-z0-9_-]+$/u;

const decodeXml = (value) =>
  value
    .replace(/^<!\[CDATA\[|\]\]>$/gu, "")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replace(/&#(\d+);/gu, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/giu, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .trim();

const readTag = (xml, tag) => {
  const match = xml.match(
    new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "u"),
  );
  if (!match) throw new Error(`Missing <${tag}> in Zenn feed item`);
  return decodeXml(match[1]);
};

const response = await fetch(FEED_URL, {
  headers: {
    Accept: "application/rss+xml, application/xml;q=0.9",
    "User-Agent": "yhay81-profile-writing-sync/1.0",
  },
  signal: AbortSignal.timeout(15_000),
});
if (!response.ok) {
  throw new Error(`Zenn feed request failed: ${response.status}`);
}

const feed = await response.text();
const items = [...feed.matchAll(/<item>([\s\S]*?)<\/item>/gu)];
if (items.length === 0 || items.length > 200) {
  throw new Error(`Unexpected Zenn feed item count: ${items.length}`);
}

const seen = new Set();
const entries = items.map(([, item]) => {
  const title = readTag(item, "title");
  const url = readTag(item, "link");
  const publishedAt = new Date(readTag(item, "pubDate"));

  if (title.length === 0 || title.length > 300) {
    throw new Error(`Unexpected Zenn title length for ${url}`);
  }
  if (!ALLOWED_URL.test(url)) {
    throw new Error(`Unexpected Zenn URL: ${url}`);
  }
  if (Number.isNaN(publishedAt.valueOf())) {
    throw new Error(`Invalid Zenn publication date for ${url}`);
  }
  if (seen.has(url)) throw new Error(`Duplicate Zenn URL: ${url}`);
  seen.add(url);

  return {
    date: publishedAt.toISOString().slice(0, 10),
    title,
    url,
    external: true,
  };
});

const snapshot = `${JSON.stringify(
  {
    source: FEED_URL,
    entries,
  },
  null,
  2,
)}\n`;

await mkdir(dirname(OUTPUT_PATH), { recursive: true });
await writeFile(OUTPUT_PATH, snapshot, "utf8");
process.stdout.write(
  `Synced ${entries.length} Zenn entries from ${FEED_URL}\n`,
);
