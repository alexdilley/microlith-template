#!/usr/bin/env node

const { createProxyMiddleware } = require('http-proxy-middleware');
const polka = require('polka');
const sirv = require('sirv');

const {
  API_BASE_URL,
  HOST = '0.0.0.0',
  PORT = 3000,
  ROLLUP_WATCH,
} = process.env;
const dev = !!ROLLUP_WATCH;

polka()
  .use(
    createProxyMiddleware('/api', { target: API_BASE_URL, changeOrigin: true }),
    sirv('dist', { single: true, host: true, dev })
  )
  .listen(PORT, HOST, (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log('Your application is ready~! 🚀');
  });
