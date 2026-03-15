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
Hero はタイピング導線を最小限にし、余白・指標を抑えた2段階構成で一段落ち着いた導線を持たせた。
About は時系列を縦導線として整え、各項目を短い説明文で読みやすく整理した。
Contact はメール先導線を軸に、コピー失敗時のフィードバック付き導線に改善した。
Side はホバー時のみ補助ラベルを出す控えめなUIにし、画面ノイズを抑えた。

## 開発

依存関係の管理は pnpm を使います。`pnpm install` の後に `pnpm dev` で起動できます。
プロフィール情報（名前/メールアドレス/SNS）は `lib/index.tsx` の共通定数で管理しています。
About セクションの経歴タイムラインは、表示上の期間表記を保ちながら `time` の `datetime` を有効な単一日付で扱う構成にしています。
公開日付は `app/sitemap.ts` で `lastModified` を自動反映する構成にしました。
品質チェックは `pnpm lint` で実行します（stylelint/eslint/prettier/tsc の確認）。
依存監査は `pnpm security:audit` で高リスク脆弱性（high 以上）を確認します。
整形は `pnpm fix` で実行し、自動修正します。
コミット時は `pre-commit` フックで `lint-staged` が差分ファイルの eslint/stylelint/prettier を自動実行します。
対象ブラウザは `package.json` の browserslist に合わせ、KaiOS/UC/QQ は対象外にしています。
Next.js 16 の dev は Turbopack になるため、webpack 系プラグインがあっても `turbopack: {}` を明示しています。
PWA は使わない方針のため、Service Worker や manifest は用意しません。

## デプロイ

GitHub Pages 向けに `output: "export"` で静的書き出ししています。`pnpm build` で `out` を生成して公開します。`/sitemap.xml` は `app/sitemap.ts` から生成されます。
GitHub Pages 向けの `basePath` などは Actions の `configure-pages` が注入する前提です。

## 参考

- https://github.com/bchiang7/v4
- https://realfavicongenerator.net/
- https://dev.to/masakudamatsu/favicon-nightmare-how-to-maintain-sanity-3al7
