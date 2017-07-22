import Vue from 'vue'
import App from './App'
import router from './router'
import { plugin as VueFormation } from '../../../src/formation/index'
import '../../../src/formation/vue-formation.css'

Vue.use(VueFormation)

router.start(App, '#app')
