'use strict';

module.exports = {
  instrument(event, action) {
    const ctx = this.createAnonymousContext();
    return ctx.instrument(event, action);
  },
};
