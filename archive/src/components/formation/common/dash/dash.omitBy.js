/* eslint-disable */
import isHash from './dash.isHash'
import forEach from './dash.forEach'

function omitBy (obj, fn) {
  let newObj = {}
  if (!isHash(obj)) return newObj
  forEach(obj, (v, k) => {
    if (!fn(v, k)) newObj[k] = v
  })
  return newObj
}

omitBy._accepts = [Object]
omitBy._dependencies = [
  'dash.isHash',
  'dash.forEach'
]

export default omitBy
