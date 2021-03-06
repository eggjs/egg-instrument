'use strict';

const Instrument = require('../../lib/instrument');
const noopInstrument = require('../../lib/noop_instrument');
const RUNTIME = require('../../lib/constant').RUNTIME;

module.exports = {
  /**
   * Init a instrument with startTime,
   * then compute the duration after call `instrument.end`,
   * `event` and `action` can help you distinguish which costs the time
   * @method Context#instrument
   * @param  {String} event - event of the instrument
   * @param  {String} action - one event contains several actions
   * @return {Instrument} instrument
   */
  instrument(event, action) {
    if (this.app.config.env !== 'local') {
      return noopInstrument;
    }
    if (!this[RUNTIME]) {
      this[RUNTIME] = new Map();
    }
    const ins = new Instrument(this.logger, this[RUNTIME]);
    ins.start(event, action);
    return ins;
  },
};
