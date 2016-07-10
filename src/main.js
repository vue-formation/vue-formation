import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import store from './vuex/store'
import VueRouter from 'vue-router'
import App from './App'

/* eslint-disable no-new */
Vue.use(VueRouter)
let router = new VueRouter()
sync(store, router)
router.map({
  '/': {
    component: App
  }
})
router.start(App, 'html')
