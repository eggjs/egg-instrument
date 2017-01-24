'use strict';

const sleep = require('ko-sleep');


module.exports = app => {
  app.get('/runtime', function* () {
    this.body = 'done';
  });

  app.get('/event', function* () {
    const event11 = this.instrument('event1', 'action1');
    const event12 = this.instrument('event1', 'action2');
    const event21 = this.instrument('event2', 'action1');
    yield sleep(1000);
    event11.end();
    yield sleep(1000);
    event12.end();
    yield sleep(1000);
    event21.end();
    this.body = 'done';
  });
};
