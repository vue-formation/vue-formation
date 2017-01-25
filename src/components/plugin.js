import Formation from './formation/Formation'

export default {
  install (Vue) {
    Vue.component('formation', Formation(Vue))
  }
}
