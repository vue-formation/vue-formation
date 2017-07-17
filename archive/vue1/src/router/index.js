import Vue from 'vue'
import VueRouter from 'vue-router'
import ExampleBootstrap from '../components/examples/ExampleBootstrap'
import ExampleMaterialize from '../components/examples/ExampleMaterialize'
import ExampleSemanticUI from '../components/examples/ExampleSemanticUI.vue'

Vue.use(VueRouter)

let router = new VueRouter()

router.map({
  '/': {
    component: ExampleBootstrap
  },
  '/bootstrap': {
    component: ExampleBootstrap
  },
  '/materialize': {
    component: ExampleMaterialize
  },
  '/semanticui': {
    component: ExampleSemanticUI
  },
  '*': {
    component: ExampleBootstrap
  }
})

export default router
