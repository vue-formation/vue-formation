import Vue from 'vue'
import Router from 'vue-router'
import Bootstrap from '../components/Bootstrap'
import Materialize from '../components/Materialize'
import Semanticui from '../components/Semanticui'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/bootstrap', component: Bootstrap },
    { path: '/materialize', component: Materialize },
    { path: '/semanticui', component: Semanticui },
    { path: '*', redirect: '/bootstrap' }
  ]
})
