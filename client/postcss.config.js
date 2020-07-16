module.exports = (ctx) => ({
  plugins: {
    'postcss-import': true,
    tailwindcss: true,
    'postcss-preset-env': {
      features: {
        'focus-visible-pseudo-class': { preserve: false },
        'nesting-rules': true,
      },
    },
    cssnano: ctx.env === 'production' ? {} : false,
  },
});
