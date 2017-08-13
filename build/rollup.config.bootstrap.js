import path from 'path'
import babel from 'rollup-plugin-babel'

export default {
  entry: path.resolve(__dirname, '../src/formation/frameworks/bootstrap.js'),
  dest: path.resolve(__dirname, '../dist/webpack/frameworks/bootstrap.js'),
  external: [
    'vue'
  ],
  format: 'cjs',
  plugins: [
    babel()
  ]
}
