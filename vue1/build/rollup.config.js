import path from 'path'
import vue from 'rollup-plugin-vue'

console.log(path.resolve(__dirname, '../../node_modules/') + '/**')

export default {
  entry: path.resolve(__dirname, '../../src/components/formation/formation.js'),
  dest: path.resolve(__dirname, '../../dist/formation.js'),
  external: ['lodash', 'vue', 'vue-multi-version'],
  format: 'cjs',
  plugins: [
    vue()
  ]
}
