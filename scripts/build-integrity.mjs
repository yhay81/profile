/* global Buffer, process */

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { gzipSync } from "node:zlib";

const ROOT = process.cwd();
const DIST = join(ROOT, "dist");
const ORIGIN = "https://yusuke-hayashi.com";
const REPOSITORY = "https://github.com/yhay81/profile";
const WORKFLOW = `${REPOSITORY}/actions/workflows/cloudflare.yml`;
const RELEASE_PATH = ".well-known/release.json";
const PERFORMANCE_PATH = ".well-known/performance.json";

const ROUTE_BUDGETS = [
  {
    path: "/",
    file: "index.html",
    documentGzipBytes: 12_000,
    initialJsGzipBytes: 0,
  },
  {
    path: "/work",
    file: "work.html",
    // The portfolio is intentionally a complete, zero-JavaScript work index:
    // featured products, public systems, ecosystems, and earlier work.
    documentGzipBytes: 18_000,
    initialJsGzipBytes: 0,
  },
  {
    path: "/identity",
    file: "identity.html",
    // Identity proofs and the interactive release ledger intentionally share
    // one canonical page. Keep their combined document and verifier bounded.
    documentGzipBytes: 16_000,
    initialJsGzipBytes: 2_000,
  },
  {
    path: "/siwe",
    file: "siwe.html",
    documentGzipBytes: 8_000,
    initialJsGzipBytes: 5_000,
  },
];

const git = (...args) =>
  execFileSync("git", args, { cwd: ROOT, encoding: "utf8" }).trim();

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const sha256Csp = (value) =>
  `'sha256-${createHash("sha256").update(value).digest("base64")}'`;

const toPosix = (value) => value.split(sep).join("/");

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(absolute)));
    else if (entry.isFile()) files.push(toPosix(relative(DIST, absolute)));
  }
  return files.sort();
}

function publicPath(file) {
  if (file === "index.html") return "/";
  if (file === "404.html") return "/404";
  if (file.endsWith(".html")) return `/${file.slice(0, -5)}`;
  return `/${file}`;
}

function scriptSources(html) {
  return [...html.matchAll(/<script\b([^>]*)>/gi)]
    .map((match) => match[1].match(/\bsrc=["']([^"']+)["']/i)?.[1])
    .filter(Boolean);
}

function resourceUrls(html) {
  const urls = [];
  for (const match of html.matchAll(/<(?:script|link|img|source)\b[^>]*>/gi)) {
    for (const attribute of match[0].matchAll(
      /\b(?:src|href)=["']([^"']+)["']/gi,
    )) {
      urls.push(attribute[1]);
    }
  }
  return urls;
}

