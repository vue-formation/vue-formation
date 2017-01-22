/* eslint-disable */
import isArray from './dash.isArray'

let includes = function (obj, key) {
  return isArray(obj) && obj.indexOf(key) !== -1
}

includes._accepts = [Array]

export default includes
