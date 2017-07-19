import Vue from 'vue'
import VueRouter from 'vue-router'
import Bootstrap from '../components/Bootstrap'
import Materialize from '../components/Materialize'
import Semanticui from '../components/Semanticui'

Vue.use(VueRouter)

let router = new VueRouter()

router.map({
  '/bootstrap': {
    component: Bootstrap
  },
  '/materialize': {
    component: Materialize
  },
  '/semanticui': {
    component: Semanticui
  }
})

router.redirect({
  '*': '/bootstrap'
})

export default router
