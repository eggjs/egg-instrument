'use strict';

const ms = require('ms');
const RUNTIME = require('../../lib/constant').RUNTIME;

module.exports = () => {
  return function* (next) {
    yield next;

    const runtimes = [];
    runtimes.push(`rt: ${ms(Date.now() - this.starttime)}`);
    if (this[RUNTIME]) {
      for (const [ event, duration ] of this[RUNTIME].entries()) {
        console.log(event, duration);
        runtimes.push(`${event}: ${ms(duration)}`);
      }
    }
    this.logger.info(`status ${this.status} (${runtimes.join(', ')})`);
  };
};
