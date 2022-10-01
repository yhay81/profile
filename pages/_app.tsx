import "../styles/global.scss";

import { HEAD_KEYS } from "@lib";
import Head from "next/head";
import React from "react";

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
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </>
);

export default MyApp;
