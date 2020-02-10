module.exports = ctx => ({
  plugins: {
    'postcss-import': true,
    tailwindcss: true,
    cssnano: ctx.env === 'production' ? {} : false,
  },
});
