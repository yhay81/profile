# profile

Yusuke Hayashi のプロフィールページ(yusuke-hayashi.com)。

## Identity verification

OpenPGP 署名付きの機械可読 manifest を
[`/.well-known/identity.json`](https://yusuke-hayashi.com/.well-known/identity.json)
で配信する。detached signature、変更履歴、schema、公開検証 CLI も同じ `.well-known` 配下に置く。

```sh
gpg --locate-keys yusuke@haya.company
curl -sO https://yusuke-hayashi.com/.well-known/identity.json
curl -sO https://yusuke-hayashi.com/.well-known/identity.json.asc
gpg --verify identity.json.asc identity.json

curl -sO https://yusuke-hayashi.com/.well-known/verify-identity.mjs
node verify-identity.mjs
```

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
- `public/` — **外部参照される固定資産**(変更・移動禁止): `pgp-key.asc`(+.ots)、`.well-known/security.txt`(+.ots)、`.well-known/identity.json`(+署名・履歴・検証 CLI)、`.well-known/nostr.json`、`proofs/statement.txt.asc`、`proofs/eth-attestation.json`

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
Pages 用artifactでは `include-hidden-files: true` を必須とし、`/.well-known` を公開対象から落とさない。
デプロイ後は公開済み検証 CLI を取得して site-owned artifact を再検証し、公開経路まで含めてCIで確認する。

`main` の build では `dist/` を再現可能な `site-dist.tar.gz` にまとめ、GitHub Artifact
Attestation で commit・workflow・成果物 digest の provenance を発行する。ダウンロードした成果物は
`gh attestation verify site-dist.tar.gz -R yhay81/profile` で検証できる。

## 参考

- https://github.com/bchiang7/v4 (初代デザインの出発点)
- https://realfavicongenerator.net/
