export interface LocalArticle {
  readonly title: string;
  readonly description: string;
  readonly url: `/${string}`;
  readonly datePublished: string;
  readonly dateModified: string;
}

export const TRUST_CONTROL_PLANE_ARTICLE = {
  title: "A Personal Trust Control Plane",
  description:
    "The current design for verifiable, monitorable, and recoverable public identity releases.",
  url: "/trust-control-plane",
  datePublished: "2026-07-21T21:21:40+09:00",
  dateModified: "2026-07-22T04:34:30+09:00",
} as const satisfies LocalArticle;

export const LOCAL_ARTICLES: readonly LocalArticle[] = [
  TRUST_CONTROL_PLANE_ARTICLE,
];
