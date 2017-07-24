/**
 * @name vue-formation
 * @author Branden Horiuchi <bhoriuchi@gmail.com>
 * @description Build full layouts in a programmatic way with JSON style objects
 */
import Formation from './components/Formation'
import component from './component'
import { extendMutation } from './utils/vue-deepset'

class VueFormation {
  use (plugin) {
    this.plugins.push(plugin)
  }

  extendMutation (mutations) {
    return extendMutation(mutations)
  }

  install (Vue, options) {
    Vue.component('formation', Formation(Vue, options, this.plugins))
  }

  get component () {
    return component(this.plugins)
  }
}

VueFormation.plugins = VueFormation.prototype.plugins = []

VueFormation.use = function (plugin) {
  this.plugins.push(plugin)
}

VueFormation.install = function (Vue, options) {
  Vue.component('formation', Formation(Vue, options, this.plugins))
}

export default VueFormation
