const nodeGlobals = {
  process: "readonly",
  console: "readonly",
  __dirname: "readonly",
  __filename: "readonly",
  module: "readonly",
  exports: "readonly",
  require: "readonly",
};

const jestGlobals = {
  describe: "readonly",
  test: "readonly",
  it: "readonly",
  expect: "readonly",
  beforeEach: "readonly",
  afterEach: "readonly",
  beforeAll: "readonly",
  afterAll: "readonly",
  jest: "readonly",
};

const baseRules = {
  "no-unused-vars": "error",
  "no-undef": "error",
  "eqeqeq": ["error", "always"],
};

module.exports = [
  // 1) Default: src on CommonJS (server.js jne.)
  {
    files: ["src/**/*.{js,cjs}"],
    ignores: ["src/tasks/**/*.js"], // käsitellään ESM erikseen alla
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: nodeGlobals,
    },
    rules: baseRules,
  },

  // 2) ESM: src/tasks käyttää import/export
  {
    files: ["src/tasks/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: nodeGlobals,
    },
    rules: baseRules,
  },

  // 3) Testit: CommonJS + Jest
  {
    files: ["tests/**/*.{js,cjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: { ...nodeGlobals, ...jestGlobals },
    },
    rules: baseRules,
  },
];
