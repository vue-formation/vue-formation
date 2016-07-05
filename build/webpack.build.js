var config = require('./webpack.dev.conf.js')

config.entry = {
  'vue-formation': './src/components/index.js',
}

config.output = {
  filename: './dist/[name].js',
  library: 'Formation',
  libraryTarget: 'umd'
}

module.exports = config
