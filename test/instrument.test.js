'use strict';

const request = require('supertest');
const mm = require('egg-mock');

describe('test/instrument.test.js', () => {
  let app;
  before(() => {
    mm.env('local');
    app = mm.cluster({
      baseDir: 'apps/instrument',
      cache: false,
    });
    return app.ready();
  });
  after(() => app.close());
  afterEach(mm.restore);

  it('should call ctx.instrument', function* () {
    yield request(app.callback())
      .get('/context-instrument')
      .expect('done')
      .expect(200);

    app.expect('stdout', /\[context] action \d+/);
  });

  it('should call app.instrument', function* () {
    yield request(app.callback())
      .get('/app-instrument')
      .expect('done')
      .expect(200);

    app.expect('stdout', /\[app] action \d+ms/);
  });

  it('should call agent.instrument', function* () {
    yield request(app.callback())
      .get('/agent-instrument')
      .expect('done')
      .expect(200);

    app.expect('stdout', /\[agent] action \d+ms/);
  });
});
