import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import store from './vuex/store'
import VueRouter from 'vue-router'
import App from './App'
import Main from './components/Main'
import Test from './components/Test'
import TableExample from './components/Examples/FTable'

/* eslint-disable no-new */
Vue.use(VueRouter)
let router = new VueRouter()
sync(store, router)
router.map({
  '/': {
    component: Main
  },
  '/test': {
    component: Test
  },
  '/table': {
    component: TableExample
  }
})
router.start(App, 'html')
