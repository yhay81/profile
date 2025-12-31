const js = require("@eslint/js");
const nextCoreWebVitals = require("eslint-config-next/core-web-vitals");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const reactPlugin = require("eslint-plugin-react");
const reactHooksPlugin = require("eslint-plugin-react-hooks");
const importPlugin = require("eslint-plugin-import");
const jsxA11yPlugin = require("eslint-plugin-jsx-a11y");
const promisePlugin = require("eslint-plugin-promise");
const eslintCommentsPlugin = require("eslint-plugin-eslint-comments");
const simpleImportSortPlugin = require("eslint-plugin-simple-import-sort");
const prettierConfig = require("eslint-config-prettier");

const tsAllConfigs = tsPlugin.configs["flat/all"].map((config) => {
  const rest = { ...config };
  delete rest.plugins;
  return rest.files ? rest : { ...rest, files: ["**/*.{ts,tsx,mts,cts}"] };
});

const importRecommendedRules = importPlugin.flatConfigs.recommended.rules;
const reactHooksRecommendedRules =
  reactHooksPlugin.configs.flat.recommended.rules;
const reactAllRules = reactPlugin.configs.flat.all.rules;
const jsxA11yStrictRules = jsxA11yPlugin.flatConfigs.strict.rules;
const promiseRecommendedRules = promisePlugin.configs["flat/recommended"].rules;

module.exports = [
  js.configs.recommended,
  ...nextCoreWebVitals,
  ...tsAllConfigs,
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}"],
    plugins: {
      "eslint-comments": eslintCommentsPlugin,
      promise: promisePlugin,
      "simple-import-sort": simpleImportSortPlugin,
    },
    settings: {
      react: { version: "detect" },
      "import/extensions": [".ts", ".tsx", ".d.ts", ".js"],
      "import/external-module-folders": ["node_modules", "node_modules/@types"],
    },
    rules: {
      ...eslintCommentsPlugin.configs.recommended.rules,
      ...importRecommendedRules,
      ...promiseRecommendedRules,
      ...reactHooksRecommendedRules,
      "eslint-comments/no-unused-disable": "warn",
      "import/exports-last": "warn",
      "import/newline-after-import": "warn",
      "import/no-default-export": "warn",
      "import/no-extraneous-dependencies": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "simple-import-sort/exports": "warn",
      "simple-import-sort/imports": "warn",
    },
  },
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["warn", "interface"],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/naming-convention": [
        "warn",
        {
          selector: "variable",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
        },
      ],
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
    },
  },
  {
    files: ["**/*.{jsx,tsx}"],
    rules: {
      ...reactAllRules,
      ...jsxA11yStrictRules,
      "jsx-a11y/anchor-is-valid": "off",
      "react/forbid-component-props": "off",
      "react/function-component-definition": "off",
      "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
      "react/jsx-max-depth": ["warn", { max: 6 }],
      "react/jsx-no-literals": "off",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/require-default-props": "off",
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}"],
    rules: {
      ...prettierConfig.rules,
    },
  },
  {
    files: ["app/**"],
    rules: { "import/no-default-export": "off", "import/exports-last": "off" },
  },
  {
    ignores: ["public"],
  },
];
