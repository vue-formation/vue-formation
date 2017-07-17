import Vue from 'vue'
import Router from 'vue-router'
import ExampleBootstrap from '../components/examples/ExampleBootstrap'
import ExampleMaterialize from '../components/examples/ExampleMaterialize'
import ExampleSemanticUI from '../components/examples/ExampleSemanticUI'

Vue.use(Router)

// import Home from '../components/Home'

export default new Router({
  routes: [
    { path: '/', component: ExampleBootstrap },
    { path: '/bootstrap', component: ExampleBootstrap },
    { path: '/materialize', component: ExampleMaterialize },
    { path: '/semanticui', component: ExampleSemanticUI },
    { path: '*', component: ExampleBootstrap }
  ]
})
