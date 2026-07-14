# profile

Yusuke Hayashi のプロフィールページ(yusuke-hayashi.com)。

## 技術方針

Astro + ネイティブ CSS の静的サイト。フレームワークランタイムを持たず、出力はデフォルトで JS ゼロの純 HTML/CSS。プラットフォーム標準機能を優先する:

- **ページ遷移**: Cross-document View Transitions(`@view-transition`、CSS のみ)+ Speculation Rules API(内部リンクの prerender)。SPA ルーターは使わない
- **モーション**: Scroll-driven Animations(`animation-timeline: view()`)によるリビール、CSS `steps()` のみのタイプライター演出。すべて `prefers-reduced-motion` で無効化
- **色**: OKLCH のデザイントークン + `color-mix()` で透明度バリエーションを導出(`src/styles/tokens.css` が単一の情報源。生 rgb/hex リテラル禁止 — stylelint の `declaration-strict-value` で強制)
- **JS を使う場所**: SIWE デモ(viem、/siwe のみ ~46KB)とメールコピー(~30 行)だけ。それ以外のページは JS ゼロ。アナリティクスなし・第三者スクリプトなし

## 構成

- `src/layouts/Base.astro` — 共通シェル(メタ・OG/Twitter カード・Speculation Rules)
- `src/components/` — SectionHeader / CodeBlock / TrustGraph など
- `src/pages/` — `/`(Hero+About+Contact)、`/identity`(トラストグラフ)、`/keys`、`/proofs`、`/siwe`、`sitemap.xml.ts`
- `src/lib/site.ts` — プロフィール情報・ソーシャルリンク・鍵指紋などの共通定数
- `public/` — **外部参照される固定資産**(変更・移動禁止): `pgp-key.asc`(+.ots)、`.well-known/security.txt`(+.ots)、`.well-known/nostr.json`、`proofs/statement.txt.asc`、`proofs/eth-attestation.json`

## デザイン

ダークネイビー + ネオングリーンのターミナル調。主要フォントは Work Sans / Space Grotesk / Fira Code(fontsource で self-host)。背景の薄いグリッド、セクション番号と見出しのリズム、`:focus-visible` のアウトライン。プロフィール写真は `astro:assets` でビルド時に最適化。

## 開発

```sh
pnpm install
pnpm dev        # localhost:4321
pnpm build      # dist/ に静的書き出し
pnpm lint       # astro check + eslint + stylelint + prettier
pnpm fix        # 自動修正
pnpm security:audit
```

コミット時は husky + lint-staged が差分の eslint/stylelint/prettier を自動実行します。

## デプロイ

GitHub Actions(`.github/workflows/pages.yml`)で lint → audit → `astro build` → GitHub Pages(`dist/`)。
`build.format: "file"` により `/keys` などの拡張子なし URL を 301 なしで維持しています。
sitemap は `src/pages/sitemap.xml.ts` の静的エンドポイントで、`robots.txt` の記載と同じ `/sitemap.xml` 名で生成します。

## 参考

- https://github.com/bchiang7/v4 (初代デザインの出発点)
- https://realfavicongenerator.net/
