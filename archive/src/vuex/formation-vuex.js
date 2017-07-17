import { vueSet } from '../components/formation/common/index'

/**
 * Helper method for setting values in a vuex state
 * @param state
 * @param path
 * @param value
 * @constructor
 */
export function FORMATION_SET (state, { path, value }) {
  return vueSet(state, path, value)
}

/**
 * Helper method for extending a mutation object with the formation set mutation
 * @param mutations
 * @param name
 * @return {*}
 */
export function extendMutations (mutations = {}, name = 'FORMATION_SET', Vue) {
  return Object.assign(mutations, {
    [name]: function (state, { path, value }) {
      return vueSet(state, path, value, Vue)
    }
  })
}
