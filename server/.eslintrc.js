module.exports = {
  parserOptions: {
    sourceType: 'script',
  },
  env: {
    node: true,
  },
  rules: {
    // `console` is used for logging in Lambda functions.
    'no-console': 'off',
    // Lambda Layers are extracted to `/opt`.
    'import/no-absolute-path': 'off',
    // AWS SDK is available by default in Lambda runtimes.
    'import/no-unresolved': 'off',
  },
};
