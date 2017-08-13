var path = require('path')
var rollup = require('rollup')
var vue = require('rollup-plugin-vue')
var babel = require('rollup-plugin-babel')
var browserify = require('browserify')
var Promise = require('bluebird')
var fs = require('fs')
var uglify = require('uglify-js')
var cache
Promise.promisifyAll(fs)

// main function to build each file
function build (entry, dest, external = [], plugins = [], standalone = '') {
  return rollup.rollup({
    cache: cache,
    entry: entry,
    external: external,
    plugins: plugins
  })
    .then(function (bundle) {
      return bundle.write({
        dest: path.resolve(__dirname, '../' + dest + '.js'),
        format: 'cjs'
      })
    })
    .then(function () {
      var b = browserify({ standalone: standalone })
      b.add(path.resolve(__dirname, '../' + dest))

      return new Promise(function (resolve, reject) {
        b.bundle(function (err, buf) {
          if (err) return reject(err)
          return fs.writeFileAsync(path.resolve(__dirname, '../browser/' + dest + '.js'), buf)
            .then(resolve, reject)
        })
      })
    })
    .then(function () {
      return fs.readFileAsync(path.resolve(__dirname, '../browser/' + dest + '.js'), 'utf8')
        .then(function (code) {
          var result = uglify.minify(code)
          if (result.error) return Promise.reject(result.error)
          return fs.writeFileAsync(path.resolve(__dirname, '../browser/' + dest + '.min.js'), result.code)
        })
    })
}

// logging info
console.log('Starting build of vue-formation...\n')
console.log('* Building vue-formation.js')

// build main module
return build(
  path.resolve(__dirname, '../src/formation/index.js'),
  'vue-formation',
  [ 'vue' ],
  [ vue(), babel({ runtimeHelpers: true }) ],
  'VueFormation'
)

  // build bootstrap
  .then (function () {
    console.log('* Success!')
    console.log('* Building bootstrap.js')

    return build(
      path.resolve(__dirname, '../src/formation/frameworks/bootstrap.js'),
      'bootstrap',
      [],
      [ babel() ],
      ''
    )
  })

  // build materialize
  .then (function () {
    console.log('* Success!')
    console.log('* Building materialize.js')

    return build(
      path.resolve(__dirname, '../src/formation/frameworks/materialize.js'),
      'materialize',
      [],
      [ babel() ],
      ''
    )
  })

  // build semanticui
  .then (function () {
    console.log('* Success!')
    console.log('* Building semanticui.js')

    return build(
      path.resolve(__dirname, '../src/formation/frameworks/semanticui.js'),
      'semanticui',
      [],
      [ babel() ],
      ''
    )
  })

  // catch any errors
  .catch (function (err) {
    console.error(err)
  })
