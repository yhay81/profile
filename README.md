# profile

Yusuke Hayashi のプロフィールページ。

## 開発

依存関係の管理は pnpm を使います。`pnpm install` の後に `pnpm dev` で起動できます。

## デプロイ

GitHub Pages + `next export` で公開しています。HTTP ヘッダーは使えないため、CSP は `pages/_document.tsx` の `<meta http-equiv="Content-Security-Policy">` で設定しています。

## 参考

- https://github.com/bchiang7/v4
- https://realfavicongenerator.net/
- https://dev.to/masakudamatsu/favicon-nightmare-how-to-maintain-sanity-3al7
