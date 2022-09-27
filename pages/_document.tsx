import Document, { Head, Html, Main, NextScript } from "next/document";

const seo = {
  title: "Next.js + TypeScript Example",
  description: "A simple project starter to work with Next.js and TypeScript",
  image: "https://yusuke-hayashi.com/me.webp",
  url: "https://yusuke-hayashi.com",
};

export default class MyDocument extends Document {
  public render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Fira+Code&display=optional"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Heebo&display=optional"
            rel="stylesheet"
          />
          <link
            href="/apple-touch-icon.png"
            rel="apple-touch-icon"
            sizes="180x180"
          />
          <link
            href="/favicon-32x32.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />
          <link
            href="/favicon-16x16.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          />
          <link href="/site.webmanifest" rel="manifest" />
          <link color="#04ffaa" href="/safari-pinned-tab.svg" rel="mask-icon" />
          <meta content="#042444" name="msapplication-TileColor" />
          <meta content="#04ffaa" name="theme-color" />

          <meta content={seo.description} name="description" />
          <meta content={seo.image} name="image" />

          <meta content={seo.title} property="og:title" />
          <meta content={seo.description} property="og:description" />
          <meta content={seo.image} property="og:image" />
          <meta content={seo.url} property="og:url" />
          <meta content="website" property="og:type" />

          <meta content="summary_large_image" name="twitter:card" />
          <meta content="yhay81" name="twitter:creator" />
          <meta content={seo.title} name="twitter:title" />
          <meta content={seo.description} name="twitter:description" />
          <meta content={seo.image} name="twitter:image" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
