import Formation from './components/Formation'

export default {
  install (Vue, options) {
    Vue.component('formation', Formation(Vue, options))
  }
}
