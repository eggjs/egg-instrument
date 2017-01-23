'use strict';

const ms = require('ms');
const assert = require('assert');


class Instrument {

  constructor(logger) {
    assert(logger, 'logger is required');
    this.logger = logger;
  }

  start(event, action) {
    this.start = Date.now();
    this.event = event;
    this.action = action;
  }

  end() {
    const duration = ms(Date.now() - this.start);
    this.logger.info(`[${this.event}] ${this.action} ${duration}`);
  }
}

module.exports = Instrument;
