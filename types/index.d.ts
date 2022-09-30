interface HeadMeta {
  readonly description: string;
  readonly ogType?: string;
  readonly title: string;
  readonly twitterCard?: "app" | "player" | "summary_large_image" | "summary";
  readonly canonicalUrl?: string;
}

interface OgImage {
  readonly alt: string;
  readonly height: number;
  readonly type: string;
  readonly url: string;
  readonly width: number;
}
