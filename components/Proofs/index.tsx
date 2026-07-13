import styles from "./Proofs.module.scss";

const ADDRESS = "0x1C049D25D368bFD50c74df68c919a12aDc48C079";
const FINGERPRINT = "B22B 98AB B2D5 0330 7AB6 A316 0718 EFA6 506B B669";

const VERIFY_GPG = `# Obtain my key (WKD), then verify the statement
gpg --locate-keys yusuke@haya.company
curl -sO https://yusuke-hayashi.com/proofs/statement.txt.asc
gpg --verify statement.txt.asc`;

const VERIFY_ETH = `# Recover the signer address from the signature (Foundry)
curl -s https://yusuke-hayashi.com/proofs/eth-attestation.json | jq -r '.message, .signature'
cast wallet verify --address ${ADDRESS} "<message>" "<signature>"`;

const Proofs: React.FC = () => (
  <section className={styles.proofsSection}>
    <p className={styles.sectionLabel}>
      <span className={styles.sectionNo}>PGP ⇄ ETH</span>
      <span className={styles.sectionText}>Cross-attestation</span>
    </p>

    <h1 className={styles.title}>Cross-attestation</h1>

    <p className={styles.lead}>
      Two signatures, one in each direction, binding my{" "}
      <a href="/keys">OpenPGP key</a> and my Ethereum account to the same
      person. Neither is an on-chain transaction — both are offline signatures
      you can verify yourself.
    </p>

    <ul className={styles.list}>
      <li>
        OpenPGP key: <code className={styles.inlineCode}>{FINGERPRINT}</code>
      </li>
      <li>
        Ethereum account: <code className={styles.inlineCode}>{ADDRESS}</code>
      </li>
    </ul>

    <h2 className={styles.heading}>1. GPG → Ethereum</h2>

    <p className={styles.text}>
      A statement attesting control of the Ethereum account, clearsigned with my
      OpenPGP signing subkey:{" "}
      <a href="/proofs/statement.txt.asc">statement.txt.asc</a>
    </p>

    <pre className={styles.codeBlock}>{VERIFY_GPG}</pre>

    <h2 className={styles.heading}>2. Ethereum → GPG</h2>

    <p className={styles.text}>
      A message naming the OpenPGP key fingerprint, signed by the Ethereum
      account (EIP-191 personal_sign):{" "}
      <a href="/proofs/eth-attestation.json">eth-attestation.json</a>
    </p>

    <pre className={styles.codeBlock}>{VERIFY_ETH}</pre>

    <p className={styles.text}>
      Or verify in the browser: the <a href="/siwe">SIWE demo</a> uses the same
      signature scheme and recovers addresses client-side with viem.
    </p>

    <p className={styles.updated}>Signed: 2026-07-14</p>
  </section>
);

export { Proofs };
