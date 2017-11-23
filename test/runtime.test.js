'use strict';

const mm = require('egg-mock');

describe('test/instrument.test.js', () => {
  afterEach(mm.restore);

  describe('env = default', () => {
    let app;
    before(() => {
      mm.env('default');
      app = mm.cluster({
        baseDir: 'apps/runtime',
        cache: false,
      });
      return app.ready();
    });
    after(() => app.close());

    it('should not inject middleware', function* () {
      yield app.httpRequest(app.callback())
        .get('/runtime')
        .expect(200)
        .expect('done');

      app.notExpect('stdout', /status 200 \(rt:/);
    });
  });

  describe('env = local', () => {
    let app;
    before(() => {
      mm.env('local');
      app = mm.cluster({
        baseDir: 'apps/runtime',
        cache: false,
      });
      return app.ready();
    });
    after(() => app.close());

    it('should log for every request', function* () {
      yield app.httpRequest(app.callback())
        .get('/runtime')
        .expect(200)
        .expect('done');

      app.expect('stdout', /status 200 \(rt: \d+ms\)/);
    });

    it('should log for event', function* () {
      yield app.httpRequest(app.callback())
        .get('/event')
        .expect(200)
        .expect('done');

      app.expect('stdout', /\/event] status 200 \(rt: 3s, event1: 3s, event2: 3s\)/);
    });
  });

  describe('disable console', () => {
    let app;
    before(() => {
      mm.env('local');
      app = mm.cluster({
        baseDir: 'apps/disable-console',
        cache: false,
      });
      return app.ready();
    });
    after(() => app.close());

    it('should not log', function* () {
      yield app.httpRequest(app.callback())
        .get('/runtime')
        .expect(200)
        .expect('done');

      app.notExpect('stdout', /status 200 \(rt:/);
    });
  });

});
