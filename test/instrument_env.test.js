'use strict';

const mm = require('egg-mock');

describe('test/instrument_env.test.js', () => {
  let app;
  before(() => {
    mm.env('default');
    app = mm.cluster({
      baseDir: 'apps/instrument',
      cache: false,
    });
    return app.ready();
  });
  after(() => app.close());
  afterEach(mm.restore);

  it('should call ctx.instrument but no info', function* () {
    yield app.httpRequest(app.callback())
      .get('/context-instrument')
      .expect('done')
      .expect(200);

    app.notExpect('stdout', /\[context] action \d+/);
  });

  it('should call app.instrument but no info', function* () {
    yield app.httpRequest(app.callback())
      .get('/app-instrument')
      .expect('done')
      .expect(200);

    app.notExpect('stdout', /\[app] action \d+/);
  });

  it('should call agent.instrument but no info', function* () {
    yield app.httpRequest(app.callback())
      .get('/agent-instrument')
      .expect('done')
      .expect(200);

    app.notExpect('stdout', /\[agent] action \d+/);
  });
});
