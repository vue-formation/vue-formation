import Formation from './formation/formation'

export default {
  install (Vue) {
    Vue.component('formation', Formation(Vue))
  }
}
