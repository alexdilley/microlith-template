module.exports = {
  extends: ['airbnb-base', 'prettier'],
  env: {
    browser: true,
  },
  plugins: ['svelte3'],
  rules: {
    'import/prefer-default-export': 'off',
  },
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        'import/no-mutable-exports': 'off', // props
      },
    },
  ],
};