function pageContentSecurityPolicy(html, file) {
  const match = html.match(
    /<meta\s+http-equiv=(["'])content-security-policy\1\s+content=(["'])([\s\S]*?)\2\s*\/?>/i,
  );
  if (!match) {
    throw new Error(`Astro CSP metadata is missing from ${file}`);
  }

  const policy = match[3];
  const required = [
    "default-src 'none'",
    "require-trusted-types-for 'script'",
    "trusted-types 'none'",
    "script-src-elem 'self' 'inline-speculation-rules'",
    "script-src-attr 'none'",
    "style-src-elem 'self'",
    "style-src-attr 'none'",
  ];
  for (const directive of required) {
    if (!policy.includes(directive)) {
      throw new Error(`Astro CSP in ${file} is missing: ${directive}`);
    }
  }
  if (policy.includes("'unsafe-inline'") || policy.includes("'unsafe-eval'")) {
    throw new Error(`Astro CSP in ${file} contains an unsafe source`);
  }
  return policy;
}

async function generatePerformanceReport({ commit, checkedAt }) {
  const allFiles = await walk(DIST);
  const htmlFiles = allFiles.filter((file) => file.endsWith(".html"));
  const htmlDocuments = await Promise.all(
    htmlFiles.map(async (file) => ({
      file,
      html: await readFile(join(DIST, file), "utf8"),
    })),
  );
  const externalResources = new Set();

  for (const { html } of htmlDocuments) {
    for (const url of resourceUrls(html)) {
      if (/^https?:\/\//i.test(url) && !url.startsWith(ORIGIN)) {
        externalResources.add(url);
      }
    }
  }

  const deployText = (
    await Promise.all(
      allFiles
        .filter((file) => /\.(?:html|css|js|mjs)$/i.test(file))
        .map((file) => readFile(join(DIST, file), "utf8")),
    )
  ).join("\n");
  const fontFiles = allFiles.filter((file) =>
    /\.(?:woff2?|ttf|otf|eot)$/i.test(file),
  );
  const rumReferences = [
    "static.cloudflareinsights.com",
    "/cdn-cgi/rum",
    "data-cf-beacon",
  ].filter((value) => deployText.includes(value));

  const routes = [];
  for (const budget of ROUTE_BUDGETS) {
    const html = await readFile(join(DIST, budget.file), "utf8");
    const scripts = scriptSources(html);
    let initialJsBytes = 0;
    let initialJsGzipBytes = 0;

    for (const source of scripts) {
      if (/^https?:\/\//i.test(source)) continue;
      const file = source.replace(/^\//, "").split("?")[0];
      const bytes = await readFile(join(DIST, file));
      initialJsBytes += bytes.byteLength;
      initialJsGzipBytes += gzipSync(bytes, { level: 9 }).byteLength;
    }

    const metrics = {
      documentBytes: Buffer.byteLength(html),
      documentGzipBytes: gzipSync(html, { level: 9 }).byteLength,
      initialScriptCount: scripts.length,
      initialJsBytes,
      initialJsGzipBytes,
    };
    const status =
      metrics.documentGzipBytes <= budget.documentGzipBytes &&
      metrics.initialJsGzipBytes <= budget.initialJsGzipBytes
        ? "pass"
        : "fail";
    routes.push({
      path: budget.path,
      status,
      budgets: {
        documentGzipBytes: budget.documentGzipBytes,
        initialJsGzipBytes: budget.initialJsGzipBytes,
      },
      metrics,
    });
  }

  const global = {
    thirdPartyRequests: externalResources.size,
    fontRequests: fontFiles.length,
    rumReferences: rumReferences.length,
  };
  const status =
    routes.every((route) => route.status === "pass") &&
    Object.values(global).every((value) => value === 0)
      ? "pass"
      : "fail";
  const report = {
    $schema: `${ORIGIN}/.well-known/schemas/performance-v1.schema.json`,
    schemaVersion: 1,
    subject: ORIGIN,
    checkedAt,
    sourceCommit: commit,
    status,
    global,
    routes,
  };
  const output = `${JSON.stringify(report, null, 2)}\n`;
  await mkdir(join(DIST, ".well-known"), { recursive: true });
  await writeFile(join(DIST, PERFORMANCE_PATH), output);

  if (status === "fail") {
    throw new Error(`Performance contract failed:\n${output}`);
  }
  return Buffer.from(output);
}

async function generateContentSecurityPolicy() {
  const htmlFiles = (await walk(DIST)).filter((file) => file.endsWith(".html"));
  const scriptHashes = new Set();
  const styleHashes = new Set();

  for (const file of htmlFiles) {
    const html = await readFile(join(DIST, file), "utf8");
    const pagePolicy = pageContentSecurityPolicy(html, file);
    for (const match of html.matchAll(
      /<script\b([^>]*)>([\s\S]*?)<\/script>/gi,
    )) {
      if (!/\bsrc=/i.test(match[1]) && match[2].length > 0) {
        const hash = sha256Csp(match[2]);
        scriptHashes.add(hash);
        const isSpeculationRules = /\btype=["']speculationrules["']/i.test(
          match[1],
        );
        if (!isSpeculationRules && !pagePolicy.includes(hash)) {
          throw new Error(
            `Astro CSP in ${file} does not cover an inline script`,
          );
        }
      }
    }
    for (const match of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
      if (match[1].length > 0) {
        const hash = sha256Csp(match[1]);
        styleHashes.add(hash);
        if (!pagePolicy.includes(hash)) {
          throw new Error(
            `Astro CSP in ${file} does not cover an inline style element`,
          );
        }
      }
    }
  }

  const csp = [
    "default-src 'none'",
    "base-uri 'none'",
    "connect-src 'self'",
    "font-src 'none'",
    "form-action 'none'",
    "frame-ancestors 'none'",
    "img-src 'self' data:",
    "manifest-src 'self'",
    "object-src 'none'",
    "require-trusted-types-for 'script'",
    `script-src 'self'`,
    `script-src-elem 'self' 'inline-speculation-rules' ${[...scriptHashes].sort().join(" ")}`,
    "script-src-attr 'none'",
    `style-src 'self'`,
    `style-src-elem 'self' ${[...styleHashes].sort().join(" ")}`,
    "style-src-attr 'none'",
    "trusted-types 'none'",
    "worker-src 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
  const headersPath = join(DIST, "_headers");
  const headers = await readFile(headersPath, "utf8");
  if (!headers.includes("__GENERATED_CSP__")) {
    throw new Error("The _headers CSP placeholder is missing");
  }
  await writeFile(headersPath, headers.replace("__GENERATED_CSP__", csp));
  return {
    pagePolicies: htmlFiles.length,
    scriptHashes: scriptHashes.size,
    styleHashes: styleHashes.size,
  };
}

async function generateReleaseManifest({
  commit,
  committedAt,
  performanceBytes,
}) {
  const excluded = ["_headers", "_redirects", RELEASE_PATH, "robots.txt"];
  const robotsBytes = await readFile(join(DIST, "robots.txt"));
  const edgeTransforms = [
    {
      path: "/robots.txt",
      provider: "Cloudflare managed robots.txt",
      mode: "prepend",
      preservedSuffix: {
        bytes: robotsBytes.byteLength,
        sha256: sha256(robotsBytes),
      },
    },
  ];
  const files = (await walk(DIST)).filter((file) => !excluded.includes(file));
  const entries = await Promise.all(
    files.map(async (file) => {
      const bytes = await readFile(join(DIST, file));
      return {
        file,
        path: publicPath(file),
        bytes: bytes.byteLength,
        sha256: sha256(bytes),
      };
    }),
  );
  entries.sort((left, right) => left.path.localeCompare(right.path));
  const canonical = entries
    .map((entry) => `${entry.sha256} ${entry.bytes} ${entry.path}\n`)
    .join("");
  const manifest = {
    $schema: `${ORIGIN}/.well-known/schemas/release-v1.schema.json`,
    schemaVersion: 1,
    subject: ORIGIN,
    source: {
      repository: REPOSITORY,
      commit,
      commitUrl: `${REPOSITORY}/commit/${commit}`,
      committedAt,
    },
    build: {
      workflow: WORKFLOW,
      reproducible: true,
      provenance: {
        predicateType: "https://slsa.dev/provenance/v1",
        verifyCommand:
          "gh attestation verify site-dist.tar.gz --repo yhay81/profile --signer-workflow yhay81/profile/.github/workflows/cloudflare.yml --cert-oidc-issuer https://token.actions.githubusercontent.com --source-ref refs/heads/main --deny-self-hosted-runners",
      },
    },
    deployment: {
      platform: "Cloudflare Workers Static Assets",
      canonicalUrl: ORIGIN,
      runtimeCode: false,
      edgeTransforms,
    },
    performance: {
      url: `${ORIGIN}/${PERFORMANCE_PATH}`,
      sha256: sha256(performanceBytes),
    },
    assetSet: {
      algorithm: "sha256-lines-v1",
      sha256: sha256(canonical),
      fileCount: entries.length,
      totalBytes: entries.reduce((total, entry) => total + entry.bytes, 0),
      excluded,
      entries,
    },
  };
  await writeFile(
    join(DIST, RELEASE_PATH),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );
  return manifest;
}

const commit = (
  process.env.GITHUB_SHA || git("rev-parse", "HEAD")
).toLowerCase();
if (!/^[a-f0-9]{40}$/.test(commit))
  throw new Error(`Invalid git commit: ${commit}`);
const committedAt = new Date(
  git("show", "-s", "--format=%cI", commit),
).toISOString();
const performanceBytes = await generatePerformanceReport({
  commit,
  checkedAt: committedAt,
});
const csp = await generateContentSecurityPolicy();
const release = await generateReleaseManifest({
  commit,
  committedAt,
  performanceBytes,
});

process.stdout.write(
  `Integrity build: ${release.assetSet.fileCount} files, sha256:${release.assetSet.sha256}, ` +
    `${csp.pagePolicies} page CSP(s), ${csp.scriptHashes} script hash(es), ` +
    `${csp.styleHashes} style hash(es)\n`,
);
