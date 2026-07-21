// サイト内記事と Zenn 記事(日本語)を新しい順に並べた一覧。
// Zenn の公開年月は yhay81/blog のコミット履歴から確定したもの。
export interface WritingEntry {
  readonly date: string; // YYYY-MM
  readonly title: string;
  readonly url: string;
  readonly external: boolean;
}

export const WRITING: readonly WritingEntry[] = [
  {
    date: "2026-07",
    title: "A Personal Trust Control Plane",
    url: "/trust-control-plane",
    external: false,
  },
  {
    date: "2025-12",
    title: "State of AI 2025（Web開発AI調査）の要点：普及と詰まりどころ",
    url: "https://zenn.dev/yhay81/articles/202512-stateofai",
    external: true,
  },
  {
    date: "2025-12",
    title:
      "Google Fonts の日本語フォント、いつの間に増えた？（2025年末の現状）",
    url: "https://zenn.dev/yhay81/articles/202512-webfont",
    external: true,
  },
  {
    date: "2024-02",
    title: "UnoCSS の紹介",
    url: "https://zenn.dev/yhay81/articles/202402-unocss",
    external: true,
  },
  {
    date: "2021-07",
    title: "SEOの基礎知識",
    url: "https://zenn.dev/yhay81/articles/yhay81-202107-seo",
    external: true,
  },
  {
    date: "2021-02",
    title: "2021年Python開発リンター導入のベストプラクティス",
    url: "https://zenn.dev/yhay81/articles/yhay81-202102-pythonlint",
    external: true,
  },
  {
    date: "2021-02",
    title: "pipでもlockで依存パッケージバージョンを管理しましょう",
    url: "https://zenn.dev/yhay81/articles/yhay81-202102-piplock",
    external: true,
  },
  {
    date: "2021-02",
    title: "Djangoのバージョンをアップデートする時に",
    url: "https://zenn.dev/yhay81/articles/yhay81-202102-djangoupdate",
    external: true,
  },
  {
    date: "2021-01",
    title: "migration、fixtureと開発時の起動スクリプトに関する私見",
    url: "https://zenn.dev/yhay81/articles/yhay81-202101-migration",
    external: true,
  },
  {
    date: "2021-01",
    title:
      "スクレイピングや自動処理など「エラーコツコツ潰していく系開発」に効く Sentry",
    url: "https://zenn.dev/yhay81/articles/f1c1167920dad3",
    external: true,
  },
  {
    date: "2021-01",
    title: "ESLint のススメ（Biome を使わない場合）",
    url: "https://zenn.dev/yhay81/articles/def73cf8a02864",
    external: true,
  },
  {
    date: "2021-01",
    title:
      "Python の型付けを練習しつつ OSS に貢献する: python-patterns の Issue を題材に",
    url: "https://zenn.dev/yhay81/articles/a2851e8cee69210ca16a",
    external: true,
  },
  {
    date: "2021-01",
    title: "データベースの設計時に使うツールなど",
    url: "https://zenn.dev/yhay81/articles/9fa94a589b33ad",
    external: true,
  },
];
