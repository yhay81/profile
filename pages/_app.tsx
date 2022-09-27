import "../styles/global.scss";

import React from "react";

const MyApp: React.FC<
  Readonly<{
    readonly Component: React.FC;
    readonly pageProps: Record<string, unknown>;
  }>
> = ({ Component, pageProps }) => <Component {...pageProps} />; // eslint-disable-line react/jsx-props-no-spreading

export default MyApp;
