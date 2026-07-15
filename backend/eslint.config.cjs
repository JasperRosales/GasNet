module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",

      globals: {
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        // common Node globals used in this project
        Buffer: "readonly",
        console: "readonly",
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        module: "readonly",
        require: "readonly"
      }
    },
    rules: {}
  }
];
