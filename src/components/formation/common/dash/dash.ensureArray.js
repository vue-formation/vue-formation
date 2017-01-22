/* eslint-disable */
import isArray from './dash.isArray'

let ensureArray = function (obj) {
  return !obj ? [] : isArray(obj) ? obj : [obj]
}

ensureArray._accepts = ['ANY']

export default ensureArray
