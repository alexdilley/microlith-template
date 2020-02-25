const httpErrorHandler = require('@middy/http-error-handler');
const httpEventNormalizer = require('@middy/http-event-normalizer');
const httpHeaderNormalizer = require('@middy/http-header-normalizer');
const httpJsonBodyParser = require('@middy/http-json-body-parser');

// Augment the supplied middlewares into the chain of those common to all handlers.
exports.use = (handler, ...middlewares) => {
  handler
    .use(httpEventNormalizer())
    .use(httpHeaderNormalizer())
    .use(httpJsonBodyParser());

  middlewares.forEach(middleware => handler.use(middleware));

  handler.use(httpErrorHandler());

  return handler;
};
