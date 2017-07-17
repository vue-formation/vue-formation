import Vue from 'vue'
import Vuex from 'vuex'
import {
  mutations as themeMutation,
  state as themeState
} from './store/theme'

Vue.use(Vuex)

const state = Object.assign({}, themeState)
const mutations = Object.assign({}, themeMutation)

export default new Vuex.Store({
  state,
  mutations
})
