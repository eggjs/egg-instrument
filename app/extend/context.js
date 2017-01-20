'use strict';

const Instrument = require('../../lib/instrument');

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
      return {
        end() {},
      };
    }
    const ins = new Instrument(this);
    ins.start(event, action);
    return ins;
  },
};
