import Vue from 'vue'
import VueRouter from 'vue-router'
import ExampleBootstrap from '../components/examples/ExampleBootstrap'

Vue.use(VueRouter)

let router = new VueRouter()

router.map({
  '/': {
    component: ExampleBootstrap
  },
  '*': {
    component: ExampleBootstrap
  }
})

export default router
