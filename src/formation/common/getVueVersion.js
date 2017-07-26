import _ from '../utils/litedash/dash.index'

export default function getVueVersion (Vue) {
  return Number((_.isString(Vue.version) ? Vue.version : '2.0.0').split('.')[0])
}
