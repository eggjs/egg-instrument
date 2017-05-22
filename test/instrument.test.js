'use strict';

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
    yield app.httpRequest(app.callback())
      .get('/context-instrument')
      .expect('done')
      .expect(200);

    app.expect('stdout', /\[context] action \d+/);
  });

  it('should call app.instrument', function* () {
    yield app.httpRequest(app.callback())
      .get('/app-instrument')
      .expect('done')
      .expect(200);

    app.expect('stdout', /\[app] action \d+/);
  });

  it('should call agent.instrument', function* () {
    yield app.httpRequest(app.callback())
      .get('/agent-instrument')
      .expect('done')
      .expect(200);

    app.expect('stdout', /\[agent] action \d+/);
  });
});
