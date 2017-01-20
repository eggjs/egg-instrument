'use strict';

const ms = require('ms');

class Instrument {

  constructor(ctx) {
    this.ctx = ctx;
    this.app = ctx.app;
  }

  start(event, action) {
    this.start = Date.now();
    this.event = event;
    this.action = action;
  }

  end() {
    const duration = ms(Date.now() - this.start);
    this.ctx.logger.info(`[${this.event}] ${this.action} ${duration}`);
  }
}

module.exports = Instrument;
