import { GTM_ID, HEAD_KEYS, MAIN_COLOR } from "@lib";
import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

const GTM_SCRIPT = `function gtag(){dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],gtag("js",new Date),gtag("config","${GTM_ID}");`;

export default class MyDocument extends Document {
  public render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap"
            rel="stylesheet"
          />

          <link
            href="/favicon.ico"
            key={HEAD_KEYS.linkIcon + ".ico"}
            rel={HEAD_KEYS.linkIcon}
          />
          <link
            href="/favicon.svg"
            key={HEAD_KEYS.linkIcon + ".svg"}
            rel={HEAD_KEYS.linkIcon}
            type="image/svg+xml"
          />
          <link
            href="/apple-touch-icon.png"
            key={HEAD_KEYS.linkAppleTouchIcon}
            rel={HEAD_KEYS.linkAppleTouchIcon}
            sizes="180x180"
          />
          <link
            color={MAIN_COLOR}
            href="/safari-pinned-tab.svg"
            key={HEAD_KEYS.linkMaskIcon}
            rel={HEAD_KEYS.linkMaskIcon}
          />

          <link
            crossOrigin="use-credentials"
            href="/site.webmanifest"
            key={HEAD_KEYS.linkManifest}
            rel={HEAD_KEYS.linkManifest}
          />

          <meta
            content="telephone=no,address=no,email=no"
            key={HEAD_KEYS.metaFormatDetection}
            name={HEAD_KEYS.metaFormatDetection}
          />

          <meta
            content={MAIN_COLOR}
            key={HEAD_KEYS.metaThemeColor}
            name={HEAD_KEYS.metaThemeColor}
          />
          <meta
            content="#042444"
            key={HEAD_KEYS.metaMsapplicationTilecolor}
            name={HEAD_KEYS.metaMsapplicationTilecolor}
          />

          <meta
            content="general"
            key={HEAD_KEYS.metaRating}
            name={HEAD_KEYS.metaRating}
          />

          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
            strategy="afterInteractive"
          />
          <Script
            dangerouslySetInnerHTML={{ __html: GTM_SCRIPT }}
            id="google-analytics"
            key={HEAD_KEYS.scriptGtagConfig}
            strategy="afterInteractive"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
