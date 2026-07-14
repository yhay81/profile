// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://yusuke-hayashi.com",
  // 既存 URL(/keys 等、拡張子なし・リダイレクトなし)を維持するため
  // ディレクトリ形式ではなくファイル形式(keys.html)で出力する
  build: {
    format: "file",
    // ページ数が少ない静的サイトでは CSS を常時インライン化して
    // レンダリング前の RTT を 1 往復削る方が LCP に効く
    inlineStylesheets: "always",
  },
});
