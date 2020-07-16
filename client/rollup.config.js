import fs from 'fs';
import commonjs from '@rollup/plugin-commonjs';
import html from '@rollup/plugin-html';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import Handlebars from 'handlebars';
import copy from 'rollup-plugin-copy';
import css from 'rollup-plugin-css-asset';
import del from 'rollup-plugin-delete';
import livereload from 'rollup-plugin-livereload';
import svelte from 'rollup-plugin-svelte';
import tailwind from 'rollup-plugin-tailwindcss';
import { terser } from 'rollup-plugin-terser';
import preprocess from 'svelte-preprocess';

const mode = process.env.NODE_ENV;
const production = !process.env.ROLLUP_WATCH;

// Environment variables that start with `SVELTE_APP_` will be statically
// embedded into the client bundle.
const substitutions = Object.entries(process.env).reduce(
  (acc, [key, value]) => {
    if (key.startsWith('SVELTE_APP_')) {
      return { ...acc, [`process.env.${key}`]: JSON.stringify(value) };
    }
    return acc;
  },
  {}
);
const serve = () => {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        // eslint-disable-next-line global-require
        require('child_process').spawn('yarn', ['start'], {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true,
        });
      }
    },
  };
}

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    sourcemapExcludeSources: production,
    format: 'esm',
    name: 'app',
    dir: 'dist',
    entryFileNames: '[name].[hash].js',
    assetFileNames: '[name].[hash][extname]',
  },
  plugins: [
    del({ targets: 'dist/*', runOnce: true }),

    // All static assets placed in the `public` folder will simply be copied.
    copy({ targets: [{ src: 'public/**/*', dest: 'dist' }] }),

    replace({
      'process.env.NODE_ENV': JSON.stringify(mode),
      ...substitutions,
    }),

    svelte({
      // Enable run-time checks when not in production.
      dev: !production,
      preprocess: preprocess({ postcss: true }),
      emitCss: true,
    }),

    tailwind({ input: 'src/styles/index.css', purge: production }),
    css(), // emit as asset

    html({
      template: ({ files }) =>
        Handlebars.compile(fs.readFileSync('src/template.hbs', 'utf8'))(files),
    }),

    // If you have external dependencies installed from npm, you'll most likely
    // need these plugins. In some cases you'll need additional configuration --
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),

    // In dev mode, call `yarn start` once the bundle has been generated.
    !production && serve(),

    // Watch the `dist` directory and refresh the browser on changes when not in
    // production.
    !production && livereload('dist'),

    // If we're building for production (npm run build instead of npm run dev),
    // minify.
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
