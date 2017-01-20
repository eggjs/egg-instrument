'use strict';

const Instrument = require('../../lib/instrument');

module.exports = {
  instrument(event, action) {
    const ins = new Instrument(this);
    ins.start(event, action);
    return ins;
  },
};
