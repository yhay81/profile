import styles from "./Keys.module.scss";

const KEY_STRUCTURE = `Primary  ed25519  B22B 98AB B2D5 0330 7AB6 A316 0718 EFA6 506B B669  [C] certify-only
Subkey   ed25519  0C15 3FFE 2B02 7436 5ACB 1BF1 AEFA 86FA 828C 52C5  [S] signing (git, documents)
Subkey   cv25519  B7D6 4271 182C BBA3 054C 52CF CAA5 0DCD 0443 2C4F  [E] encryption
Subkey   ed25519  1378 A9E1 4459 222D 12C3 D2EB 424E 58B7 A453 07FE  [S] signing (secondary machine)
Subkey   ed25519  BFDB 1F43 3932 B67B D108 9817 3416 6963 D548 6096  [A] authentication (SSH)`;

const POLICY_ITEMS = [
  "The primary (certify-only) key is kept offline and is used solely to manage subkeys and identities. Day-to-day operations use subkeys only.",
  "Signing subkeys are machine-scoped — no private subkey is shared across machines.",
  "Keys have no expiry; compromise response relies on revocation and re-distribution via keyservers and WKD.",
  "All git commits and tags are signed (shown as Verified on GitHub).",
] as const;

const OBTAIN_ITEMS = [
  {
    id: "obtain-site",
    label: "This site",
    href: "/pgp-key.asc",
    text: "/pgp-key.asc",
    external: false,
  },
  {
    id: "obtain-wkd",
    label: "WKD",
    href: null,
    text: "gpg --locate-keys yusuke@haya.company",
    external: false,
  },
  {
    id: "obtain-keyserver",
    label: "keys.openpgp.org",
    href: "https://keys.openpgp.org/search?q=B22B98ABB2D503307AB6A3160718EFA6506BB669",
    text: "verified for both email identities",
    external: true,
  },
  {
    id: "obtain-github",
    label: "GitHub",
    href: "https://github.com/yhay81.gpg",
    text: "github.com/yhay81.gpg",
    external: true,
  },
  {
    id: "obtain-keyoxide",
    label: "Keyoxide",
    href: "https://keyoxide.org/b22b98abb2d503307ab6a3160718efa6506bb669",
    text: "verified identity proofs",
    external: true,
  },
] as const;

const Keys: React.FC = () => (
  <section className={styles.keysSection}>
    <p className={styles.sectionLabel}>
      <span className={styles.sectionNo}>PGP</span>
      <span className={styles.sectionText}>Keys</span>
    </p>

    <h1 className={styles.title}>OpenPGP Key Policy</h1>

    <p className={styles.lead}>
      How my OpenPGP key is structured and operated, and where to obtain it.
      Publishing the operating policy costs nothing in security — the key
      material stays offline; only the design is public.
    </p>

    <h2 className={styles.heading}>Current key (since 2026-07-12)</h2>

    <pre className={styles.keyBlock}>{KEY_STRUCTURE}</pre>

    <ul className={styles.list}>
      {POLICY_ITEMS.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>

    <h2 className={styles.heading}>Where to obtain this key</h2>

    <ul className={styles.list}>
      {OBTAIN_ITEMS.map((item) => (
        <li key={item.id}>
          {item.label}
          {": "}
          {item.href === null ? (
            <code className={styles.inlineCode}>{item.text}</code>
          ) : (
            <a
              href={item.href}
              rel={item.external ? "noreferrer" : undefined}
              target={item.external ? "_blank" : undefined}
            >
              {item.text}
            </a>
          )}
        </li>
      ))}
    </ul>

    <h2 className={styles.heading}>Identity proofs</h2>

    <p className={styles.text}>
      This key is bidirectionally linked to github.com/yhay81 and my domains
      (haya-inc.co.jp, yusuke-hayashi.com) through proofs verifiable on
      Keyoxide. The same identity extends on-chain — see the{" "}
      <a href="/siwe">Sign-In with Ethereum demo</a>.
    </p>

    <h2 className={styles.heading}>Previous key</h2>

    <p className={styles.text}>
      RSA-4096 <code className={styles.inlineCode}>89C3 25D4 1DD3 055B</code>{" "}
      (2020–2026) was revoked as superseded by the current key on 2026-07-12.
    </p>

    <p className={styles.updated}>Last updated: 2026-07-13</p>
  </section>
);

export { Keys };
