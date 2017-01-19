import Vue from 'vue'
import App from './App'
import { sync } from 'vuex-router-sync'
import router from './router/index'
import store from './store/index'
import Formation from '../../src/components/formation/formation'
// import Formation from '../../dist/vue-formation'

import 'font-awesome/css/font-awesome.min.css'

Vue.config.debug = true
Vue.use(Formation)

sync(store, router)
router.start(App, '#app')

