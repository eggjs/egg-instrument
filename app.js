'use strict';

module.exports = app => {
  if (app.config.env === 'local' && app.config.instrument.enableConsole) {
    app.config.coreMiddleware.push('instrument');
  }
};
