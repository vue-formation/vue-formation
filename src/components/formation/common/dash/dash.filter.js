/* eslint-disable */
import isArray from './dash.isArray'
import forEach from './dash.forEach'

let filter = function (obj, fn) {
  let newObj = []
  if (!isArray(obj)) return newObj
  forEach(obj, function (v, k) {
    if (fn(v, k)) newObj.push(v)
  })
  return newObj
}

filter._accepts = [Array]
filter._dependencies = [
  'dash.isArray',
  'dash.forEach'
]

export default filter
