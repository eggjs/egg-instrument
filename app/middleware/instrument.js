'use strict';

const ms = require('ms');
const RUNTIME = require('../../lib/constant').RUNTIME;

module.exports = () => {
  return async function instrument(ctx, next) {
    await next();

    const runtimes = [];
    runtimes.push(`rt: ${ms(Date.now() - ctx.starttime)}`);
    if (ctx[RUNTIME]) {
      for (const [ event, duration ] of ctx[RUNTIME].entries()) {
        runtimes.push(`${event}: ${ms(duration)}`);
      }
    }
    ctx.logger.info(`status ${ctx.status} (${runtimes.join(', ')})`);
  };
};
