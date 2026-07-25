import { createHash } from "node:crypto";

export function sha256CspHash(value: string): `sha256-${string}` {
  const digest = createHash("sha256").update(value).digest("base64");
  return `sha256-${digest}`;
}
