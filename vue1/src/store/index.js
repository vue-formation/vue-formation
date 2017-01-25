import Vue from 'vue'
import Vuex from 'vuex'
import { extendMutations } from '../../../src/components'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    formation: {
      type: 'Vuex',
      text1: 'vuex'
    }
  },
  mutations: extendMutations({})
})

export default store
