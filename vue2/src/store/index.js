import Vue from 'vue'
import Vuex from 'vuex'
import { extendMutation } from '../../../src/components'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    formation: {
      type: 'Vuex',
      text1: 'vuex'
    }
  },
  actions: {},
  mutations: extendMutation({}),
  getters: {}
})

export default store
