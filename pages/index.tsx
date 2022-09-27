import { About, Contact, Hero, Layout } from "@components";

const IndexPage: React.FC = () => {
  return (
    <Layout>
      <main>
        <Hero />
        <About />
        <Contact />
      </main>
    </Layout>
  );
};

export default IndexPage;
