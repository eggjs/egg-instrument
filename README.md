# egg-instrument

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-instrument.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-instrument
[travis-image]: https://img.shields.io/travis/eggjs/egg-instrument.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-instrument
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-instrument.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-instrument?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-instrument.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-instrument
[snyk-image]: https://snyk.io/test/npm/egg-instrument/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-instrument
[download-image]: https://img.shields.io/npm/dm/egg-instrument.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-instrument

Compute the duration of an operation in local environment.

## Install

```bash
$ npm i egg-instrument --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.instrument = {
  enable: true,
  package: 'egg-instrument',
};
```

Instrument can calculate the duration of an operation, for example

```js
// app/controller/home.js
exports.index = function* (ctx) {
  const ins = ctx.instrument('service', 'home.getData');
  const data = ctx.service.home.getData();
  ins.end();
  ctx.body = data;
};
```

Then you can see the infomation in console

```
2017-01-20 15:32:58,567 INFO 30445 [-/127.0.0.1/-/1024ms GET /] [service] home.getData 1006ms
```

If you are not in context level, you can use `app.instrument` or `agent.instrument`.

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
