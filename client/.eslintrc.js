module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  plugins: ['svelte3'],
  rules: {
    // Dependencies have dev scope ∵ compiler.
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
      settings: {
        // Avoid pre-processor fisticuffs.
        'svelte3/ignore-styles': () => true,
      },
      rules: {
        'import/first': 'off', // imports occur within `<script>` tags
        'import/no-mutable-exports': 'off', // props
      },
    },
  ],
};
