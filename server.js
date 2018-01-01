const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const send = require('koa-send');

const PORT = 3000;

const app = new Koa();

app.use(async (ctx) => {
  await send(ctx, ctx.path, { index: 'index.html', root: path.resolve(__dirname, 'dist') });
});

app.listen(PORT);

console.log(`Server started: http://localhost:${PORT}/`);
