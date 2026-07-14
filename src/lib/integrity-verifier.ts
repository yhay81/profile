import { ETH_ADDRESS, PGP_FINGERPRINT_HEX, PROFILE_URL } from "@/lib/site";

type VerificationStatus = "running" | "pass" | "fail";

export interface VerificationUpdate {
  id: string;
  label: string;
  status: VerificationStatus;
  detail: string;
}

interface ReleaseEntry {
  file: string;
  path: string;
  bytes: number;
  sha256: string;
}

interface ReleaseManifest {
  source: { commit: string };
  performance: { sha256: string };
  assetSet: {
    sha256: string;
    fileCount: number;
    totalBytes: number;
    entries: ReleaseEntry[];
  };
}

interface IdentityManifest {
  validity: { expiresAt: string };
  identifiers: {
    openpgp: { fingerprint: string };
    ethereum: { address: string };
  };
  history: { sha256: string };
}

interface EthereumAttestation {
  address: `0x${string}`;
  message: string;
  signature: `0x${string}`;
}

const encoder = new TextEncoder();

async function fetchBytes(path: string) {
  const response = await fetch(path, { cache: "no-cache" });
  const allowed404 = path === "/404" && response.status === 404;
  if (!response.ok && !allowed404) {
    throw new Error(`${path} returned HTTP ${response.status}`);
  }
  return new Uint8Array(await response.arrayBuffer());
}

async function fetchText(path: string) {
  return new TextDecoder().decode(await fetchBytes(path));
}

