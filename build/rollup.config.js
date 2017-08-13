import path from 'path'
import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'

export default {
  entry: path.resolve(__dirname, '../src/formation/index.js'),
  dest: path.resolve(__dirname, '../dist/webpack/vue-formation.js'),
  external: [
    'vue'
  ],
  format: 'cjs',
  plugins: [
    vue(),
    babel({ runtimeHelpers: true })
  ]
}
