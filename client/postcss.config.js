module.exports = (ctx) => ({
  plugins: {
    'postcss-import': true,
    tailwindcss: true,
    'postcss-preset-env': {
      features: {
        'nesting-rules': true,
      },
    },
    cssnano: ctx.env === 'production' ? {} : false,
  },
});
