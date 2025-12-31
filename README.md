# profile

Yusuke Hayashi のプロフィールページ。

## デザイン

主要フォントは Work Sans / Space Grotesk / Fira Code。
モーションは Hero/Nav/Side のみに絞り、prefers-reduced-motion では抑制しつつスムーススクロールも無効化する。
背景に薄いグリッドを重ね、Skills はチップ表示で情報の粒度を揃える。
About と Contact は同じ幅で揃える。
ヘッダーと本文の左右余白は `--page-padding` で統一する。
フォーカスは `:focus-visible` のアウトラインで見やすくする。
ヒーローのキッカーは小画面で字間を詰め、スクロール矢印は低い画面高で隠す。
ネオンの淡いスポットとグリッドでカートグラフィ感を最小限に足す。
セクション番号と見出しのリズムでエディトリアル調の流れを作る。
プロフィール写真は自然な色味を維持し、淡いネオンの縁取りで立体感を出す。

## 開発

依存関係の管理は pnpm を使います。`pnpm install` の後に `pnpm dev` で起動できます。
整形は `pnpm lint` で実行します（stylelint/eslint の修正後に prettier の `--write` を走らせます）。
対象ブラウザは `package.json` の browserslist に合わせ、KaiOS/UC/QQ は対象外にしています。
Next.js 16 の dev は Turbopack になるため、webpack 系プラグインがあっても `turbopack: {}` を明示しています。
PWA は使わない方針のため、Service Worker や manifest は用意しません。

## デプロイ

GitHub Pages 向けに `output: "export"` で静的書き出ししています。`pnpm build` で `out` を生成して公開します。
GitHub Pages 向けの `basePath` などは Actions の `configure-pages` が注入する前提です。

## 参考

- https://github.com/bchiang7/v4
- https://realfavicongenerator.net/
- https://dev.to/masakudamatsu/favicon-nightmare-how-to-maintain-sanity-3al7
