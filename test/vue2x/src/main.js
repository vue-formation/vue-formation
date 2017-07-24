// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFormation from '../../../index' // '../../../src/formation/index'
import SourceCode from '../../../src/plugins/vue-formation-plugin-source-code'
import '../../../src/formation/vue-formation.css'

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    json (obj) {
      return JSON.stringify(obj, null, '  ')
    }
  }
})

VueFormation.use(SourceCode)
Vue.use(VueFormation)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  router,
  components: { App }
})
