/* eslint-disable */
import isArray from './dash.isArray'
import isHash from './dash.isHash'
import isDate from './dash.isDate'
import merge from './dash.merge'
import map from './dash.map'

let clone = function (obj, deep = false) {
  if (isArray(obj)) return deep ? map(obj, (o) => clone(o, true)) : obj.slice(0)
  if (isHash(obj)) return deep ? merge({}, obj) : Object.assign({}, obj)
  if (isDate(obj) && deep) return new Date(obj)
  return obj
}

clone._accepts = [Object, Array]
clone._dependencies = [
  'dash.isArray',
  'dash.isHash',
  'dash.isDate',
  'dash.merge',
  'dash.map'
]

export default clone
