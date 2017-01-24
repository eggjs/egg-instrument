'use strict';

const sleep = require('ko-sleep');


module.exports = app => {
  app.get('/runtime', function* () {
    this.body = 'done';
  });
};
