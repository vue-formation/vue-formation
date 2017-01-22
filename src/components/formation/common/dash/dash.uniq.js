/* eslint-disable */
import isArray from './dash.isArray'

let uniq = function (list) {
  return isArray(list) ? [ ...new Set(list) ] : []
}

uniq._accepts = [Array]

export default uniq