async function sha256(value: BufferSource) {
  const digest = await crypto.subtle.digest("SHA-256", value);
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function verifyInParallel(
  entries: ReleaseEntry[],
  verify: (entry: ReleaseEntry) => Promise<void>,
) {
  const pending = [...entries];
  const workers = Array.from(
    { length: Math.min(6, pending.length) },
    async () => {
      for (let entry = pending.shift(); entry; entry = pending.shift()) {
        await verify(entry);
      }
    },
  );
  await Promise.all(workers);
}

async function requireOpenPgpSignature(
  armoredMessage: string,
  publicKey: Awaited<
    ReturnType<(typeof import("openpgp/lightweight"))["readKey"]>
  >,
) {
  const { readCleartextMessage, verify } = await import("openpgp/lightweight");
  const message = await readCleartextMessage({
    cleartextMessage: armoredMessage,
  });
  const result = await verify({ message, verificationKeys: publicKey });
  await result.signatures[0]?.verified;
  return message.getText();
}

export async function runIntegrityVerification(
  onUpdate: (update: VerificationUpdate) => void,
) {
  const failures: string[] = [];
  let release: ReleaseManifest | undefined;
  let identity: IdentityManifest | undefined;
  let publicKey:
    | Awaited<ReturnType<(typeof import("openpgp/lightweight"))["readKey"]>>
    | undefined;

  const check = async (
    id: string,
    label: string,
    run: () => Promise<string>,
  ) => {
    onUpdate({ id, label, status: "running", detail: "verifying…" });
    try {
      const detail = await run();
      onUpdate({ id, label, status: "pass", detail });
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      failures.push(`${label}: ${detail}`);
      onUpdate({ id, label, status: "fail", detail });
    }
  };

  await check("release", "Published release manifest", async () => {
    release = JSON.parse(
      await fetchText("/.well-known/release.json"),
    ) as ReleaseManifest;
    if (!/^[a-f0-9]{40}$/.test(release.source.commit)) {
      throw new Error("invalid source commit");
    }
    if (release.assetSet.entries.length !== release.assetSet.fileCount) {
      throw new Error("asset count does not match manifest");
    }
    return `commit ${release.source.commit.slice(0, 12)}`;
  });

  await check("assets", "All non-recursive assets", async () => {
    if (!release) throw new Error("release manifest unavailable");
    await verifyInParallel(release.assetSet.entries, async (entry) => {
      const bytes = await fetchBytes(entry.path);
      if (bytes.byteLength !== entry.bytes) {
        throw new Error(`${entry.path} byte length mismatch`);
      }
      if ((await sha256(bytes)) !== entry.sha256) {
        throw new Error(`${entry.path} SHA-256 mismatch`);
      }
    });
    const canonical = release.assetSet.entries
      .map((entry) => `${entry.sha256} ${entry.bytes} ${entry.path}\n`)
      .join("");
    if ((await sha256(encoder.encode(canonical))) !== release.assetSet.sha256) {
      throw new Error("asset-set digest mismatch");
    }
    const kib = Math.round(release.assetSet.totalBytes / 1024);
    return `${release.assetSet.fileCount} files · ${kib} KiB · SHA-256 complete`;
  });

  await check("performance", "Performance contract", async () => {
    if (!release) throw new Error("release manifest unavailable");
    const bytes = await fetchBytes("/.well-known/performance.json");
    if ((await sha256(bytes)) !== release.performance.sha256) {
      throw new Error("performance report hash mismatch");
    }
    const report = JSON.parse(new TextDecoder().decode(bytes)) as {
      status: string;
      sourceCommit: string;
      global: Record<string, number>;
    };
    if (report.status !== "pass") throw new Error("budget status is not pass");
    if (report.sourceCommit !== release.source.commit) {
      throw new Error("performance report belongs to another commit");
    }
    if (Object.values(report.global).some((value) => value !== 0)) {
      throw new Error("global zero-request contract failed");
    }
    return "budgets pass · 0 fonts · 0 third parties · 0 RUM";
  });

  await check("identity", "Identity manifest signature", async () => {
    const [manifestText, signatureText, keyText] = await Promise.all([
      fetchText("/.well-known/identity.json"),
      fetchText("/.well-known/identity.json.asc"),
      fetchText("/pgp-key.asc"),
    ]);
    identity = JSON.parse(manifestText) as IdentityManifest;
    const { createMessage, readKey, readSignature, verify } =
      await import("openpgp/lightweight");
    publicKey = await readKey({ armoredKey: keyText });
    const fingerprint = publicKey.getFingerprint().toLowerCase();
    if (fingerprint !== PGP_FINGERPRINT_HEX) {
      throw new Error("public-key fingerprint mismatch");
    }
    if (
      identity.identifiers.openpgp.fingerprint.toLowerCase() !== fingerprint
    ) {
      throw new Error("manifest fingerprint mismatch");
    }
    if (new Date(identity.validity.expiresAt) <= new Date()) {
      throw new Error("identity manifest expired");
    }
    const message = await createMessage({ text: manifestText });
    const signature = await readSignature({ armoredSignature: signatureText });
    const result = await verify({
      message,
      signature,
      verificationKeys: publicKey,
    });
    await result.signatures[0]?.verified;
    return `OpenPGP ${fingerprint.slice(-16).toUpperCase()} · not expired`;
  });

  await check("history", "Append-only identity history", async () => {
    if (!identity) throw new Error("identity manifest unavailable");
    const bytes = await fetchBytes("/.well-known/identity-history.json");
    if ((await sha256(bytes)) !== identity.history.sha256) {
      throw new Error("history hash mismatch");
    }
    return "manifest-pinned SHA-256 matches";
  });

  await check("pgp-eth", "OpenPGP → Ethereum proof", async () => {
    if (!publicKey) throw new Error("verified OpenPGP key unavailable");
    const signed = await fetchText("/proofs/statement.txt.asc");
    const text = await requireOpenPgpSignature(signed, publicKey);
    if (!text.toLowerCase().includes(ETH_ADDRESS.toLowerCase())) {
      throw new Error("signed statement does not name the Ethereum address");
    }
    return "clearsign valid · Ethereum address bound";
  });

  await check("eth-pgp", "Ethereum → OpenPGP proof", async () => {
    const attestation = JSON.parse(
      await fetchText("/proofs/eth-attestation.json"),
    ) as EthereumAttestation;
    const { recoverMessageAddress } = await import("@/lib/siwe-crypto");
    const recovered = await recoverMessageAddress({
      message: attestation.message,
      signature: attestation.signature,
    });
    if (recovered.toLowerCase() !== ETH_ADDRESS.toLowerCase()) {
      throw new Error("recovered Ethereum address mismatch");
    }
    if (attestation.address.toLowerCase() !== ETH_ADDRESS.toLowerCase()) {
      throw new Error("attestation address mismatch");
    }
    if (!attestation.message.includes(PGP_FINGERPRINT_HEX.toUpperCase())) {
      throw new Error("signed message does not name the OpenPGP fingerprint");
    }
    return `EIP-191 recovered ${recovered.slice(0, 8)}…${recovered.slice(-6)}`;
  });

  await check("security", "Signed security.txt", async () => {
    if (!publicKey) throw new Error("verified OpenPGP key unavailable");
    const signed = await fetchText("/.well-known/security.txt");
    const text = await requireOpenPgpSignature(signed, publicKey);
    if (!text.includes(`${PROFILE_URL}/.well-known/security.txt`)) {
      throw new Error("canonical URL missing from signed payload");
    }
    return "OpenPGP clearsign valid · canonical URL bound";
  });

  if (failures.length > 0) {
    throw new AggregateError(
      failures,
      `${failures.length} verification(s) failed`,
    );
  }
}
