import { About, Contact, Hero, HtmlHead, Layout } from "@components";
import type { ProfilePage, WithContext } from "schema-dts";

const INDEX_HEAD_META: HeadMeta = {
  description: "Yusuke Hayashi's personal website",
  ogType: "website",
  title: "Yusuke Hayashi",
};

const INDEX_STRUCTURED_DATA: WithContext<ProfilePage> = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  author: {
    "@type": "Person",
    email: "yusuke8h@gmail.com",
    name: "Yusuke Hayashi",
    url: "https://yusuke-hayashi.com",
    givenName: "Yusuke",
    familyName: "Hayashi",
  },
};

const IndexPage: React.FC = () => {
  return (
    <>
      <HtmlHead dts={INDEX_STRUCTURED_DATA} headMeta={INDEX_HEAD_META} />
      <Layout>
        <main>
          <Hero />
          <About />
          <Contact />
        </main>
      </Layout>
    </>
  );
};

export default IndexPage;
