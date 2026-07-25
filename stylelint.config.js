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
      rules: {
        // :global() is an Astro-specific selector supported by scoped styles.
        "selector-pseudo-class-no-unknown": [
          true,
          { ignorePseudoClasses: ["global"] },
        ],
      },
    },
  ],
  rules: {
    "max-nesting-depth": 4,
    // Native CSS nesting evaluates declarations in source order, so @media
    // overrides must follow the declarations they override (unlike old SCSS).
    "order/order": [
      ["custom-properties", "declarations", "rules", "at-rules"],
      { severity: "error" },
    ],
    "plugin/declaration-block-no-ignored-properties": true,
    "plugin/no-low-performance-animation-properties": [
      true,
      // Color transitions only repaint and have negligible cost. Keyframe
      // animations remain restricted to transform and opacity.
      {
        ignoreProperties: [
          "color",
          "background-color",
          "border-color",
          "box-shadow",
        ],
      },
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
          "css-clip-path",
          "css-masks",
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
