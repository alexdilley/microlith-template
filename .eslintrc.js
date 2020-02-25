module.exports = {
  extends: ['airbnb-base', 'prettier'],
  env: {
    browser: true,
  },
  plugins: ['svelte3'],
  rules: {
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        'newlines-between': 'never',
        alphabetize: { order: 'asc' },
      },
    ],
  },
  overrides: [
    {
      files: ['src/functions/**/*'],
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        // `console` is used for logging in Lambda functions.
        'no-console': 'off',
        // Lambda Layers are extracted to `/opt`.
        'import/no-absolute-path': 'off',
        // AWS SDK is available by default in Lambda runtimes.
        'import/no-unresolved': 'off',
      },
    },
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        'import/no-mutable-exports': 'off', // props
      },
    },
  ],
};
