import { About, Contact, Hero, Layout } from "@components";
import type { Metadata } from "next";
import type { ProfilePage, WithContext } from "schema-dts";

const SITE_TITLE = "Yusuke Hayashi";
const SITE_DESCRIPTION =
  "This is a profile page of Yusuke Hayashi. I am a software engineer in Tokyo, Japan.";

const OG_IMAGE = {
  alt: "Yusuke Hayashi",
  width: 420,
  height: 420,
  type: "image/webp",
  url: "/me.webp",
};

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_TITLE,
    locale: "en_US",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

const INDEX_STRUCTURED_DATA: WithContext<ProfilePage> = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  author: {
    "@type": "Person",
    email: "yusuke8h@gmail.com",
    name: SITE_TITLE,
    url: "https://yusuke-hayashi.com",
    givenName: "Yusuke",
    familyName: "Hayashi",
  },
};

const Page = () => (
  <>
    <script
      // eslint-disable-next-line react/no-danger -- JSON-LD を埋め込むため
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(INDEX_STRUCTURED_DATA).replace(/</g, "\\u003c"),
      }}
      type="application/ld+json"
    />

    <Layout>
      <main>
        <Hero />

        <About />

        <Contact />
      </main>
    </Layout>
  </>
);

export default Page;
