// eslint-disable-next-line import/no-extraneous-dependencies
const Koa = require('koa');
const adapter = require('../koa-middleware-adapter');

const app = new Koa();

app.use(adapter.create((query) => JSON.stringify(query), {
  parameters: [adapter.parameter.query],
}));

app.listen(4000, () => {
  // eslint-disable-next-line no-console
  console.log('server is listening to port 4000');
});