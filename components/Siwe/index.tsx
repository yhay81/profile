"use client";

import { useCallback, useState } from "react";
import { recoverMessageAddress, stringToHex } from "viem";

import styles from "./Siwe.module.scss";

const DOMAIN = "yusuke-hayashi.com";
const STATEMENT = "Sign in to verify you control this Ethereum account.";
const KNOWN_ADDRESS = "0x1C049D25D368bFD50c74df68c919a12aDc48C079";

type Status = "idle" | "connecting" | "signing" | "verified" | "error";

interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}

interface SignInResult {
  address: `0x${string}`;
  chainId: number;
  issuedAt: string;
}

const getProvider = (): EthereumProvider | null => {
  const injected = (window as { ethereum?: EthereumProvider }).ethereum;
  return injected ?? null;
};

const buildSiweMessage = ({
  address,
  chainId,
  nonce,
  issuedAt,
}: {
  address: string;
  chainId: number;
  nonce: string;
  issuedAt: string;
}) =>
  [
    `${DOMAIN} wants you to sign in with your Ethereum account:`,
    address,
    "",
    STATEMENT,
    "",
    `URI: https://${DOMAIN}`,
    "Version: 1",
    `Chain ID: ${chainId}`,
    `Nonce: ${nonce}`,
    `Issued At: ${issuedAt}`,
  ].join("\n");

const Siwe: React.FC = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [result, setResult] = useState<SignInResult | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);

  const handleSignIn = useCallback(async () => {
    setErrorText(null);
    setResult(null);

    const provider = getProvider();
    if (!provider) {
      setStatus("error");
      setErrorText(
        "ブラウザ拡張ウォレットが見つかりません(MetaMask などをインストールしてください)。",
      );
      return;
    }

    try {
      setStatus("connecting");
      const accounts = (await provider.request({
        method: "eth_requestAccounts",
      })) as string[];
      const address = accounts[0];
      if (!address) throw new Error("アカウントが取得できませんでした。");

      const chainIdHex = (await provider.request({
        method: "eth_chainId",
      })) as string;
      const chainId = Number.parseInt(chainIdHex, 16);
      const nonce = crypto.randomUUID().replaceAll("-", "");
      const issuedAt = new Date().toISOString();
      const siweMessage = buildSiweMessage({
        address,
        chainId,
        nonce,
        issuedAt,
      });
      setMessage(siweMessage);

      setStatus("signing");
      const signature = (await provider.request({
        method: "personal_sign",
        params: [stringToHex(siweMessage), address],
      })) as `0x${string}`;

      const recoveredAddress = await recoverMessageAddress({
        message: siweMessage,
        signature,
      });

      if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
        throw new Error("署名の検証に失敗しました(アドレス不一致)。");
      }

      setResult({
        address: recoveredAddress,
        chainId,
        issuedAt,
      });
      setStatus("verified");
    } catch (error) {
      setStatus("error");
      setErrorText(
        error instanceof Error ? error.message : "サインインに失敗しました。",
      );
    }
  }, []);

  return (
    <section className={styles.siweSection}>
      <p className={styles.sectionLabel}>
        <span className={styles.sectionNo}>EIP-4361</span>
        <span className={styles.sectionText}>Sign-In with Ethereum</span>
      </p>

      <h1 className={styles.title}>SIWE Demo</h1>

      <p className={styles.lead}>
        Connects a wallet, constructs an EIP-4361 message, requests a{" "}
        <code className={styles.inlineCode}>personal_sign</code>, and verifies
        the signature entirely client-side (this site is static — there is no
        backend to trust). Nothing is sent anywhere; verification happens in
        your browser with{" "}
        <a href="https://viem.sh" rel="noreferrer" target="_blank">
          viem
        </a>
        .
      </p>

      <button
        className={styles.button}
        disabled={status === "connecting" || status === "signing"}
        onClick={handleSignIn}
        type="button"
      >
        {status === "connecting" && "Connecting…"}
        {status === "signing" && "Awaiting signature…"}
        {(status === "idle" || status === "error" || status === "verified") &&
          "Sign in with Ethereum"}
      </button>

      {errorText !== null && <p className={styles.error}>{errorText}</p>}

      {message !== null && <pre className={styles.messageBlock}>{message}</pre>}

      {result !== null && (
        <div className={styles.result}>
          <p className={styles.verified}>✓ Signature verified</p>

          <ul className={styles.list}>
            <li>
              Address:{" "}
              <code className={styles.inlineCode}>{result.address}</code>
              {result.address.toLowerCase() === KNOWN_ADDRESS.toLowerCase() && (
                <span className={styles.badge}>
                  same address as ENS / GPG cross-attestation
                </span>
              )}
            </li>
            <li>Chain ID: {result.chainId}</li>
            <li>Issued at: {result.issuedAt}</li>
          </ul>
        </div>
      )}
    </section>
  );
};

export { Siwe };
