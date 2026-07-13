// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://yusuke-hayashi.com",
  // GitHub Pages 上の既存 URL(/keys 等、拡張子なし・301 なし)を維持するため
  // ディレクトリ形式ではなくファイル形式(keys.html)で出力する
  build: {
    format: "file",
  },
});
