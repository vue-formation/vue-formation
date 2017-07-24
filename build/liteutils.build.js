var liteutils = require('liteutils')
var path = require('path')

var config = {
  query: {
    minify: false,
    dest: path.resolve(__dirname, '../src/formation/utils/litequery/liteutils.query.js'),
    compileDir: path.resolve(__dirname, '../src/formation/utils/litequery'),
    eslint: false,
    babelrc: false,
    include: [
      'each',
      'find'
    ]
  },
  dash: {
    minify: false,
    dest: path.resolve(__dirname, '../src/formation/utils/litedash/liteutils.dash.js'),
    compileDir: path.resolve(__dirname, '../src/formation/utils/litedash'),
    eslint: false,
    babelrc: false,
    include: [
      'forEach',
      'get',
      'has',
      'includes',
      'intersection',
      'isArray',
      'isBoolean',
      'isFunction',
      'isNumber',
      'isObject',
      'isString',
      'kebabCase',
      'keys',
      'map',
      'merge',
      'reduce',
      'set',
      'sum',
      'toPath',
      'union',
      'uniq',
      'without'
    ]
  }
}

liteutils(config).then(function () {
  console.log('liteutils build complete')
})
  .catch(console.error)
