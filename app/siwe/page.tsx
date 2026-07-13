import { Layout, Siwe } from "@components";
import { PROFILE_NAME } from "@lib";
import type { Metadata } from "next";

const PAGE_TITLE = `Sign-In with Ethereum Demo | ${PROFILE_NAME}`;
const PAGE_DESCRIPTION =
  "An EIP-4361 (Sign-In with Ethereum) demo verified entirely client-side.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/siwe" },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/siwe",
    siteName: PROFILE_NAME,
    locale: "en_US",
    type: "website",
  },
};

const SiwePage = () => (
  <Layout>
    <main>
      <Siwe />
    </main>
  </Layout>
);

export default SiwePage;
