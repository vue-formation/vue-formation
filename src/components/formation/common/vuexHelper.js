import _ from './dash/dash.index'

export default function vuex (store = {}) {
  let version = _.isFunction(store.commit) ? 2 : 1
  console.log('Vuex Version', version)
}
