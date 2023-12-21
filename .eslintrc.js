module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/jsx-runtime",
    "plugin:prettier/recommended",
    "plugin:import/typescript",
  ],
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["prettier", "import", "@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-inferrable-types": ["error", { ignoreParameters: true }],
    "@typescript-eslint/no-non-null-assertion": "off",
    "prettier/prettier": "error",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", ["internal", "unknown"]],
        pathGroups: [
          { pattern: "@component/**", group: "internal", position: "before" },
          { pattern: "~/**", group: "internal", position: "before" },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
};
