import { Keys, Layout } from "@components";
import { PROFILE_NAME } from "@lib";
import type { Metadata } from "next";

const PAGE_TITLE = `OpenPGP Key Policy | ${PROFILE_NAME}`;
const PAGE_DESCRIPTION =
  "How my OpenPGP key is structured and operated, and where to obtain it.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/keys" },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/keys",
    siteName: PROFILE_NAME,
    locale: "en_US",
    type: "website",
  },
};

const KeysPage = () => (
  <Layout>
    <main>
      <Keys />
    </main>
  </Layout>
);

export default KeysPage;
