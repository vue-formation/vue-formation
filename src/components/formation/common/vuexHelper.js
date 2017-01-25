import _ from './dash/dash.index'

export default function vuex (vm) {
  let version = _.isFunction(_.get(vm, '$store.commit')) ? 2 : 1
  vm.dbg('Vuex Version', version)

  switch (version) {
    case 1:
      break

    case 2:
      break

    default:
      break
  }
}
