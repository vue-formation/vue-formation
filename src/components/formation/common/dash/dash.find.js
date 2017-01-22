/* eslint-disable */
import forEach from './dash.forEach'

let find = function (obj, fn, def) {
  let found = def || null
  forEach(obj, function (v, k) {
    if (fn(v, k)) {
      found = v
      return false
    }
  })
  return found
}

find._accepts = [Object, Array]

export default find
