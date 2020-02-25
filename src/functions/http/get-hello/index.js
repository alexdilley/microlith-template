const middy = require('@middy/core');
const { use } = require('/opt/middleware');

const handler = middy(async req => {
  const { name } = req.queryStringParameters;

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, message: `hello, ${name || 'world'}!` }),
  };
});

use(handler);

module.exports = { handler };
