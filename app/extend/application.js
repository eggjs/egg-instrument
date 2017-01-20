'use strict';

module.exports = {
  /**
   * @method Application#instrument
   * @param  {String} event - distingush event
   * @param  {String} action - one event contains several actions
   * @return {Instrument} instrument
   * @see Context#instrument
   */
  instrument(event, action) {
    const ctx = this.createAnonymousContext();
    return ctx.instrument(event, action);
  },
};
