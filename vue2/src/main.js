// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App'
import router from './router/index'
import store from './store/index'
import Formation from '../../src/components/formation/formation'
// import Formation from '../../dist/vue-formation'

Vue.use(Formation)

import 'font-awesome/css/font-awesome.min.css'

sync(store, router)

/* eslint-disable no-new */
const app = new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})

export default app
