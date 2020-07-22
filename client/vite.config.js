const replace = require('@rollup/plugin-replace');
const preprocess = require('svelte-preprocess');
const svelte = require('vite-plugin-svelte');

const argv = process.argv.slice(2);
const cmd = argv[0];

const { API_BASE_URL } = process.env;

// Environment variables that start with `VITE_` will be statically embedded
// into the client bundle.
const substitutions = Object.entries(process.env).reduce(
  (acc, [key, value]) => {
    if (key.startsWith('VITE_')) {
      return { ...acc, [`import.meta.env.${key}`]: JSON.stringify(value) };
    }
    return acc;
  },
  {}
);

module.exports = {
  proxy: {
    '/api': { target: API_BASE_URL, changeOrigin: true },
  },
  sourcemap: cmd === 'build',
  rollupInputOptions: {
    plugins: [replace(substitutions)],
  },
  rollupOutputOptions: {
    sourcemapExcludeSources: true,
  },
  assetsDir: '',
  plugins: [svelte({ preprocess: preprocess({ postcss: true }) })],
  rollupDedupe: ['svelte'],
};
