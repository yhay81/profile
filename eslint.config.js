import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import prettierConfig from "eslint-config-prettier";
import astro from "eslint-plugin-astro";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

export default defineConfig(
  globalIgnores([
    "dist/",
    "out/",
    ".astro/",
    ".wrangler/",
    "node_modules/",
    "public/",
  ]),
  js.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  astro.configs.recommended,
  // eslint-plugin-astro builds this from eslint-plugin-jsx-a11y-x, the
  // maintained fork that declares ESLint 10 support.
  astro.configs["jsx-a11y-strict"],
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "no-console": ["error", { allow: ["warn", "error"] }],
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    },
  },
  prettierConfig,
);
