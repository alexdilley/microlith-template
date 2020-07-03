#!/usr/bin/env node

const { createProxyMiddleware } = require('http-proxy-middleware');
const polka = require('polka');
const sirv = require('sirv');

const { API_BASE_URL, PORT = 3000, ROLLUP_WATCH } = process.env;
const dev = !!ROLLUP_WATCH;

polka()
  .use(
    createProxyMiddleware('/api', { target: API_BASE_URL, changeOrigin: true }),
    sirv('dist', { dev, single: true })
  )
  .listen(PORT, (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`> Ready on localhost:${PORT}~!`);
  });
