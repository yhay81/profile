import { HEAD_KEYS } from "@lib";
import Head from "next/head";
import type { Thing, WithContext } from "schema-dts";

interface Props {
  readonly headMeta: HeadMeta;
  readonly dts?: WithContext<Thing>;
  readonly image?: OgImage;
  readonly preconnectUrls?: readonly string[];
}

const DEFAULT_OG_IMAGE: OgImage = {
  alt: "Yusuke Hayashi",
  width: 160,
  height: 160,
  type: "image/webp",
  url: "/me.webp",
};

const HtmlHead: React.FC<Props> = ({
  headMeta,
  dts,
  image = DEFAULT_OG_IMAGE,
  preconnectUrls = [],
}: Props) => (
  <Head>
    <title key={HEAD_KEYS.title}>{headMeta.title}</title>

    {preconnectUrls.map((url) => (
      <link
        crossOrigin="anonymous"
        href={url}
        key={url}
        rel={HEAD_KEYS.linkPreconnect}
      />
    ))}

    <link
      href={headMeta.canonicalUrl}
      key={HEAD_KEYS.linkCanonical}
      rel={HEAD_KEYS.linkCanonical}
    />

    <meta
      content={headMeta.description}
      key={HEAD_KEYS.metaDescription}
      name={HEAD_KEYS.metaDescription}
    />

    <meta
      content={headMeta.title}
      key={HEAD_KEYS.metaOgTitle}
      property={HEAD_KEYS.metaOgTitle}
    />

    <meta
      content={headMeta.ogType ?? "website"}
      key={HEAD_KEYS.metaOgType}
      property={HEAD_KEYS.metaOgType}
    />

    <meta
      content={image.url}
      key={HEAD_KEYS.metaOgImage}
      property={HEAD_KEYS.metaOgImage}
    />

    <meta
      content={image.type}
      key={HEAD_KEYS.metaOgImageType}
      property={HEAD_KEYS.metaOgImageType}
    />

    <meta
      content={image.width.toString()}
      key={HEAD_KEYS.metaOgImageWidth}
      property={HEAD_KEYS.metaOgImageWidth}
    />

    <meta
      content={image.height.toString()}
      key={HEAD_KEYS.metaOgImageHeight}
      property={HEAD_KEYS.metaOgImageHeight}
    />

    <meta
      content={image.alt}
      key={HEAD_KEYS.metaOgImageAlt}
      property={HEAD_KEYS.metaOgImageAlt}
    />

    <meta
      content={headMeta.canonicalUrl}
      key={HEAD_KEYS.metaOgUrl}
      property={HEAD_KEYS.metaOgUrl}
    />

    <meta
      content={headMeta.description}
      key={HEAD_KEYS.metaOgDescription}
      property={HEAD_KEYS.metaOgDescription}
    />

    <meta
      content="en_US"
      key={HEAD_KEYS.metaOgLocale}
      property={HEAD_KEYS.metaOgLocale}
    />

    <meta
      content="Yusuke Hayashi"
      key={HEAD_KEYS.metaOgSiteName}
      property={HEAD_KEYS.metaOgSiteName}
    />

    <meta
      content={headMeta.twitterCard ?? "summary"}
      key={HEAD_KEYS.metaTwitterCard}
      name={HEAD_KEYS.metaTwitterCard}
    />

    {dts ? (
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dts) }}
        key={HEAD_KEYS.scriptStructuredData}
        type={HEAD_KEYS.scriptStructuredData}
      />
    ) : null}
  </Head>
);

export { HtmlHead };
