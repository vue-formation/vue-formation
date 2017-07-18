// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { plugin as VueFormation } from '../../../src/formation/index'

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    json (obj) {
      return JSON.stringify(obj, null, '  ')
    }
  }
})

Vue.use(VueFormation)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
