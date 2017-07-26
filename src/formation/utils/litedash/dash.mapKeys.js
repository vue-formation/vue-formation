/* eslint-disable */
import forEach from './dash.forEach'

function mapKeys (obj, fn) {
  let newObj = {}
  forEach(obj, (v, k) => {
    let newKey = fn(v, k)
    newObj[typeof newKey === 'string' ? newKey : k] = v
  })
  return newObj
}

mapKeys._accepts = [Object]

export default mapKeys
