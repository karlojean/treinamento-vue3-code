module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\js$": "babel-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)$",
  moduleFileExtensions: ["vue", "js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^axios$": "axios/dist/node/axios.cjs",
    "/.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$/":
      "tests/__mocks__/fileMock.js",
  },
  coveragePathIgnorePatterns: ["/node_modules/", "/tests/"],
  coverageReporters: ["text", "json-summary"],
  // Fix in order for vue-test-utils to work with Jest 29
  // https://test-utils.vuejs.org/migration/#test-runners-upgrade-notes
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
};
