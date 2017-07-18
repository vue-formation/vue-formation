/* eslint-disable */
import forEach from './dash.forEach'

function mapWith (obj, fn) {
  let newObj = []
  forEach(obj, (v, k) => {
    let value = fn(v, k)
    if (value !== undefined) newObj.push(value)
  })
  return newObj
}

mapWith._accepts = [Object, Array]

export default mapWith
