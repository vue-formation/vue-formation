import Vue from 'vue'
import Router from 'vue-router'
import ExampleBootstrap from '../components/examples/ExampleBootstrap'

Vue.use(Router)

// import Home from '../components/Home'

export default new Router({
  routes: [
    { path: '/', component: ExampleBootstrap },
    { path: '*', component: ExampleBootstrap }
  ]
})
