import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/formation/vue-formation.js',
  format: 'cjs',
  plugins: [ babel() ],
  external: ['vue'],
  dest: 'vue-formation.js'
}