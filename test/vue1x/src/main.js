import Vue from 'vue'
import App from './App'
import { plugin as VueFormation } from '../../../src/formation/index'

Vue.use(VueFormation)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
