module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-sass-guidelines",
    "stylelint-a11y/recommended",
    "stylelint-config-prettier",
  ],
  plugins: [
    "stylelint-csstree-validator",
    "stylelint-declaration-block-no-ignored-properties",
    "stylelint-declaration-strict-value",
    "stylelint-high-performance-animation",
    "stylelint-no-unsupported-browser-features",
    "stylelint-use-nesting",
  ],
  rules: {
    "csstools/use-nesting": "always",
    "csstree/validator": {
      syntaxExtensions: ["sass"],
    },
    "max-nesting-depth": 4,
    "order/properties-alphabetical-order": null,
    "order/order": [
      [
        "dollar-variables",
        "custom-properties",
        "at-rules",
        "declarations",
        "rules",
      ],
      { severity: "warning" },
    ],
    "plugin/declaration-block-no-ignored-properties": true,
    "plugin/no-low-performance-animation-properties": true,
    "scale-unlimited/declaration-strict-value": [
      "/color$/",
      { disableFix: true },
    ],
    "plugin/no-unsupported-browser-features": [
      true,
      {
        ignore: [
          "css-gradients",
          "css-appearance",
          "css-mixblendmode",
          "multicolumn",
        ],
      },
    ],
    "selector-class-pattern": "^([a-z][a-z0-9]+)+([A-Z][a-z0-9]+)*$",
    "selector-max-type": 2,
    "scale-unlimited/declaration-strict-value": null,
  },
  ignoreFiles: ["node_modules", "**/*.tsx"],
};
