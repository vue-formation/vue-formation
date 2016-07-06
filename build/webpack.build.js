var config = require('./webpack.dist.conf.js')

config.entry = {
  'vue-formation': './src/index.js',
}

config.output = {
  filename: './dist/vue-formation.js',
  library: 'VueFormation',
  libraryTarget: 'umd'
}

module.exports = config
