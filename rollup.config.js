import fs from 'fs';
import html from '@rollup/plugin-html';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import css from 'rollup-plugin-css-asset';
import livereload from 'rollup-plugin-livereload';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import Handlebars from 'handlebars';

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        // eslint-disable-next-line global-require
        require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
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
    format: 'iife',
    name: 'app',
    dir: 'dist',
    entryFileNames: '[name].[hash].js',
    assetFileNames: '[name].[hash][extname]',
  },
  plugins: [
    // All static assets placed in the `public` folder will simply be copied.
    copy({ targets: [{ src: 'public/**/*', dest: 'dist' }] }),

    svelte({
      // Enable run-time checks when not in production.
      dev: !production,
      emitCss: true,
    }),

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

    // In dev mode, call `npm run start` once the bundle has been generated.
    !production && serve(),

    // Watch the `public` directory and refresh the browser on changes when not
    // in production.
    !production && livereload('public'),

    // If we're building for production (npm run build instead of npm run dev),
    // minify.
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
