'use strict';

const request = require('supertest');
const mm = require('egg-mock');

describe('test/instrument.test.js', () => {
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
    yield request(app.callback())
      .get('/context-instrument')
      .expect('done')
      .expect(200);

    app.notExpect('stdout', /\[context] action \d+ms/);
  });

});
