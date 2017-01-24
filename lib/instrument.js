'use strict';

const ms = require('ms');
const assert = require('assert');


class Instrument {

  constructor(logger, runtime) {
    assert(logger, 'logger is required');
    this.logger = logger;
    this.runtime = runtime;
  }

  start(event, action) {
    this.start = Date.now();
    this.event = event;
    this.action = action;
  }

  end() {
    const duration = Date.now() - this.start;
    this.logger.info(`[${this.event}] ${this.action} ${ms(duration)}`);

    if (this.runtime) {
      const val = this.runtime.get(this.event) || 0;
      this.runtime.set(this.event, val + duration);
    }
  }
}

module.exports = Instrument;
