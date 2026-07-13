export default {
  extends: ["stylelint-config-standard"],
  plugins: [
    "stylelint-declaration-block-no-ignored-properties",
    "stylelint-declaration-strict-value",
    "stylelint-high-performance-animation",
    "stylelint-no-unsupported-browser-features",
    "stylelint-order",
  ],
  overrides: [
    {
      files: ["**/*.astro"],
      customSyntax: "postcss-html",
    },
  ],
  rules: {
    "max-nesting-depth": 4,
    "order/order": [
      ["custom-properties", "at-rules", "declarations", "rules"],
      { severity: "warning" },
    ],
    "plugin/declaration-block-no-ignored-properties": true,
    "plugin/no-low-performance-animation-properties": [
      true,
      // color 系の transition は再ペイントのみで実害が小さいため許容する
      // (アニメーション(@keyframes)は引き続き transform/opacity に限定)
      { ignoreProperties: ["color", "background-color", "border-color"] },
    ],
    "scale-unlimited/declaration-strict-value": [
      "/color$/",
      {
        disableFix: true,
        ignoreValues: ["inherit", "transparent", "currentcolor"],
        ignoreFunctions: true,
      },
    ],
    "plugin/no-unsupported-browser-features": [
      true,
      {
        ignore: [
          "css-backdrop-filter",
          "css-gradients",
          "css-appearance",
          "css-media-range-syntax",
          "css-math-functions",
          "css-nesting",
          "css-overflow",
          "css-scroll-behavior",
          "css-when-else",
          "prefers-reduced-motion",
          "text-decoration",
          "css-lch-lab",
          "css-relative-colors",
          "css-container-queries",
          "css-has",
          "css-text-wrap-balance",
          "registered-custom-properties",
          "view-transitions",
          "mdn-css_properties_animation-timeline",
        ],
      },
    ],
    "selector-class-pattern": "^([a-z][a-z0-9]+)+([A-Z][a-z0-9]+)*$",
    "selector-max-type": 2,
  },
  ignoreFiles: ["node_modules/**", "dist/**", "out/**", "public/**"],
};
