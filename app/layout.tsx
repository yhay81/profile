import "../styles/global.scss";

import { GTM_ID, HEAD_KEYS, MAIN_COLOR } from "@lib";
import type { Metadata, Viewport } from "next";
import { Fira_Code, Space_Grotesk, Work_Sans } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const SITE_URL = "https://yusuke-hayashi.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: MAIN_COLOR },
    ],
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  other: {
    "msapplication-TileColor": "#042444",
    rating: "general",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  themeColor: MAIN_COLOR,
};

const GTM_SCRIPT = `function gtag(){dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],gtag("js",new Date),gtag("config","${GTM_ID}");`;

const RootLayout = ({ children }: { readonly children: ReactNode }) => (
  <html
    className={`${firaCode.variable} ${workSans.variable} ${spaceGrotesk.variable}`}
    lang="en"
  >
    <body>
      {children}

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
    </body>
  </html>
);

export default RootLayout;
