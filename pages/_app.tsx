import "../styles/global.scss";

import { GTM_ID, HEAD_KEYS } from "@lib";
import Head from "next/head";
import Script from "next/script";
import React from "react";

const GTM_SCRIPT = `function gtag(){dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],gtag("js",new Date),gtag("config","${GTM_ID}");`;

const MyApp: React.FC<
  Readonly<{
    readonly Component: React.FC;
    readonly pageProps: Record<string, unknown>;
  }>
> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta
        content="width=device-width,initial-scale=1,minimum-scale=1"
        key={HEAD_KEYS.metaViewport}
        name={HEAD_KEYS.metaViewport}
      />
    </Head>
    <Script
      async
      id={HEAD_KEYS.scriptGtag}
      src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
      strategy="afterInteractive"
    />
    <Script
      dangerouslySetInnerHTML={{ __html: GTM_SCRIPT }}
      id={HEAD_KEYS.scriptGtagConfig}
      strategy="afterInteractive"
    />
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </>
);

export default MyApp;
