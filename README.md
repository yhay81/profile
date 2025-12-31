# profile

Yusuke Hayashi のプロフィールページ。

## デザイン

主要フォントは Work Sans / Space Grotesk / Fira Code。
モーションは prefers-reduced-motion に合わせて抑制し、見出しは左揃えとラインで区切る。

## 開発

依存関係の管理は pnpm を使います。`pnpm install` の後に `pnpm dev` で起動できます。
整形は `pnpm lint` で実行します（stylelint/eslint の修正後に prettier の `--write` を走らせます）。
Next.js 16 の dev は Turbopack になるため、webpack 系プラグインがあっても `turbopack: {}` を明示しています。

## デプロイ

GitHub Pages 向けに `output: "export"` で静的書き出ししています。`pnpm build` で `out` を生成して公開します。
GitHub Pages 向けの `basePath` などは Actions の `configure-pages` が注入する前提です。

## 参考

- https://github.com/bchiang7/v4
- https://realfavicongenerator.net/
- https://dev.to/masakudamatsu/favicon-nightmare-how-to-maintain-sanity-3al7
