import path from 'path'
import vue from 'rollup-plugin-vue'

export default {
  entry: path.resolve(__dirname, '../src/components/formation/formation.js'),
  dest: path.resolve(__dirname, '../dist/vue-formation.js'),
  external: ['vue', 'vue-multi-version', 'validator'],
  format: 'cjs',
  plugins: [
    vue()
  ]
}
