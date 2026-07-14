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

## Release integrity

[`/integrity`](https://yusuke-hayashi.com/integrity) は、source commit、再現可能 build
provenance、performance contract、identity proof を一つの検証面にまとめる。通常 asset
は SHA-256 で完全一致を検証する。Cloudflare が先頭に managed policy を加える
`robots.txt` は、source-controlled suffix の byte 数と SHA-256 を検証する。自己参照になる
`release.json` と配信設定は asset set 外だが、archive attestation には含まれる。ブラウザー内の
検証器はクリックされるまで読み込まれない。

```sh
node scripts/verify-release.mjs --base-url https://yusuke-hayashi.com
```

機械可読の [`release.json`](https://yusuke-hayashi.com/.well-known/release.json) と
[`performance.json`](https://yusuke-hayashi.com/.well-known/performance.json) は各 build で
決定論的に生成される。CSP の inline script/style hash も同じ build で生成し、未登録の
inline code は本番で実行できない。

## 技術方針

Astro + ネイティブ CSS の静的サイト。フレームワークランタイムを持たず、出力はデフォルトで JS ゼロの純 HTML/CSS。プラットフォーム標準機能を優先する:

- **ページ遷移**: Cross-document View Transitions(`@view-transition`、CSS のみ)+ Speculation Rules API(内部リンクの prerender)。SPA ルーターは使わない
- **モーション**: Scroll-driven Animations(`animation-timeline: view()`)によるリビール、CSS `steps()` のみのタイプライター演出。すべて `prefers-reduced-motion` で無効化
- **色**: OKLCH のデザイントークン + `color-mix()` で透明度バリエーションを導出(`src/styles/tokens.css` が単一の情報源。生 rgb/hex リテラル禁止 — stylelint の `declaration-strict-value` で強制)
- **フォント**: `system-ui` / `ui-monospace` のみ。Web フォントの取得・preload・表示待ちを発生させない
- **JS を使う場所**: SIWE デモ(viem はクリック時 import)、メールコピー、`/integrity` の検証器だけ。OpenPGP/viem を含む暗号コードは検証開始時まで import しない。アナリティクスなし・第三者スクリプトなし
- **performance contract**: 主要 route の圧縮 HTML/初期 JS 上限と、第三者 request・font・RUM が常に 0 であることを build で強制
- **security headers**: build 出力から生成する hash-based CSP、HSTS、COOP/CORP、Permissions-Policy、nosniff、clickjacking 防止を Cloudflare edge で付与

## 構成

- `src/layouts/Base.astro` — 共通シェル(メタ・OG/Twitter カード・Speculation Rules)
- `src/components/` — SectionHeader / CodeBlock / TrustGraph など
- `src/pages/` — `/`(Hero+About+Contact)、`/identity`(トラストグラフ)、`/integrity`(release ledger + browser verifier)、`/keys`、`/proofs`、`/siwe`、`sitemap.xml.ts`
- `src/lib/site.ts` — プロフィール情報・ソーシャルリンク・鍵指紋などの共通定数
- `public/` — **外部参照される固定資産**(変更・移動禁止): `pgp-key.asc`(+.ots)、`.well-known/security.txt`(+.ots)、`.well-known/identity.json`(+署名・履歴・検証 CLI)、`.well-known/nostr.json`、`proofs/statement.txt.asc`、`proofs/eth-attestation.json`

## デザイン

ダークネイビー + ネオングリーンのターミナル調。OS ネイティブフォントによる即時描画、背景の薄いグリッド、セクション番号と見出しのリズム、`:focus-visible` のアウトライン。プロフィール写真は `astro:assets` でビルド時に最適化。

## 開発

```sh
pnpm install
pnpm dev        # localhost:4321
pnpm build      # dist/ に静的書き出し
pnpm verify:release # 公開中の全 asset hash と performance report を再検証
pnpm deploy:cloudflare # 検証済み dist/ を Cloudflare へ配置
pnpm lint       # astro check + eslint + stylelint + prettier
pnpm fix        # 自動修正
pnpm security:audit
```

コミット時は husky + lint-staged が差分の eslint/stylelint/prettier を自動実行します。

## デプロイ

GitHub Actions(`.github/workflows/cloudflare.yml`)で lint → audit → 再現可能ビルド → artifact attestation → Cloudflare Workers Static Assets への直接配置を行う。リクエスト時に Worker コードは実行しない。
`build.format: "file"` と `assets.html_handling: "drop-trailing-slash"` により、`/keys` などの拡張子なし URL をリダイレクトなしで維持する。
sitemap は `src/pages/sitemap.xml.ts` の静的エンドポイントで、`robots.txt` の記載と同じ `/sitemap.xml` 名で生成します。
`dist/` 全体を固定 metadata の archive にして job 間で受け渡すため、`/.well-known` も欠落せず、attestation 対象と実際のデプロイ内容が一致する。
ハッシュ付きの `/_astro/*` は `public/_headers` で1年間 immutable、HTML と固定 URL の identity artifact は Cloudflare 標準の再検証動作を使う。
デプロイ後は release manifest の全 asset と公開済み identity 検証 CLI を再検証し、security header と RUM 不在も CI で確認する。別の daily workflow が DNS を含む identity claim と公開中の全 byte を毎日監視する。

CIでは同じcommitを2回buildし、固定metadataで作った `site-dist.tar.gz` のSHA-256一致を必須にする。
`main` の build では検証済みのarchiveに対してGitHub Artifact
Attestation で commit・workflow・成果物 digest の provenance を発行する。ダウンロードした成果物は
`gh attestation verify site-dist.tar.gz -R yhay81/profile` で検証できる。

## 参考

- https://github.com/bchiang7/v4 (初代デザインの出発点)
- https://realfavicongenerator.net/
