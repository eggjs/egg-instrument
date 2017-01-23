'use strict';

const Instrument = require('../../lib/instrument');
const noopInstrument = require('../../lib/noop_instrument');

module.exports = {
  /**
   * @method Application#instrument
   * @param  {String} event - distingush event
   * @param  {String} action - one event contains several actions
   * @return {Instrument} instrument
   * @see Context#instrument
   */
  instrument(event, action) {
    if (this.config.env !== 'local') {
      return noopInstrument;
    }
    const ins = new Instrument(this.logger);
    ins.start(event, action);
    return ins;
  },
};
