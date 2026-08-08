/* global AbortSignal, fetch, process, URL */

import { readdir, readFile } from "node:fs/promises";
import { join, relative, resolve, sep } from "node:path";
import { parseArgs } from "node:util";

const DEFAULT_BASE_URL = "https://yusuke-hayashi.com";
const CONCURRENCY = 6;
const TIMEOUT_MS = 20_000;
const USER_AGENT = "yhay81-profile-link-check/1.0";

// Hosts that answer automated requests with a bot-defence status instead of the
// resource. Their reachability cannot be established from CI, so they are
// reported separately rather than counted as broken.
const UNVERIFIABLE_HOSTS = new Set(["www.linkedin.com", "linkedin.com"]);

const toPosix = (value) => value.split(sep).join("/");

function usage() {
  return `Usage: check-links [options]

Verifies every external link published by the site. Site-owned bytes are
already covered by verify-release.mjs, so only cross-origin destinations are
requested here.

Options:
  --artifact-dir <path>   Read pages from a local build directory
  --base-url <url>        Read pages from a deployment (default: ${DEFAULT_BASE_URL})
  --help                  Show this help
`;
}

function options() {
  const { values } = parseArgs({
    options: {
      "artifact-dir": { type: "string" },
      "base-url": { type: "string" },
      help: { type: "boolean" },
    },
    strict: true,
  });
  return {
    artifactDir: values["artifact-dir"],
    baseUrl: values["base-url"] || DEFAULT_BASE_URL,
    help: values.help || false,
  };
}

async function walk(root, directory = root) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(root, absolute)));
    else if (entry.isFile()) files.push(toPosix(relative(root, absolute)));
  }
  return files.sort();
}

async function localPages(artifactDir) {
  const files = (await walk(artifactDir)).filter((file) =>
    file.endsWith(".html"),
  );
  return Promise.all(
    files.map(async (file) => ({
      page: `/${file}`,
      html: await readFile(join(artifactDir, file), "utf8"),
    })),
  );
}

async function deployedPages(baseUrl) {
  const origin = `${baseUrl.replace(/\/$/, "")}/`;
  const response = await fetch(new URL(".well-known/release.json", origin), {
    headers: { "Cache-Control": "no-cache", "User-Agent": USER_AGENT },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`release.json returned HTTP ${response.status}`);
  }
  const manifest = await response.json();
  const entries = manifest.assetSet.entries.filter((entry) =>
    entry.file.endsWith(".html"),
  );
  return Promise.all(
    entries.map(async (entry) => {
      const page = await fetch(new URL(entry.path, origin), {
        headers: { "Cache-Control": "no-cache", "User-Agent": USER_AGENT },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      // The 404 document is served with its own status by design.
      if (!page.ok && page.status !== 404) {
        throw new Error(`${entry.path} returned HTTP ${page.status}`);
      }
      return { page: entry.path, html: await page.text() };
    }),
  );
}

function externalLinks(pages, siteOrigin) {
  const found = new Map();
  for (const { page, html } of pages) {
    for (const match of html.matchAll(
      /\b(?:href|src)=["'](https?:\/\/[^"']+)["']/gi,
    )) {
      let url;
      try {
        url = new URL(match[1]);
      } catch {
        continue;
      }
      if (url.origin === siteOrigin) continue;
      const key = url.href;
      if (!found.has(key)) found.set(key, new Set());
      found.get(key).add(page);
    }
  }
  return [...found.entries()]
    .map(([url, pageSet]) => ({ url, pages: [...pageSet].sort() }))
    .sort((left, right) => left.url.localeCompare(right.url));
}

async function requestOnce(url) {
  const response = await fetch(url, {
    redirect: "follow",
    headers: { "User-Agent": USER_AGENT, Accept: "*/*" },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  return response.status;
}

async function checkLink(link) {
  const host = new URL(link.url).hostname;
  let status;
  let error;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      status = await requestOnce(link.url);
      error = undefined;
      if (status < 400) break;
    } catch (cause) {
      status = undefined;
      error = cause instanceof Error ? cause.message : String(cause);
    }
  }

  if (status !== undefined && status < 400) {
    return { ...link, state: "ok", detail: String(status) };
  }
  if (UNVERIFIABLE_HOSTS.has(host)) {
    return {
      ...link,
      state: "unverifiable",
      detail: `${status ?? error} (host blocks automated requests)`,
    };
  }
  return { ...link, state: "broken", detail: String(status ?? error) };
}

async function checkInParallel(links) {
  const pending = [...links];
  const results = [];
  const workers = Array.from(
    { length: Math.min(CONCURRENCY, pending.length) },
    async () => {
      for (let link = pending.shift(); link; link = pending.shift()) {
        results.push(await checkLink(link));
      }
    },
  );
  await Promise.all(workers);
  return results.sort((left, right) => left.url.localeCompare(right.url));
}

async function main() {
  const config = options();
  if (config.help) {
    process.stdout.write(usage());
    return;
  }

  const artifactDir = config.artifactDir ? resolve(config.artifactDir) : null;
  const pages = artifactDir
    ? await localPages(artifactDir)
    : await deployedPages(config.baseUrl);
  const siteOrigin = new URL(config.baseUrl).origin;
  const links = externalLinks(pages, siteOrigin);
  const results = await checkInParallel(links);

  const broken = results.filter((result) => result.state === "broken");
  const unverifiable = results.filter(
    (result) => result.state === "unverifiable",
  );

  for (const result of unverifiable) {
    process.stdout.write(`SKIP  ${result.url} — ${result.detail}\n`);
  }
  for (const result of broken) {
    process.stdout.write(
      `BROKEN  ${result.url} — HTTP ${result.detail}\n` +
        `        referenced by: ${result.pages.join(", ")}\n`,
    );
  }

  process.stdout.write(
    `Link check: ${pages.length} page(s), ${results.length} external link(s), ` +
      `${broken.length} broken, ${unverifiable.length} unverifiable\n`,
  );

  if (broken.length > 0) {
    throw new Error(`${broken.length} broken external link(s)`);
  }
}

await main();
