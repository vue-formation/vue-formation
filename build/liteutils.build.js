var liteutils = require('liteutils')
var path = require('path')
var fs = require('fs')
var dest = path.resolve(__dirname, '../src/components/formation/common/query/liteutils.query.browser.js')
var compileDir = path.resolve(__dirname, '../src/components/formation/common/query')

var config = {
  query: {
    minify: false,
    browserify: true,
    name: '$_',
    dest: dest,
    compileDir: compileDir,
    eslint: false
  }
}

liteutils(config).then(function () {
  console.log('liteutils build complete')
})
  .catch(console.error)
