'use strict';

const sleep = require('ko-sleep');


module.exports = app => {
  app.get('/context-instrument', function* () {
    const ins = this.instrument('context', 'action');
    yield sleep(1000);
    ins.end();
    this.body = 'done';
  });

  app.get('/app-instrument', function* () {
    const ins = this.app.instrument('app', 'action');
    yield sleep(1000);
    ins.end();
    this.body = 'done';
  });

  app.get('/agent-instrument', function* () {
    this.app.messenger.sendToAgent('instrument');
    yield sleep(2000);
    this.body = 'done';
  });
};
