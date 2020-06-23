module.exports = {
  singleQuote: true,
  trailingComma: 'es5',
  overrides: [
    {
      files: 'client/**/*.svelte',
      options: {
        svelteBracketNewLine: true,
      },
    },
  ],
};
