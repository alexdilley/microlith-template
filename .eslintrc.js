module.exports = {
  extends: ['airbnb-base', 'prettier'],
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
};
