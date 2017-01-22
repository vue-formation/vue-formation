/* eslint-disable */
import forEach from './dash.forEach'

let mapValues = function (obj, fn) {
  let newObj = {}
  forEach(obj, (v, k) => {
    newObj[k] = fn(v)
  })
  return newObj
}

mapValues._accepts = [Object, Array]

export default mapValues
