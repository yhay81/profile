/* global Buffer, fetch, process, URL */

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { parseArgs } from "node:util";

const DEFAULT_BASE_URL = "https://yusuke-hayashi.com";

const sha256 = (value) => createHash("sha256").update(value).digest("hex");

function usage() {
  return `Usage: verify-release [options]

Options:
  --artifact-dir <path>   Verify a local dist directory
  --base-url <url>        Verify a deployment (default: ${DEFAULT_BASE_URL})
  --expected-commit <sha> Require the published source commit
  --help                  Show this help
`;
}

function options() {
  const { values } = parseArgs({
    options: {
      "artifact-dir": { type: "string" },
      "base-url": { type: "string" },
      "expected-commit": { type: "string" },
      help: { type: "boolean" },
    },
    strict: true,
  });
  return {
    artifactDir: values["artifact-dir"],
    baseUrl: values["base-url"] || DEFAULT_BASE_URL,
    expectedCommit: values["expected-commit"],
    help: values.help || false,
  };
}

async function remoteBytes(baseUrl, path) {
  const response = await fetch(
    new URL(path, `${baseUrl.replace(/\/$/, "")}/`),
    {
      headers: { "Cache-Control": "no-cache" },
    },
  );
  const allowed404 = path === "/404" && response.status === 404;
  if (!response.ok && !allowed404) {
    throw new Error(`${path} returned HTTP ${response.status}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

async function main() {
  const config = options();
  if (config.help) {
    process.stdout.write(usage());
    return;
  }
  const artifactDir = config.artifactDir ? resolve(config.artifactDir) : null;
  const loadFile = (file, path) =>
    artifactDir
      ? readFile(join(artifactDir, file))
      : remoteBytes(config.baseUrl, path);
  const manifestBytes = await loadFile(
    ".well-known/release.json",
    "/.well-known/release.json",
  );
  const manifest = JSON.parse(manifestBytes.toString("utf8"));

  if (
    config.expectedCommit &&
    manifest.source.commit !== config.expectedCommit
  ) {
    throw new Error(
      `Published commit ${manifest.source.commit} does not match ${config.expectedCommit}`,
    );
  }

  const performanceBytes = await loadFile(
    ".well-known/performance.json",
    "/.well-known/performance.json",
  );
  if (sha256(performanceBytes) !== manifest.performance.sha256) {
    throw new Error("Performance report hash mismatch");
  }
  const performance = JSON.parse(performanceBytes.toString("utf8"));
  if (performance.status !== "pass")
    throw new Error("Performance contract is not passing");
  if (performance.sourceCommit !== manifest.source.commit) {
    throw new Error(
      "Performance report commit does not match release manifest",
    );
  }

  const verified = [];
  for (const entry of manifest.assetSet.entries) {
    const bytes = await loadFile(entry.file, entry.path);
    if (bytes.byteLength !== entry.bytes) {
      throw new Error(`${entry.path} byte length mismatch`);
    }
    if (sha256(bytes) !== entry.sha256) {
      throw new Error(`${entry.path} SHA-256 mismatch`);
    }
    verified.push(entry);
  }
  const canonical = verified
    .map((entry) => `${entry.sha256} ${entry.bytes} ${entry.path}\n`)
    .join("");
  if (sha256(canonical) !== manifest.assetSet.sha256) {
    throw new Error("Asset-set digest mismatch");
  }

  for (const transform of manifest.deployment.edgeTransforms || []) {
    const bytes = await loadFile(
      transform.path.replace(/^\//, ""),
      transform.path,
    );
    const suffix = bytes.subarray(
      bytes.byteLength - transform.preservedSuffix.bytes,
    );
    if (suffix.byteLength !== transform.preservedSuffix.bytes) {
      throw new Error(`${transform.path} preserved suffix length mismatch`);
    }
    if (sha256(suffix) !== transform.preservedSuffix.sha256) {
      throw new Error(`${transform.path} preserved suffix SHA-256 mismatch`);
    }
  }

  process.stdout.write(
    `Release verified: ${manifest.source.commit.slice(0, 12)}, ` +
      `${verified.length} exact files, ` +
      `${manifest.deployment.edgeTransforms?.length || 0} edge transform(s), ` +
      `sha256:${manifest.assetSet.sha256}\n`,
  );
}

await main();
