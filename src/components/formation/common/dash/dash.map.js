/* eslint-disable */
import forEach from './dash.forEach'

let map = function (obj, fn) {
  let output = []
  forEach(obj, (v, k) => output.push(fn(v, k)))
  return output
}

map._accepts = [Object, Array]

export default map
