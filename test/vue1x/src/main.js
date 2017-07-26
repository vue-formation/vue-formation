import Vue from 'vue'
import App from './App'
import router from './router'
import VueFormation from '../../../src/formation/index'
import SourceCode from '../../../src/plugins/vue-formation-plugin-source-code'
import '../../../src/formation/vue-formation.css'

VueFormation.use(SourceCode)
Vue.use(VueFormation)

router.start(App, '#app')
