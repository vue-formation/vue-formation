import _ from './dash/dash.index'
import mergeClass from './mergeClass'

export default function defaultClass (hive, component) {
  let { config } = component
  let { type, attrs } = config || {}
  let classKeys = _.keys(mergeClass({}, _.get(attrs, 'class', {})))
  let btnClassKeys = _.keys(hive)
  return type
    ? hive[type] || hive.default
    : !_.intersection(classKeys, btnClassKeys).length
      ? hive.default
      : ''
}
