var liteutils = require('liteutils')
var path = require('path')

var config = {
  query: {
    minify: false,
    dest: path.resolve(__dirname, '../src/formation/utils/litequery/lquery.js'),
    compileDir: path.resolve(__dirname, '../src/formation/utils/litequery'),
    eslint: false,
    babelrc: false,
    postClean: false,
    include: [
      'each',
      'find'
    ]
  },
  dash: {
    minify: false,
    dest: path.resolve(__dirname, '../src/formation/utils/litedash/ldash.js'),
    compileDir: path.resolve(__dirname, '../src/formation/utils/litedash'),
    eslint: false,
    babelrc: false,
    postClean: false,
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
      'mapKeys',
      'merge',
      'omit',
      'properCase',
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
