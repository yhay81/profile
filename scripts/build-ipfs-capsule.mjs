/* global process */

import { copyFile, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const output = join(root, ".ipfs", "identity-capsule");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await copyFile(
  join(root, "ipfs", "identity-capsule", "index.html"),
  join(output, "index.html"),
);
await copyFile(join(root, "public", "me.webp"), join(output, "me.webp"));

process.stdout.write(`${output}\n`);
