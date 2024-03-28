module.exports = {
  root: true,
  env: {
    node: true,
    "vue/setup-compiler-macros": true,
  },
  extends: ["plugin:vue/vue3-essential", "@vue/standard"],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    quotes: "double",
    "vue/multi-word-component-names": 0,
    "comma-dangle": ["error", "always-multiline"],
    semi: [2, "always"],
    "space-before-function-paren": ["error", "never"],
  },
  overrides: [
    {
      files: ["**/*.spec.js"],
      env: {
        jest: true,
      },
    },
  ],
};
