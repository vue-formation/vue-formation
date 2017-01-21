var liteutils = require('liteutils')
var path = require('path')
var fs = require('fs')

var config = {
  query: {
    minify: false,
    browserify: true,
    name: '$_',
    dest: path.resolve(__dirname, '../src/components/formation/common/query/liteutils.query.browser.js'),
    compileDir: path.resolve(__dirname, '../src/components/formation/common/query'),
    eslint: false,
    babelrc: false
  },
  dash: {
    minify: false,
    browserify: true,
    name: '_$',
    dest: path.resolve(__dirname, '../src/components/formation/common/dash/liteutils.dash.browser.js'),
    compileDir: path.resolve(__dirname, '../src/components/formation/common/dash'),
    eslint: false,
    babelrc: false
  }
}

liteutils(config).then(function () {
  console.log('liteutils build complete')
})
  .catch(console.error)
