import { Layout, Proofs } from "@components";
import { PROFILE_NAME } from "@lib";
import type { Metadata } from "next";

const PAGE_TITLE = `Cross-attestation | ${PROFILE_NAME}`;
const PAGE_DESCRIPTION =
  "Bidirectional signatures binding my OpenPGP key and Ethereum account.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/proofs" },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/proofs",
    siteName: PROFILE_NAME,
    locale: "en_US",
    type: "website",
  },
};

const ProofsPage = () => (
  <Layout>
    <main>
      <Proofs />
    </main>
  </Layout>
);

export default ProofsPage;
